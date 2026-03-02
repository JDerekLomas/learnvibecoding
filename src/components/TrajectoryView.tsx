"use client";

import { type LearnerData } from "@/lib/progress";

interface TrajectoryViewProps {
  data: LearnerData;
}

type TimelineEntry = {
  date: string;
  type: "reflect" | "assess" | "project" | "critique" | "build" | "disconnect";
  label: string;
  detail?: string;
};

const typeColors: Record<TimelineEntry["type"], string> = {
  reflect: "bg-violet-400 dark:bg-violet-500",
  assess: "bg-amber-400 dark:bg-amber-500",
  project: "bg-emerald-400 dark:bg-emerald-500",
  critique: "bg-blue-400 dark:bg-blue-500",
  build: "bg-emerald-500 dark:bg-emerald-400",
  disconnect: "bg-slate-400 dark:bg-slate-500",
};

const typeLabels: Record<TimelineEntry["type"], string> = {
  reflect: "Reflection",
  assess: "Assessment",
  project: "Project",
  critique: "Critique",
  build: "Build session",
  disconnect: "Disconnect",
};

function buildTimeline(data: LearnerData): TimelineEntry[] {
  const entries: TimelineEntry[] = [];

  Object.entries(data.reflections).forEach(([id, text]) => {
    entries.push({
      date: "",
      type: "reflect",
      label: id.replace(/-/g, " "),
      detail: text.length > 80 ? text.slice(0, 80) + "..." : text,
    });
  });

  data.assessments.forEach((a) => {
    entries.push({
      date: a.date,
      type: "assess",
      label: a.id.replace(/-/g, " "),
      detail: String(a.value),
    });
  });

  data.projects.forEach((p) => {
    entries.push({
      date: p.date,
      type: "project",
      label: p.description,
      detail: p.module,
    });
  });

  data.critiques.forEach((c) => {
    entries.push({
      date: c.date,
      type: "critique",
      label: c.id.replace(/-/g, " "),
      detail: `Chose: ${c.choice}`,
    });
  });

  data.buildSessions.forEach((b) => {
    if (!b.completedAt) return;
    entries.push({
      date: b.date,
      type: "build",
      label: b.intention,
      detail: b.outcome === "achieved" ? "Done" : b.outcome === "partially" ? "Partially" : b.outcome === "stuck" ? "Got stuck" : "Didn't finish",
    });
  });

  data.disconnects.forEach((d) => {
    entries.push({
      date: d.date,
      type: "disconnect",
      label: d.id.replace(/-/g, " "),
      detail: d.reflection.length > 80 ? d.reflection.slice(0, 80) + "..." : d.reflection,
    });
  });

  // Sort by date descending (undated at end)
  entries.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });

  return entries;
}

function AssessmentTrajectories({ data }: { data: LearnerData }) {
  const byId = new Map<string, Array<{ value: number | string; date: string }>>();
  data.assessments.forEach((a) => {
    const list = byId.get(a.id) ?? [];
    list.push({ value: a.value, date: a.date });
    byId.set(a.id, list);
  });

  const repeated = [...byId.entries()].filter(([, entries]) => entries.length > 1);
  if (repeated.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
        Assessment trajectories
      </h3>
      <div className="space-y-3">
        {repeated.map(([id, entries]) => (
          <div key={id} className="rounded-md border border-amber-200 dark:border-amber-800/50 p-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              {id.replace(/-/g, " ")}
            </p>
            <div className="space-y-1">
              {entries.map((e, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-400 dark:text-zinc-500 w-16 shrink-0">{e.date}</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">{e.value}/5</span>
                  {i === entries.length - 1 && (
                    <span className="text-zinc-400 dark:text-zinc-500">&larr; most recent</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BuildSessionLog({ data }: { data: LearnerData }) {
  const completed = data.buildSessions.filter((b) => b.completedAt);
  if (completed.length === 0) return null;

  const achieved = completed.filter((b) => b.outcome === "achieved").length;

  return (
    <div className="mb-6">
      <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
        Build sessions
      </h3>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
        {achieved} of {completed.length} sessions hit their goal
      </p>
      <div className="space-y-1.5">
        {completed.map((b, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${b.outcome === "achieved" ? "bg-emerald-400" : b.outcome === "partially" ? "bg-amber-400" : "bg-zinc-400"}`} />
            <span className="text-zinc-600 dark:text-zinc-400">
              {b.intention}
              <span className="text-zinc-400 dark:text-zinc-500 ml-2">{b.date}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrajectoryView({ data }: TrajectoryViewProps) {
  const timeline = buildTimeline(data);
  const hasData = timeline.length > 0;

  if (!hasData) return null;

  return (
    <div className="mb-12">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
        My Journey
      </h2>
      <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-4">
        Your learning trajectory so far.
      </p>

      <AssessmentTrajectories data={data} />
      <BuildSessionLog data={data} />

      <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
        Activity timeline
      </h3>
      <div className="space-y-1.5">
        {timeline.slice(0, 30).map((entry, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${typeColors[entry.type]}`} />
            <span className="text-zinc-400 dark:text-zinc-500 w-16 shrink-0">
              {entry.date || "---"}
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 dark:text-zinc-500">[{typeLabels[entry.type]}]</span>{" "}
              {entry.label}
              {entry.detail && (
                <span className="text-zinc-400 dark:text-zinc-500 ml-1">
                  &mdash; {entry.detail}
                </span>
              )}
            </span>
          </div>
        ))}
        {timeline.length > 30 && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 pl-6">
            + {timeline.length - 30} more entries
          </p>
        )}
      </div>
    </div>
  );
}
