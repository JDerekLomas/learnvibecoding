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

const ENTRY_COLORS: Record<string, { iconBg: string; hoverBorder: string; hoverShadow: string }> = {
  violet: { iconBg: "bg-violet-500", hoverBorder: "hover:border-violet-400", hoverShadow: "hover:shadow-violet-200/60" },
  amber: { iconBg: "bg-amber-500", hoverBorder: "hover:border-amber-400", hoverShadow: "hover:shadow-amber-200/60" },
  blue: { iconBg: "bg-blue-500", hoverBorder: "hover:border-blue-400", hoverShadow: "hover:shadow-blue-200/60" },
  emerald: { iconBg: "bg-emerald-500", hoverBorder: "hover:border-emerald-400", hoverShadow: "hover:shadow-emerald-200/60" },
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
            Get Your Team Building with AI
          </h1>
          <p className="mt-3 text-lg font-medium text-stone-500 max-w-md mx-auto">
            A guided 5-step journey from discovery to deployment. Create a team, share the link, track everyone&apos;s progress.
          </p>
        </div>

        {/* Primary CTA */}
        <Link href="/teams/create">
          <div className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-extrabold text-lg text-center shadow-xl shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-600 transition-all duration-150 border-2 border-white/20 mb-3">
            Create a Team
          </div>
        </Link>

        {/* Secondary CTA */}
        <Link href="/journey">
          <div className="w-full py-3.5 rounded-2xl border-2 border-stone-300 text-stone-700 font-semibold text-base text-center hover:bg-white hover:border-stone-400 transition-all duration-150 mb-8">
            I&apos;m here to learn on my own
          </div>
        </Link>

        {/* How it works */}
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6 mb-8">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            How it works
          </h3>
          <div className="space-y-4">
            {[
              { num: 1, title: "Create a team", desc: "Pick a name, get an invite link in seconds." },
              { num: 2, title: "Share the link", desc: "Team members join and start a guided 5-step journey." },
              { num: 3, title: "Track progress", desc: "See who's discovering, learning, and shipping on your dashboard." },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-extrabold">
                  {item.num}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-stone-900">{item.title}</p>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The 5 steps */}
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6 mb-8">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            The 5-Step Journey
          </h3>
          <div className="space-y-3">
            {[
              { label: "Discover", desc: "AI-powered conversation to find what excites you", color: "bg-amber-500" },
              { label: "Assess", desc: "AI-powered quiz chatbot that adapts to your level", color: "bg-violet-500" },
              { label: "Learn", desc: "Structured modules on vibe coding fundamentals", color: "bg-blue-500" },
              { label: "Practice", desc: "Targeted practice to reinforce key concepts", color: "bg-emerald-500" },
              { label: "Share", desc: "Post your project to the community", color: "bg-rose-500" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${step.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {i + 1}
                </div>
                <div>
                  <span className="text-sm font-bold text-stone-900">{step.label}</span>
                  <span className="text-sm text-stone-500"> — {step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                  <div className={`w-full rounded-2xl border-2 p-5 flex items-center gap-4 bg-white border-stone-200 shadow-sm hover:shadow-lg ${colors.hoverBorder} ${colors.hoverShadow} transition-all duration-200`}>
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
          <p className="text-sm text-stone-500 font-medium mb-5">
            Every entry point converges at the same core curriculum.
          </p>

          {/* Visual flow diagram */}
          <div className="flex items-center justify-center gap-3">
            {/* Entry nodes */}
            <div className="flex flex-col gap-1.5">
              {[
                { tag: "M0-A", color: "bg-violet-500" },
                { tag: "M0-B", color: "bg-amber-500" },
                { tag: "M0-C", color: "bg-blue-500" },
                { tag: "M0-D", color: "bg-emerald-500" },
              ].map((e) => (
                <div key={e.tag} className={`${e.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-lg`}>
                  {e.tag}
                </div>
              ))}
            </div>

            {/* Converge arrows */}
            <div className="flex flex-col items-center justify-center">
              <svg width="24" height="80" viewBox="0 0 24 80" className="text-stone-300">
                <path d="M4 4 L20 40" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M4 27 L20 40" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M4 53 L20 40" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M4 76 L20 40" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Core nodes */}
            <div className="flex items-center gap-1.5">
              {[
                { tag: "M1", color: "bg-amber-500" },
                { tag: "M2", color: "bg-blue-500" },
                { tag: "M3", color: "bg-emerald-500" },
                { tag: "M4", color: "bg-red-500" },
              ].map((m, i) => (
                <div key={m.tag} className="flex items-center gap-1.5">
                  <div className={`${m.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-lg`}>
                    {m.tag}
                  </div>
                  {i < 3 && (
                    <svg width="12" height="12" viewBox="0 0 12 12" className="text-stone-300">
                      <path d="M2 6 L10 6" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M7 3 L10 6 L7 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {/* Fan-out arrows */}
            <div className="flex flex-col items-center justify-center">
              <svg width="24" height="60" viewBox="0 0 24 60" className="text-stone-300">
                <path d="M4 30 L20 10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M4 30 L20 30" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M4 30 L20 50" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Advanced nodes */}
            <div className="flex flex-col gap-1.5">
              {[
                { tag: "M5", color: "bg-indigo-500" },
                { tag: "M6", color: "bg-teal-500" },
                { tag: "M7", color: "bg-purple-500" },
              ].map((m) => (
                <div key={m.tag} className={`${m.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-lg`}>
                  {m.tag}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-stone-400 mt-5 font-medium">
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
