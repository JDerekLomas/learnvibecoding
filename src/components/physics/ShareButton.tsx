'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShareButton() {
  const [state, setState] = useState<'idle' | 'naming' | 'creating' | 'done'>('idle');
  const [label, setLabel] = useState('');
  const [observeUrl, setObserveUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === 'naming') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [state]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setState('creating');
    try {
      const res = await fetch('/api/physics-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: label.trim() || undefined }),
      });
      const { code, error } = await res.json();
      if (error) throw new Error(error);

      const origin = window.location.origin;
      setObserveUrl(`${origin}/physicsdemo/observe/${code}`);

      // Copy learner link
      await navigator.clipboard.writeText(`${origin}/physicsdemo/s/${code}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      setState('done');
    } catch (err) {
      setState('idle');
    }
  }

  async function handleCopyLearnerLink() {
    const code = observeUrl.split('/observe/')[1];
    const url = `${window.location.origin}/physicsdemo/s/${code}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {state === 'naming' && (
          <motion.form
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleCreate}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-5 w-80 z-20"
          >
            <p className="text-sm font-black text-stone-900 mb-2">
              Set up a class session
            </p>

            {/* How it works - step by step */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-start gap-2">
                <span className="shrink-0 w-5 h-5 rounded-full bg-[#E07A5F] text-white text-[10px] font-black flex items-center justify-center mt-0.5">1</span>
                <p className="text-xs text-stone-500">You get a <strong className="text-stone-700">learner link</strong> to share with students</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0 w-5 h-5 rounded-full bg-[#E07A5F] text-white text-[10px] font-black flex items-center justify-center mt-0.5">2</span>
                <p className="text-xs text-stone-500">Students open it, enter their name, and explore</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0 w-5 h-5 rounded-full bg-[#E07A5F] text-white text-[10px] font-black flex items-center justify-center mt-0.5">3</span>
                <p className="text-xs text-stone-500">You watch their progress live on your <strong className="text-stone-700">dashboard</strong></p>
              </div>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Session name, e.g. 'Period 3' (optional)"
              className="w-full rounded-lg border-[2.5px] border-stone-900 px-3 py-2 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:ring-offset-1 mb-3"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
              >
                Create session
              </button>
              <button
                type="button"
                onClick={() => setState('idle')}
                className="px-3 py-2 text-sm font-bold rounded-lg border-[2.5px] border-stone-300 text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}

        {state === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-5 w-80 z-20"
          >
            <p className="text-sm font-black text-green-600 mb-1 flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="3 8 6.5 11.5 13 4.5" />
              </svg>
              Session created!
            </p>
            <p className="text-xs text-stone-500 mb-4">
              The learner link was copied to your clipboard. Send it to your students — they&apos;ll enter their name and start exploring.
            </p>
            <div className="space-y-2">
              <button
                onClick={handleCopyLearnerLink}
                className="w-full px-3 py-2 text-xs font-bold rounded-lg border-[2.5px] border-stone-900 bg-white shadow-[2px_2px_0_#1c1917] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5 text-stone-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="5" y="5" width="9" height="9" rx="1.5" />
                  <path d="M5 11H3.5A1.5 1.5 0 012 9.5v-7A1.5 1.5 0 013.5 1h7A1.5 1.5 0 0112 2.5V5" />
                </svg>
                {copied ? 'Copied!' : 'Copy learner link again'}
              </button>
              <a
                href={observeUrl}
                className="w-full px-3 py-2 text-xs font-bold rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[2px_2px_0_#1c1917] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2 no-underline"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="8" cy="8" r="3" />
                  <circle cx="8" cy="8" r="6" />
                </svg>
                Open your dashboard
              </a>
            </div>
            <button
              onClick={() => setState('idle')}
              className="mt-3 text-[11px] font-bold text-stone-400 hover:text-stone-600 transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setState(state === 'idle' ? 'naming' : 'idle')}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg border-[2.5px] border-stone-900 bg-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none text-stone-800"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="5" r="3" />
          <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="10" y1="4" x2="14" y2="4" />
        </svg>
        Teachers: set up a class session
      </motion.button>
    </div>
  );
}
