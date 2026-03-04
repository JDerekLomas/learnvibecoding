'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getData, onProgressChange } from '@/lib/progress';

const SESSION_KEY_PREFIX = 'lvc-session-';

interface LearnerInfo {
  id: string;
  name: string;
}

const allModalities = [
  {
    id: 'read',
    label: 'Read',
    description: 'Interactive guide with thought experiments',
    href: '/physicsdemo/learn',
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 28 28" fill="none">
        <path d="M4 7c2-2 5-3 8-2.5C14 5 14 5.5 14 6v14c-3-1-6-.5-8 1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" />
        <path d="M24 7c-2-2-5-3-8-2.5C14 5 14 5.5 14 6v14c3-1 6-.5 8 1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" />
        <path d="M6 10c2-.8 4-.6 6 0M6 13.5c2-.8 4-.6 6 0" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <path d="M22 10c-2-.8-4-.6-6 0M22 13.5c-2-.8-4-.6-6 0" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'quiz',
    label: 'Quiz',
    description: 'Test your intuitions (XP + confetti)',
    href: '/physicsdemo/quiz',
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 28 28" fill="none">
        <path d="M7 14c0-4.5 3-8 7-8s7 3.5 7 8c0 3-1.5 5-4 6l-1 3-2-3c-4-.5-7-3-7-6z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 10l-1 4h4l-2 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'ask-ai',
    label: 'Ask AI',
    description: 'Socratic physics tutor',
    href: '/physicsdemo/chat',
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="8" width="18" height="14" rx="4" stroke="currentColor" strokeWidth={2} />
        <circle cx="10.5" cy="15" r="1.5" fill="currentColor" />
        <circle cx="17.5" cy="15" r="1.5" fill="currentColor" />
        <path d="M12 19c1 1 3 1 4 0" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        <line x1="14" y1="4" x2="14" y2="8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        <circle cx="14" cy="4" r="1.5" fill="currentColor" />
      </svg>
    ),
    gradient: 'from-amber-600 to-amber-500',
  },
  {
    id: 'talk',
    label: 'Talk',
    description: 'Voice conversation about heat',
    href: '/physicsdemo/voice',
    icon: (
      <svg className="w-7 h-7 text-white" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="14" r="5" stroke="currentColor" strokeWidth={2} />
        <path d="M8.5 13c.5-.5 1.5-.5 2 0" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
        <circle cx="9" cy="12" r="0.8" fill="currentColor" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" />
        <path d="M17 10c1.5 1.5 1.5 6.5 0 8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        <path d="M20 7.5c2.5 2.5 2.5 10.5 0 13" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-red-500 to-rose-500',
  },
];

export default function SessionPage() {
  const { code } = useParams<{ code: string }>();
  const [state, setState] = useState<'loading' | 'name' | 'hub' | 'error'>('loading');
  const [learner, setLearner] = useState<LearnerInfo | null>(null);
  const [name, setName] = useState('');
  const [joining, setJoining] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sessionActivities, setSessionActivities] = useState<string[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const syncTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const storageKey = `${SESSION_KEY_PREFIX}${code}`;

  // Filter modalities based on teacher selection
  const modalities = sessionActivities
    ? allModalities.filter((m) => sessionActivities.includes(m.id))
    : allModalities;

  // Check if already joined
  useEffect(() => {
    async function init() {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const info = JSON.parse(stored) as LearnerInfo;
          setLearner(info);
          setState('hub');
        } catch {
          localStorage.removeItem(storageKey);
        }
      }
      // Fetch session data (for activities config and to verify it exists)
      const res = await fetch(`/api/physics-sessions/${code}`);
      if (res.ok) {
        const data = await res.json();
        if (data.progress?.activities?.length) {
          setSessionActivities(data.progress.activities);
        }
        if (!localStorage.getItem(storageKey)) {
          setState('name');
          setTimeout(() => inputRef.current?.focus(), 200);
        }
      } else {
        setErrorMsg('This session link is invalid or has expired.');
        setState('error');
      }
    }
    init();
  }, [code, storageKey]);

  // Auto-sync progress on changes
  const syncProgressToSession = useCallback(() => {
    if (!learner) return;
    if (syncTimeout.current) clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(async () => {
      const data = getData();
      await fetch(`/api/physics-sessions/${code}/learners/${learner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: data }),
      }).catch(() => {});
    }, 2000);
  }, [learner, code]);

  useEffect(() => {
    if (!learner) return;
    // Initial sync
    syncProgressToSession();
    // Sync on future changes
    return onProgressChange(syncProgressToSession);
  }, [learner, syncProgressToSession]);

  // Sync on page visibility change (coming back from an activity)
  useEffect(() => {
    if (!learner) return;
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncProgressToSession();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [learner, syncProgressToSession]);

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || joining) return;
    setJoining(true);
    try {
      const res = await fetch(`/api/physics-sessions/${code}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to join');
      }
      const info = await res.json();
      localStorage.setItem(storageKey, JSON.stringify(info));
      setLearner(info);
      setState('hub');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to join');
    } finally {
      setJoining(false);
    }
  }

  if (state === 'loading') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="inline-block w-8 h-8 border-[3px] border-stone-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-8">
          <p className="text-lg font-black text-stone-900 mb-2">Link not found</p>
          <p className="text-sm text-stone-500 mb-4">{errorMsg}</p>
          <Link
            href="/physicsdemo"
            className="inline-block px-5 py-2.5 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all no-underline"
          >
            Go to Physics Demo
          </Link>
        </div>
      </div>
    );
  }

  if (state === 'name') {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] p-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Physics Demo
          </div>
          <h1 className="text-2xl font-black text-stone-900 mb-2">
            Heat &amp; Thermal Energy
          </h1>
          <p className="text-sm text-stone-500 mb-6">
            Your teacher will be able to see your progress as you explore.
          </p>
          <form onSubmit={handleJoin}>
            <label className="block text-left text-sm font-bold text-stone-700 mb-1.5">
              What&apos;s your name?
            </label>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full rounded-lg border-[2.5px] border-stone-900 px-3.5 py-2.5 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:ring-offset-1 mb-4"
            />
            {errorMsg && (
              <p className="text-sm font-bold text-red-600 mb-3">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={!name.trim() || joining}
              className="w-full px-5 py-3 text-base font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#1c1917]"
            >
              {joining ? 'Joining...' : 'Start learning'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Hub view — same as main physics hub but with tracked banner
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Tracked banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-50 border-2 border-green-200"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-bold text-green-700">
          Tracking progress for {learner?.name}
        </span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-8 py-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Physics Demo
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 mb-3">
          Heat &amp; Thermal Energy
        </h1>
        <p className="text-lg text-stone-500 max-w-md mx-auto">
          Why does metal feel cold? Can a blanket keep a snowman frozen?
          Explore heat through 4 different ways to learn.
        </p>
      </motion.div>

      {/* Modality cards */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        {allModalities.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
          >
            <Link
              href={m.href}
              className="block p-5 rounded-2xl border-2 border-stone-200 bg-white transition-all duration-200 hover:border-amber-400 hover:shadow-lg group no-underline"
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {m.icon}
              </div>
              <p className="text-base font-extrabold text-stone-900">{m.label}</p>
              <p className="text-sm font-medium text-stone-400 mt-0.5">{m.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
