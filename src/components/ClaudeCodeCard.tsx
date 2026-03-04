"use client";

import { motion } from "framer-motion";
import type { ClaudeCodeTopic } from "@/data/claude-code-roadmap";

const SECTION_BORDERS: Record<string, string> = {
  "getting-started": "border-violet-300 hover:border-violet-500",
  context: "border-amber-300 hover:border-amber-500",
  "core-workflow": "border-blue-300 hover:border-blue-500",
  "skills-tools": "border-emerald-300 hover:border-emerald-500",
  advanced: "border-cyan-300 hover:border-cyan-500",
  scaling: "border-rose-300 hover:border-rose-500",
  safety: "border-red-300 hover:border-red-500",
};

const SECTION_GRADIENTS: Record<string, string> = {
  "getting-started": "from-violet-100 to-indigo-100 text-violet-500",
  context: "from-amber-100 to-orange-100 text-amber-500",
  "core-workflow": "from-blue-100 to-indigo-100 text-blue-500",
  "skills-tools": "from-emerald-100 to-teal-100 text-emerald-500",
  advanced: "from-cyan-100 to-sky-100 text-cyan-500",
  scaling: "from-rose-100 to-pink-100 text-rose-500",
  safety: "from-red-100 to-rose-100 text-red-500",
};

interface ClaudeCodeCardProps {
  topic: ClaudeCodeTopic;
  mastered: boolean;
  index: number;
  onClick: () => void;
}

export default function ClaudeCodeCard({ topic, mastered, index, onClick }: ClaudeCodeCardProps) {
  const borderClass = SECTION_BORDERS[topic.section] || "border-stone-300";
  const gradientClass = SECTION_GRADIENTS[topic.section] || "from-stone-100 to-stone-200 text-stone-400";

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative bg-white rounded-2xl border-2 ${borderClass}
        shadow-sm hover:shadow-lg transition-shadow duration-200
        overflow-hidden text-left cursor-pointer w-full
      `}
    >
      {/* Icon area with command pills */}
      <div className={`relative w-full aspect-[4/3] bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center gap-2 p-3`}>
        {/* Terminal icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>

        {/* Command pills */}
        {topic.commands && topic.commands.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {topic.commands.slice(0, 3).map((cmd) => (
              <span
                key={cmd}
                className="text-[10px] font-mono font-bold bg-white/70 px-1.5 py-0.5 rounded-md leading-tight"
              >
                {cmd}
              </span>
            ))}
          </div>
        )}

        {mastered && (
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-stone-900 leading-tight">{topic.title}</h3>
        <p className="text-xs text-stone-500 mt-1 line-clamp-2">{topic.tagline}</p>
      </div>
    </motion.button>
  );
}
