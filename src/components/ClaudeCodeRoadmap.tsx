"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSectionGroups, topics, type ClaudeCodeTopic } from "@/data/claude-code-roadmap";
import ClaudeCodeCard from "./ClaudeCodeCard";
import ClaudeCodeDetail from "./ClaudeCodeDetail";

const STORAGE_KEY = "claude-code-mastery";

const THEME_COLORS: Record<string, { gradient: string; glow: string; border: string; dot: string; text: string; bg: string }> = {
  violet: { gradient: "from-violet-500 to-indigo-600", glow: "shadow-violet-500/25", border: "border-violet-400", dot: "bg-violet-500", text: "text-violet-600", bg: "bg-violet-50" },
  amber: { gradient: "from-amber-500 to-orange-500", glow: "shadow-amber-500/25", border: "border-amber-400", dot: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-50" },
  blue: { gradient: "from-blue-500 to-indigo-500", glow: "shadow-blue-500/25", border: "border-blue-400", dot: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-50" },
  emerald: { gradient: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/25", border: "border-emerald-400", dot: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50" },
  cyan: { gradient: "from-cyan-500 to-sky-500", glow: "shadow-cyan-500/25", border: "border-cyan-400", dot: "bg-cyan-500", text: "text-cyan-600", bg: "bg-cyan-50" },
  rose: { gradient: "from-rose-500 to-pink-500", glow: "shadow-rose-500/25", border: "border-rose-400", dot: "bg-rose-500", text: "text-rose-600", bg: "bg-rose-50" },
  red: { gradient: "from-red-500 to-rose-500", glow: "shadow-red-500/25", border: "border-red-400", dot: "bg-red-500", text: "text-red-600", bg: "bg-red-50" },
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
      <div className={`w-0.5 h-5 ${c.dot} opacity-40`} />
      <div className={`w-3 h-3 rounded-full ${c.dot} opacity-60`} />
      <div className={`w-0.5 h-5 ${c.dot} opacity-40`} />
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
      <div className="flex-1 h-px bg-stone-300" />
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 border border-stone-200">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="text-xs font-semibold text-stone-500">{text}</span>
      </div>
      <div className="flex-1 h-px bg-stone-300" />
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

  let globalIndex = 0;

  return (
    <div className="pb-20 relative">
      {/* Vertical spine */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-stone-200 via-stone-300 to-stone-200 -translate-x-1/2 hidden sm:block" />

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6"
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1 h-4 bg-stone-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 border-2 border-emerald-300">
            <span className="text-lg font-extrabold text-emerald-600">{masteredCount}</span>
            <span className="text-sm font-bold text-emerald-400">/ {total}</span>
          </div>
        </div>
        <p className="text-center text-sm font-semibold text-stone-500">
          {masteredCount === 0
            ? "Click any topic to start learning"
            : masteredCount === total
              ? "You've mastered all 38 topics!"
              : `${masteredCount} topic${masteredCount === 1 ? "" : "s"} mastered`}
        </p>
      </motion.div>

      {/* Section groups with connectors */}
      {sectionGroups.map(({ section, topics: sectionTopics }, sectionIndex) => {
        const colors = THEME_COLORS[section.color] || THEME_COLORS.blue;
        const sectionMastered = sectionTopics.filter((t) => mastered.has(t.id)).length;

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
                relative mx-auto w-full max-w-[500px] rounded-2xl bg-gradient-to-r ${colors.gradient}
                px-8 py-5 text-center shadow-xl ${colors.glow} mb-1 border-2 border-white/20
              `}
            >
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-lg font-extrabold text-white tracking-wide uppercase">
                  {section.title}
                </h2>
                <span className="text-xs font-bold text-white/60 bg-white/20 px-2 py-0.5 rounded-full">
                  {sectionMastered}/{sectionTopics.length}
                </span>
              </div>
              <p className="text-sm font-medium text-white/80 mt-1">{section.description}</p>
            </motion.div>

            {/* Connector into cards */}
            <Connector color={section.color} />

            {/* Card grid */}
            <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-[640px] mx-auto">
              {sectionTopics.map((topic) => {
                const idx = globalIndex++;
                return (
                  <ClaudeCodeCard
                    key={topic.id}
                    topic={topic}
                    mastered={mastered.has(topic.id)}
                    index={idx}
                    onClick={() => setSelected(topic)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Final milestone */}
      <div className="relative">
        <Connector color="red" />
        <Milestone text={sectionGroups[sectionGroups.length - 1].section.milestone} />
        <Connector color="red" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto max-w-[500px] text-center py-6"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 text-white shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-sm font-bold">You know the tool. Now go build something amazing.</span>
          </div>
        </motion.div>
      </div>

      {/* Detail modal */}
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
