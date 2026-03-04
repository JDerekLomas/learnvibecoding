export interface CourseModule {
  slug: string;
  tag: string;
  title: string;
  section: "entry" | "core" | "advanced";
  color: string;
}

export const MODULES: CourseModule[] = [
  // Entry points
  { slug: "/landscape", tag: "M0-A", title: "The AI Landscape", section: "entry", color: "bg-violet-500" },
  { slug: "/first-build", tag: "M0-B", title: "Your First Build", section: "entry", color: "bg-amber-500" },
  { slug: "/for-developers", tag: "M0-C", title: "For Developers", section: "entry", color: "bg-blue-500" },
  { slug: "/level-up", tag: "M0-D", title: "Level Up", section: "entry", color: "bg-emerald-500" },
  // Core
  { slug: "/know-yourself", tag: "M1", title: "Know Yourself, Know Your Tools", section: "core", color: "bg-amber-500" },
  { slug: "/workflow", tag: "M2", title: "The Vibe Coding Workflow", section: "core", color: "bg-blue-500" },
  { slug: "/build", tag: "M3", title: "Build Something Real", section: "core", color: "bg-emerald-500" },
  { slug: "/debugging", tag: "M4", title: "When Things Break", section: "core", color: "bg-red-500" },
  // Advanced
  { slug: "/sessions", tag: "M5", title: "Mastering Sessions", section: "advanced", color: "bg-indigo-500" },
  { slug: "/shipping", tag: "M6", title: "Portfolio & Shipping", section: "advanced", color: "bg-teal-500" },
  { slug: "/craft", tag: "M7", title: "The Craft", section: "advanced", color: "bg-purple-500" },
];

/** Sequential learning path: core + advanced (entry points are standalone on-ramps) */
export const SEQUENTIAL_PATH: CourseModule[] = MODULES.filter(
  (m) => m.section !== "entry"
);

/** Get prev/next modules in the sequential path */
export function getSequentialNav(currentSlug: string): {
  prev: CourseModule | null;
  next: CourseModule | null;
  index: number;
  total: number;
} {
  const idx = SEQUENTIAL_PATH.findIndex((m) => m.slug === currentSlug);
  if (idx === -1) return { prev: null, next: null, index: -1, total: SEQUENTIAL_PATH.length };
  return {
    prev: idx > 0 ? SEQUENTIAL_PATH[idx - 1] : null,
    next: idx < SEQUENTIAL_PATH.length - 1 ? SEQUENTIAL_PATH[idx + 1] : null,
    index: idx,
    total: SEQUENTIAL_PATH.length,
  };
}

/** Group modules by section for display */
export function getModulesBySection(): {
  title: string;
  description: string;
  modules: CourseModule[];
}[] {
  return [
    {
      title: "Entry Points",
      description: "Choose the one that matches where you are right now.",
      modules: MODULES.filter((m) => m.section === "entry"),
    },
    {
      title: "Core",
      description: "Everyone takes these, in order.",
      modules: MODULES.filter((m) => m.section === "core"),
    },
    {
      title: "Advanced",
      description: "Go deeper once you've built a few things.",
      modules: MODULES.filter((m) => m.section === "advanced"),
    },
  ];
}
