"use client";

import { type ReactNode } from "react";
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

interface ClaudeCodeCardProps {
  topic: ClaudeCodeTopic;
  mastered: boolean;
  index: number;
  position?: "left" | "center" | "right";
  onClick: () => void;
}

export default function ClaudeCodeCard({ topic, mastered, index, position = "center", onClick }: ClaudeCodeCardProps) {
  const colors = SECTION_COLORS[topic.section] || SECTION_COLORS["getting-started"];
  const icon = SECTION_ICONS[topic.section] || SECTION_ICONS["core-workflow"];

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
