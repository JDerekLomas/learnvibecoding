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

const NAME_KEY = 'lvc-share-name';

export default function ShareButton() {
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [hasProgress, setHasProgress] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const syncTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setCode(getShareCode());
    setName(localStorage.getItem(NAME_KEY) || '');
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

  // Focus input when prompt appears
  useEffect(() => {
    if (showNamePrompt) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showNamePrompt]);

  const doShare = useCallback(async (displayName: string) => {
    setSharing(true);
    try {
      const trimmed = displayName.trim();
      if (trimmed) localStorage.setItem(NAME_KEY, trimmed);
      const newCode = await shareProgress(trimmed || undefined);
      setCode(newCode);
      const url = `${window.location.origin}/physicsdemo/observe/${newCode}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Share failed:', e);
    } finally {
      setSharing(false);
      setShowNamePrompt(false);
    }
  }, []);

  const handleClick = useCallback(() => {
    // Already shared before — just update & copy
    if (code) {
      doShare(name);
      return;
    }
    // First time — ask for name
    setShowNamePrompt(true);
  }, [code, name, doShare]);

  const handleSubmitName = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      doShare(name);
    },
    [name, doShare]
  );

  if (!hasProgress && !code) return null;

  return (
    <div className="relative">
      <AnimatePresence>
        {showNamePrompt && (
          <motion.form
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmitName}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-4 w-72 z-20"
          >
            <p className="text-sm font-black text-stone-900 mb-2">
              What&apos;s your name?
            </p>
            <p className="text-xs text-stone-400 mb-3">
              This shows on your progress page so your teacher/friend knows it&apos;s you.
            </p>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full rounded-lg border-[2.5px] border-stone-900 px-3 py-2 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:ring-offset-1 mb-3"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={sharing}
                className="flex-1 px-4 py-2 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all disabled:opacity-50"
              >
                {sharing ? 'Sharing...' : 'Share & copy link'}
              </button>
              <button
                type="button"
                onClick={() => setShowNamePrompt(false)}
                className="px-3 py-2 text-sm font-bold rounded-lg border-[2.5px] border-stone-300 text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={handleClick}
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
    </div>
  );
}
