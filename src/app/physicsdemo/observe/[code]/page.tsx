'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LearnerData, QuizResult } from '@/lib/progress';

const TOPIC_LABELS: Record<string, string> = {
  'temperature-vs-heat': 'Temp vs Heat',
  conduction: 'Conduction',
  convection: 'Convection',
  radiation: 'Radiation',
  'phase-changes': 'Phase Changes',
  'specific-heat': 'Specific Heat',
  insulation: 'Insulation',
};

const CHAPTERS = [
  { slug: 'temperature-vs-heat', title: 'Temperature vs. Thermal Energy' },
  { slug: 'conduction', title: 'Conduction: Heat Through Contact' },
  { slug: 'convection', title: 'Convection: Heat Through Movement' },
  { slug: 'radiation', title: 'Radiation: Heat Through Empty Space' },
  { slug: 'phase-changes', title: 'Phase Changes: The Hidden Heat' },
];

interface SessionData {
  short_code: string;
  display_name: string | null;
  progress: LearnerData;
  created_at: string;
  updated_at: string;
}

function StatCard({
  label,
  value,
  sub,
  icon,
  gradient,
  delay,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-5"
    >
      <div className="flex items-start gap-3">
        <div
          className={`h-10 w-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
            {label}
          </p>
          <p className="text-2xl font-black text-stone-900 leading-tight">
            {value}
          </p>
          {sub && (
            <p className="text-xs font-medium text-stone-400 mt-0.5">{sub}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TopicBar({
  label,
  correct,
  total,
}: {
  label: string;
  correct: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold text-stone-500 w-24 shrink-0 truncate">
        {label}
      </span>
      <div className="flex-1 h-3 rounded-full bg-stone-100 border border-stone-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            pct >= 70
              ? 'bg-gradient-to-r from-green-400 to-emerald-500'
              : pct >= 40
                ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                : 'bg-gradient-to-r from-red-400 to-rose-500'
          }`}
        />
      </div>
      <span className="text-xs font-black text-stone-600 w-12 text-right">
        {correct}/{total}
      </span>
    </div>
  );
}

export default function ObservePage() {
  const { code } = useParams<{ code: string }>();
  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/physics-sessions/${code}`);
        if (!res.ok) {
          setError(res.status === 404 ? 'Session not found' : 'Failed to load');
          return;
        }
        setSession(await res.json());
      } catch {
        setError('Failed to load');
      } finally {
        setLoading(false);
      }
    }
    load();
    // Poll for updates every 30s
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, [code]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="inline-block w-8 h-8 border-[3px] border-stone-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-8">
          <p className="text-lg font-black text-stone-900 mb-2">
            {error || 'Not found'}
          </p>
          <p className="text-sm text-stone-500 mb-4">
            This link may have expired or doesn&apos;t exist.
          </p>
          <Link
            href="/physicsdemo"
            className="inline-block px-5 py-2.5 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all no-underline"
          >
            Try the demo yourself
          </Link>
        </div>
      </div>
    );
  }

  const p = session.progress;
  const quizResults = p.quizResults || [];
  const visited = p.visited || [];
  const totalXP = p.totalXP || 0;
  const discoveries = p.discoveries || [];

  // Quiz stats
  const totalQuestions = quizResults.length;
  const correctAnswers = quizResults.filter((r) => r.correct).length;
  const accuracy =
    totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Quiz by topic
  const topicStats: Record<string, { correct: number; total: number }> = {};
  quizResults.forEach((r: QuizResult) => {
    (r.tags || []).forEach((tag) => {
      if (!topicStats[tag]) topicStats[tag] = { correct: 0, total: 0 };
      topicStats[tag].total++;
      if (r.correct) topicStats[tag].correct++;
    });
  });

  // Confidence calibration
  const confident = quizResults.filter((r) => r.confidence === 'know');
  const confidentCorrect = confident.filter((r) => r.correct).length;
  const calibration =
    confident.length > 0
      ? Math.round((confidentCorrect / confident.length) * 100)
      : null;

  // Chapters read
  const chapterVisits = CHAPTERS.filter((ch) =>
    visited.some(
      (v) =>
        v.includes(ch.slug) && v.includes('physicsdemo/learn')
    )
  );

  // Active status
  const updatedAt = new Date(session.updated_at);
  const isActive = Date.now() - updatedAt.getTime() < 60_000;
  const lastSeen = getRelativeTime(updatedAt);

  const displayName = session.display_name || 'A learner';

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] p-6 mb-6"
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              )}
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                {isActive ? 'Active now' : `Last active ${lastSeen}`}
              </span>
            </div>
            <h1 className="text-2xl font-black text-stone-900">
              {displayName}&apos;s Progress
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Heat &amp; Thermal Energy — Physics Demo
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-[#E07A5F]">{totalXP}</p>
            <p className="text-xs font-bold text-stone-400">XP earned</p>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          label="Quiz Questions"
          value={totalQuestions}
          sub={totalQuestions > 0 ? `${accuracy}% accuracy` : 'Not started'}
          icon={
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M13 10l-1 4h4l-2 5" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          }
          gradient="from-orange-500 to-red-500"
          delay={0.1}
        />
        <StatCard
          label="Chapters Read"
          value={`${chapterVisits.length}/${CHAPTERS.length}`}
          sub={chapterVisits.length > 0 ? chapterVisits[chapterVisits.length - 1].title : 'Not started'}
          icon={
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 7c2-2 5-3 8-2.5C14 5 14 5.5 14 6v14c-3-1-6-.5-8 1" />
              <path d="M20 7c-2-2-5-3-8-2.5C10 5 10 5.5 10 6v14c3-1 6-.5 8 1" />
            </svg>
          }
          gradient="from-amber-500 to-orange-500"
          delay={0.15}
        />
        <StatCard
          label="Calibration"
          value={calibration !== null ? `${calibration}%` : '—'}
          sub={
            calibration !== null
              ? `${confidentCorrect}/${confident.length} confident answers correct`
              : 'No confident answers yet'
          }
          icon={
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="12" r="7" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          }
          gradient="from-violet-500 to-purple-500"
          delay={0.2}
        />
        <StatCard
          label="Discoveries"
          value={discoveries.length}
          sub={discoveries.length > 0 ? 'Voice/text explorations' : 'Not started'}
          icon={
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" />
            </svg>
          }
          gradient="from-red-500 to-rose-500"
          delay={0.25}
        />
      </div>

      {/* Topic breakdown */}
      {totalQuestions > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-5 mb-6"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
            Quiz Performance by Topic
          </h2>
          <div className="space-y-3">
            {Object.entries(topicStats)
              .sort(([, a], [, b]) => b.total - a.total)
              .map(([tag, stats]) => (
                <TopicBar
                  key={tag}
                  label={TOPIC_LABELS[tag] || tag}
                  correct={stats.correct}
                  total={stats.total}
                />
              ))}
          </div>
        </motion.div>
      )}

      {/* Chapter progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-5 mb-6"
      >
        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
          Reading Progress
        </h2>
        <div className="space-y-2">
          {CHAPTERS.map((ch) => {
            const read = chapterVisits.some((v) => v.slug === ch.slug);
            return (
              <div key={ch.slug} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                    read
                      ? 'border-green-500 bg-green-500'
                      : 'border-stone-300 bg-white'
                  }`}
                >
                  {read && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="2.5 6 5 8.5 9.5 3.5" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    read ? 'text-stone-900' : 'text-stone-400'
                  }`}
                >
                  {ch.title}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Link
          href="/physicsdemo"
          className="inline-block px-6 py-3 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all no-underline"
        >
          Try it yourself
        </Link>
      </motion.div>
    </div>
  );
}

function getRelativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
