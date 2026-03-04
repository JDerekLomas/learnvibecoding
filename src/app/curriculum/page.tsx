"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getData, hasExerciseData, onProgressChange, type LearnerData } from "@/lib/progress";
import { getModulesBySection, SEQUENTIAL_PATH } from "@/data/course-modules";
import TrajectoryView from "@/components/TrajectoryView";

export default function CurriculumPage() {
  const [data, setData] = useState<LearnerData | null>(null);
  const sections = getModulesBySection();

  useEffect(() => {
    function refresh() {
      setData(getData());
    }
    refresh();
    return onProgressChange(refresh);
  }, []);

  // Count completed sequential modules (core + advanced)
  const completedCount = data
    ? SEQUENTIAL_PATH.filter(
        (m) => hasExerciseData(m.slug) || data.visited.includes(m.slug)
      ).length
    : 0;

  function getModuleStatus(slug: string): "done" | "visited" | "none" {
    if (!data) return "none";
    if (hasExerciseData(slug)) return "done";
    if (data.visited.includes(slug)) return "visited";
    return "none";
  }

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
      <div className="mx-auto max-w-3xl px-6 py-16 relative z-10">
        <h1 className="text-3xl font-black tracking-tight text-stone-900 mb-2">
          Curriculum
        </h1>
        <p className="text-lg font-medium text-stone-500 mb-4">
          The full learning path, from entry point to craft mastery.
        </p>

        {/* Progress summary */}
        {data && (
          <div className="inline-flex items-center gap-3 rounded-lg border-[2.5px] border-stone-900 bg-white px-4 py-2 shadow-[3px_3px_0_#1c1917] mb-8">
            <div className="flex gap-1.5">
              {SEQUENTIAL_PATH.map((m) => {
                const status = getModuleStatus(m.slug);
                return (
                  <div
                    key={m.slug}
                    className={`h-3 w-3 rounded-sm border-[1.5px] border-stone-900 ${
                      status === "done"
                        ? "bg-emerald-400"
                        : status === "visited"
                        ? "bg-[#E07A5F]"
                        : "bg-white"
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-sm font-black text-stone-900">
              {completedCount} of {SEQUENTIAL_PATH.length} modules
            </span>
          </div>
        )}

        {data && <TrajectoryView data={data} />}

        {sections.map((section) => (
          <div key={section.title} className="mb-12">
            <h2 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-1">
              {section.title}
            </h2>
            <p className="text-sm font-medium text-stone-400 mb-4">
              {section.description}
            </p>
            <div className="space-y-2">
              {section.modules.map((mod) => {
                const status = getModuleStatus(mod.slug);
                return (
                  <Link
                    key={mod.slug}
                    href={mod.slug}
                    className="group flex items-center gap-3 rounded-lg border-[2.5px] border-stone-900 bg-white px-4 py-3 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                  >
                    <span
                      className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${mod.color} shrink-0`}
                    >
                      {mod.tag}
                    </span>
                    <span className="font-bold text-stone-900 flex-1">
                      {mod.title}
                    </span>
                    {status === "done" && (
                      <span className="h-5 w-5 rounded-md border-[1.5px] border-stone-900 bg-emerald-400 flex items-center justify-center shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    {status === "visited" && (
                      <span className="h-5 w-5 rounded-md border-[1.5px] border-stone-900 bg-[#E07A5F] flex items-center justify-center shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
