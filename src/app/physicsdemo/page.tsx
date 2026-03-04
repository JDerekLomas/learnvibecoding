'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ShareButton from '@/components/physics/ShareButton';

const modalities = [
  {
    label: 'Read',
    description: 'Interactive guide with thought experiments',
    href: '/physicsdemo/learn',
    icon: (
      /* Open book with wavy pages */
      <svg className="w-7 h-7 text-white" viewBox="0 0 28 28" fill="none">
        <path d="M4 7c2-2 5-3 8-2.5C14 5 14 5.5 14 6v14c-3-1-6-.5-8 1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" />
        <path d="M24 7c-2-2-5-3-8-2.5C14 5 14 5.5 14 6v14c3-1 6-.5 8 1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" />
        <path d="M6 10c2-.8 4-.6 6 0M6 13.5c2-.8 4-.6 6 0" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
        <path d="M22 10c-2-.8-4-.6-6 0M22 13.5c-2-.8-4-.6-6 0" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
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
      /* Lightning bolt in a thought bubble */
      <svg className="w-7 h-7 text-white" viewBox="0 0 28 28" fill="none">
        <path d="M7 14c0-4.5 3-8 7-8s7 3.5 7 8c0 3-1.5 5-4 6l-1 3-2-3c-4-.5-7-3-7-6z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 10l-1 4h4l-2 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
      /* Friendly robot face */
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
    hoverBorder: 'hover:border-amber-400',
    hoverShadow: 'hover:shadow-amber-200/40',
  },
  {
    label: 'Talk',
    description: 'Voice conversation about heat',
    href: '/physicsdemo/voice',
    icon: (
      /* Sound waves radiating from mouth */
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
              <p className="text-sm font-medium text-stone-400 mt-0.5">{m.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* What you'll learn */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-2xl border-2 border-stone-200 shadow-sm px-6 py-5"
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

      {/* Share button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 flex justify-center"
      >
        <ShareButton />
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 bg-white/80 rounded-xl px-4 py-3 text-center"
      >
        <p className="text-xs text-stone-400">
          An experiment in multi-modal learning by{' '}
          <a href="https://ai-growth.net" className="underline hover:text-stone-600 transition-colors">
            ai-growth.net
          </a>
        </p>
      </motion.div>
    </div>
  );
}
