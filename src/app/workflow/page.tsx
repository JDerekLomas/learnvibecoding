"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getData, onProgressChange } from "@/lib/progress";
import { MODULES } from "@/data/course-modules";

const mod = MODULES.find((m) => m.slug === "/workflow")!;
const chapters = mod.chapters!;

export default function WorkflowHub() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(getData().visited);
    return onProgressChange(() => setVisited(getData().visited));
  }, []);

  const completedCount = chapters.filter((ch) =>
    visited.includes(`/workflow/${ch.slug}`)
  ).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-stone-900 mb-1">
          The Vibe Coding Workflow
        </h1>
        <p className="text-sm font-medium text-stone-500">
          Vision, build, deploy, refine, delegate, resume — the rhythm of
          building with AI.
        </p>
        {completedCount > 0 && (
          <p className="text-xs font-bold text-emerald-600 mt-2">
            {completedCount} of {chapters.length} chapters complete
          </p>
        )}
      </div>

      <div className="space-y-3">
        {chapters.map((ch, i) => {
          const done = visited.includes(`/workflow/${ch.slug}`);
          return (
            <Link
              key={ch.slug}
              href={`/workflow/${ch.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl border-[2.5px] border-stone-900 bg-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-150 no-underline group"
            >
              <span className="shrink-0 h-8 w-8 rounded-lg border-[2px] border-stone-900 bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-stone-900 group-hover:text-blue-700 transition-colors">
                  {ch.title}
                </p>
              </div>
              {done ? (
                <span className="shrink-0 h-7 w-7 rounded-lg border-[2px] border-stone-900 bg-emerald-400 text-white flex items-center justify-center">
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
                <svg
                  className="shrink-0 text-stone-300"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
