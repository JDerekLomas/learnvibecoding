"use client";

import { motion } from "framer-motion";
import type { ClaudeCodeTopic } from "@/data/claude-code-roadmap";

const SECTION_COLORS: Record<string, { iconBg: string; iconText: string; border: string; hoverBorder: string }> = {
  "getting-started": { iconBg: "bg-violet-500", iconText: "text-white", border: "border-violet-200", hoverBorder: "hover:border-violet-400" },
  context: { iconBg: "bg-amber-500", iconText: "text-white", border: "border-amber-200", hoverBorder: "hover:border-amber-400" },
  "core-workflow": { iconBg: "bg-blue-500", iconText: "text-white", border: "border-blue-200", hoverBorder: "hover:border-blue-400" },
  "skills-tools": { iconBg: "bg-emerald-500", iconText: "text-white", border: "border-emerald-200", hoverBorder: "hover:border-emerald-400" },
  advanced: { iconBg: "bg-cyan-500", iconText: "text-white", border: "border-cyan-200", hoverBorder: "hover:border-cyan-400" },
  scaling: { iconBg: "bg-rose-500", iconText: "text-white", border: "border-rose-200", hoverBorder: "hover:border-rose-400" },
  safety: { iconBg: "bg-red-500", iconText: "text-white", border: "border-red-200", hoverBorder: "hover:border-red-400" },
};

const SECTION_ICONS: Record<string, string> = {
  "getting-started": "🚀",
  context: "📜",
  "core-workflow": "⌨️",
  "skills-tools": "🔧",
  advanced: "🧩",
  scaling: "📊",
  safety: "🛡️",
};

interface ClaudeCodeCardProps {
  topic: ClaudeCodeTopic;
  mastered: boolean;
  index: number;
  position?: "left" | "center" | "right";
  onClick: () => void;
}

export default function ClaudeCodeCard({ topic, mastered, index, position = "center", onClick }: ClaudeCodeCardProps) {
  const colors = SECTION_COLORS[topic.section] || SECTION_COLORS["getting-started"];
  const icon = SECTION_ICONS[topic.section] || "📦";

  const posClass = position === "left" ? "self-start" : position === "right" ? "self-end" : "self-center";

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        ${posClass} w-full max-w-[360px]
        bg-white rounded-2xl border-2 ${colors.border} ${colors.hoverBorder}
        shadow-sm hover:shadow-lg transition-all duration-200
        p-4 flex items-center gap-3.5 text-left cursor-pointer
      `}
    >
      {/* Icon circle */}
      <div
        className={`
          flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
          ${colors.iconBg} ${colors.iconText} text-lg
        `}
      >
        {icon}
      </div>

      {/* Text + command pills */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-stone-900 leading-tight truncate">{topic.title}</h3>
          {mastered && (
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
        </div>
        <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{topic.tagline}</p>
        {topic.commands && topic.commands.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {topic.commands.slice(0, 3).map((cmd) => (
              <span
                key={cmd}
                className="text-[10px] font-mono font-bold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-md leading-tight"
              >
                {cmd}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
}
