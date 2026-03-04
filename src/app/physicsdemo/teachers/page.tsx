'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: 'Pick activities and create a session',
    description:
      'Choose which learning activities your students will see, name the session, and hit create.',
    detail: 'No account needed. Sessions are created instantly.',
  },
  {
    number: 2,
    title: 'Share the link with students',
    description:
      'You get a unique learner link that copies to your clipboard. Send it via chat, email, or project it on the board.',
    detail:
      'Students open the link, type their name, and see only the activities you selected.',
  },
  {
    number: 3,
    title: 'Watch their progress live',
    description:
      'Your teacher dashboard shows every student in real-time — chapters read, quiz scores by topic, and who is currently active.',
    detail:
      'Auto-refreshes every 15 seconds. Keep it open on your laptop while students explore.',
  },
];

const availableActivities = [
  {
    id: 'read',
    label: 'Read',
    desc: 'Interactive guide with thought experiments',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'quiz',
    label: 'Quiz',
    desc: 'Test intuitions with XP and confetti',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'ai-quiz',
    label: 'AI Quiz',
    desc: 'Chat-powered adaptive quiz',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    id: 'ask-ai',
    label: 'Ask AI',
    desc: 'Socratic physics tutor',
    gradient: 'from-amber-600 to-amber-500',
  },
  {
    id: 'talk',
    label: 'Talk',
    desc: 'Voice conversation about heat',
    gradient: 'from-red-500 to-rose-500',
  },
];

export default function TeachersPage() {
  const [state, setState] = useState<'idle' | 'naming' | 'creating' | 'done'>(
    'idle'
  );
  const [label, setLabel] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    availableActivities.map((a) => a.id)
  );
  const [observeUrl, setObserveUrl] = useState('');
  const [learnerUrl, setLearnerUrl] = useState('');
  const [copied, setCopied] = useState<'learner' | 'observe' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === 'naming') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [state]);

  function toggleActivity(id: string) {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (selectedActivities.length === 0) return;
    setState('creating');
    try {
      const allSelected =
        selectedActivities.length === availableActivities.length;
      const res = await fetch('/api/physics-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: label.trim() || undefined,
          activities: allSelected ? undefined : selectedActivities,
        }),
      });
      const { code, error } = await res.json();
      if (error) throw new Error(error);

      const origin = window.location.origin;
      setObserveUrl(`${origin}/physicsdemo/observe/${code}`);
      setLearnerUrl(`${origin}/physicsdemo/s/${code}`);
      setState('done');
    } catch {
      setState('idle');
    }
  }

  async function copyToClipboard(text: string, which: 'learner' | 'observe') {
    await navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2500);
  }

  return (
    <div
      className="max-w-2xl mx-auto px-6 py-12"
      style={{
        backgroundImage:
          'radial-gradient(circle, #e7e5e4 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Back link */}
      <Link
        href="/physicsdemo"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors no-underline mb-6"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="10 3 5 8 10 13" />
        </svg>
        Back to Physics Demo
      </Link>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFF8F0] rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] px-8 py-8 mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-[2px] border-stone-900 bg-white text-stone-900 text-xs font-black uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]" />
          For Teachers
        </div>
        <h1 className="text-3xl font-black text-stone-900 mb-3">
          Use this in your classroom
        </h1>
        <p className="text-lg text-stone-500 font-medium max-w-lg mx-auto">
          Set up a class session in seconds. Pick the activities you want,
          share a link, and watch your students learn in real-time.
        </p>
      </motion.div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 mb-5 text-center">
          How it works
        </h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-5"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-[#E07A5F] text-white text-sm font-black flex items-center justify-center mt-0.5">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-base font-black text-stone-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-stone-600 mb-1.5">
                    {step.description}
                  </p>
                  <p className="text-xs text-stone-400 font-medium">
                    {step.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* What you see on the dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] p-6 mb-10"
      >
        <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 mb-4">
          What you see on the dashboard
        </h2>
        <div className="space-y-3">
          {[
            'Who has joined and who is currently active (green dot)',
            'Chapters each student has read (out of 5)',
            'Quiz scores broken down by topic',
            'Total questions answered and XP earned',
            'Confidence calibration — are they overconfident or underconfident?',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#E07A5F] shrink-0 border border-stone-900" />
              <p className="text-sm text-stone-600">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA — Create a session */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-[#E07A5F] rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] p-6"
        id="create"
      >
        {state === 'idle' && (
          <div className="text-center">
            <h2 className="text-xl font-black text-white mb-2">
              Ready to try it?
            </h2>
            <p className="text-sm text-white/80 mb-5 max-w-sm mx-auto">
              Create a session now. It takes 5 seconds and no sign-up is
              required.
            </p>
            <button
              onClick={() => setState('naming')}
              className="px-6 py-3 text-base font-black rounded-lg border-[2.5px] border-stone-900 bg-white text-stone-900 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
            >
              Create a class session
            </button>
          </div>
        )}

        {state === 'naming' && (
          <form onSubmit={handleCreate} className="max-w-md mx-auto">
            <h2 className="text-xl font-black text-white mb-5 text-center">
              Set up your session
            </h2>

            {/* Session name */}
            <label className="block text-sm font-bold text-white/90 mb-1.5">
              Session name (optional)
            </label>
            <input
              ref={inputRef}
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Period 3, Tuesday Lab"
              className="w-full rounded-lg border-[2.5px] border-stone-900 px-3.5 py-2.5 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#E07A5F] mb-5"
            />

            {/* Activity picker */}
            <label className="block text-sm font-bold text-white/90 mb-2">
              Which activities should students see?
            </label>
            <div className="space-y-2 mb-5">
              {availableActivities.map((activity) => {
                const selected = selectedActivities.includes(activity.id);
                return (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => toggleActivity(activity.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-[2.5px] transition-all text-left ${
                      selected
                        ? 'border-stone-900 bg-white shadow-[2px_2px_0_#1c1917]'
                        : 'border-white/30 bg-white/10 hover:border-white/60'
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${
                        selected
                          ? 'bg-[#E07A5F] border-stone-900'
                          : 'bg-transparent border-white/50'
                      }`}
                    >
                      {selected && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <polyline points="2 6 5 9 10 3" />
                        </svg>
                      )}
                    </div>

                    {/* Color dot */}
                    <div
                      className={`w-6 h-6 rounded bg-gradient-to-br ${activity.gradient} shrink-0 ${
                        !selected ? 'opacity-40' : ''
                      }`}
                    />

                    {/* Label */}
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-black ${
                          selected ? 'text-stone-900' : 'text-white/70'
                        }`}
                      >
                        {activity.label}
                      </p>
                      <p
                        className={`text-xs ${
                          selected ? 'text-stone-400' : 'text-white/40'
                        }`}
                      >
                        {activity.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedActivities.length === 0 && (
              <p className="text-xs font-bold text-white bg-white/20 rounded-lg px-3 py-2 mb-3 text-center">
                Select at least one activity
              </p>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={selectedActivities.length === 0}
                className="flex-1 px-5 py-2.5 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-white text-stone-900 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#1c1917]"
              >
                Create session ({selectedActivities.length} activit
                {selectedActivities.length === 1 ? 'y' : 'ies'})
              </button>
              <button
                type="button"
                onClick={() => setState('idle')}
                className="px-4 py-2.5 text-sm font-bold rounded-lg border-[2.5px] border-white/40 text-white hover:border-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {state === 'creating' && (
          <div className="py-4 text-center">
            <div className="inline-block w-8 h-8 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {state === 'done' && (
          <div className="max-w-sm mx-auto text-center">
            <h2 className="text-xl font-black text-white mb-1 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="3 8 6.5 11.5 13 4.5" />
              </svg>
              Session created
            </h2>
            <p className="text-sm text-white/80 mb-5">
              Share the learner link with your students, then open the dashboard
              to watch their progress.
            </p>
            <div className="space-y-2.5">
              <button
                onClick={() => copyToClipboard(learnerUrl, 'learner')}
                className="w-full px-4 py-3 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-white text-stone-900 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-stone-500"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="5" y="5" width="9" height="9" rx="1.5" />
                  <path d="M5 11H3.5A1.5 1.5 0 012 9.5v-7A1.5 1.5 0 013.5 1h7A1.5 1.5 0 0112 2.5V5" />
                </svg>
                {copied === 'learner'
                  ? 'Copied to clipboard!'
                  : 'Copy learner link (for students)'}
              </button>
              <a
                href={observeUrl}
                className="w-full px-4 py-3 text-sm font-black rounded-lg border-[2.5px] border-white bg-transparent text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 no-underline"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="8" cy="8" r="3" />
                  <circle cx="8" cy="8" r="6" />
                </svg>
                Open your dashboard
              </a>
            </div>
            <button
              onClick={() => {
                setState('idle');
                setLabel('');
                setSelectedActivities(availableActivities.map((a) => a.id));
              }}
              className="mt-4 text-xs font-bold text-white/60 hover:text-white transition-colors"
            >
              Create another session
            </button>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-xs font-bold text-stone-400">
          An experiment in multi-modal learning by{' '}
          <a
            href="https://ai-growth.net"
            className="underline hover:text-stone-900 transition-colors"
          >
            ai-growth.net
          </a>
        </p>
      </motion.div>
    </div>
  );
}
