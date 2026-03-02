"use client";

import { useState, useEffect, useCallback } from "react";
import { getData, saveReflection } from "@/lib/progress";

interface ReflectionPromptProps {
  id: string;
  prompt: string;
}

export default function ReflectionPrompt({ id, prompt }: ReflectionPromptProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    const d = getData();
    if (d.reflections[id]) {
      setText(d.reflections[id]);
      setHasPrevious(true);
    }
  }, [id]);

  const handleSave = useCallback(() => {
    if (!text.trim()) return;
    saveReflection(id, text.trim());
    setSaved(true);
    setHasPrevious(true);
    setTimeout(() => setSaved(false), 2000);
  }, [id, text]);

  return (
    <div className="my-6 rounded-lg border border-violet-200 dark:border-violet-800/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-colors"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/50 text-xs text-violet-600 dark:text-violet-400 shrink-0">
          ?
        </span>
        <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100 flex-1">
          Reflect: {prompt}
        </span>
        {hasPrevious && (
          <span className="text-[10px] text-violet-500 dark:text-violet-400 shrink-0">
            answered
          </span>
        )}
        <svg
          className={`w-4 h-4 text-zinc-400 transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-violet-100 dark:border-violet-800/30">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your reflection here..."
            rows={4}
            className="mt-3 w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 resize-y"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              {hasPrevious ? "You can revise your response anytime." : "Saved locally in your browser."}
            </p>
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className="px-3 py-1 text-xs font-medium rounded-md bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
