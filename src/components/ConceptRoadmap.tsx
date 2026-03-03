"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getThemeGroups } from "@/data/concept-roadmap";
import { concepts, type Concept } from "@/data/concepts";
import ConceptCard from "./ConceptCard";
import ConceptDetail from "./ConceptDetail";

const STORAGE_KEY = "concept-mastery";

const THEME_COLORS: Record<string, { gradient: string; glow: string }> = {
  violet: { gradient: "from-violet-500 to-indigo-600", glow: "shadow-violet-500/25" },
  amber: { gradient: "from-amber-500 to-orange-500", glow: "shadow-amber-500/25" },
  blue: { gradient: "from-blue-500 to-indigo-500", glow: "shadow-blue-500/25" },
  emerald: { gradient: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/25" },
  red: { gradient: "from-red-500 to-rose-500", glow: "shadow-red-500/25" },
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

export default function ConceptRoadmap() {
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Concept | null>(null);

  useEffect(() => {
    setMastered(getMastery());
  }, []);

  const themeGroups = getThemeGroups();
  const total = concepts.length;
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
    <div className="pb-20">
      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6"
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
            ? "Click any concept to start learning"
            : masteredCount === total
              ? "You've mastered all concepts!"
              : `${masteredCount} concept${masteredCount === 1 ? "" : "s"} mastered`}
        </p>
      </motion.div>

      {/* Theme sections */}
      {themeGroups.map(({ theme, concepts: themeConcepts }) => {
        const colors = THEME_COLORS[theme.color] || THEME_COLORS.blue;

        return (
          <div key={theme.id} className="mb-10">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                mx-auto w-full max-w-[500px] rounded-2xl bg-gradient-to-r ${colors.gradient}
                px-8 py-5 text-center shadow-xl ${colors.glow} mb-6 border-2 border-white/20
              `}
            >
              <h2 className="text-lg font-extrabold text-white tracking-wide uppercase">
                {theme.title}
              </h2>
              <p className="text-sm font-medium text-white/80 mt-1">{theme.description}</p>
            </motion.div>

            {/* Card grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-[640px] mx-auto">
              {themeConcepts.map((concept) => {
                const idx = globalIndex++;
                return (
                  <ConceptCard
                    key={concept.id}
                    concept={concept}
                    mastered={mastered.has(concept.id)}
                    index={idx}
                    onClick={() => setSelected(concept)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Detail modal */}
      <ConceptDetail
        concept={selected}
        mastered={selected ? mastered.has(selected.id) : false}
        onClose={() => setSelected(null)}
        onToggleMastered={() => {
          if (selected) toggleMastery(selected.id);
        }}
      />
    </div>
  );
}
