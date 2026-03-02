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
    // Resume incomplete session
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
    if (stuck) {
      setOutcome("stuck");
    }
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
    <div className="my-6 rounded-lg border border-emerald-200 dark:border-emerald-800/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-xs text-emerald-600 dark:text-emerald-400">
          &gt;
        </span>
        <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          Build session
        </h4>
      </div>

      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">{prompt}</p>

      {/* Phase 1: Intention */}
      {phase === "intention" && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Before you open your AI tool:
          </p>
          <div>
            <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              {iQuestions[0]}
            </label>
            <input
              type="text"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              {iQuestions[1] ?? "What does \"done\" look like?"}
            </label>
            <input
              type="text"
              value={successCriteria}
              onChange={(e) => setSuccessCriteria(e.target.value)}
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
            />
          </div>
          {suggestedDuration && (
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Suggested time: ~{suggestedDuration} minutes
            </p>
          )}
          <button
            onClick={handleStartBuilding}
            disabled={!intention.trim()}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Start Building &rarr;
          </button>
        </div>
      )}

      {/* Phase 2: Building */}
      {phase === "building" && (
        <div className="space-y-3">
          <div className="rounded-md bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/30 p-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              You&apos;re building. Come back when you&apos;re done (or stuck).
            </p>
            {startedAt && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Started: {formatTime(startedAt)}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDone(false)}
              className="px-4 py-1.5 text-xs font-medium rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
            >
              I&apos;m Done
            </button>
            <button
              onClick={() => handleDone(true)}
              className="px-4 py-1.5 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              I Got Stuck
            </button>
          </div>
        </div>
      )}

      {/* Phase 3: Debrief */}
      {phase === "debrief" && (
        <div className="space-y-3">
          <div className="rounded-md bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-800/30 p-3 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              You said you were going to build: <strong className="text-zinc-800 dark:text-zinc-200">{intention}</strong>
            </p>
            {successCriteria && (
              <p className="mt-1">
                &quot;Done&quot; looked like: <strong className="text-zinc-800 dark:text-zinc-200">{successCriteria}</strong>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              Did you achieve it?
            </label>
            <div className="flex gap-2">
              {(["achieved", "partially", "no"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setOutcome(opt)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    outcome === opt
                      ? "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                  }`}
                >
                  {opt === "achieved" ? "Yes" : opt === "partially" ? "Partially" : "No"}
                </button>
              ))}
              {outcome === "stuck" && (
                <span className="px-3 py-1 text-xs rounded-md border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300">
                  Got stuck
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              {dQuestions[0]}
            </label>
            <textarea
              value={debrief}
              onChange={(e) => setDebrief(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 resize-y"
            />
          </div>

          <button
            onClick={handleSaveDebrief}
            disabled={!outcome}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Save &amp; Continue
          </button>
        </div>
      )}

      {/* Phase 4: Done */}
      {phase === "done" && previousSessions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Your build sessions:
          </p>
          {previousSessions.filter((s) => s.completedAt).map((s, i) => (
            <div
              key={i}
              className="rounded-md border border-zinc-200 dark:border-zinc-700 p-2 text-xs text-zinc-600 dark:text-zinc-400"
            >
              <p>
                <strong className="text-zinc-800 dark:text-zinc-200">{s.intention}</strong>
                <span className="ml-2 text-zinc-400">{s.date}</span>
              </p>
              <p className="mt-0.5">
                Outcome: {s.outcome === "achieved" ? "Done" : s.outcome === "partially" ? "Partially" : s.outcome === "stuck" ? "Got stuck" : "Didn't finish"}
              </p>
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
            className="px-3 py-1 text-xs font-medium rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
          >
            Start another session
          </button>
        </div>
      )}
    </div>
  );
}
