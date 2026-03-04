"use client";

import { type ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSectionGroups, topics, type ClaudeCodeTopic } from "@/data/claude-code-roadmap";
import ClaudeCodeCard from "./ClaudeCodeCard";
import ClaudeCodeDetail from "./ClaudeCodeDetail";

const STORAGE_KEY = "claude-code-mastery";

const THEME_COLORS: Record<string, { gradient: string; dot: string; bg: string }> = {
  violet: { gradient: "from-violet-500 to-indigo-600", dot: "bg-violet-500", bg: "bg-violet-50/60" },
  amber: { gradient: "from-amber-500 to-orange-500", dot: "bg-amber-500", bg: "bg-amber-50/60" },
  blue: { gradient: "from-blue-500 to-indigo-500", dot: "bg-blue-500", bg: "bg-blue-50/60" },
  emerald: { gradient: "from-emerald-500 to-teal-500", dot: "bg-emerald-500", bg: "bg-emerald-50/60" },
  cyan: { gradient: "from-cyan-500 to-sky-500", dot: "bg-cyan-500", bg: "bg-cyan-50/60" },
  rose: { gradient: "from-rose-500 to-pink-500", dot: "bg-rose-500", bg: "bg-rose-50/60" },
  red: { gradient: "from-red-500 to-rose-500", dot: "bg-red-500", bg: "bg-red-50/60" },
};

const svgProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const SECTION_ICONS: Record<string, ReactNode> = {
  "getting-started": (
    <svg {...svgProps}><polyline points="13 2 13 9 20 9" /><path d="M20 9l-7-7H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /></svg>
  ),
  context: (
    <svg {...svgProps}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
  ),
  "core-workflow": (
    <svg {...svgProps}><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
  ),
  "skills-tools": (
    <svg {...svgProps}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
  ),
  advanced: (
    <svg {...svgProps}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
  ),
  scaling: (
    <svg {...svgProps}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
  ),
  safety: (
    <svg {...svgProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  ),
};

function getMastery(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveMastery(mastered: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...mastered]));
}

function Connector({ color }: { color: string }) {
  const c = THEME_COLORS[color] || THEME_COLORS.blue;
  return (
    <div className="flex flex-col items-center py-1">
      <div className={`w-[2px] h-5 ${c.dot} opacity-50`} />
      <div className={`w-3 h-3 rounded-sm border-[1.5px] border-stone-900 ${c.dot}`} />
      <div className={`w-[2px] h-5 ${c.dot} opacity-50`} />
    </div>
  );
}

function Milestone({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex items-center gap-3 mx-auto max-w-[500px] py-4"
    >
      <div className="flex-1 h-[2px] bg-stone-900 opacity-20" />
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg border-[2.5px] border-stone-900 bg-white shadow-[2px_2px_0_#1c1917]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-900">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="text-xs font-black text-stone-900">{text}</span>
      </div>
      <div className="flex-1 h-[2px] bg-stone-900 opacity-20" />
    </motion.div>
  );
}

export default function ClaudeCodeRoadmap() {
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<ClaudeCodeTopic | null>(null);

  useEffect(() => {
    setMastered(getMastery());
  }, []);

  const sectionGroups = getSectionGroups();
  const total = topics.length;
  const masteredCount = mastered.size;
  const progress = total > 0 ? (masteredCount / total) * 100 : 0;

  function toggleMastery(id: string) {
    setMastered((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveMastery(next);
      return next;
    });
  }

  const positions = ["center", "left", "center", "right"] as const;

  let globalIndex = 0;

  return (
    <div className="pb-20 relative">
      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8 rounded-lg border-[2.5px] border-stone-900 bg-white shadow-[3px_3px_0_#1c1917] p-5"
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1 h-4 bg-stone-200 rounded-sm border-[1.5px] border-stone-900 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-[2px] border-stone-900 bg-emerald-50">
            <span className="text-lg font-black text-stone-900">{masteredCount}</span>
            <span className="text-sm font-bold text-stone-500">/ {total}</span>
          </div>
        </div>
        <p className="text-center text-sm font-bold text-stone-500">
          {masteredCount === 0
            ? "Click any topic to start learning"
            : masteredCount === total
              ? "You've mastered all 38 topics!"
              : `${masteredCount} topic${masteredCount === 1 ? "" : "s"} mastered`}
        </p>
      </motion.div>

      {/* Section groups with skill tree layout */}
      {sectionGroups.map(({ section, topics: sectionTopics }, sectionIndex) => {
        const colors = THEME_COLORS[section.color] || THEME_COLORS.blue;
        const sectionMastered = sectionTopics.filter((t) => mastered.has(t.id)).length;
        const icon = SECTION_ICONS[section.id] || SECTION_ICONS["core-workflow"];

        return (
          <div key={section.id} className="relative">
            {/* Connector from previous section */}
            {sectionIndex > 0 && (
              <>
                <Connector color={section.color} />
                <Milestone text={sectionGroups[sectionIndex - 1].section.milestone} />
                <Connector color={section.color} />
              </>
            )}

            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                relative mx-auto w-full max-w-[500px] rounded-lg
                border-[2.5px] border-stone-900 bg-gradient-to-r ${colors.gradient}
                shadow-[3px_3px_0_#1c1917] px-6 py-4 text-center mb-1
              `}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-white">{icon}</span>
                <h2 className="text-base font-black text-white tracking-wide uppercase">
                  {section.title}
                </h2>
                <span className="text-xs font-black text-white/80 bg-black/20 px-2 py-0.5 rounded border border-white/20">
                  {sectionMastered}/{sectionTopics.length}
                </span>
              </div>
              <p className="text-sm font-medium text-white/80 mt-1">{section.description}</p>
            </motion.div>

            {/* Connector into nodes */}
            <Connector color={section.color} />

            {/* Zigzag skill tree nodes with section tint */}
            <div className={`${colors.bg} rounded-lg border border-stone-200 py-4 px-3 max-w-[520px] mx-auto`}>
              <div className="flex flex-col items-center gap-0">
                {sectionTopics.map((topic, i) => {
                  const idx = globalIndex++;
                  const pos = positions[i % positions.length];

                  return (
                    <div key={topic.id} className="flex flex-col items-center w-full">
                      {i > 0 && <Connector color={section.color} />}
                      <ClaudeCodeCard
                        topic={topic}
                        mastered={mastered.has(topic.id)}
                        index={idx}
                        position={pos}
                        onClick={() => setSelected(topic)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Final milestone + star badge */}
      <div className="relative">
        <Connector color="red" />
        <Milestone text={sectionGroups[sectionGroups.length - 1].section.milestone} />
        <Connector color="red" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto max-w-[500px] text-center py-6"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-[2.5px] border-stone-900 bg-stone-900 text-white shadow-[3px_3px_0_#78716c]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-sm font-black">You know the tool. Now go build something amazing.</span>
          </div>
        </motion.div>
      </div>

      {/* Detail drawer */}
      <ClaudeCodeDetail
        topic={selected}
        mastered={selected ? mastered.has(selected.id) : false}
        onClose={() => setSelected(null)}
        onToggleMastered={() => {
          if (selected) toggleMastery(selected.id);
        }}
      />
    </div>
  );
}
