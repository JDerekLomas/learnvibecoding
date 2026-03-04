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
  pickRandomPhysicsQuestion,
  physicsTopics,
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

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    system: `You are a friendly, encouraging physics quiz host specializing in Heat & Thermal Energy. Your job is to quiz students using interactive question cards.

When the user wants to take a quiz or asks about heat/thermal energy:
1. Call the quizQuestion tool to show them a question card from the bank
2. The user will click their answer in the interactive card, and the result comes back to you
3. React briefly — celebrate correct answers, gently explain incorrect ones using everyday examples
4. Then call quizQuestion again for the next question
5. After 5-7 questions, summarize their strengths and gaps, then offer to continue or switch topics

You also have a generateQuestion tool that lets you CREATE brand new questions. Use it when:
- The question bank is exhausted for a topic
- The user asks about a specific concept not covered
- The user wants harder/easier questions
- You want to probe a misconception the student revealed

When generating questions, make them:
- Grounded in everyday experience (kitchen, weather, clothing, sports)
- Include at least one distractor based on a common misconception
- Educational — the explanation should reveal a surprising insight

Keep responses SHORT (1-2 sentences). The quiz card handles the visual experience — you provide the conversational wrapper.

Topics in the bank: ${physicsTopics.join(", ")}

When the user answers, the result comes as a message starting with [Quiz Answer]. Parse it to understand what they answered and whether they got it right.

Don't repeat the question or answer options in your response — the user already sees them in the card.`,
    messages: await convertToModelMessages(messages),
    tools: {
      quizQuestion: tool({
        description:
          "Show a quiz question from the pre-made question bank. The user sees a visual card with 4 answer options and clicks their choice. Call this once per question. Use generateQuestion instead if the bank is exhausted or the user wants a custom topic.",
        inputSchema: z.object({
          topic: z
            .enum(physicsTopics)
            .optional()
            .describe("Quiz topic. Leave empty for random."),
        }),
        execute: async ({ topic }) => {
          const question = pickRandomPhysicsQuestion(shownIds, topic);
          if (!question) {
            return {
              exhausted: true as const,
              message: `All questions have been shown${topic ? ` for "${topic}"` : ""}! Use generateQuestion to create new ones.`,
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
          "Generate a NEW quiz question on any topic. You provide the full question, 4 options, the correct answer index, and an explanation. The user sees the same interactive card UI. Use this for custom topics, when the bank is exhausted, or when the user wants something specific.",
        inputSchema: z.object({
          topic: z.string().describe("The topic label shown above the question"),
          question: z
            .string()
            .describe(
              "The question text — ground it in everyday experience"
            ),
          options: z
            .array(z.string())
            .length(4)
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
