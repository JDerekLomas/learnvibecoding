"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  SKILL_UNITS,
  getSkillStatuses,
  type SkillStatus,
  type Skill,
} from "@/lib/skills";
import { onProgressChange } from "@/lib/progress";

// MathItemBank-style colors
const UNIT_COLORS: Record<string, { gradient: string; badge: string; glow: string }> = {
  violet: {
    gradient: "from-violet-500 to-indigo-600",
    badge: "bg-violet-500",
    glow: "shadow-violet-500/25",
  },
  amber: {
    gradient: "from-amber-500 to-orange-500",
    badge: "bg-amber-500",
    glow: "shadow-amber-500/25",
  },
  blue: {
    gradient: "from-blue-500 to-indigo-500",
    badge: "bg-blue-500",
    glow: "shadow-blue-500/25",
  },
  emerald: {
    gradient: "from-emerald-500 to-teal-500",
    badge: "bg-emerald-500",
    glow: "shadow-emerald-500/25",
  },
  red: {
    gradient: "from-red-500 to-rose-500",
    badge: "bg-red-500",
    glow: "shadow-red-500/25",
  },
  zinc: {
    gradient: "from-zinc-500 to-zinc-600",
    badge: "bg-zinc-500",
    glow: "shadow-zinc-500/25",
  },
};

const NODE_STYLES: Record<SkillStatus, {
  card: string;
  border: string;
  shadow: string;
  iconBg: string;
  iconText: string;
  title: string;
  subtitle: string;
}> = {
  locked: {
    card: "bg-stone-100",
    border: "border-stone-200",
    shadow: "shadow-sm",
    iconBg: "bg-stone-200",
    iconText: "text-stone-400",
    title: "text-stone-400",
    subtitle: "text-stone-300",
  },
  available: {
    card: "bg-white",
    border: "border-indigo-300",
    shadow: "shadow-md shadow-indigo-100/60",
    iconBg: "bg-indigo-500",
    iconText: "text-white",
    title: "text-stone-800",
    subtitle: "text-stone-500",
  },
  active: {
    card: "bg-indigo-50",
    border: "border-indigo-500",
    shadow: "shadow-md shadow-indigo-200/60",
    iconBg: "bg-indigo-500",
    iconText: "text-white",
    title: "text-indigo-900",
    subtitle: "text-indigo-600",
  },
  complete: {
    card: "bg-emerald-50",
    border: "border-emerald-400",
    shadow: "shadow-md shadow-emerald-100/60",
    iconBg: "bg-emerald-500",
    iconText: "text-white",
    title: "text-emerald-900",
    subtitle: "text-emerald-600",
  },
};

function StatusIcon({ status }: { status: SkillStatus }) {
  if (status === "locked") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    );
  }
  if (status === "complete") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  if (status === "active") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  // available
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="8,4 20,12 8,20" />
    </svg>
  );
}

function SkillNode({
  skill,
  status,
  index,
}: {
  skill: Skill;
  status: SkillStatus;
  index: number;
}) {
  const style = NODE_STYLES[status];
  const isClickable = status !== "locked";

  // Zigzag: alternate left/right offset
  const positions = ["self-center", "self-start", "self-center", "self-end"] as const;
  const pos = positions[index % positions.length];

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      whileHover={isClickable ? { scale: 1.03, y: -2 } : {}}
      whileTap={isClickable ? { scale: 0.97 } : {}}
      className={`
        ${pos} w-full max-w-[280px]
        rounded-2xl border-2 ${style.border} ${style.card} ${style.shadow}
        p-4 flex items-center gap-4
        ${isClickable ? "cursor-pointer" : "cursor-default"}
        ${status === "active" ? "ring-2 ring-indigo-500/30" : ""}
        transition-shadow duration-200
      `}
    >
      {/* Icon circle */}
      <div
        className={`
          flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
          ${style.iconBg} ${style.iconText}
          ${status === "available" ? "animate-pulse" : ""}
        `}
      >
        <StatusIcon status={status} />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-bold leading-tight ${style.title}`}>
          {skill.title}
        </p>
        <p className={`text-xs mt-0.5 ${style.subtitle}`}>
          {skill.subtitle}
        </p>
      </div>

      {/* Arrow for available/active */}
      {(status === "available" || status === "active") && (
        <div className="flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      )}
    </motion.div>
  );

  if (!isClickable) return card;

  return (
    <Link href={skill.href} className="no-underline contents">
      {card}
    </Link>
  );
}

function Connector({ done }: { done: boolean }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div className={`w-0.5 h-3 ${done ? "bg-emerald-300" : "bg-stone-200"}`} />
      <div className={`w-2 h-2 rounded-full ${done ? "bg-emerald-400" : "bg-stone-200"}`} />
      <div className={`w-0.5 h-3 ${done ? "bg-emerald-300" : "bg-stone-200"}`} />
    </div>
  );
}

function UnitHeader({
  title,
  description,
  color,
  index,
}: {
  title: string;
  description: string;
  color: string;
  index: number;
}) {
  const c = UNIT_COLORS[color] || UNIT_COLORS.zinc;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`
        mx-auto w-full max-w-[320px] rounded-2xl bg-gradient-to-r ${c.gradient}
        px-6 py-4 text-center shadow-lg ${c.glow} mb-5
      `}
    >
      <h3 className="text-base font-bold text-white tracking-wide">
        {title}
      </h3>
      <p className="text-xs text-white/70 mt-1">{description}</p>
    </motion.div>
  );
}

function ProgressSummary({
  completed,
  active,
  total,
}: {
  completed: number;
  active: number;
  total: number;
}) {
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10"
    >
      {/* Progress bar — MathItemBank style */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-1 h-3 bg-stone-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
          <span className="text-sm font-bold text-amber-600">{completed}</span>
          <span className="text-xs font-semibold text-amber-400">/ {total}</span>
        </div>
      </div>

      {/* Status badges */}
      <div className="flex items-center gap-3 justify-center">
        <span className="flex items-center gap-1.5 text-xs text-stone-500">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          {completed} complete
        </span>
        {active > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-stone-500">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            {active} in progress
          </span>
        )}
        <span className="flex items-center gap-1.5 text-xs text-stone-500">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
          {total - completed - active} remaining
        </span>
      </div>
    </motion.div>
  );
}

export default function SkillMap() {
  const [statuses, setStatuses] = useState<Record<string, SkillStatus>>({});

  useEffect(() => {
    setStatuses(getSkillStatuses());
    return onProgressChange(() => setStatuses(getSkillStatuses()));
  }, []);

  const allSkills = SKILL_UNITS.flatMap((u) => u.skills);
  const completed = allSkills.filter((s) => statuses[s.id] === "complete").length;
  const active = allSkills.filter((s) => statuses[s.id] === "active").length;
  const total = allSkills.length;

  let globalIndex = 0;

  return (
    <div className="pb-20">
      <ProgressSummary completed={completed} active={active} total={total} />

      {SKILL_UNITS.map((unit, unitIndex) => {
        const isEntryUnit = unit.id === "entry";
        const unitHasProgress = unit.skills.some(
          (s) => statuses[s.id] === "complete" || statuses[s.id] === "active"
        );

        return (
          <div key={unit.id} className="mb-6">
            <UnitHeader
              title={unit.title}
              description={unit.description}
              color={unit.color}
              index={unitIndex}
            />

            {isEntryUnit ? (
              <div className="grid grid-cols-2 gap-3 max-w-[580px] mx-auto mb-2">
                {unit.skills.map((skill) => {
                  const status = statuses[skill.id] || "available";
                  globalIndex++;
                  return (
                    <SkillNode
                      key={skill.id}
                      skill={skill}
                      status={status}
                      index={globalIndex}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-0">
                {unit.skills.map((skill, i) => {
                  const status = statuses[skill.id] || "locked";
                  const nodeIndex = globalIndex;
                  globalIndex++;
                  const prevDone =
                    i > 0 &&
                    (statuses[unit.skills[i - 1].id] === "complete" ||
                      statuses[unit.skills[i - 1].id] === "active");

                  return (
                    <div key={skill.id} className="flex flex-col items-center">
                      {i > 0 && <Connector done={prevDone} />}
                      <SkillNode
                        skill={skill}
                        status={status}
                        index={nodeIndex}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Between-unit connector */}
            {unitIndex < SKILL_UNITS.length - 1 && (
              <div className="flex flex-col items-center mt-2">
                <Connector done={unitHasProgress} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
