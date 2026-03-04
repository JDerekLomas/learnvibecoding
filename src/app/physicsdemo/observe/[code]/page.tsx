'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  { slug: 'temperature-vs-heat', title: 'Temp vs Heat' },
  { slug: 'conduction', title: 'Conduction' },
  { slug: 'convection', title: 'Convection' },
  { slug: 'radiation', title: 'Radiation' },
  { slug: 'phase-changes', title: 'Phase Changes' },
];

interface Learner {
  id: string;
  name: string;
  progress: LearnerData;
  created_at: string;
  updated_at: string;
}

interface SessionData {
  short_code: string;
  display_name: string | null;
  created_at: string;
  learners: Learner[];
}

function getQuizStats(results: QuizResult[]) {
  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  return { total, correct, accuracy: total > 0 ? Math.round((correct / total) * 100) : 0 };
}

function getChaptersRead(visited: string[]) {
  return CHAPTERS.filter((ch) =>
    visited.some((v) => v.includes(ch.slug) && v.includes('physicsdemo/learn'))
  );
}

function isActive(updatedAt: string) {
  return Date.now() - new Date(updatedAt).getTime() < 120_000;
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

function LearnerCard({ learner, isExpanded, onToggle }: {
  learner: Learner;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const p = learner.progress || {};
  const quizResults = p.quizResults || [];
  const visited = p.visited || [];
  const totalXP = p.totalXP || 0;
  const stats = getQuizStats(quizResults);
  const chaptersRead = getChaptersRead(visited);
  const active = isActive(learner.updated_at);

  // Topic breakdown
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
  const confCorrect = confident.filter((r) => r.correct).length;

  const hasActivity = stats.total > 0 || chaptersRead.length > 0;

  return (
    <motion.div
      layout
      className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] overflow-hidden"
    >
      {/* Summary row — always visible */}
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-stone-50 transition-colors"
      >
        {/* Active indicator */}
        <div className="shrink-0">
          {active ? (
            <span className="block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          ) : (
            <span className="block w-2.5 h-2.5 rounded-full bg-stone-300" />
          )}
        </div>

        {/* Name */}
        <span className="font-black text-stone-900 flex-1 min-w-0 truncate">
          {learner.name}
        </span>

        {/* Quick stats */}
        {hasActivity ? (
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-sm font-black text-[#E07A5F]">{totalXP}</span>
              <span className="text-[10px] font-bold text-stone-400 ml-1">XP</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-stone-700">{stats.total}</span>
              <span className="text-[10px] font-bold text-stone-400 ml-1">Q</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-stone-700">{chaptersRead.length}/5</span>
              <span className="text-[10px] font-bold text-stone-400 ml-1">Ch</span>
            </div>
            {stats.total > 0 && (
              <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                stats.accuracy >= 70 ? 'bg-green-100 text-green-700' :
                stats.accuracy >= 40 ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {stats.accuracy}%
              </div>
            )}
          </div>
        ) : (
          <span className="text-xs font-bold text-stone-400">Not started</span>
        )}

        {/* Expand arrow */}
        <svg
          className={`w-4 h-4 text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && hasActivity && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t-2 border-stone-200 pt-4 space-y-4">
              {/* Reading checklist */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Chapters
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {CHAPTERS.map((ch) => {
                    const read = chaptersRead.some((v) => v.slug === ch.slug);
                    return (
                      <span
                        key={ch.slug}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          read
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-stone-100 text-stone-400 border border-stone-200'
                        }`}
                      >
                        {ch.title}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Topic accuracy */}
              {Object.keys(topicStats).length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Quiz by Topic
                  </p>
                  <div className="space-y-1.5">
                    {Object.entries(topicStats)
                      .sort(([, a], [, b]) => b.total - a.total)
                      .map(([tag, s]) => {
                        const pct = Math.round((s.correct / s.total) * 100);
                        return (
                          <div key={tag} className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-stone-500 w-20 truncate">
                              {TOPIC_LABELS[tag] || tag}
                            </span>
                            <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  pct >= 70 ? 'bg-green-400' : pct >= 40 ? 'bg-amber-400' : 'bg-red-400'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-bold text-stone-500 w-8 text-right">
                              {s.correct}/{s.total}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Calibration */}
              {confident.length > 0 && (
                <p className="text-xs text-stone-500">
                  <span className="font-bold">Calibration:</span>{' '}
                  {confCorrect}/{confident.length} confident answers correct (
                  {Math.round((confCorrect / confident.length) * 100)}%)
                </p>
              )}

              {/* Last active */}
              <p className="text-[11px] text-stone-400">
                Last active {getRelativeTime(new Date(learner.updated_at))}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ObservePage() {
  const { code } = useParams<{ code: string }>();
  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
    const interval = setInterval(load, 15_000);
    return () => clearInterval(interval);
  }, [code]);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/physicsdemo/s/${code}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <Link
            href="/physicsdemo"
            className="inline-block px-5 py-2.5 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all no-underline mt-4"
          >
            Go to Physics Demo
          </Link>
        </div>
      </div>
    );
  }

  const learners = session.learners || [];
  const activeLearners = learners.filter((l) => isActive(l.updated_at));
  const totalQuestions = learners.reduce(
    (sum, l) => sum + (l.progress?.quizResults?.length || 0),
    0
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] p-6 mb-6"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Teacher Dashboard
            </div>
            <h1 className="text-2xl font-black text-stone-900">
              {session.display_name || 'Heat & Thermal Energy'}
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              This page auto-refreshes. Keep it open while students work.
            </p>
          </div>
          <button
            onClick={handleCopyLink}
            className="shrink-0 px-3 py-2 text-xs font-bold rounded-lg border-[2.5px] border-stone-900 bg-white shadow-[2px_2px_0_#1c1917] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            {copied ? 'Copied!' : 'Copy learner link'}
          </button>
        </div>

        {/* Summary stats */}
        <div className="flex gap-6">
          <div>
            <span className="text-2xl font-black text-stone-900">{learners.length}</span>
            <span className="text-xs font-bold text-stone-400 ml-1">
              {learners.length === 1 ? 'learner' : 'learners'}
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-green-600">{activeLearners.length}</span>
            <span className="text-xs font-bold text-stone-400 ml-1">active now</span>
          </div>
          <div>
            <span className="text-2xl font-black text-[#E07A5F]">{totalQuestions}</span>
            <span className="text-xs font-bold text-stone-400 ml-1">questions answered</span>
          </div>
        </div>
      </motion.div>

      {/* Learner list */}
      {learners.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[4px_4px_0_#1c1917] p-6"
        >
          <p className="text-lg font-black text-stone-900 mb-1">
            Waiting for learners to join
          </p>
          <p className="text-sm text-stone-500 mb-5">
            Send the learner link to your students. Here&apos;s what happens:
          </p>

          {/* Step-by-step guide */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border-2 border-amber-200">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#E07A5F] text-white text-xs font-black flex items-center justify-center mt-0.5">1</span>
              <div>
                <p className="text-sm font-black text-stone-800">Share the link</p>
                <p className="text-xs text-stone-500">Copy it below and send it via chat, email, or project it on screen.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-50 border-2 border-stone-200">
              <span className="shrink-0 w-6 h-6 rounded-full bg-stone-300 text-white text-xs font-black flex items-center justify-center mt-0.5">2</span>
              <div>
                <p className="text-sm font-black text-stone-800">Students open it and enter their name</p>
                <p className="text-xs text-stone-500">They&apos;ll see the same physics activities — Read, Quiz, Ask AI, Talk.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-50 border-2 border-stone-200">
              <span className="shrink-0 w-6 h-6 rounded-full bg-stone-300 text-white text-xs font-black flex items-center justify-center mt-0.5">3</span>
              <div>
                <p className="text-sm font-black text-stone-800">Watch their progress here</p>
                <p className="text-xs text-stone-500">This page updates every 15 seconds. You&apos;ll see chapters read, quiz scores, and who&apos;s active.</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="w-full px-5 py-3 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
          >
            {copied ? 'Copied to clipboard!' : 'Copy learner link'}
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {learners.map((learner, i) => (
            <motion.div
              key={learner.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <LearnerCard
                learner={learner}
                isExpanded={expandedId === learner.id}
                onToggle={() =>
                  setExpandedId(expandedId === learner.id ? null : learner.id)
                }
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
