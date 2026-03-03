import Link from "next/link";
import { headers } from "next/headers";
import type { Audience } from "@/lib/audience";

const entryPoints = [
  {
    href: "/landscape",
    tag: "M0-A",
    title: "The AI Landscape",
    description: "Understand the tools, the players, and where we are in 2026.",
    audience: "Never used AI for coding",
    color: "violet",
  },
  {
    href: "/first-build",
    tag: "M0-B",
    title: "Your First Build",
    description: "Build and deploy a real website in minutes — no coding needed.",
    audience: "Non-coder, ready to build",
    color: "amber",
  },
  {
    href: "/for-developers",
    tag: "M0-C",
    title: "For Developers",
    description: "You write code. You haven't used AI tools seriously yet.",
    audience: "Developer, new to AI tools",
    color: "blue",
  },
  {
    href: "/level-up",
    tag: "M0-D",
    title: "Level Up",
    description: "Patterns, archetypes, and power-user techniques.",
    audience: "Active vibe coder",
    color: "emerald",
  },
];

const ENTRY_COLORS: Record<string, { iconBg: string; border: string; shadow: string }> = {
  violet: { iconBg: "bg-violet-500", border: "border-violet-400", shadow: "shadow-violet-200/60" },
  amber: { iconBg: "bg-amber-500", border: "border-amber-400", shadow: "shadow-amber-200/60" },
  blue: { iconBg: "bg-blue-500", border: "border-blue-400", shadow: "shadow-blue-200/60" },
  emerald: { iconBg: "bg-emerald-500", border: "border-emerald-400", shadow: "shadow-emerald-200/60" },
};

const coreModules = [
  {
    href: "/know-yourself",
    tag: "M1",
    title: "Know Yourself, Know Your Tools",
    description: "Why self-knowledge matters more than prompt templates.",
    color: "bg-amber-500",
  },
  {
    href: "/workflow",
    tag: "M2",
    title: "The Vibe Coding Workflow",
    description: "Vision, build, deploy, refine, delegate, resume.",
    color: "bg-blue-500",
  },
  {
    href: "/build",
    tag: "M3",
    title: "Build Something Real",
    description: "Choose from desire, not from tutorial lists.",
    color: "bg-emerald-500",
  },
  {
    href: "/debugging",
    tag: "M4",
    title: "When Things Break",
    description: "Frustration is normal. Here's how to get unstuck.",
    color: "bg-red-500",
  },
];

const TOPIC_HIGHLIGHTS = [
  { label: "Prompt Engineering", count: 12, color: "bg-amber-500" },
  { label: "Reading AI Code", count: 12, color: "bg-blue-500" },
  { label: "Dev Tooling", count: 12, color: "bg-emerald-500" },
  { label: "Debugging", count: 10, color: "bg-indigo-500" },
  { label: "Security", count: 8, color: "bg-rose-500" },
  { label: "Architecture", count: 8, color: "bg-orange-500" },
];

export default async function Home() {
  const headersList = await headers();
  const audience = (headersList.get("x-audience") || "consumer") as Audience;

  if (audience === "corporate") {
    return <CorporateLanding />;
  }

  return <ConsumerLanding />;
}

function CorporateLanding() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      {/* Doodle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/vibecode-light-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Hero card */}
        <div className="text-center mb-8 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-8 py-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900">
            AI Growth
          </h1>
          <p className="mt-3 text-lg font-medium text-stone-500 max-w-md mx-auto">
            Assess and grow your team&apos;s AI coding skills with confidence-based practice.
          </p>
          <p className="mt-2 text-sm text-stone-400">
            96 questions across 11 topics. Know what you know — and what you don&apos;t.
          </p>
        </div>

        {/* Start CTA */}
        <Link href="/quiz">
          <div className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-extrabold text-lg text-center shadow-xl shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-600 transition-all duration-150 border-2 border-white/20 mb-8">
            Start Assessment
          </div>
        </Link>

        {/* Topic highlights */}
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6 mb-8">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            Topics Covered
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {TOPIC_HIGHLIGHTS.map((topic) => (
              <div
                key={topic.label}
                className="flex items-center gap-3 rounded-xl border-2 border-stone-200 bg-white p-3"
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${topic.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {topic.count}
                </div>
                <p className="text-sm font-semibold text-stone-700">{topic.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            How it works
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Pick an answer", color: "bg-violet-500" },
              { label: "Rate your confidence", color: "bg-indigo-500" },
              { label: "Learn from feedback", color: "bg-emerald-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className={`w-11 h-11 mx-auto mb-2.5 rounded-xl ${item.color} flex items-center justify-center text-lg font-extrabold text-white`}>
                  {i + 1}
                </div>
                <p className="text-xs text-stone-500 font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-stone-400">
            Part of the{" "}
            <a href="https://codevibing.com" className="underline hover:text-stone-600" target="_blank" rel="noopener noreferrer">
              CodeVibing
            </a>{" "}
            ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}

function ConsumerLanding() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      {/* Doodle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/vibecode-light-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Hero card */}
        <div className="text-center mb-8 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-8 py-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
            Learn Vibe Coding
          </h1>
          <p className="mt-3 text-lg font-medium text-stone-500 max-w-md mx-auto leading-relaxed">
            A structured curriculum for building with AI — from first conversation to shipped product.
          </p>
          <p className="mt-2 text-sm text-stone-400">
            No prerequisites. No gatekeeping. Just start where you are.
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link href="/skill-map">
            <div className="py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-extrabold text-base text-center shadow-xl shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-600 transition-all duration-150 border-2 border-white/20">
              Skill Map
            </div>
          </Link>
          <Link href="/quiz">
            <div className="py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-base text-center shadow-xl shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-600 transition-all duration-150 border-2 border-white/20">
              Take a Quiz
            </div>
          </Link>
        </div>

        {/* Entry points */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-6 py-5 mb-3">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider text-center">
              Where are you starting from?
            </h2>
          </div>
          <div className="space-y-3">
            {entryPoints.map((entry) => {
              const colors = ENTRY_COLORS[entry.color];
              return (
                <Link key={entry.href} href={entry.href}>
                  <div className={`w-full rounded-2xl border-2 p-5 flex items-center gap-4 bg-white border-stone-200 shadow-sm hover:shadow-lg hover:${colors.border} hover:${colors.shadow} transition-all duration-200`}>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{entry.tag}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-extrabold leading-tight text-stone-900">
                        {entry.title}
                      </p>
                      <p className="text-sm font-medium mt-0.5 text-stone-500">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Convergence diagram */}
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6 text-center mb-8">
          <p className="text-sm text-stone-500 font-medium mb-4">
            Every entry point converges at the same core curriculum.
          </p>
          <div className="font-mono text-xs text-stone-400 leading-relaxed whitespace-pre">
{`  M0-A ──┐
  M0-B ──┤── M1 → M2 → M3 → M4 ──┬── M5
  M0-C ──┤                         ├── M6
  M0-D ──┘                         └── M7`}
          </div>
          <p className="text-xs text-stone-400 mt-4">
            Choose your entry. Everyone converges. Then specialize.
          </p>
        </div>

        {/* Core modules */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-6 py-5 mb-3">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider text-center">
              The Core
            </h2>
          </div>
          <div className="space-y-3">
            {coreModules.map((mod) => (
              <Link key={mod.href} href={mod.href}>
                <div className="w-full rounded-2xl border-2 border-stone-200 bg-white p-5 flex items-center gap-4 shadow-sm hover:shadow-lg hover:border-stone-300 transition-all duration-200">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${mod.color} flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{mod.tag}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-extrabold leading-tight text-stone-900">
                      {mod.title}
                    </p>
                    <p className="text-sm font-medium mt-0.5 text-stone-500">
                      {mod.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-stone-400">
            Built by{" "}
            <a href="https://dereklomas.me" className="underline hover:text-stone-600" target="_blank" rel="noopener noreferrer">
              Derek Lomas
            </a>
            . Part of the{" "}
            <a href="https://codevibing.com" className="underline hover:text-stone-600" target="_blank" rel="noopener noreferrer">
              CodeVibing
            </a>{" "}
            ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}
