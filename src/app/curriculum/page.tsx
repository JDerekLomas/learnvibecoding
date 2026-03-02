"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getData, type LearnerData } from "@/lib/progress";
import TrajectoryView from "@/components/TrajectoryView";

const modules = [
  {
    section: "Entry Points",
    description: "Choose the one that matches where you are right now.",
    items: [
      { href: "/landscape", tag: "M0-A", title: "The AI Landscape", status: "available" as const },
      { href: "/first-build", tag: "M0-B", title: "Your First Build", status: "available" as const },
      { href: "/for-developers", tag: "M0-C", title: "For Developers", status: "available" as const },
      { href: "/level-up", tag: "M0-D", title: "Level Up", status: "available" as const },
    ],
  },
  {
    section: "Shared Core",
    description: "Everyone takes these, in order.",
    items: [
      { href: "/know-yourself", tag: "M1", title: "Know Yourself, Know Your Tools", status: "available" as const },
      { href: "/workflow", tag: "M2", title: "The Vibe Coding Workflow", status: "available" as const },
      { href: "/build", tag: "M3", title: "Build Something Real", status: "available" as const },
      { href: "/debugging", tag: "M4", title: "When Things Break", status: "available" as const },
    ],
  },
  {
    section: "Advanced",
    description: "Go deeper once you've built a few things.",
    items: [
      { href: "/sessions", tag: "M5", title: "Mastering Sessions", status: "coming" as const },
      { href: "/shipping", tag: "M6", title: "Portfolio & Shipping", status: "coming" as const },
      { href: "/craft", tag: "M7", title: "The Craft", status: "coming" as const },
    ],
  },
];

export default function CurriculumPage() {
  const [data, setData] = useState<LearnerData | null>(null);

  useEffect(() => {
    setData(getData());
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
        Curriculum
      </h1>
      <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-12">
        The full learning path, from entry point to craft mastery.
      </p>

      {data && <TrajectoryView data={data} />}

      {modules.map((section) => (
        <div key={section.section} className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
            {section.section}
          </h2>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-4">
            {section.description}
          </p>
          <div className="space-y-2">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded px-1.5 py-0.5 shrink-0">
                  {item.tag}
                </span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  {item.title}
                </span>
                {item.status === "coming" && (
                  <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                    Coming soon
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
