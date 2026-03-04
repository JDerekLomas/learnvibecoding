'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  shareProgress,
  syncProgress,
  getShareCode,
  onProgressChange,
  getData,
} from '@/lib/progress';

export default function ShareButton() {
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [hasProgress, setHasProgress] = useState(false);
  const syncTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setCode(getShareCode());
    const d = getData();
    setHasProgress(d.quizResults.length > 0 || d.visited.length > 0);
  }, []);

  // Auto-sync on progress changes (debounced)
  useEffect(() => {
    return onProgressChange(() => {
      setHasProgress(true);
      if (syncTimeout.current) clearTimeout(syncTimeout.current);
      syncTimeout.current = setTimeout(() => {
        syncProgress();
      }, 3000);
    });
  }, []);

  const handleShare = useCallback(async () => {
    setSharing(true);
    try {
      const newCode = await shareProgress();
      setCode(newCode);
      const url = `${window.location.origin}/physicsdemo/observe/${newCode}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Share failed:', e);
    } finally {
      setSharing(false);
    }
  }, []);

  if (!hasProgress && !code) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={handleShare}
      disabled={sharing}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg border-[2.5px] border-stone-900 bg-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-50 text-stone-800"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-green-600"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="3 8 6.5 11.5 13 4.5" />
            </svg>
            Link copied!
          </motion.span>
        ) : sharing ? (
          <motion.span
            key="sharing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <div className="w-3.5 h-3.5 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
            Sharing...
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="4" cy="8" r="2" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="12" cy="12" r="2" />
              <line x1="5.8" y1="7.2" x2="10.2" y2="4.8" />
              <line x1="5.8" y1="8.8" x2="10.2" y2="11.2" />
            </svg>
            {code ? 'Update & copy link' : 'Share my progress'}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
