import { getData, hasExerciseData } from "./progress";

export type SkillStatus = "locked" | "available" | "active" | "complete";

export interface Skill {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  unit: string;
  /** Module paths that must be complete before this skill unlocks */
  prerequisites: string[];
}

export interface SkillUnit {
  id: string;
  title: string;
  description: string;
  color: string; // Tailwind color prefix, e.g. "indigo", "emerald"
  skills: Skill[];
}

export const SKILL_UNITS: SkillUnit[] = [
  {
    id: "entry",
    title: "Start Here",
    description: "Choose the path that matches you",
    color: "violet",
    skills: [
      {
        id: "landscape",
        title: "The AI Landscape",
        subtitle: "New to AI",
        href: "/landscape",
        unit: "entry",
        prerequisites: [],
      },
      {
        id: "first-build",
        title: "Your First Build",
        subtitle: "Non-coder",
        href: "/first-build",
        unit: "entry",
        prerequisites: [],
      },
      {
        id: "for-developers",
        title: "For Developers",
        subtitle: "Dev, new to AI",
        href: "/for-developers",
        unit: "entry",
        prerequisites: [],
      },
      {
        id: "level-up",
        title: "Level Up",
        subtitle: "Active vibe coder",
        href: "/level-up",
        unit: "entry",
        prerequisites: [],
      },
    ],
  },
  {
    id: "core-1",
    title: "Know Yourself",
    description: "Self-knowledge before prompt templates",
    color: "amber",
    skills: [
      {
        id: "know-yourself",
        title: "Know Yourself, Know Your Tools",
        subtitle: "Intent, aesthetics, CLAUDE.md",
        href: "/know-yourself",
        unit: "core-1",
        prerequisites: ["/landscape", "/first-build", "/for-developers", "/level-up"],
      },
    ],
  },
  {
    id: "core-2",
    title: "The Workflow",
    description: "Vision, build, deploy, refine",
    color: "blue",
    skills: [
      {
        id: "workflow",
        title: "The Vibe Coding Workflow",
        subtitle: "End-to-end process",
        href: "/workflow",
        unit: "core-2",
        prerequisites: ["/know-yourself"],
      },
    ],
  },
  {
    id: "core-3",
    title: "Build Real",
    description: "Choose from desire, not tutorials",
    color: "emerald",
    skills: [
      {
        id: "build",
        title: "Build Something Real",
        subtitle: "Desire-driven projects",
        href: "/build",
        unit: "core-3",
        prerequisites: ["/workflow"],
      },
    ],
  },
  {
    id: "core-4",
    title: "Debugging",
    description: "Frustration is data",
    color: "red",
    skills: [
      {
        id: "debugging",
        title: "When Things Break",
        subtitle: "Repair patterns & resilience",
        href: "/debugging",
        unit: "core-4",
        prerequisites: ["/build"],
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Go deeper once you've built a few things",
    color: "zinc",
    skills: [
      {
        id: "sessions",
        title: "Mastering Sessions",
        subtitle: "Session hygiene & prompt archaeology",
        href: "/sessions",
        unit: "advanced",
        prerequisites: ["/debugging"],
      },
      {
        id: "shipping",
        title: "Portfolio & Shipping",
        subtitle: "Polish, portfolio & user testing",
        href: "/shipping",
        unit: "advanced",
        prerequisites: ["/debugging"],
      },
      {
        id: "craft",
        title: "The Craft",
        subtitle: "Advanced patterns & the Grimoire",
        href: "/craft",
        unit: "advanced",
        prerequisites: ["/debugging"],
      },
    ],
  },
];

/**
 * For entry prerequisites, at least ONE entry module must be complete
 * (not all of them — they're alternative starting points).
 */
const ENTRY_PATHS = ["/landscape", "/first-build", "/for-developers", "/level-up"];

export function getSkillStatuses(): Record<string, SkillStatus> {
  const data = getData();
  const statuses: Record<string, SkillStatus> = {};

  for (const unit of SKILL_UNITS) {
    for (const skill of unit.skills) {
      if (hasExerciseData(skill.href)) {
        statuses[skill.id] = "complete";
      } else if (data.visited.includes(skill.href)) {
        statuses[skill.id] = "active";
      } else if (isUnlocked(skill, statuses)) {
        statuses[skill.id] = "available";
      } else {
        statuses[skill.id] = "locked";
      }
    }
  }

  return statuses;
}

function isUnlocked(skill: Skill, currentStatuses: Record<string, SkillStatus>): boolean {
  if (skill.prerequisites.length === 0) return true;

  // Entry prerequisites: any ONE entry module complete unlocks core
  const isEntryGate = skill.prerequisites.every((p) => ENTRY_PATHS.includes(p));
  if (isEntryGate) {
    return ENTRY_PATHS.some((path) => {
      const id = path.replace(/^\//, "");
      return currentStatuses[id] === "complete" || currentStatuses[id] === "active";
    });
  }

  // Normal prerequisites: all must be complete or active
  return skill.prerequisites.every((path) => {
    const id = path.replace(/^\//, "");
    return currentStatuses[id] === "complete" || currentStatuses[id] === "active";
  });
}
