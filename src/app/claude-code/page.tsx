import type { Metadata } from "next";
import ClaudeCodeRoadmap from "@/components/ClaudeCodeRoadmap";

export const metadata: Metadata = {
  title: "Claude Code Roadmap — Learn Vibe Coding",
  description: "38 essential Claude Code topics — from setup to advanced patterns, with mastery tracking",
};

export default function ClaudeCodePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-extrabold text-stone-900 text-center mb-2">
        Claude Code Roadmap
      </h1>
      <p className="text-center text-stone-500 font-medium mb-8">
        38 essential topics for mastering Claude Code — based on{" "}
        <a
          href="https://roadmap.sh/claude-code"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-700 underline"
        >
          roadmap.sh/claude-code
        </a>
      </p>
      <ClaudeCodeRoadmap />
    </main>
  );
}
