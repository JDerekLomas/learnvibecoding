export interface SkillQuizMapping {
  skillId: string;
  quizTags: string[];
  quizTopicId?: string;
  minItems: number;
}

export const SKILL_QUIZ_MAP: SkillQuizMapping[] = [
  // Entry unit
  { skillId: "landscape", quizTags: ["ai-tool-selection"], quizTopicId: "ai-tool-selection", minItems: 8 },
  { skillId: "first-build", quizTags: ["react", "nextjs", "deployment"], quizTopicId: "web", minItems: 10 },
  { skillId: "for-developers", quizTags: ["tooling", "reading-code", "git"], quizTopicId: "tooling", minItems: 12 },
  { skillId: "level-up", quizTags: ["prompt-engineering", "debugging"], minItems: 12 },
  // Core path
  { skillId: "know-yourself", quizTags: ["prompt-engineering", "claude-code"], quizTopicId: "prompt-engineering", minItems: 12 },
  { skillId: "workflow", quizTags: ["tooling", "git", "npm", "architecture"], quizTopicId: "tooling", minItems: 12 },
  { skillId: "build", quizTags: ["react", "nextjs", "tailwind", "architecture"], quizTopicId: "web", minItems: 10 },
  { skillId: "debugging", quizTags: ["debugging", "reading-code", "security"], quizTopicId: "debugging", minItems: 10 },
  // Advanced
  { skillId: "sessions", quizTags: ["prompt-engineering", "multi-turn"], minItems: 6 },
  { skillId: "shipping", quizTags: ["shipping-deploy", "testing"], quizTopicId: "shipping-deploy", minItems: 8 },
  { skillId: "craft", quizTags: ["security", "architecture", "ai-tool-selection"], quizTopicId: "architecture", minItems: 8 },
];

const SKILL_QUIZ_INDEX = new Map(SKILL_QUIZ_MAP.map((m) => [m.skillId, m]));

export function getQuizMapping(skillId: string): SkillQuizMapping | undefined {
  return SKILL_QUIZ_INDEX.get(skillId);
}

export function getQuizUrl(mapping: SkillQuizMapping): string {
  const tags = mapping.quizTags.join(",");
  if (mapping.quizTopicId) {
    return `https://ai-growth.net/quiz/play?topic=${mapping.quizTopicId}&tags=${tags}`;
  }
  return `https://ai-growth.net/quiz/play?topic=all&tags=${tags}`;
}
