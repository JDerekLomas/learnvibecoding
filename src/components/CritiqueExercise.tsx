"use client";

import { useState, useEffect } from "react";
import { getData, saveCritique } from "@/lib/progress";

interface CritiqueItem {
  label: string;
  content: string;
  imageUrl?: string;
}

interface CritiqueExerciseProps {
  id: string;
  prompt: string;
  items: CritiqueItem[];
  criteria?: string[];
  type: "pick-best" | "rate-each" | "find-problems";
  expertAnalysis: string;
}

export default function CritiqueExercise({
  id,
  prompt,
  items,
  criteria,
  type,
  expertAnalysis,
}: CritiqueExerciseProps) {
  const [choice, setChoice] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const d = getData();
    const prev = d.critiques.find((c) => c.id === id);
    if (prev) {
      setChoice(prev.choice);
      setReasoning(prev.reasoning);
      setRevealed(true);
    }
  }, [id]);

  function handleReveal() {
    if (!choice || !reasoning.trim()) return;
    saveCritique({ id, choice, reasoning: reasoning.trim() });
    setRevealed(true);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="my-8 relative">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 rounded-t-lg" />

      <div className="border border-t-0 border-blue-200 dark:border-blue-800/50 rounded-b-lg bg-white dark:bg-zinc-900 overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 bg-blue-50/50 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-800/30">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Critique Exercise
            </span>
          </div>
          <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium">{prompt}</p>
        </div>

        <div className="p-5">
          {criteria && criteria.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {criteria.map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Comparison cards */}
          <div className="grid gap-4 sm:grid-cols-2 mb-5 relative">
            {items.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => !revealed && setChoice(item.label)}
                className={`group text-left rounded-lg border-2 transition-all ${
                  choice === item.label
                    ? "border-blue-400 dark:border-blue-500 shadow-md shadow-blue-100 dark:shadow-blue-950/50 scale-[1.02]"
                    : "border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm"
                } ${revealed ? "cursor-default" : "cursor-pointer"}`}
              >
                {/* Card label badge */}
                <div className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-b ${
                  choice === item.label
                    ? "bg-blue-500 dark:bg-blue-600 text-white border-blue-400 dark:border-blue-500"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                }`}>
                  {item.label}
                  {choice === item.label && (
                    <span className="ml-2 text-blue-100">&#10003;</span>
                  )}
                </div>
                {item.imageUrl && (
                  <div className="border-b border-zinc-200 dark:border-zinc-700">
                    <img
                      src={item.imageUrl}
                      alt={item.label}
                      className="w-full"
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </button>
            ))}

            {/* VS badge between items on desktop */}
            {items.length === 2 && (
              <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <span className="h-8 w-8 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800 text-[10px] font-bold flex items-center justify-center shadow-lg">
                  VS
                </span>
              </div>
            )}
          </div>

          {!revealed && (
            <>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                placeholder={
                  type === "find-problems"
                    ? "What problems do you see? Why?"
                    : "Why did you choose this one? What makes it better?"
                }
                rows={3}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 focus:bg-white dark:focus:bg-zinc-900 resize-y mb-4 transition-colors"
              />
              <button
                onClick={handleReveal}
                disabled={!choice || !reasoning.trim()}
                className="px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                See Expert Analysis
              </button>
            </>
          )}

          {revealed && (
            <div className="relative mt-1">
              <div className="absolute -top-3 left-4 px-2 bg-white dark:bg-zinc-900">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Expert Analysis
                </span>
              </div>
              <div className="rounded-lg border border-blue-200 dark:border-blue-800/40 p-4 pt-5 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                  {expertAnalysis}
                </p>
              </div>
              {saved && (
                <p className="text-xs text-blue-500 mt-2">Response saved.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
