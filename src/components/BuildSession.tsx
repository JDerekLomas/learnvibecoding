"use client";

import { useState, useEffect } from "react";
import { getData, saveBuildSession, type LearnerData } from "@/lib/progress";

interface BuildSessionProps {
  id: string;
  module: string;
  prompt: string;
  intentionQuestions?: string[];
  debriefQuestions?: string[];
  suggestedDuration?: number;
}

type Phase = "intention" | "building" | "debrief" | "done";

const DEFAULT_INTENTION = [
  "What are you going to build?",
  "What does \"done\" look like?",
];
const DEFAULT_DEBRIEF = [
  "What actually happened?",
  "What would you do differently?",
];

function PhaseIndicator({ current }: { current: Phase }) {
  const phases: { key: Phase; label: string }[] = [
    { key: "intention", label: "Plan" },
    { key: "building", label: "Build" },
    { key: "debrief", label: "Reflect" },
  ];
  const order = ["intention", "building", "debrief", "done"];
  const currentIdx = order.indexOf(current);

  return (
    <div className="flex items-center gap-1 mb-4">
      {phases.map((p, i) => {
        const idx = order.indexOf(p.key);
        const isActive = idx === currentIdx;
        const isDone = idx < currentIdx;
        return (
          <div key={p.key} className="flex items-center gap-1">
            {i > 0 && (
              <div className={`h-px w-6 ${isDone ? "bg-emerald-400" : "bg-zinc-200 dark:bg-zinc-700"}`} />
            )}
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${
                isActive ? "bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-800" :
                isDone ? "bg-emerald-400" :
                "bg-zinc-300 dark:bg-zinc-600"
              }`} />
              <span className={`text-[10px] font-medium uppercase tracking-wider ${
                isActive ? "text-emerald-600 dark:text-emerald-400" :
                isDone ? "text-emerald-500/60 dark:text-emerald-500/50" :
                "text-zinc-400 dark:text-zinc-500"
              }`}>
                {p.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BuildSession({
  id,
  module,
  prompt,
  intentionQuestions,
  debriefQuestions,
  suggestedDuration,
}: BuildSessionProps) {
  const iQuestions = intentionQuestions ?? DEFAULT_INTENTION;
  const dQuestions = debriefQuestions ?? DEFAULT_DEBRIEF;

  const [phase, setPhase] = useState<Phase>("intention");
  const [intention, setIntention] = useState("");
  const [successCriteria, setSuccessCriteria] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [outcome, setOutcome] = useState<"achieved" | "partially" | "no" | "stuck" | "">("");
  const [debrief, setDebrief] = useState("");
  const [previousSessions, setPreviousSessions] = useState<LearnerData["buildSessions"]>([]);

  useEffect(() => {
    const d = getData();
    const sessions = d.buildSessions.filter((s) => s.id === id);
    setPreviousSessions(sessions);
    const incomplete = sessions.find((s) => !s.completedAt);
    if (incomplete) {
      setIntention(incomplete.intention);
      setSuccessCriteria(incomplete.successCriteria);
      setStartedAt(incomplete.startedAt);
      setPhase("building");
    } else if (sessions.length > 0) {
      setPhase("done");
    }
  }, [id]);

  function handleStartBuilding() {
    if (!intention.trim()) return;
    const now = new Date().toISOString();
    setStartedAt(now);
    saveBuildSession({
      id,
      module,
      intention: intention.trim(),
      successCriteria: successCriteria.trim(),
      startedAt: now,
      date: new Date().toISOString().slice(0, 10),
    });
    setPhase("building");
  }

  function handleDone(stuck: boolean) {
    if (stuck) setOutcome("stuck");
    setPhase("debrief");
  }

  function handleSaveDebrief() {
    if (!outcome) return;
    const now = new Date().toISOString();
    saveBuildSession({
      id,
      module,
      intention: intention.trim(),
      successCriteria: successCriteria.trim(),
      startedAt,
      completedAt: now,
      outcome: outcome || undefined,
      debrief: debrief.trim() || undefined,
      date: new Date().toISOString().slice(0, 10),
    });
    const d = getData();
    setPreviousSessions(d.buildSessions.filter((s) => s.id === id));
    setPhase("done");
  }

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  return (
    <div className="my-8 rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-gradient-to-b from-emerald-50/30 to-transparent dark:from-emerald-950/10 dark:to-transparent overflow-hidden">
      {/* Header with icon */}
      <div className="px-5 pt-4 pb-3 flex items-start gap-3">
        <div className="mt-0.5 h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Build Session
          </h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">{prompt}</p>
        </div>
      </div>

      <div className="px-5 pb-5">
        {phase !== "done" && <PhaseIndicator current={phase} />}

        {/* Phase 1: Intention */}
        {phase === "intention" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1.5">
                  {iQuestions[0]}
                </label>
                <input
                  type="text"
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  placeholder="Describe what you'll build..."
                  className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 focus:bg-white dark:focus:bg-zinc-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1.5">
                  {iQuestions[1] ?? "What does \"done\" look like?"}
                </label>
                <input
                  type="text"
                  value={successCriteria}
                  onChange={(e) => setSuccessCriteria(e.target.value)}
                  placeholder="How will you know you're done?"
                  className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 focus:bg-white dark:focus:bg-zinc-800"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              {suggestedDuration && (
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  ~{suggestedDuration} min
                </p>
              )}
              <button
                onClick={handleStartBuilding}
                disabled={!intention.trim()}
                className="ml-auto px-5 py-2 text-sm font-medium rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Start Building &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Phase 2: Building */}
        {phase === "building" && (
          <div className="space-y-4">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 p-6 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
              </div>
              <p className="text-base font-medium text-zinc-800 dark:text-zinc-200">
                You&apos;re building.
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Come back when you&apos;re done (or stuck).
              </p>
              {startedAt && (
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3 font-mono">
                  Started {formatTime(startedAt)}
                </p>
              )}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleDone(false)}
                className="px-5 py-2 text-sm font-medium rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-400 transition-colors shadow-sm"
              >
                I&apos;m Done
              </button>
              <button
                onClick={() => handleDone(true)}
                className="px-5 py-2 text-sm font-medium rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                I Got Stuck
              </button>
            </div>
          </div>
        )}

        {/* Phase 3: Debrief */}
        {phase === "debrief" && (
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/30 px-4 py-3">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">You planned to build:</p>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{intention}</p>
              {successCriteria && (
                <>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 mt-2">&quot;Done&quot; looked like:</p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{successCriteria}</p>
                </>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-2">
                Did you achieve it?
              </label>
              <div className="flex gap-2">
                {(["achieved", "partially", "no"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setOutcome(opt)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-lg border-2 transition-all ${
                      outcome === opt
                        ? opt === "achieved"
                          ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
                          : opt === "partially"
                          ? "border-amber-400 bg-amber-50 dark:border-amber-500 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300"
                          : "border-rose-400 bg-rose-50 dark:border-rose-500 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300"
                        : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300"
                    }`}
                  >
                    {opt === "achieved" ? "Yes" : opt === "partially" ? "Partially" : "No"}
                  </button>
                ))}
                {outcome === "stuck" && (
                  <span className="px-4 py-1.5 text-xs font-medium rounded-lg border-2 border-amber-400 bg-amber-50 dark:border-amber-500 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300">
                    Got stuck
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1.5">
                {dQuestions[0]}
              </label>
              <textarea
                value={debrief}
                onChange={(e) => setDebrief(e.target.value)}
                rows={3}
                placeholder="What happened during the build?"
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 focus:bg-white dark:focus:bg-zinc-900 resize-y transition-colors"
              />
            </div>

            <button
              onClick={handleSaveDebrief}
              disabled={!outcome}
              className="px-5 py-2 text-sm font-medium rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Save &amp; Continue
            </button>
          </div>
        )}

        {/* Phase 4: Done */}
        {phase === "done" && previousSessions.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Previous sessions
            </p>
            {previousSessions.filter((s) => s.completedAt).map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-zinc-200 dark:border-zinc-700 p-3"
              >
                <span className={`mt-0.5 h-2.5 w-2.5 rounded-full shrink-0 ${
                  s.outcome === "achieved" ? "bg-emerald-400" :
                  s.outcome === "partially" ? "bg-amber-400" :
                  "bg-zinc-400"
                }`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                    {s.intention}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {s.outcome === "achieved" ? "Completed" : s.outcome === "partially" ? "Partially done" : s.outcome === "stuck" ? "Got stuck" : "Didn't finish"}
                    {" "}&middot; {s.date}
                  </p>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setIntention("");
                setSuccessCriteria("");
                setOutcome("");
                setDebrief("");
                setPhase("intention");
              }}
              className="px-4 py-1.5 text-xs font-medium rounded-lg border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
            >
              + New session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
