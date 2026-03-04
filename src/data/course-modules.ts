export interface Chapter {
  slug: string;
  title: string;
}

export interface CourseModule {
  slug: string;
  tag: string;
  title: string;
  section: "entry" | "core" | "advanced";
  color: string;
  chapters?: Chapter[];
}

export const MODULES: CourseModule[] = [
  // Entry points (no chapters — compact single pages)
  { slug: "/for-your-role", tag: "M0-R", title: "AI for Your Role", section: "entry", color: "bg-rose-500" },
  { slug: "/landscape", tag: "M0-A", title: "The AI Landscape", section: "entry", color: "bg-violet-500" },
  { slug: "/first-build", tag: "M0-B", title: "Your First Build", section: "entry", color: "bg-amber-500" },
  { slug: "/for-developers", tag: "M0-C", title: "For Developers", section: "entry", color: "bg-blue-500" },
  { slug: "/level-up", tag: "M0-D", title: "Level Up", section: "entry", color: "bg-emerald-500" },
  // Core
  {
    slug: "/know-yourself", tag: "M1", title: "Know Yourself, Know Your Tools", section: "core", color: "bg-amber-500",
    chapters: [
      { slug: "self-knowledge", title: "Why Self-Knowledge Comes First" },
      { slug: "play", title: "Confidence Through Play" },
      { slug: "conversation", title: "Building a Relationship" },
      { slug: "claude-md", title: "Your CLAUDE.md" },
      { slug: "secrets", title: "Secrets Management" },
    ],
  },
  {
    slug: "/workflow", tag: "M2", title: "The Vibe Coding Workflow", section: "core", color: "bg-blue-500",
    chapters: [
      { slug: "the-rhythm", title: "The Rhythm" },
      { slug: "under-the-hood", title: "Under the Hood" },
      { slug: "context-management", title: "Context Management" },
      { slug: "toolchain-and-building", title: "The Toolchain & Building" },
    ],
  },
  {
    slug: "/build", tag: "M3", title: "Build Something Real", section: "core", color: "bg-emerald-500",
    chapters: [
      { slug: "desire", title: "Choose From Desire" },
      { slug: "archetype", title: "Apply Your Archetype" },
      { slug: "portfolio", title: "The Portfolio Effect" },
    ],
  },
  {
    slug: "/debugging", tag: "M4", title: "When Things Break", section: "core", color: "bg-red-500",
    chapters: [
      { slug: "frustration", title: "Frustration Is Normal" },
      { slug: "failures", title: "Common Failures and Fixes" },
      { slug: "repair", title: "Repair Patterns" },
      { slug: "quality", title: "Error Messages & Quality Control" },
    ],
  },
  // Advanced
  {
    slug: "/sessions", tag: "M5", title: "Mastering Sessions", section: "advanced", color: "bg-indigo-500",
    chapters: [
      { slug: "hygiene", title: "Session Hygiene" },
      { slug: "archaeology", title: "Prompt Archaeology" },
      { slug: "signature", title: "Your Prompting Signature" },
      { slug: "energy", title: "Energy & Multi-Project Flow" },
    ],
  },
  {
    slug: "/shipping", tag: "M6", title: "Portfolio & Shipping", section: "advanced", color: "bg-teal-500",
    chapters: [
      { slug: "built-vs-shipped", title: "Built vs. Shipped" },
      { slug: "polish", title: "Polish as Communication" },
      { slug: "portfolio-building", title: "Building a Portfolio" },
      { slug: "feedback", title: "Getting Feedback & Iterating" },
    ],
  },
  {
    slug: "/craft", tag: "M7", title: "The Craft", section: "advanced", color: "bg-purple-500",
    chapters: [
      { slug: "grimoire", title: "The Promptcraft Grimoire" },
      { slug: "multi-service", title: "Multi-Service Architectures" },
      { slug: "ai-limits", title: "When AI Breaks" },
      { slug: "tools", title: "Alternative Tools & MCP Servers" },
      { slug: "agents", title: "Autonomous Agents" },
    ],
  },
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

/** Find the module that owns a given path (e.g., "/workflow/the-rhythm" → workflow module) */
export function getModuleForPath(path: string): CourseModule | null {
  return MODULES.find((m) => path === m.slug || path.startsWith(m.slug + "/")) ?? null;
}

/** Get chapter navigation info for a given path */
export interface ChapterNavInfo {
  moduleSlug: string;
  moduleTitle: string;
  moduleTag: string;
  moduleColor: string;
  chapterIndex: number;
  totalChapters: number;
  prevChapterPath: string | null;
  prevChapterTitle: string | null;
  nextChapterPath: string | null;
  nextChapterTitle: string | null;
  nextModulePath: string | null;
  nextModuleTitle: string | null;
  isLastChapter: boolean;
}

export function getChapterNav(currentPath: string): ChapterNavInfo | null {
  const mod = getModuleForPath(currentPath);
  if (!mod?.chapters) return null;

  const chapterSlug = currentPath.replace(mod.slug + "/", "");
  const idx = mod.chapters.findIndex((ch) => ch.slug === chapterSlug);
  if (idx === -1) return null;

  const prev = idx > 0 ? mod.chapters[idx - 1] : null;
  const next = idx < mod.chapters.length - 1 ? mod.chapters[idx + 1] : null;

  // If last chapter, find next module in sequential path
  const seqNav = getSequentialNav(mod.slug);

  return {
    moduleSlug: mod.slug,
    moduleTitle: mod.title,
    moduleTag: mod.tag,
    moduleColor: mod.color,
    chapterIndex: idx,
    totalChapters: mod.chapters.length,
    prevChapterPath: prev ? `${mod.slug}/${prev.slug}` : null,
    prevChapterTitle: prev ? prev.title : null,
    nextChapterPath: next ? `${mod.slug}/${next.slug}` : null,
    nextChapterTitle: next ? next.title : null,
    nextModulePath: seqNav.next?.slug ?? null,
    nextModuleTitle: seqNav.next?.title ?? null,
    isLastChapter: !next,
  };
}
