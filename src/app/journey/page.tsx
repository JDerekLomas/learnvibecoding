"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getTeamContext, reportProgress } from "@/lib/team";
import { getData } from "@/lib/progress";
import type { TeamContext, JourneyStep } from "@/lib/team";

interface StepDef {
  key: JourneyStep;
  number: number;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  color: string;
  iconBg: string;
}

const STEPS: StepDef[] = [
  {
    key: "discover",
    number: 1,
    title: "Discover What You Want to Build",
    description: "A short AI conversation to uncover what excites you and generate a starter prompt.",
    href: "/discover",
    color: "amber",
    iconBg: "bg-amber-500",
  },
  {
    key: "assess",
    number: 2,
    title: "Assess Your Skills",
    description: "AI-powered quiz chatbot that adapts to your level and generates custom questions.",
    href: "/quiz-chat",
    color: "violet",
    iconBg: "bg-violet-500",
  },
  {
    key: "learn",
    number: 3,
    title: "Learn the Fundamentals",
    description: "Work through structured modules on vibe coding workflow, debugging, and shipping.",
    href: "/curriculum",
    color: "blue",
    iconBg: "bg-blue-500",
  },
  {
    key: "practice",
    number: 4,
    title: "Practice with Quizzes",
    description: "Reinforce your knowledge with targeted practice across 11 topics.",
    href: "/quiz",
    color: "emerald",
    iconBg: "bg-emerald-500",
  },
  {
    key: "share",
    number: 5,
    title: "Share What You Built",
    description: "Post your project to the community. Celebrate the process, not just the product.",
    href: "https://codevibing.com",
    external: true,
    color: "rose",
    iconBg: "bg-rose-500",
  },
];

interface StepProgress {
  [key: string]: "started" | "completed" | null;
}

export default function JourneyPage() {
  const [teamCtx, setTeamCtx] = useState<TeamContext | null>(null);
  const [progress, setProgress] = useState<StepProgress>({});
  const [markingDone, setMarkingDone] = useState<string | null>(null);

  const fetchProgress = useCallback(async (ctx: TeamContext) => {
    try {
      const res = await fetch(`/api/teams/${ctx.teamSlug}/dashboard`);
      if (!res.ok) return;
      const data = await res.json();
      const me = data.members?.find(
        (m: { id: string }) => m.id === ctx.memberId
      );
      if (me?.progress) {
        const p: StepProgress = {};
        for (const [step, val] of Object.entries(me.progress)) {
          p[step] = val ? (val as { status: string }).status as "started" | "completed" : null;
        }
        setProgress(p);
      }
    } catch {
      // Best effort
    }
  }, []);

  /** Derive journey progress from localStorage for solo learners */
  const loadSoloProgress = useCallback(() => {
    const d = getData();
    const p: StepProgress = {};

    // Discover: completed if any discoveries saved
    if (d.discoveries.length > 0) p.discover = "completed";

    // Assess: completed if quizResults exist (any mode)
    if (d.quizResults.length >= 5) p.assess = "completed";
    else if (d.quizResults.length > 0) p.assess = "started";

    // Learn: completed if visited 3+ curriculum pages, started if any
    const curriculumVisits = d.visited.filter(
      (v) => v.startsWith("/know-yourself") || v.startsWith("/workflow") || v.startsWith("/build") || v.startsWith("/debugging") || v.startsWith("/curriculum")
    );
    if (curriculumVisits.length >= 3) p.learn = "completed";
    else if (curriculumVisits.length > 0) p.learn = "started";

    // Practice: completed if 10+ quiz results beyond assess, started if any
    if (d.quizResults.length >= 15) p.practice = "completed";
    else if (d.quizResults.length >= 5) p.practice = "started";

    // Share: check if any projects saved
    if (d.projects.length > 0) p.share = "completed";

    // Also check for manual completions in localStorage
    try {
      const manual = localStorage.getItem("lvc-journey-manual");
      if (manual) {
        const manualProgress = JSON.parse(manual) as StepProgress;
        for (const [step, status] of Object.entries(manualProgress)) {
          if (status === "completed") p[step] = "completed";
        }
      }
    } catch { /* ignore */ }

    setProgress(p);
  }, []);

  useEffect(() => {
    const ctx = getTeamContext();
    setTeamCtx(ctx);
    if (ctx) {
      fetchProgress(ctx);
    } else {
      loadSoloProgress();
    }
  }, [fetchProgress, loadSoloProgress]);

  async function handleMarkDone(step: JourneyStep) {
    setMarkingDone(step);
    if (teamCtx) {
      await reportProgress(step, "completed");
    } else {
      // Solo: persist manual completions to localStorage
      try {
        const raw = localStorage.getItem("lvc-journey-manual");
        const manual = raw ? JSON.parse(raw) : {};
        manual[step] = "completed";
        localStorage.setItem("lvc-journey-manual", JSON.stringify(manual));
      } catch { /* ignore */ }
    }
    setProgress((prev) => ({ ...prev, [step]: "completed" }));
    setMarkingDone(null);
  }

  async function handleStepClick(step: StepDef) {
    if (!progress[step.key]) {
      if (teamCtx) {
        reportProgress(step.key, "started");
      }
      setProgress((prev) => ({ ...prev, [step.key]: "started" }));
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/vibecode-light-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />
      <div className="mx-auto max-w-lg px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-stone-900">
            Your Learning Journey
          </h1>
          {teamCtx ? (
            <p className="text-sm text-stone-500 mt-2">
              Team: <span className="font-semibold">{teamCtx.teamName}</span> · {teamCtx.memberName}
            </p>
          ) : (
            <p className="text-sm text-stone-500 mt-2">
              Follow the steps at your own pace. No account needed.
            </p>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const status = progress[step.key];
            const isCompleted = status === "completed";
            const isStarted = status === "started";

            return (
              <div key={step.key} className="relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-6 top-[72px] w-0.5 h-4 bg-stone-200" />
                )}

                <div
                  className={`bg-white rounded-2xl border-2 p-5 transition-all duration-200 ${
                    isCompleted
                      ? "border-emerald-300 shadow-lg shadow-emerald-100/60"
                      : "border-stone-200 shadow-sm hover:shadow-lg hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step number / check */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCompleted ? "bg-emerald-500" : step.iconBg
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <span className="text-white text-lg font-bold">{step.number}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-extrabold text-stone-900">
                          {step.title}
                        </h3>
                        {isStarted && !isCompleted && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                            In progress
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-stone-500 mb-3">
                        {step.description}
                      </p>

                      <div className="flex items-center gap-2">
                        {step.external ? (
                          <a
                            href={step.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleStepClick(step)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                              isCompleted
                                ? "bg-stone-100 text-stone-500"
                                : "bg-stone-900 text-white hover:bg-stone-800"
                            }`}
                          >
                            {isCompleted ? "Done" : "Open"}
                          </a>
                        ) : (
                          <Link
                            href={step.href}
                            onClick={() => handleStepClick(step)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                              isCompleted
                                ? "bg-stone-100 text-stone-500"
                                : "bg-stone-900 text-white hover:bg-stone-800"
                            }`}
                          >
                            {isCompleted ? "Done" : isStarted ? "Continue" : "Start"}
                          </Link>
                        )}

                        {/* Manual "Mark done" for external steps or learn */}
                        {!isCompleted && (step.external || step.key === "learn") && (
                          <button
                            onClick={() => handleMarkDone(step.key)}
                            disabled={markingDone === step.key}
                            className="px-3 py-2 rounded-xl text-xs font-medium border border-stone-200 text-stone-500 hover:bg-stone-50 transition-colors disabled:opacity-50"
                          >
                            {markingDone === step.key ? "..." : "Mark done"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team dashboard link */}
        {teamCtx && (
          <div className="mt-8 text-center">
            <Link
              href={`/dashboard/${teamCtx.teamSlug}`}
              className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              View team dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
