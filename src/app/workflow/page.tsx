"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getData, onProgressChange } from "@/lib/progress";
import { chapters } from "@/data/workflow-chapters";

export default function WorkflowHub() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(getData().visited);
    return onProgressChange(() => setVisited(getData().visited));
  }, []);

  const completedCount = chapters.filter((ch) =>
    visited.includes(`workflow-${ch.slug}`)
  ).length;

  return (
    <div>
      <div className="rounded-xl border border-blue-200 dark:border-blue-800/50 bg-gradient-to-b from-blue-50/40 to-transparent dark:from-blue-950/10 dark:to-transparent px-6 py-5 mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          The Vibe Coding Workflow
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Vision, build, deploy, refine, delegate, resume — the rhythm of
          building with AI.
        </p>
        {completedCount > 0 && (
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">
            {completedCount} of {chapters.length} sections complete
          </p>
        )}
      </div>

      <div className="space-y-2.5">
        {chapters.map((ch, i) => {
          const done = visited.includes(`workflow-${ch.slug}`);
          return (
            <Link
              key={ch.slug}
              href={`/workflow/${ch.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-colors no-underline group"
            >
              <span className="shrink-0 h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  {ch.title}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
                  {ch.subtitle}
                </p>
              </div>
              {done ? (
                <span className="shrink-0 h-6 w-6 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              ) : (
                <span className="shrink-0 h-6 w-6 rounded-md border-2 border-zinc-200 dark:border-zinc-600" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
