import Link from "next/link";
import { headers } from "next/headers";
import type { Audience } from "@/lib/audience";

const entryPoints = [
  {
    href: "/landscape",
    tag: "M0-A",
    title: "The AI Landscape",
    description: "New to AI? Start here. Understand the tools, the players, and where we are in 2026.",
    audience: "Never used AI for coding",
  },
  {
    href: "/first-build",
    tag: "M0-B",
    title: "Your First Build",
    description: "Build and deploy a real website in minutes — no coding experience needed.",
    audience: "Non-coder, ready to build",
  },
  {
    href: "/for-developers",
    tag: "M0-C",
    title: "For Developers",
    description: "You write code. You haven't used AI tools seriously. Here's the mental shift.",
    audience: "Developer, new to AI tools",
  },
  {
    href: "/level-up",
    tag: "M0-D",
    title: "Level Up",
    description: "Already vibe coding? Discover the patterns, archetypes, and power-user techniques.",
    audience: "Active vibe coder",
  },
];

const coreModules = [
  {
    href: "/know-yourself",
    tag: "M1",
    title: "Know Yourself, Know Your Tools",
    description: "Why self-knowledge matters more than prompt templates.",
  },
  {
    href: "/workflow",
    tag: "M2",
    title: "The Vibe Coding Workflow",
    description: "Vision, build, deploy, refine, delegate, resume.",
  },
  {
    href: "/build",
    tag: "M3",
    title: "Build Something Real",
    description: "Choose from desire, not from tutorial lists.",
  },
  {
    href: "/debugging",
    tag: "M4",
    title: "When Things Break",
    description: "Frustration is normal. Here's how to get unstuck.",
  },
];

export default async function Home() {
  const headersList = await headers();
  const audience = (headersList.get("x-audience") || "consumer") as Audience;
  const isCorporate = audience === "corporate";

  if (isCorporate) {
    return <CorporateLanding />;
  }

  return <ConsumerLanding />;
}

function CorporateLanding() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="py-20 md:py-28">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
          AI Growth
        </h1>
        <p className="mt-4 text-xl text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
          Assess and grow your team&apos;s AI coding skills with confidence-based practice.
        </p>
        <p className="mt-4 text-lg text-zinc-400 dark:text-zinc-500">
          96 questions across 11 topics. Know what you know — and what you don&apos;t.
        </p>
      </section>

      <section className="pb-16">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-white font-semibold hover:bg-indigo-600 transition-colors"
        >
          Start Assessment
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </section>

      <section className="pb-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">
          Topics Covered
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Prompt Engineering", "Reading AI Code", "Dev Tooling", "Web Fundamentals",
            "Debugging with AI", "Testing & Quality", "Security", "AI Tool Selection",
            "Architecture", "Shipping & Deploy",
          ].map((topic) => (
            <div
              key={topic}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
            >
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{topic}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-6">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            How it works
          </h3>
          <ol className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            <li>1. Pick a topic or try mixed practice</li>
            <li>2. Answer each question, then rate your confidence</li>
            <li>3. Get targeted feedback — especially on misconceptions</li>
            <li>4. Track your growth over time</li>
          </ol>
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          Part of the{" "}
          <a
            href="https://codevibing.com"
            className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            CodeVibing
          </a>{" "}
          ecosystem.
        </p>
      </footer>
    </div>
  );
}

function ConsumerLanding() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
          Learn Vibe Coding
        </h1>
        <p className="mt-4 text-xl text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
          A structured curriculum for building with AI — from your first
          conversation to your first shipped product.
        </p>
        <p className="mt-4 text-lg text-zinc-400 dark:text-zinc-500">
          No prerequisites. No gatekeeping. Just start where you are.
        </p>
      </section>

      {/* Entry Point Selector */}
      <section className="pb-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">
          Where are you starting from?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {entryPoints.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5">
                  {entry.tag}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {entry.audience}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
                {entry.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {entry.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Convergent Diamond Diagram */}
      <section className="pb-16">
        <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-6 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Every entry point converges at the same core curriculum.
          </p>
          <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed whitespace-pre">
{`  M0-A ──┐
  M0-B ──┤── M1 → M2 → M3 → M4 ──┬── M5
  M0-C ──┤                         ├── M6
  M0-D ──┘                         └── M7`}
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-4">
            Choose your entry. Everyone converges. Then specialize.
          </p>
        </div>
      </section>

      {/* Core Modules */}
      <section className="pb-20">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">
          The Core
        </h2>
        <div className="space-y-3">
          {coreModules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="group flex items-start gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5 mt-1 shrink-0">
                {mod.tag}
              </span>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  {mod.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {mod.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          Built by{" "}
          <a
            href="https://dereklomas.me"
            className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Derek Lomas
          </a>
          . Part of the{" "}
          <a
            href="https://codevibing.com"
            className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            CodeVibing
          </a>{" "}
          ecosystem.
        </p>
      </footer>
    </div>
  );
}
