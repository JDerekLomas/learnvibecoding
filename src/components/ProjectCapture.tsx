"use client";

import { useState, useEffect, useCallback } from "react";
import { getData, saveProject } from "@/lib/progress";

interface ProjectCaptureProps {
  module: string;
}

export default function ProjectCapture({ module }: ProjectCaptureProps) {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<Array<{ url: string; description: string; date: string }>>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const d = getData();
    setProjects(d.projects.filter((p) => p.module === module));
  }, [module]);

  const handleSave = useCallback(() => {
    if (!description.trim()) return;
    saveProject({ url: url.trim(), description: description.trim(), module });
    const d = getData();
    setProjects(d.projects.filter((p) => p.module === module));
    setUrl("");
    setDescription("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [url, description, module]);

  return (
    <div className="my-6 rounded-lg border border-emerald-200 dark:border-emerald-800/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-xs text-emerald-600 dark:text-emerald-400">
          +
        </span>
        <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          Record what you built
        </h4>
      </div>

      <div className="space-y-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL (optional) — e.g. https://my-project.vercel.app"
          className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What did you build? One line."
          className="w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Saved locally in your browser.</p>
          <button
            onClick={handleSave}
            disabled={!description.trim()}
            className="px-3 py-1 text-xs font-medium rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {saved ? "Saved" : "Save project"}
          </button>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="mt-4 pt-3 border-t border-emerald-100 dark:border-emerald-800/30">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Your projects from this module:
          </p>
          <ul className="space-y-1.5">
            {projects.map((p, i) => (
              <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 shrink-0">-</span>
                <span>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 decoration-zinc-300 dark:decoration-zinc-600 hover:decoration-zinc-500"
                    >
                      {p.description}
                    </a>
                  ) : (
                    p.description
                  )}
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-2">{p.date}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
