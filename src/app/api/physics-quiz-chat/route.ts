import { google } from "@ai-sdk/google";
import {
  streamText,
  tool,
  stepCountIs,
  convertToModelMessages,
  UIMessage,
} from "ai";
import { z } from "zod";
import {
  getQuestionCatalog,
  getPhysicsQuestionById,
} from "@/lib/quiz-chat/physics-quiz-data";
import { quizChatSupabase } from "@/lib/quiz-chat/supabase";

export const maxDuration = 30;

let questionCounter = 0;

export async function POST(req: Request) {
  const { messages, sessionId }: { messages: UIMessage[]; sessionId?: string } =
    await req.json();

  // Extract already-shown question IDs from conversation history
  const shownIds: string[] = [];
  for (const msg of messages) {
    if (msg.role === "assistant") {
      for (const part of msg.parts) {
        if (
          (part.type === "tool-quizQuestion" ||
            part.type === "tool-generateQuestion") &&
          "state" in part &&
          part.state === "output-available" &&
          "output" in part &&
          part.output &&
          typeof part.output === "object" &&
          "questionId" in part.output
        ) {
          shownIds.push((part.output as { questionId: string }).questionId);
        }
      }
    }
  }

  // Log quiz answers to Supabase
  if (sessionId) {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      const text = lastUserMsg.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("");
      const answerMatch = text.match(
        /\[Quiz Answer\] \[qid:(.+?)\] \[source:(.+?)\] \[topic:(.+?)\] Question: "(.+?)" \u2014 I answered \[(\d+)\] ".+?" \u2014 (CORRECT|INCORRECT)\. ?(?:The correct answer was \[(\d+)\])?/
      );
      if (answerMatch) {
        const [, qid, source, topic, question, selIdx, result, corrIdx] =
          answerMatch;
        const selectedIndex = parseInt(selIdx, 10);
        const correctIndex = corrIdx ? parseInt(corrIdx, 10) : selectedIndex;
        quizChatSupabase
          .from("quiz_answers")
          .insert({
            session_id: sessionId,
            question_id: qid,
            question_source: source,
            topic,
            question_text: question,
            selected_index: selectedIndex,
            correct_index: correctIndex,
            is_correct: result === "CORRECT",
          })
          .then(({ error }) => {
            if (error) console.error("Failed to insert quiz_answer:", error);
          });
      }
    }
  }

  // Build the question catalog for the LLM
  const catalog = getQuestionCatalog(shownIds);

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    system: `You are an adaptive physics tutor who quizzes students on Heat & Thermal Energy. You're smart about which questions to ask and when.

## Your question bank
These are available pre-made questions you haven't shown yet:
${catalog}

Each entry shows: id [difficulty] [tags] "title" — the misconception it tests.
Difficulty levels: beginning → developing → proficient.

## How to teach adaptively

**Start easy.** Pick a "beginning" question from the bank to gauge where the student is.

**After each answer, adapt:**
- If they got it RIGHT and it was easy → move to a harder question on the same topic, or branch to a new topic
- If they got it RIGHT on a hard one → congratulate genuinely, then test a different topic area
- If they got it WRONG → this is the most important moment. Don't just move on. The misconception they revealed tells you what to do next:
  - Use generateQuestion to create a follow-up that probes the SAME misconception from a different angle
  - Or pick a related bank question that approaches the concept differently
  - Make your brief response connect their wrong answer to the real-world intuition behind the correct one

**Use generateQuestion to go deeper when:**
- A student reveals a specific misconception and you want to probe it further
- You want to test whether they truly understand or just got lucky
- You want to connect the concept to a new real-world scenario they haven't seen
- The bank doesn't have the right question for this teaching moment

**Use bank questions (quizQuestion) when:**
- The bank has a good question that matches what you want to test next
- You want to cover a topic area the student hasn't been tested on yet
- The difficulty level matches what the student needs

## Rules
- Keep your text responses SHORT (1-2 sentences). The quiz card handles the visual experience.
- Don't repeat the question or answer options — the user already sees them in the card.
- When the user answers, the result comes as a message starting with [Quiz Answer].
- After 5-7 questions, give a brief summary of their strengths and gaps, then offer to continue.
- Ground everything in everyday experience (kitchen, weather, clothing, sports).
- When generating questions, always include a misconception-based distractor.`,
    messages: await convertToModelMessages(messages),
    tools: {
      quizQuestion: tool({
        description:
          "Show a specific pre-made question from the bank. Choose the question ID based on what the student needs to learn next. The user sees a visual card with 4 shuffled answer options.",
        inputSchema: z.object({
          questionId: z
            .string()
            .describe(
              "The ID of the question to show (e.g. 'heat_01'). Choose based on the student's level and which misconceptions to test."
            ),
        }),
        execute: async ({ questionId }) => {
          const question = getPhysicsQuestionById(questionId);
          if (!question) {
            return {
              exhausted: true as const,
              message: `Question "${questionId}" not found or already shown. Use generateQuestion instead.`,
            };
          }
          shownIds.push(question.id);
          return {
            questionId: question.id,
            topic: question.topic,
            question: question.question,
            options: question.options,
            correctIndex: question.correctIndex,
            explanation: question.explanation,
          };
        },
      }),
      generateQuestion: tool({
        description:
          "Generate a NEW quiz question to probe a specific concept deeper, test a revealed misconception from a different angle, or explore a topic not in the bank. Use this when you need the perfect follow-up question that the bank doesn't have.",
        inputSchema: z.object({
          topic: z.string().describe("The topic label shown above the question"),
          question: z.string().describe("The question text — ground it in everyday experience"),
          options: z
            .tuple([z.string(), z.string(), z.string(), z.string()])
            .describe(
              "Exactly 4 answer options. Include at least one distractor based on a common misconception."
            ),
          correctIndex: z
            .number()
            .min(0)
            .max(3)
            .describe("Index (0-3) of the correct answer"),
          explanation: z
            .string()
            .describe(
              "Educational explanation that reveals the surprising insight. 1-3 sentences."
            ),
        }),
        execute: async ({
          topic,
          question,
          options,
          correctIndex,
          explanation,
        }) => {
          const id = `gen-physics-${++questionCounter}-${Date.now()}`;
          quizChatSupabase
            .from("generated_questions")
            .insert({
              question_id: id,
              topic,
              question_text: question,
              options,
              correct_index: correctIndex,
              explanation,
            })
            .then(({ error }) => {
              if (error)
                console.error("Failed to insert generated_question:", error);
            });
          return {
            questionId: id,
            topic,
            question,
            options,
            correctIndex,
            explanation,
          };
        },
      }),
    },
    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}
