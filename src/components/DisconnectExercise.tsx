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
    <div className="my-6 rounded-lg border border-slate-300 dark:border-slate-700 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-400">
          /
        </span>
        <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          Disconnect: {title}
        </h4>
        {hasPrevious && (
          <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-auto">
            completed
          </span>
        )}
      </div>

      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3 whitespace-pre-line">
        {instructions}
      </p>

      {duration && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Suggested time: ~{duration} minutes. No AI.
        </p>
      )}

      <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3">
        <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">
          {reflectionPrompt}
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your reflection here..."
          rows={3}
          className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 resize-y"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Saved locally in your browser.
          </p>
          <button
            onClick={handleSave}
            disabled={!reflection.trim()}
            className="px-3 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
