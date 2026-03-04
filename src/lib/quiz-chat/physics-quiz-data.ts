import type { QuizItem } from "./types";
import { heatQuestions } from "@/data/physics-questions";

const tagToTopic: Record<string, string> = {
  "temperature-vs-heat": "Temperature vs Heat",
  conduction: "Conduction & Insulation",
  insulation: "Conduction & Insulation",
  convection: "Convection",
  radiation: "Radiation",
  "phase-changes": "Phase Changes & Specific Heat",
  "specific-heat": "Phase Changes & Specific Heat",
};

export const physicsTopics = [
  "Temperature vs Heat",
  "Conduction & Insulation",
  "Convection",
  "Radiation",
  "Phase Changes & Specific Heat",
] as const;

function getQuestionTopic(tags: string[]): string {
  for (const tag of tags) {
    if (tagToTopic[tag]) return tagToTopic[tag];
  }
  return "Heat & Thermal Energy";
}

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

export function pickRandomPhysicsQuestion(
  excludeIds: string[],
  topic?: string
): QuizItem | null {
  const excluded = new Set(excludeIds);
  let pool = heatQuestions.filter((q) => !excluded.has(q.id));

  if (topic) {
    const topicPool = pool.filter((q) => getQuestionTopic(q.tags) === topic);
    if (topicPool.length > 0) pool = topicPool;
  }

  if (pool.length === 0) return null;

  const raw = pool[Math.floor(Math.random() * pool.length)];
  const { options, correctIndex } = shuffleAnswers(
    raw.correctAnswer,
    raw.distractors
  );

  return {
    id: raw.id,
    topic: getQuestionTopic(raw.tags),
    question: raw.question,
    options,
    correctIndex,
    explanation: raw.explanation,
  };
}
