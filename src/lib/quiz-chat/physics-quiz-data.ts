import type { QuizItem } from "./types";
import { heatQuestions } from "@/data/physics-questions";

// Build a catalog string the LLM can read to make informed question choices
export function getQuestionCatalog(excludeIds: string[]): string {
  const excluded = new Set(excludeIds);
  const available = heatQuestions.filter((q) => !excluded.has(q.id));
  if (available.length === 0) return "ALL QUESTIONS EXHAUSTED. Use generateQuestion to create new ones.";

  return available
    .map(
      (q) =>
        `- ${q.id} [${q.difficulty}] [${q.tags.join(", ")}] "${q.title}" — tests misconception: "${q.misconceptions?.[0] || "n/a"}"`
    )
    .join("\n");
}

// Shuffle answers for a specific question by ID
function shuffleAnswers(
  correct: string,
  distractors: string[]
): { options: [string, string, string, string]; correctIndex: number } {
  const all = [correct, ...distractors.slice(0, 3)];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return {
    options: all as [string, string, string, string],
    correctIndex: all.indexOf(correct),
  };
}

export function getPhysicsQuestionById(id: string): QuizItem | null {
  const raw = heatQuestions.find((q) => q.id === id);
  if (!raw) return null;
  const { options, correctIndex } = shuffleAnswers(raw.correctAnswer, raw.distractors);
  return {
    id: raw.id,
    topic: "Heat & Thermal Energy",
    question: raw.question,
    options,
    correctIndex,
    explanation: raw.explanation,
  };
}
