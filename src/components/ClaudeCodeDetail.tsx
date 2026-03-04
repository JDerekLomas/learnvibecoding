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
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Mobile: bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 md:hidden max-h-[85vh] bg-white border-t-[2.5px] border-stone-900 overflow-y-auto"
          >
            <div className="sticky top-0 z-10 bg-white pt-3 pb-2 flex justify-center border-b border-stone-200">
              <div className="w-10 h-1 rounded-full bg-stone-400" />
            </div>
            <DrawerContent topic={topic} mastered={mastered} onToggleMastered={onToggleMastered} onClose={onClose} />
          </motion.div>

          {/* Desktop: right panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 hidden md:block w-[420px] bg-white overflow-y-auto border-l-[2.5px] border-stone-900"
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
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-md border-[1.5px] border-stone-900 bg-white hover:bg-stone-100 flex items-center justify-center transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <h2 className="text-xl font-black text-stone-900 pr-10">{topic.title}</h2>
      <p className="text-sm font-bold text-stone-500 mt-1">{topic.tagline}</p>
      <p className="text-base text-stone-700 mt-4 leading-relaxed">{topic.description}</p>

      {/* Key commands */}
      {topic.commands && topic.commands.length > 0 && (
        <div className="mt-5">
          <h3 className="text-xs font-black text-stone-400 uppercase tracking-wider mb-2">Key Commands</h3>
          <div className="flex flex-wrap gap-2">
            {topic.commands.map((cmd) => (
              <code
                key={cmd}
                className="text-sm font-mono font-bold bg-white text-stone-900 px-3 py-1.5 rounded-md border-[2px] border-stone-900 shadow-[2px_2px_0_#1c1917]"
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
          <h3 className="text-xs font-black text-stone-400 uppercase tracking-wider mb-2">Resources</h3>
          <div className="space-y-2">
            {topic.resources.map((resource, i) => {
              const { icon, label } = RESOURCE_ICONS[resource.type];
              return (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border-[2px] border-stone-900 bg-white shadow-[2px_2px_0_#1c1917] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all no-underline group"
                >
                  <span className="text-stone-600 flex-shrink-0">{icon}</span>
                  <span className="text-sm font-bold text-stone-900 flex-1">{resource.title}</span>
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-wide">{label}</span>
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
          mt-6 w-full py-3 rounded-lg font-black text-sm transition-all duration-150
          border-[2.5px] border-stone-900
          ${mastered
            ? "bg-emerald-400 text-stone-900 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            : "bg-white text-stone-900 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          }
        `}
      >
        {mastered ? "Learned -- Click to Unmark" : "Mark as Learned"}
      </button>
    </div>
  );
}
