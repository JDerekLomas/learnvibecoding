"use client";

import { useState, useEffect, useCallback } from "react";
import { getData, saveAssessment } from "@/lib/progress";

interface SliderAssessmentProps {
  id: string;
  question: string;
  type: "slider";
  lowLabel: string;
  highLabel: string;
}

interface RadioAssessmentProps {
  id: string;
  question: string;
  type: "radio";
  options: Array<{ label: string; description: string }>;
}

type SelfAssessmentProps = SliderAssessmentProps | RadioAssessmentProps;

export default function SelfAssessment(props: SelfAssessmentProps) {
  const [value, setValue] = useState<number | string | null>(null);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<Array<{ value: number | string; date: string }>>([]);

  useEffect(() => {
    const d = getData();
    const entries = d.assessments.filter((a) => a.id === props.id);
    setHistory(entries);
    if (entries.length > 0) {
      setValue(entries[entries.length - 1].value);
    }
  }, [props.id]);

  const handleSave = useCallback(() => {
    if (value === null) return;
    saveAssessment(props.id, value);
    const d = getData();
    setHistory(d.assessments.filter((a) => a.id === props.id));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [props.id, value]);

  return (
    <div className="my-6 rounded-lg border border-amber-200 dark:border-amber-800/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 text-xs text-amber-600 dark:text-amber-400">
          ~
        </span>
        <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          Self-assessment
        </h4>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{props.question}</p>

      {props.type === "slider" ? (
        <div className="space-y-2">
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={typeof value === "number" ? value : 3}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>{props.lowLabel}</span>
            <span className="font-mono text-amber-600 dark:text-amber-400">
              {typeof value === "number" ? value : "-"}
            </span>
            <span>{props.highLabel}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {props.options.map((opt) => (
            <label
              key={opt.label}
              className={`flex items-start gap-3 rounded-md border px-3 py-2.5 cursor-pointer transition-colors ${
                value === opt.label
                  ? "border-amber-300 bg-amber-50/50 dark:border-amber-700 dark:bg-amber-950/20"
                  : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
              }`}
            >
              <input
                type="radio"
                name={props.id}
                value={opt.label}
                checked={value === opt.label}
                onChange={() => setValue(opt.label)}
                className="mt-0.5 accent-amber-500"
              />
              <div>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {opt.label}
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {opt.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      )}

      {history.length > 1 && (
        <div className="mt-3 pt-3 border-t border-amber-100 dark:border-amber-800/30">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Your previous responses:
          </p>
          <div className="space-y-1">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 dark:text-zinc-500 w-16 shrink-0">{h.date}</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">
                  {typeof h.value === "number" ? `${h.value}/5` : h.value}
                </span>
                {i === history.length - 1 && (
                  <span className="text-zinc-400 dark:text-zinc-500">&larr; most recent</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          {history.length > 1
            ? `Taken ${history.length} times — retake anytime as you grow.`
            : "No right answer. Both ends are valid."}
        </p>
        <button
          onClick={handleSave}
          disabled={value === null}
          className="px-3 py-1 text-xs font-medium rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
