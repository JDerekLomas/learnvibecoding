import type { QuizItem } from "./types";
import { heatQuestions } from "@/data/physics-questions";

// Convert physics questions (correctAnswer + distractors) to quiz-chat format (options + correctIndex)
function shuffleWithCorrect(
  correct: string,
  distractors: string[]
): { options: [string, string, string, string]; correctIndex: number } {
  const all = [correct, ...distractors.slice(0, 3)];
  // Fisher-Yates shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return {
    options: all as [string, string, string, string],
    correctIndex: all.indexOf(correct),
  };
}

export const physicsTopics = [
  "Heat & Thermal Energy",
] as const;

export function pickRandomPhysicsQuestion(
  excludeIds: string[] = [],
  topic?: string
): QuizItem | null {
  const excluded = new Set(excludeIds);
  const available = heatQuestions.filter((q) => !excluded.has(q.id));
  if (available.length === 0) return null;
  const raw = available[Math.floor(Math.random() * available.length)];
  const { options, correctIndex } = shuffleWithCorrect(
    raw.correctAnswer,
    raw.distractors
  );
  return {
    id: raw.id,
    topic: "Heat & Thermal Energy",
    question: raw.question,
    options,
    correctIndex,
    explanation: raw.explanation,
  };
}
