"use client";

import { type ReactNode, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ClaudeCodeTopic, ClaudeCodeResource } from "@/data/claude-code-roadmap";

interface ClaudeCodeDetailProps {
  topic: ClaudeCodeTopic | null;
  mastered: boolean;
  onClose: () => void;
  onToggleMastered: () => void;
}

const RESOURCE_ICONS: Record<ClaudeCodeResource["type"], { icon: ReactNode; label: string }> = {
  docs: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    label: "Docs",
  },
  article: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    label: "Article",
  },
  video: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    label: "Video",
  },
  github: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    label: "GitHub",
  },
  tool: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    label: "Tool",
  },
};

export default function ClaudeCodeDetail({ topic, mastered, onClose, onToggleMastered }: ClaudeCodeDetailProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    if (topic) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [topic]);

  return (
    <AnimatePresence>
      {topic && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Mobile: bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 md:hidden max-h-[85vh] bg-white rounded-t-3xl shadow-2xl overflow-y-auto"
          >
            {/* Drag handle */}
            <div className="sticky top-0 z-10 bg-white pt-3 pb-2 flex justify-center rounded-t-3xl">
              <div className="w-10 h-1 rounded-full bg-stone-300" />
            </div>
            <DrawerContent topic={topic} mastered={mastered} onToggleMastered={onToggleMastered} onClose={onClose} />
          </motion.div>

          {/* Desktop: right panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 hidden md:block w-[420px] bg-white shadow-2xl overflow-y-auto border-l border-stone-200"
          >
            <DrawerContent topic={topic} mastered={mastered} onToggleMastered={onToggleMastered} onClose={onClose} showCloseButton />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerContent({
  topic,
  mastered,
  onToggleMastered,
  onClose,
  showCloseButton = false,
}: {
  topic: ClaudeCodeTopic;
  mastered: boolean;
  onToggleMastered: () => void;
  onClose: () => void;
  showCloseButton?: boolean;
}) {
  return (
    <div className="p-6 pb-10">
      {showCloseButton && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <h2 className="text-xl font-extrabold text-stone-900 pr-10">{topic.title}</h2>
      <p className="text-sm font-semibold text-stone-500 mt-1">{topic.tagline}</p>
      <p className="text-base text-stone-700 mt-4 leading-relaxed">{topic.description}</p>

      {/* Key commands */}
      {topic.commands && topic.commands.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">Key Commands</h3>
          <div className="flex flex-wrap gap-2">
            {topic.commands.map((cmd) => (
              <code
                key={cmd}
                className="text-sm font-mono font-semibold bg-stone-100 text-stone-700 px-3 py-1.5 rounded-lg border border-stone-200"
              >
                {cmd}
              </code>
            ))}
          </div>
        </div>
      )}

      {/* Resources */}
      {topic.resources.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">Resources</h3>
          <div className="space-y-2">
            {topic.resources.map((resource, i) => {
              const { icon, label } = RESOURCE_ICONS[resource.type];
              return (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-stone-200 hover:border-indigo-300 hover:bg-stone-50 transition-colors no-underline group"
                >
                  <span className="text-stone-400 group-hover:text-indigo-500 transition-colors flex-shrink-0">{icon}</span>
                  <span className="text-sm font-semibold text-stone-700 group-hover:text-indigo-600 transition-colors flex-1">{resource.title}</span>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">{label}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 group-hover:text-indigo-400 transition-colors flex-shrink-0">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Mastered toggle */}
      <button
        onClick={onToggleMastered}
        className={`
          mt-6 w-full py-3 rounded-xl font-bold text-sm transition-all duration-200
          ${mastered
            ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300 hover:bg-emerald-200"
            : "bg-stone-100 text-stone-600 border-2 border-stone-200 hover:bg-stone-200"
          }
        `}
      >
        {mastered ? "Learned — Click to Unmark" : "Mark as Learned"}
      </button>
    </div>
  );
}
