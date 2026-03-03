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
    <div className="my-6 rounded-2xl border-2 border-violet-200 bg-violet-50/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-violet-50 transition-colors"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white shrink-0">
          ?
        </span>
        <span className="font-bold text-sm text-stone-900 flex-1">
          Reflect: {prompt}
        </span>
        {hasPrevious && (
          <span className="text-[10px] font-bold text-violet-500 bg-violet-100 px-2 py-0.5 rounded-full shrink-0">
            answered
          </span>
        )}
        <svg
          className={`w-4 h-4 text-stone-400 transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-violet-200">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your reflection here..."
            rows={4}
            className="mt-4 w-full rounded-xl border-2 border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 resize-y"
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-stone-400 font-medium">
              {hasPrevious ? "You can revise your response anytime." : "Saved locally in your browser."}
            </p>
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
