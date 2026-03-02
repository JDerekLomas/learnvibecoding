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
    <div className="my-6 rounded-lg border border-blue-200 dark:border-blue-800/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-xs text-blue-600 dark:text-blue-400">
          &lt;&gt;
        </span>
        <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          Critique exercise
        </h4>
      </div>

      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">{prompt}</p>

      {criteria && criteria.length > 0 && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          Consider: {criteria.join(" / ")}
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => !revealed && setChoice(item.label)}
            className={`text-left rounded-md border p-3 transition-colors ${
              choice === item.label
                ? "border-blue-400 bg-blue-50/50 dark:border-blue-600 dark:bg-blue-950/30"
                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
            } ${revealed ? "cursor-default" : "cursor-pointer"}`}
          >
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
              {item.label}
            </p>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.label}
                className="w-full rounded mb-2 border border-zinc-200 dark:border-zinc-700"
              />
            )}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
              {item.content}
            </p>
          </button>
        ))}
      </div>

      {type === "pick-best" && choice && !revealed && (
        <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">
          Selected: {choice}
        </p>
      )}

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
            className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 resize-y mb-3"
          />
          <button
            onClick={handleReveal}
            disabled={!choice || !reasoning.trim()}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            See Analysis
          </button>
        </>
      )}

      {revealed && (
        <div className="mt-3 rounded-md border border-blue-100 dark:border-blue-800/30 bg-blue-50/30 dark:bg-blue-950/20 p-3">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
            Expert analysis
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
            {expertAnalysis}
          </p>
          {saved && (
            <p className="text-xs text-blue-500 mt-2">Response saved.</p>
          )}
        </div>
      )}
    </div>
  );
}
