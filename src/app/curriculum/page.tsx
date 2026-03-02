"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getData, type LearnerData } from "@/lib/progress";

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

function MyJourney({ data }: { data: LearnerData }) {
  const reflectionCount = Object.keys(data.reflections).length;
  const projectCount = data.projects.length;
  const assessmentIds = [...new Set(data.assessments.map((a) => a.id))];
  const hasData = reflectionCount > 0 || projectCount > 0 || assessmentIds.length > 0;

  if (!hasData) return null;

  return (
    <div className="mb-12">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
        My Journey
      </h2>
      <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-4">
        Your learning trajectory so far.
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        {reflectionCount > 0 && (
          <div className="rounded-lg border border-violet-200 dark:border-violet-800/50 px-4 py-3">
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">{reflectionCount}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {reflectionCount === 1 ? "reflection" : "reflections"} written
            </p>
          </div>
        )}
        {projectCount > 0 && (
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-800/50 px-4 py-3">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{projectCount}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {projectCount === 1 ? "project" : "projects"} captured
            </p>
          </div>
        )}
        {assessmentIds.length > 0 && (
          <div className="rounded-lg border border-amber-200 dark:border-amber-800/50 px-4 py-3">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{assessmentIds.length}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {assessmentIds.length === 1 ? "self-assessment" : "self-assessments"} taken
            </p>
          </div>
        )}
      </div>

      {projectCount > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Projects</p>
          <ul className="space-y-1">
            {data.projects.map((p, i) => (
              <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 shrink-0">-</span>
                <span>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 decoration-zinc-300 dark:decoration-zinc-600 hover:decoration-zinc-500"
                    >
                      {p.description}
                    </a>
                  ) : (
                    p.description
                  )}
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-2">{p.date}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

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

      {data && <MyJourney data={data} />}

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
