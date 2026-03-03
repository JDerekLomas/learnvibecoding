"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SKILL_UNITS,
  getSkillStatuses,
  type SkillStatus,
} from "@/lib/skills";
import { onProgressChange } from "@/lib/progress";

const STATUS_STYLES: Record<
  SkillStatus,
  { ring: string; bg: string; text: string; icon: string }
> = {
  locked: {
    ring: "ring-zinc-200 dark:ring-zinc-700",
    bg: "bg-zinc-100 dark:bg-zinc-800",
    text: "text-zinc-400 dark:text-zinc-500",
    icon: "lock",
  },
  available: {
    ring: "ring-indigo-300 dark:ring-indigo-600",
    bg: "bg-white dark:bg-zinc-900",
    text: "text-indigo-600 dark:text-indigo-400",
    icon: "play",
  },
  active: {
    ring: "ring-indigo-500 dark:ring-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950",
    text: "text-indigo-700 dark:text-indigo-300",
    icon: "progress",
  },
  complete: {
    ring: "ring-emerald-400 dark:ring-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: "check",
  },
};

function StatusIcon({ status }: { status: SkillStatus }) {
  if (status === "locked") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    );
  }
  if (status === "complete") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  if (status === "active") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  // available — play arrow
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6,3 20,12 6,21" />
    </svg>
  );
}

/**
 * Positions for the zigzag path. Each position shifts the node
 * left, center, or right within its row.
 */
const ZIGZAG = ["left", "center", "right", "center"] as const;

function getNodeOffset(index: number): string {
  const pos = ZIGZAG[index % ZIGZAG.length];
  if (pos === "left") return "-translate-x-12 sm:-translate-x-16";
  if (pos === "right") return "translate-x-12 sm:translate-x-16";
  return "";
}

function UnitHeader({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    violet: "from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700",
    amber: "from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600",
    blue: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
    emerald: "from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700",
    red: "from-red-500 to-red-600 dark:from-red-500 dark:to-red-600",
    zinc: "from-zinc-500 to-zinc-600 dark:from-zinc-600 dark:to-zinc-700",
  };

  return (
    <div
      className={`mx-auto w-full max-w-xs rounded-2xl bg-gradient-to-r ${colorMap[color] || colorMap.zinc} px-5 py-3 text-center shadow-sm mb-6`}
    >
      <h3 className="text-sm font-bold text-white tracking-wide">
        {title}
      </h3>
      <p className="text-xs text-white/70 mt-0.5">{description}</p>
    </div>
  );
}

function SkillNode({
  title,
  subtitle,
  href,
  status,
  offset,
}: {
  title: string;
  subtitle: string;
  href: string;
  status: SkillStatus;
  offset: string;
}) {
  const style = STATUS_STYLES[status];
  const isClickable = status !== "locked";

  const node = (
    <div
      className={`
        flex flex-col items-center gap-2 transition-transform duration-200
        ${offset}
        ${isClickable ? "cursor-pointer" : "cursor-default opacity-60"}
      `}
    >
      {/* Circle node */}
      <div
        className={`
          relative w-16 h-16 rounded-full ring-4 ${style.ring} ${style.bg}
          flex items-center justify-center
          ${status === "active" ? "animate-pulse" : ""}
          ${isClickable ? "hover:scale-110 active:scale-95" : ""}
          transition-transform duration-150 shadow-sm
        `}
      >
        <span className={style.text}>
          <StatusIcon status={status} />
        </span>
        {status === "available" && (
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 dark:bg-indigo-400 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </span>
        )}
      </div>

      {/* Label */}
      <div className="text-center max-w-[140px]">
        <p
          className={`text-xs font-semibold leading-tight ${
            status === "locked"
              ? "text-zinc-400 dark:text-zinc-500"
              : "text-zinc-800 dark:text-zinc-200"
          }`}
        >
          {title}
        </p>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
          {subtitle}
        </p>
      </div>
    </div>
  );

  if (!isClickable) return node;

  return (
    <Link href={href} className="no-underline">
      {node}
    </Link>
  );
}

function ConnectorDot({ status }: { status: "done" | "pending" }) {
  return (
    <div className="flex justify-center py-1">
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          status === "done"
            ? "bg-emerald-400 dark:bg-emerald-500"
            : "bg-zinc-200 dark:bg-zinc-700"
        }`}
      />
    </div>
  );
}

function ConnectorLine({ status }: { status: "done" | "pending" }) {
  return (
    <div className="flex justify-center">
      <div
        className={`w-0.5 h-6 ${
          status === "done"
            ? "bg-emerald-300 dark:bg-emerald-600"
            : "bg-zinc-200 dark:bg-zinc-700"
        }`}
      />
    </div>
  );
}

export default function SkillMap() {
  const [statuses, setStatuses] = useState<Record<string, SkillStatus>>({});

  useEffect(() => {
    setStatuses(getSkillStatuses());
    return onProgressChange(() => setStatuses(getSkillStatuses()));
  }, []);

  // Count progress
  const allSkills = SKILL_UNITS.flatMap((u) => u.skills);
  const completed = allSkills.filter((s) => statuses[s.id] === "complete").length;
  const total = allSkills.length;

  let globalIndex = 0;

  return (
    <div className="pb-20">
      {/* Progress summary */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <div className="flex gap-1">
            {allSkills.map((s) => (
              <div
                key={s.id}
                className={`w-2.5 h-2.5 rounded-full ${
                  statuses[s.id] === "complete"
                    ? "bg-emerald-400 dark:bg-emerald-500"
                    : statuses[s.id] === "active"
                    ? "bg-indigo-400 dark:bg-indigo-500"
                    : "bg-zinc-200 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {completed}/{total} complete
          </span>
        </div>
      </div>

      {/* Skill path */}
      {SKILL_UNITS.map((unit, unitIndex) => {
        const isEntryUnit = unit.id === "entry";

        return (
          <div key={unit.id} className="mb-8">
            <UnitHeader
              title={unit.title}
              description={unit.description}
              color={unit.color}
            />

            {isEntryUnit ? (
              /* Entry points: 2x2 grid instead of zigzag */
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-2">
                {unit.skills.map((skill) => (
                  <div key={skill.id} className="flex justify-center">
                    <SkillNode
                      title={skill.title}
                      subtitle={skill.subtitle}
                      href={skill.href}
                      status={statuses[skill.id] || "available"}
                      offset=""
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Core/Advanced: zigzag path */
              <div className="flex flex-col items-center">
                {unit.skills.map((skill, i) => {
                  const offset = getNodeOffset(globalIndex);
                  globalIndex++;
                  const status = statuses[skill.id] || "locked";
                  const prevComplete =
                    i > 0 &&
                    (statuses[unit.skills[i - 1].id] === "complete" ||
                      statuses[unit.skills[i - 1].id] === "active");

                  return (
                    <div key={skill.id}>
                      {i > 0 && (
                        <>
                          <ConnectorLine status={prevComplete ? "done" : "pending"} />
                          <ConnectorDot status={prevComplete ? "done" : "pending"} />
                          <ConnectorLine status={prevComplete ? "done" : "pending"} />
                        </>
                      )}
                      <SkillNode
                        title={skill.title}
                        subtitle={skill.subtitle}
                        href={skill.href}
                        status={status}
                        offset={offset}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Connector between units */}
            {unitIndex < SKILL_UNITS.length - 1 && (
              <div className="flex flex-col items-center mt-2">
                <ConnectorLine
                  status={
                    unit.skills.some(
                      (s) =>
                        statuses[s.id] === "complete" ||
                        statuses[s.id] === "active"
                    )
                      ? "done"
                      : "pending"
                  }
                />
                <ConnectorDot
                  status={
                    unit.skills.some(
                      (s) =>
                        statuses[s.id] === "complete" ||
                        statuses[s.id] === "active"
                    )
                      ? "done"
                      : "pending"
                  }
                />
                <ConnectorLine
                  status={
                    unit.skills.some(
                      (s) =>
                        statuses[s.id] === "complete" ||
                        statuses[s.id] === "active"
                    )
                      ? "done"
                      : "pending"
                  }
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
