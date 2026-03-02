"use client";

import { useState, useEffect } from "react";
import { getData, saveDisconnect } from "@/lib/progress";

interface DisconnectExerciseProps {
  id: string;
  title: string;
  instructions: string;
  duration?: number;
  reflectionPrompt: string;
}

export default function DisconnectExercise({
  id,
  title,
  instructions,
  duration,
  reflectionPrompt,
}: DisconnectExerciseProps) {
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    const d = getData();
    const prev = d.disconnects.find((dc) => dc.id === id);
    if (prev) {
      setReflection(prev.reflection);
      setHasPrevious(true);
    }
  }, [id]);

  function handleSave() {
    if (!reflection.trim()) return;
    saveDisconnect(id, reflection.trim());
    setSaved(true);
    setHasPrevious(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="my-8 relative">
      {/* Dashed border creates "disconnected" visual feel */}
      <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/30 overflow-hidden">
        {/* Header band */}
        <div className="bg-slate-100 dark:bg-slate-800/60 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                {title}
              </h4>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Disconnect exercise
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {duration && (
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-700/80 px-2 py-0.5 rounded">
                ~{duration}min
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-200/80 dark:bg-slate-700/80 px-2 py-0.5 rounded">
              No AI
            </span>
            {hasPrevious && (
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded">
                done
              </span>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="px-5 py-4">
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
            {instructions}
          </p>
        </div>

        {/* Reflection area */}
        <div className="bg-white/60 dark:bg-zinc-900/40 border-t border-dashed border-slate-300 dark:border-slate-600 px-5 py-4">
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-2">
            {reflectionPrompt}
          </label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your reflection here..."
            rows={3}
            className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 resize-y"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Saved locally in your browser.
            </p>
            <button
              onClick={handleSave}
              disabled={!reflection.trim()}
              className="px-4 py-1.5 text-xs font-medium rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
