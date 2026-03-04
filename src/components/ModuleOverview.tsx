"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getData, onProgressChange } from "@/lib/progress";
import { MODULES, type Chapter } from "@/data/course-modules";

interface ModuleOverviewProps {
  moduleSlug: string;
}

export default function ModuleOverview({ moduleSlug }: ModuleOverviewProps) {
  const [visited, setVisited] = useState<string[]>([]);

  const mod = MODULES.find((m) => m.slug === `/${moduleSlug}`);
  const chapters = mod?.chapters ?? [];

  useEffect(() => {
    setVisited(getData().visited);
    return onProgressChange(() => setVisited(getData().visited));
  }, []);

  const completedCount = chapters.filter((ch) =>
    visited.includes(`/${moduleSlug}/${ch.slug}`)
  ).length;

  // Derive color scheme from module color class
  const colorMap: Record<string, { border: string; bg: string; text: string; num: string; numText: string }> = {
    "bg-amber-500": { border: "border-amber-200 dark:border-amber-800/50", bg: "from-amber-50/40 dark:from-amber-950/10", text: "text-amber-600 dark:text-amber-400", num: "bg-amber-100 dark:bg-amber-900/50", numText: "text-amber-600 dark:text-amber-400" },
    "bg-blue-500": { border: "border-blue-200 dark:border-blue-800/50", bg: "from-blue-50/40 dark:from-blue-950/10", text: "text-blue-600 dark:text-blue-400", num: "bg-blue-100 dark:bg-blue-900/50", numText: "text-blue-600 dark:text-blue-400" },
    "bg-emerald-500": { border: "border-emerald-200 dark:border-emerald-800/50", bg: "from-emerald-50/40 dark:from-emerald-950/10", text: "text-emerald-600 dark:text-emerald-400", num: "bg-emerald-100 dark:bg-emerald-900/50", numText: "text-emerald-600 dark:text-emerald-400" },
    "bg-red-500": { border: "border-red-200 dark:border-red-800/50", bg: "from-red-50/40 dark:from-red-950/10", text: "text-red-600 dark:text-red-400", num: "bg-red-100 dark:bg-red-900/50", numText: "text-red-600 dark:text-red-400" },
    "bg-indigo-500": { border: "border-indigo-200 dark:border-indigo-800/50", bg: "from-indigo-50/40 dark:from-indigo-950/10", text: "text-indigo-600 dark:text-indigo-400", num: "bg-indigo-100 dark:bg-indigo-900/50", numText: "text-indigo-600 dark:text-indigo-400" },
    "bg-teal-500": { border: "border-teal-200 dark:border-teal-800/50", bg: "from-teal-50/40 dark:from-teal-950/10", text: "text-teal-600 dark:text-teal-400", num: "bg-teal-100 dark:bg-teal-900/50", numText: "text-teal-600 dark:text-teal-400" },
    "bg-purple-500": { border: "border-purple-200 dark:border-purple-800/50", bg: "from-purple-50/40 dark:from-purple-950/10", text: "text-purple-600 dark:text-purple-400", num: "bg-purple-100 dark:bg-purple-900/50", numText: "text-purple-600 dark:text-purple-400" },
  };

  const colors = colorMap[mod?.color ?? "bg-blue-500"] ?? colorMap["bg-blue-500"];

  if (!mod) return null;

  return (
    <div>
      <div className={`rounded-xl border ${colors.border} bg-gradient-to-b ${colors.bg} to-transparent dark:to-transparent px-6 py-5 mb-6`}>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          {mod.title}
        </h1>
        {completedCount > 0 && (
          <p className={`text-xs ${colors.text} mt-2 font-medium`}>
            {completedCount} of {chapters.length} chapters complete
          </p>
        )}
      </div>

      <div className="space-y-2.5">
        {chapters.map((ch, i) => {
          const done = visited.includes(`/${moduleSlug}/${ch.slug}`);
          return (
            <Link
              key={ch.slug}
              href={`/${moduleSlug}/${ch.slug}`}
              className={`flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 hover:${colors.border.split(" ")[0]} dark:hover:border-zinc-600 transition-colors no-underline group`}
            >
              <span className={`shrink-0 h-8 w-8 rounded-lg ${colors.num} ${colors.numText} flex items-center justify-center text-sm font-bold`}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                  {ch.title}
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
