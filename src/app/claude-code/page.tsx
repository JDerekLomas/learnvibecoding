import type { Metadata } from "next";
import ClaudeCodeRoadmap from "@/components/ClaudeCodeRoadmap";

export const metadata: Metadata = {
  title: "Claude Code Roadmap — Learn Vibe Coding",
  description: "38 essential Claude Code topics — from setup to advanced patterns, with mastery tracking",
};

export default function ClaudeCodePage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <main className="mx-auto max-w-3xl px-6 py-16 relative z-10">
        <h1 className="text-3xl font-black tracking-tight text-stone-900 mb-2">
          Claude Code Roadmap
        </h1>
        <p className="text-lg font-medium text-stone-500 mb-8">
          38 essential topics for mastering Claude Code — based on{" "}
          <a
            href="https://roadmap.sh/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            roadmap.sh/claude-code
          </a>
        </p>
        <ClaudeCodeRoadmap />
      </main>
    </div>
  );
}
