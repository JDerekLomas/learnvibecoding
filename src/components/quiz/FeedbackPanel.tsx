'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeedbackType } from './types';
import { QuizTheme } from './theme';

interface FeedbackPanelProps {
  visible: boolean;
  feedbackType: FeedbackType | null;
  explanation: string;
  misconception?: string | undefined;
  questionId?: string;
  onContinue: () => void;
  theme: QuizTheme;
}

type FlagReason = 'wrong-answer' | 'unclear' | 'outdated' | 'other';

interface QuestionFlag {
  questionId: string;
  reason: FlagReason;
  details: string;
  timestamp: number;
}

function saveFlag(flag: QuestionFlag) {
  try {
    const existing = JSON.parse(localStorage.getItem('quiz-flags') || '[]');
    existing.push(flag);
    localStorage.setItem('quiz-flags', JSON.stringify(existing));
  } catch {
    // Best effort
  }
}

interface FeedbackConfig {
  bg: string;
  border: string;
  icon: string;
  title: string;
  titleColor: string;
  iconBg: string;
  buttonBg: string;
  buttonText: string;
  explanationText: string;
  misconceptionBg: string;
  misconceptionBorder: string;
  misconceptionText: string;
}

function getFeedbackConfig(type: FeedbackType, isDark: boolean): FeedbackConfig {
  const configs: Record<FeedbackType, { light: FeedbackConfig; dark: FeedbackConfig }> = {
    'confident-correct': {
      light: {
        bg: 'bg-emerald-50', border: 'border-emerald-200', icon: '✓', title: 'Nailed it!',
        titleColor: 'text-emerald-700', iconBg: 'bg-emerald-500 text-white',
        buttonBg: 'bg-emerald-500 hover:bg-emerald-600', buttonText: 'text-white',
        explanationText: 'text-stone-700',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
      dark: {
        bg: 'bg-emerald-950', border: 'border-emerald-700', icon: '✓', title: 'Nailed it!',
        titleColor: 'text-emerald-300', iconBg: 'bg-emerald-500 text-white',
        buttonBg: 'bg-emerald-500 hover:bg-emerald-600', buttonText: 'text-white',
        explanationText: 'text-emerald-100/80',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
    },
    'unsure-correct': {
      light: {
        bg: 'bg-teal-50', border: 'border-teal-200', icon: '~', title: 'Correct — but worth reviewing',
        titleColor: 'text-teal-700', iconBg: 'bg-teal-500 text-white',
        buttonBg: 'bg-teal-500 hover:bg-teal-600', buttonText: 'text-white',
        explanationText: 'text-stone-700',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
      dark: {
        bg: 'bg-teal-950', border: 'border-teal-700', icon: '~', title: 'Correct — but worth reviewing',
        titleColor: 'text-teal-300', iconBg: 'bg-teal-500 text-white',
        buttonBg: 'bg-teal-500 hover:bg-teal-600', buttonText: 'text-white',
        explanationText: 'text-teal-100/80',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
    },
    'unsure-wrong': {
      light: {
        bg: 'bg-amber-50', border: 'border-amber-200', icon: '→', title: "Here's what's going on",
        titleColor: 'text-amber-800', iconBg: 'bg-amber-500 text-white',
        buttonBg: 'bg-amber-500 hover:bg-amber-600', buttonText: 'text-white',
        explanationText: 'text-stone-700',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
      dark: {
        bg: 'bg-amber-950', border: 'border-amber-700', icon: '→', title: "Here's what's going on",
        titleColor: 'text-amber-300', iconBg: 'bg-amber-500 text-white',
        buttonBg: 'bg-amber-500 hover:bg-amber-600', buttonText: 'text-white',
        explanationText: 'text-amber-100/80',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
    },
    'confident-wrong': {
      light: {
        bg: 'bg-red-50', border: 'border-red-200', icon: '!', title: 'Misconception found',
        titleColor: 'text-red-700', iconBg: 'bg-red-500 text-white',
        buttonBg: 'bg-red-500 hover:bg-red-600', buttonText: 'text-white',
        explanationText: 'text-stone-700',
        misconceptionBg: 'bg-red-100/60', misconceptionBorder: 'border-red-200/60', misconceptionText: 'text-red-800',
      },
      dark: {
        bg: 'bg-red-950', border: 'border-red-700', icon: '!', title: 'Misconception found',
        titleColor: 'text-red-300', iconBg: 'bg-red-500 text-white',
        buttonBg: 'bg-red-500 hover:bg-red-600', buttonText: 'text-white',
        explanationText: 'text-red-100/80',
        misconceptionBg: 'bg-red-900/60', misconceptionBorder: 'border-red-700/60', misconceptionText: 'text-red-200',
      },
    },
  };
  return isDark ? configs[type].dark : configs[type].light;
}

export default function FeedbackPanel({
  visible,
  feedbackType,
  explanation,
  misconception,
  questionId,
  onContinue,
  theme,
}: FeedbackPanelProps) {
  const [flagOpen, setFlagOpen] = useState(false);
  const [flagReason, setFlagReason] = useState<FlagReason>('wrong-answer');
  const [flagDetails, setFlagDetails] = useState('');
  const [flagSent, setFlagSent] = useState(false);

  if (!feedbackType) return null;
  const config = getFeedbackConfig(feedbackType, theme.mode === 'dark');
  const isDark = theme.mode === 'dark';

  function handleSubmitFlag() {
    if (!questionId) return;
    saveFlag({
      questionId,
      reason: flagReason,
      details: flagDetails,
      timestamp: Date.now(),
    });
    setFlagSent(true);
    setTimeout(() => {
      setFlagOpen(false);
      setFlagSent(false);
      setFlagDetails('');
    }, 1500);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: feedbackType === 'confident-wrong' ? 0.5 : 0.15,
          }}
          className={`
            mt-6 rounded-2xl border-2 p-5 shadow-sm
            ${config.bg} ${config.border}
          `}
        >
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`
              flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
              text-sm font-bold ${config.iconBg}
            `}
            >
              {config.icon}
            </div>
            <div>
              <h3 className={`font-semibold text-base ${config.titleColor}`}>
                {config.title}
              </h3>
            </div>
          </div>

          {misconception && feedbackType === 'confident-wrong' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`mb-3 px-3 py-2 rounded-lg ${config.misconceptionBg} border ${config.misconceptionBorder}`}
            >
              <p className={`text-sm ${config.misconceptionText} font-medium`}>
                Common trap: {misconception}
              </p>
            </motion.div>
          )}

          <p className={`text-sm ${config.explanationText} leading-relaxed mb-4`}>
            {explanation}
          </p>

          <div className="flex items-center gap-2 mb-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className={`
                flex-1 py-3 rounded-xl font-semibold text-base
                ${config.buttonBg} ${config.buttonText}
                shadow-sm transition-colors duration-150
              `}
            >
              {feedbackType === 'confident-correct' ? 'Next' : 'Got it'}
            </motion.button>
          </div>

          {/* Flag / Dispute */}
          {questionId && (
            <div className="mt-2">
              {!flagOpen ? (
                <button
                  onClick={() => setFlagOpen(true)}
                  className={`text-xs ${isDark ? 'text-white/40 hover:text-white/70' : 'text-stone-400 hover:text-stone-600'} transition-colors`}
                >
                  Dispute this answer
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`mt-1 p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-stone-200'}`}
                >
                  {flagSent ? (
                    <p className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      Flagged — thanks for the feedback.
                    </p>
                  ) : (
                    <>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {([
                          ['wrong-answer', 'Wrong answer'],
                          ['unclear', 'Unclear question'],
                          ['outdated', 'Outdated info'],
                          ['other', 'Other'],
                        ] as [FlagReason, string][]).map(([value, label]) => (
                          <button
                            key={value}
                            onClick={() => setFlagReason(value)}
                            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                              flagReason === value
                                ? isDark
                                  ? 'bg-white/20 border-white/30 text-white'
                                  : 'bg-stone-900 border-stone-900 text-white'
                                : isDark
                                  ? 'border-white/15 text-white/50 hover:text-white/70'
                                  : 'border-stone-200 text-stone-500 hover:text-stone-700'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={flagDetails}
                        onChange={(e) => setFlagDetails(e.target.value)}
                        placeholder="What's wrong? (optional)"
                        rows={2}
                        className={`w-full text-xs p-2 rounded-lg border resize-none mb-2 ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-white/80 placeholder:text-white/30'
                            : 'bg-white border-stone-200 text-stone-700 placeholder:text-stone-400'
                        }`}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSubmitFlag}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            isDark
                              ? 'bg-white/15 text-white hover:bg-white/25'
                              : 'bg-stone-900 text-white hover:bg-stone-800'
                          }`}
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => { setFlagOpen(false); setFlagDetails(''); }}
                          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                            isDark ? 'text-white/40 hover:text-white/60' : 'text-stone-400 hover:text-stone-600'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
