'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const modalities = [
  {
    label: 'Read',
    description: 'Interactive guide with thought experiments',
    href: '/physicsdemo/learn',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-500',
    hoverBorder: 'hover:border-amber-400',
    hoverShadow: 'hover:shadow-amber-200/40',
  },
  {
    label: 'Quiz',
    description: 'Test your intuitions (XP + confetti)',
    href: '/physicsdemo/quiz',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    gradient: 'from-orange-500 to-red-500',
    hoverBorder: 'hover:border-orange-400',
    hoverShadow: 'hover:shadow-orange-200/40',
  },
  {
    label: 'Ask AI',
    description: 'Socratic physics tutor',
    href: '/physicsdemo/chat',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    gradient: 'from-amber-600 to-amber-500',
    hoverBorder: 'hover:border-amber-400',
    hoverShadow: 'hover:shadow-amber-200/40',
  },
  {
    label: 'Talk',
    description: 'Voice conversation about heat',
    href: '/physicsdemo/voice',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    gradient: 'from-red-500 to-rose-500',
    hoverBorder: 'hover:border-red-400',
    hoverShadow: 'hover:shadow-red-200/40',
  },
];

const concepts = [
  'Temperature vs. thermal energy — they\'re not the same thing',
  'Three ways heat moves: conduction, convection, radiation',
  'Why metal feels cold (even at room temperature)',
  'Phase changes and the "hidden" energy in steam',
  'How heat shapes weather, clothing, and cooking',
];

export default function PhysicsDemoHub() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
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
        {modalities.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
          >
            <Link
              href={m.href}
              className={`block p-5 rounded-2xl border-2 border-stone-200 bg-white transition-all duration-200 ${m.hoverBorder} hover:shadow-lg ${m.hoverShadow} group no-underline`}
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {m.icon}
              </div>
              <p className="text-base font-extrabold text-stone-900">{m.label}</p>
              <p className="text-xs font-medium text-stone-400 mt-0.5">{m.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* What you'll learn */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
          What you&apos;ll learn
        </h2>
        <ul className="space-y-2.5">
          {concepts.map((c, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
              className="flex items-start gap-2.5 text-sm text-stone-600"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              {c}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center text-xs text-stone-400"
      >
        An experiment in multi-modal learning by{' '}
        <a href="https://ai-growth.net" className="underline hover:text-stone-600 transition-colors">
          ai-growth.net
        </a>
      </motion.p>
    </div>
  );
}
