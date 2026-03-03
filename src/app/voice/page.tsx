'use client';

import { useConversation } from '@elevenlabs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useRef } from 'react';
import DoodleBg from '@/components/quiz/DoodleBg';
import { DISCOVERY_SYSTEM_PROMPT } from '@/lib/discovery-prompt';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '';

type Phase = 'prep' | 'fork' | 'voice';

const PREP_QUESTIONS = [
  "What's something you've been wanting to build or fix lately?",
  'Who would use it? Just you, friends, strangers?',
  'Have you tried building anything with AI before?',
];

function formatPrepContext(answers: string[]): string {
  if (answers.every((a) => !a.trim())) return '';
  const parts: string[] = [];
  if (answers[0]?.trim()) parts.push(`They want to build: ${answers[0].trim()}`);
  if (answers[1]?.trim()) parts.push(`Audience: ${answers[1].trim()}`);
  if (answers[2]?.trim()) parts.push(`AI experience: ${answers[2].trim()}`);
  return parts.join('. ') + '.';
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2 justify-center mb-6">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current
              ? 'w-6 bg-indigo-500'
              : i < current
                ? 'w-2 bg-indigo-300'
                : 'w-2 bg-stone-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function VoiceAgentPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('prep');
  const [prepIndex, setPrepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [currentInput, setCurrentInput] = useState('');

  // Voice state
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState('');
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const startedRef = useRef(false);

  const conversation = useConversation({
    onConnect: () => {
      setStatusLog((prev) => [...prev, 'Connected']);
    },
    onDisconnect: () => {
      setStatusLog((prev) => [...prev, 'Disconnected']);
      setHasStarted(false);
      startedRef.current = false;
    },
    onError: (err: string | Error) => {
      const msg = typeof err === 'string' ? err : err.message || 'Connection error';
      setError(msg);
      setStatusLog((prev) => [...prev, `Error: ${msg}`]);
    },
  });

  const handlePrepSubmit = useCallback(() => {
    const updated = [...answers];
    updated[prepIndex] = currentInput;
    setAnswers(updated);
    setCurrentInput('');

    if (prepIndex < PREP_QUESTIONS.length - 1) {
      setPrepIndex(prepIndex + 1);
    } else {
      setPhase('fork');
    }
  }, [answers, prepIndex, currentInput]);

  const handleSkip = useCallback(() => {
    setPhase('fork');
  }, []);

  const handleChooseVoice = useCallback(() => {
    setPhase('voice');
  }, []);

  const handleChooseText = useCallback(() => {
    const context = formatPrepContext(answers);
    if (context) {
      sessionStorage.setItem('discovery-prep', context);
    }
    router.push('/discover');
  }, [answers, router]);

  const handleStartVoice = useCallback(async () => {
    if (!AGENT_ID) {
      setError('Voice agent not configured yet. Set NEXT_PUBLIC_ELEVENLABS_AGENT_ID.');
      return;
    }
    if (startedRef.current) return;

    try {
      setError('');
      setStatusLog((prev) => [...prev, 'Requesting mic...']);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatusLog((prev) => [...prev, 'Mic granted, connecting...']);
      startedRef.current = true;

      const context = formatPrepContext(answers);
      const prompt = context
        ? DISCOVERY_SYSTEM_PROMPT.replace('{{user_context}}', context)
        : DISCOVERY_SYSTEM_PROMPT.replace('{{user_context}}', 'No context provided — start fresh.');
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'webrtc' as const,
        overrides: {
          agent: {
            prompt: { prompt },
          },
        },
      });
      setHasStarted(true);
      setStatusLog((prev) => [...prev, 'Session started']);
    } catch (err) {
      startedRef.current = false;
      if (err instanceof Error && err.name === 'NotAllowedError') {
        setError('Microphone access is required for voice conversations.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to start');
      }
      setStatusLog((prev) => [
        ...prev,
        `Start failed: ${err instanceof Error ? err.message : err}`,
      ]);
    }
  }, [conversation, answers]);

  const handleEndVoice = useCallback(async () => {
    try {
      await conversation.endSession();
      setHasStarted(false);
      startedRef.current = false;
    } catch {
      // Ignore end errors
    }
  }, [conversation]);

  const isConnected = conversation.status === 'connected';
  const isConnecting = conversation.status === 'connecting';

  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      <DoodleBg src="/textures/vibecode-light-1.png" opacity={0.18} />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-400 hover:text-stone-600 transition-colors no-underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Link>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {/* ── PREP PHASE ── */}
            {phase === 'prep' && (
              <motion.div
                key="prep"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-10"
              >
                <ProgressDots current={prepIndex} total={PREP_QUESTIONS.length} />

                <h2 className="text-2xl font-extrabold text-stone-900 text-center mb-2">
                  Before we start
                </h2>
                <p className="text-sm font-medium text-stone-400 text-center mb-8">
                  Quick warm-up so the conversation doesn&apos;t start cold.
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={prepIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <label className="block text-base font-bold text-stone-800 mb-3">
                      {PREP_QUESTIONS[prepIndex]}
                    </label>
                    <textarea
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handlePrepSubmit();
                        }
                      }}
                      placeholder="Type your answer..."
                      rows={3}
                      autoFocus
                      className="w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-colors resize-none"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={handleSkip}
                    className="text-sm font-semibold text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    Skip
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handlePrepSubmit}
                    className="px-6 py-2.5 text-sm font-extrabold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 transition-all shadow-lg shadow-indigo-500/25 border-2 border-white/20 cursor-pointer"
                  >
                    {prepIndex < PREP_QUESTIONS.length - 1 ? 'Next' : 'Done'}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── FORK PHASE ── */}
            {phase === 'fork' && (
              <motion.div
                key="fork"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-10 text-center"
              >
                <h2 className="text-2xl font-extrabold text-stone-900 mb-2">
                  How do you want to explore?
                </h2>
                <p className="text-sm font-medium text-stone-400 mb-8 max-w-sm mx-auto">
                  Same sharp questions, different medium. Pick what feels right.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleChooseVoice}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-stone-200 bg-white hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-200/40 transition-all cursor-pointer group"
                  >
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-extrabold text-stone-900">Talk it through</p>
                      <p className="text-xs font-medium text-stone-400 mt-0.5">Voice conversation with AI</p>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleChooseText}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-stone-200 bg-white hover:border-amber-400 hover:shadow-lg hover:shadow-amber-200/40 transition-all cursor-pointer group"
                  >
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-extrabold text-stone-900">I&apos;d rather type</p>
                      <p className="text-xs font-medium text-stone-400 mt-0.5">Text chat with AI</p>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── VOICE PHASE ── */}
            {phase === 'voice' && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-10 text-center"
              >
                {/* Animated orb */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={
                      isConnected
                        ? {
                            scale: conversation.isSpeaking ? [1, 1.15, 1] : [1, 1.05, 1],
                            opacity: conversation.isSpeaking ? [1, 0.8, 1] : 1,
                          }
                        : {}
                    }
                    transition={
                      isConnected
                        ? {
                            duration: conversation.isSpeaking ? 0.6 : 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : {}
                    }
                    className={`
                      h-20 w-20 rounded-full flex items-center justify-center
                      ${isConnected
                        ? conversation.isSpeaking
                          ? 'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/40'
                          : 'bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30'
                        : 'bg-gradient-to-br from-stone-300 to-stone-400'
                      }
                      transition-colors duration-500
                    `}
                  >
                    {isConnecting ? (
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    )}
                  </motion.div>
                </div>

                <h2 className="text-2xl font-extrabold text-stone-900 mb-2">
                  {isConnected ? (conversation.isSpeaking ? 'Listening...' : 'Your turn') : 'Voice Discovery'}
                </h2>

                <p className="text-base font-semibold text-stone-500 mb-6 max-w-sm mx-auto">
                  {isConnected
                    ? conversation.isSpeaking
                      ? 'The AI is thinking about your answer.'
                      : 'Speak naturally — the AI is listening.'
                    : 'Talk through what you want to build. Same sharp questions, but with your voice.'}
                </p>

                {error && (
                  <div className="mb-6 rounded-xl bg-red-50 border-2 border-red-200 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                {!hasStarted ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleStartVoice}
                    disabled={isConnecting}
                    className="px-8 py-3 text-base font-extrabold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 transition-all shadow-lg shadow-indigo-500/25 border-2 border-white/20 cursor-pointer disabled:opacity-50"
                  >
                    {isConnecting ? 'Connecting...' : 'Start Conversation'}
                  </motion.button>
                ) : (
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleEndVoice}
                      className="px-6 py-3 text-sm font-extrabold rounded-xl border-2 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50 transition-all cursor-pointer"
                    >
                      End Conversation
                    </motion.button>
                  </div>
                )}

                {/* Status indicator */}
                {isConnected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 flex items-center justify-center gap-2"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="text-xs font-semibold text-stone-400">Connected</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Debug log (voice phase only) */}
          {phase === 'voice' && statusLog.length > 0 && (
            <div className="px-8 pb-4">
              <details className="text-left">
                <summary className="text-xs font-semibold text-stone-300 cursor-pointer">Debug log</summary>
                <div className="mt-2 text-xs font-mono text-stone-400 space-y-0.5">
                  {statusLog.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                  <div>status: {conversation.status}</div>
                  <div>isSpeaking: {String(conversation.isSpeaking)}</div>
                </div>
              </details>
            </div>
          )}

          {/* Text alternative link (voice phase only) */}
          {phase === 'voice' && (
            <div className="border-t-2 border-stone-100 px-8 py-4 text-center">
              <Link
                href="/discover"
                className="text-sm font-semibold text-stone-400 hover:text-stone-600 transition-colors no-underline"
              >
                Prefer typing? Use the text version
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
