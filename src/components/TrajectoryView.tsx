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

const typeConfig: Record<TimelineEntry["type"], { color: string; bg: string; label: string; icon: string }> = {
  reflect: { color: "bg-violet-400", bg: "bg-violet-50 dark:bg-violet-950/20", label: "Reflection", icon: "?" },
  assess: { color: "bg-amber-400", bg: "bg-amber-50 dark:bg-amber-950/20", label: "Assessment", icon: "~" },
  project: { color: "bg-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/20", label: "Project", icon: "+" },
  critique: { color: "bg-blue-400", bg: "bg-blue-50 dark:bg-blue-950/20", label: "Critique", icon: "<>" },
  build: { color: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", label: "Build", icon: ">" },
  disconnect: { color: "bg-slate-400", bg: "bg-slate-50 dark:bg-slate-950/20", label: "Disconnect", icon: "/" },
};

function buildTimeline(data: LearnerData): TimelineEntry[] {
  const entries: TimelineEntry[] = [];

  Object.entries(data.reflections).forEach(([id, text]) => {
    entries.push({
      date: "",
      type: "reflect",
      label: id.replace(/-/g, " "),
      detail: text.length > 60 ? text.slice(0, 60) + "..." : text,
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
      detail: b.outcome === "achieved" ? "Completed" : b.outcome === "partially" ? "Partially" : b.outcome === "stuck" ? "Stuck" : "Incomplete",
    });
  });

  data.disconnects.forEach((d) => {
    entries.push({
      date: d.date,
      type: "disconnect",
      label: d.id.replace(/-/g, " "),
      detail: d.reflection.length > 60 ? d.reflection.slice(0, 60) + "..." : d.reflection,
    });
  });

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
      <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
        Growth Trajectories
      </h3>
      <div className="space-y-3">
        {repeated.map(([id, entries]) => (
          <div key={id} className="rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50/30 dark:bg-amber-950/10 p-4">
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-3">
              {id.replace(/-/g, " ")}
            </p>
            <div className="flex items-end gap-2 h-12 mb-2">
              {entries.map((e, i) => {
                const numVal = typeof e.value === "number" ? e.value : 3;
                const height = Math.max(20, (numVal / 5) * 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full max-w-[40px] rounded-sm bg-amber-300 dark:bg-amber-600 transition-all"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              {entries.map((e, i) => (
                <div key={i} className="flex-1 text-center">
                  <p className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                    {typeof e.value === "number" ? `${e.value}/5` : e.value}
                  </p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{e.date}</p>
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
      <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
        Build Sessions
      </h3>
      <div className="rounded-lg border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/30 dark:bg-emerald-950/10 p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {achieved}/{completed.length}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            sessions hit their goal
          </span>
        </div>
        <div className="space-y-2">
          {completed.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full shrink-0 ${
                b.outcome === "achieved" ? "bg-emerald-400" :
                b.outcome === "partially" ? "bg-amber-400" :
                "bg-zinc-400"
              }`} />
              <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate flex-1">
                {b.intention}
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 shrink-0">{b.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypeLegend() {
  const types = Object.entries(typeConfig);
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
      {types.map(([key, cfg]) => (
        <span key={key} className="flex items-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500">
          <span className={`h-1.5 w-1.5 rounded-full ${cfg.color}`} />
          {cfg.label}
        </span>
      ))}
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
      <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-6">
        Your learning trajectory so far.
      </p>

      <AssessmentTrajectories data={data} />
      <BuildSessionLog data={data} />

      <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
        Activity Timeline
      </h3>
      <TypeLegend />

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-700" />

        <div className="space-y-2">
          {timeline.slice(0, 30).map((entry, i) => {
            const cfg = typeConfig[entry.type];
            return (
              <div key={i} className="flex items-start gap-3 relative">
                {/* Timeline dot */}
                <span className={`mt-1.5 h-[15px] w-[15px] rounded-full ${cfg.color} ring-2 ring-white dark:ring-zinc-900 shrink-0 z-10`} />
                {/* Entry card */}
                <div className={`flex-1 rounded-md ${cfg.bg} px-3 py-2`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      {cfg.label}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 ml-auto font-mono">
                      {entry.date || "---"}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-0.5">
                    {entry.label}
                  </p>
                  {entry.detail && (
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {entry.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {timeline.length > 30 && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 pl-7 mt-2">
            + {timeline.length - 30} more entries
          </p>
        )}
      </div>
    </div>
  );
}
