'use client';

import { useConversation } from '@elevenlabs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useRef, useEffect } from 'react';
import { DISCOVERY_SYSTEM_PROMPT } from '@/lib/discovery-prompt';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_DISCOVERY_AGENT_ID || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '';

type Phase = 'prep' | 'fork' | 'voice';

interface TranscriptEntry {
  role: 'user' | 'agent';
  message: string;
}

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

/* ── Types ───────────────────────────────────────────────────── */

interface AudioGetters {
  getFrequencyData?: () => Uint8Array | undefined;
  getVolume?: () => number;
}

/* ── Canvas voice orb (indigo/violet palette) ────────────────── */

function VoiceOrb({
  audioGetters,
  active,
  muted = false,
  size = 220,
}: {
  audioGetters?: AudioGetters;
  active: boolean;
  muted?: boolean;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gettersRef = useRef<AudioGetters | undefined>(audioGetters);
  const stateRef = useRef({
    time: 0,
    smoothVolume: 0,
    smoothActive: 0,
    smoothMuted: 0,
    pointRadii: new Float32Array(10),
  });

  useEffect(() => {
    gettersRef.current = audioGetters;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const numPoints = 10;
    const state = stateRef.current;
    let raf: number;

    function draw() {
      const getters = gettersRef.current;
      const freqData = getters?.getFrequencyData?.();
      const rawVolume = getters?.getVolume?.() ?? 0;

      const volTarget = active && !muted ? rawVolume : 0;
      const volRate = volTarget > state.smoothVolume ? 0.25 : 0.08;
      state.smoothVolume += (volTarget - state.smoothVolume) * volRate;

      state.smoothActive +=
        ((active ? 1 : 0) - state.smoothActive) * (active ? 0.08 : 0.04);
      state.smoothMuted +=
        ((muted ? 1 : 0) - state.smoothMuted) * 0.1;

      const vol = state.smoothVolume;
      const ml = state.smoothMuted;

      state.time += 0.01 + vol * 0.03;
      const t = state.time;

      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const baseRadius = size * 0.28;
      const angleStep = (Math.PI * 2) / numPoints;

      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = angleStep * i;

        const wobble =
          Math.sin(t * 1.1 + i * 2.1) * 0.06 +
          Math.sin(t * 0.7 + i * 3.4) * 0.05 +
          Math.sin(t * 1.9 + i * 1.3) * 0.03;

        let audioDeform = 0;
        if (freqData && freqData.length > 0 && !muted) {
          const bandIndex = Math.floor(
            (i / numPoints) * freqData.length * 0.4
          );
          const bandLevel = freqData[bandIndex] / 255;
          audioDeform = bandLevel * 0.35;
        } else if (vol > 0.01) {
          audioDeform =
            vol *
            (Math.sin(t * 4.7 + i * 2.9) * 0.13 +
              Math.sin(t * 6.3 + i * 1.7) * 0.09 +
              Math.sin(t * 3.1 + i * 4.1) * 0.06);
        }

        const al = state.smoothActive;
        const breathing = al * (1 - vol) * Math.sin(t * 0.8) * 0.04;

        const targetR =
          baseRadius * (1 + wobble + audioDeform + breathing);

        const currentR = state.pointRadii[i] || baseRadius;
        const smoothR = currentR + (targetR - currentR) * 0.18;
        state.pointRadii[i] = smoothR;

        points.push({
          x: cx + Math.cos(angle) * smoothR,
          y: cy + Math.sin(angle) * smoothR,
        });
      }

      ctx.beginPath();
      catmullRomClosed(ctx, points, 0.4);

      const grad = ctx.createRadialGradient(
        cx - baseRadius * 0.25,
        cy - baseRadius * 0.25,
        baseRadius * 0.1,
        cx,
        cy,
        baseRadius * (1.3 + vol * 0.2)
      );
      if (ml > 0.5) {
        grad.addColorStop(0, '#d6d3d1');
        grad.addColorStop(0.5, '#a8a29e');
        grad.addColorStop(1, '#78716c');
      } else {
        // Indigo/violet palette
        grad.addColorStop(0, '#c4b5fd');
        grad.addColorStop(0.5, '#7c3aed');
        grad.addColorStop(1, '#4c1d95');
      }
      ctx.fillStyle = grad;
      ctx.fill();

      if (ml < 0.5) {
        ctx.save();
        ctx.shadowColor = `rgba(124, 58, 237, ${0.15 + vol * 0.5})`;
        ctx.shadowBlur = 20 + vol * 50;
        ctx.fill();
        ctx.restore();
      }

      ctx.beginPath();
      catmullRomClosed(ctx, points, 0.4);
      const specGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.3,
        cy - baseRadius * 0.35,
        0,
        cx - baseRadius * 0.1,
        cy - baseRadius * 0.1,
        baseRadius * 0.65
      );
      specGrad.addColorStop(0, `rgba(255, 255, 255, ${0.25 - ml * 0.1})`);
      specGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specGrad;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active, muted, size]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} style={{ width: size, height: size }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {muted ? (
          <svg
            width={size * 0.17}
            height={size * 0.17}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.7}
          >
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.12 1.49-.34 2.18" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        ) : (
          <svg
            width={size * 0.17}
            height={size * 0.17}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z"
              fill="white"
              opacity={0.85}
            />
          </svg>
        )}
      </div>
    </div>
  );
}

function catmullRomClosed(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  tension: number
) {
  const n = points.length;
  if (n < 3) return;
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    ctx.bezierCurveTo(
      p1.x + ((p2.x - p0.x) * tension) / 3,
      p1.y + ((p2.y - p0.y) * tension) / 3,
      p2.x - ((p3.x - p1.x) * tension) / 3,
      p2.y - ((p3.y - p1.y) * tension) / 3,
      p2.x,
      p2.y
    );
  }
  ctx.closePath();
}

/* ── Progress dots ───────────────────────────────────────────── */

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2 justify-center mb-6">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-2.5 rounded-full transition-all duration-300 border-[2px] border-stone-900 ${
            i === current
              ? 'w-6 bg-violet-400'
              : i < current
                ? 'w-2.5 bg-violet-300'
                : 'w-2.5 bg-white'
          }`}
        />
      ))}
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */

export default function VoiceAgentPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('prep');
  const [prepIndex, setPrepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [currentInput, setCurrentInput] = useState('');
  const [micMuted, setMicMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Voice state
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState('');
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const startedRef = useRef(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const conversation = useConversation({
    micMuted,
    onConnect: () => {
      setStatusLog((prev) => [...prev, 'Connected']);
    },
    onDisconnect: () => {
      setStatusLog((prev) => [...prev, 'Disconnected']);
      setHasStarted(false);
      startedRef.current = false;
      setMicMuted(false);
    },
    onError: (err: string | Error) => {
      const msg = typeof err === 'string' ? err : err.message || 'Connection error';
      setError(msg);
      setStatusLog((prev) => [...prev, `Error: ${msg}`]);
    },
    onMessage: (props: { message: string; role: 'user' | 'agent' }) => {
      setTranscript((prev) => [...prev, { role: props.role, message: props.message }]);
    },
  });

  // Audio getters for the orb
  const audioGetters = useRef<AudioGetters>({});
  useEffect(() => {
    audioGetters.current = {
      getFrequencyData: () =>
        conversation.isSpeaking
          ? conversation.getOutputByteFrequencyData()
          : conversation.getInputByteFrequencyData(),
      getVolume: () =>
        conversation.isSpeaking
          ? conversation.getOutputVolume()
          : conversation.getInputVolume(),
    };
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
      setError('Voice agent not configured yet. Set NEXT_PUBLIC_ELEVENLABS_DISCOVERY_AGENT_ID.');
      return;
    }
    if (startedRef.current) return;

    try {
      setError('');
      setTranscript([]);
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
        connectionType: 'websocket' as const,
        overrides: {
          agent: {
            prompt: { prompt },
            firstMessage: context
              ? "Hey! I read what you shared — I'm already getting ideas. Let me ask you something that might surprise you."
              : "Hey! So here's what I want to know. If you woke up tomorrow and someone had built the perfect app, tool, or website — just for you — what would it do?",
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

  if (!mounted) return null;

  const transcriptVisible = phase === 'voice' && showTranscript && transcript.length > 0;

  return (
    <div className={`mx-auto px-6 py-8 ${transcriptVisible ? 'max-w-5xl' : 'max-w-2xl'} transition-all duration-500`}>
      {/* Back nav */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors no-underline mb-5 w-fit"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>

      <div className={`${transcriptVisible ? 'flex flex-col lg:flex-row gap-5' : ''}`}>
      {/* Main card — neobrutalist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] overflow-hidden ${transcriptVisible ? 'lg:flex-1' : ''}`}
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

              <h2 className="text-2xl font-black text-stone-900 text-center mb-2">
                Before we start
              </h2>
              <p className="text-sm font-medium text-stone-500 text-center mb-8">
                A few quick thoughts so we can dream bigger together.
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
                    className="w-full rounded-lg border-[2.5px] border-stone-900 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-500 transition-colors resize-none"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handleSkip}
                  className="text-sm font-bold text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  Skip
                </button>
                <button
                  onClick={handlePrepSubmit}
                  className="px-6 py-2.5 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-violet-500 text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all cursor-pointer"
                >
                  {prepIndex < PREP_QUESTIONS.length - 1 ? 'Next' : 'Done'}
                </button>
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
              <h2 className="text-2xl font-black text-stone-900 mb-2">
                How do you want to explore?
              </h2>
              <p className="text-sm font-medium text-stone-500 mb-8 max-w-sm mx-auto">
                Same creative conversation, different medium. Pick what feels right.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={handleChooseVoice}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-[2.5px] border-stone-900 bg-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all cursor-pointer group"
                >
                  <div className="h-14 w-14 rounded-full bg-violet-500 border-[2.5px] border-stone-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base font-black text-stone-900">Talk it through</p>
                    <p className="text-xs font-medium text-stone-500 mt-0.5">Voice conversation with AI</p>
                  </div>
                </button>

                <button
                  onClick={handleChooseText}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border-[2.5px] border-stone-900 bg-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all cursor-pointer group"
                >
                  <div className="h-14 w-14 rounded-full bg-amber-400 border-[2.5px] border-stone-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base font-black text-stone-900">I&apos;d rather type</p>
                    <p className="text-xs font-medium text-stone-500 mt-0.5">Text chat with AI</p>
                  </div>
                </button>
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
              style={{
                backgroundImage:
                  'radial-gradient(circle, #e7e5e4 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* Orb */}
              <div className="flex justify-center mb-6">
                <VoiceOrb
                  audioGetters={audioGetters.current}
                  active={isConnected}
                  muted={micMuted}
                  size={200}
                />
              </div>

              {/* Status text */}
              <h2 className="text-2xl font-black text-stone-900 mb-2">
                {isConnecting
                  ? 'Connecting...'
                  : isConnected
                    ? micMuted
                      ? 'Mic muted'
                      : conversation.isSpeaking
                        ? 'Listening...'
                        : 'Your turn'
                    : 'Voice Discovery'}
              </h2>

              <p className="text-sm font-medium text-stone-500 mb-8 max-w-sm mx-auto leading-relaxed">
                {isConnected
                  ? micMuted
                    ? 'Your mic is muted. Tap unmute when you want to speak.'
                    : conversation.isSpeaking
                      ? 'The AI is painting a picture from your words.'
                      : 'Speak naturally — share what excites you.'
                  : "Let's discover what you want to create. Talk it through — your voice, your vision."}
              </p>

              {/* Error */}
              {error && (
                <div className="mb-6 rounded-lg border-[2.5px] border-red-400 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 max-w-sm mx-auto">
                  {error}
                </div>
              )}

              {/* Action buttons */}
              {!hasStarted ? (
                <button
                  onClick={handleStartVoice}
                  disabled={isConnecting}
                  className="px-8 py-3.5 text-base font-black rounded-lg border-[2.5px] border-stone-900 bg-violet-500 text-white shadow-[4px_4px_0_#1c1917] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#1c1917] cursor-pointer"
                >
                  {isConnecting ? 'Connecting...' : 'Start Conversation'}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  {/* Mute toggle */}
                  <button
                    onClick={() => setMicMuted((m) => !m)}
                    className={`px-5 py-3 text-sm font-black rounded-lg border-[2.5px] border-stone-900 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all cursor-pointer ${
                      micMuted
                        ? 'bg-red-100 text-red-700'
                        : 'bg-white text-stone-900'
                    }`}
                  >
                    {micMuted ? 'Unmute mic' : 'Mute mic'}
                  </button>

                  {/* Transcript toggle */}
                  <button
                    onClick={() => setShowTranscript((s) => !s)}
                    className={`px-5 py-3 text-sm font-black rounded-lg border-[2.5px] border-stone-900 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all cursor-pointer ${
                      showTranscript
                        ? 'bg-violet-100 text-violet-700'
                        : 'bg-white text-stone-900'
                    }`}
                  >
                    {showTranscript ? 'Hide text' : 'Show text'}
                  </button>

                  {/* End */}
                  <button
                    onClick={handleEndVoice}
                    className="px-5 py-3 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-white text-stone-900 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all cursor-pointer"
                  >
                    End
                  </button>
                </div>
              )}

              {/* Connected indicator */}
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
                  <span className="text-xs font-bold text-stone-400">
                    Connected
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Debug log (voice phase only) */}
        {phase === 'voice' && statusLog.length > 0 && (
          <div className="px-8 pb-4">
            <details className="text-left">
              <summary className="text-xs font-bold text-stone-300 cursor-pointer">
                Debug log
              </summary>
              <div className="mt-2 text-xs font-mono text-stone-400 space-y-0.5">
                {statusLog.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
                <div>status: {conversation.status}</div>
                <div>isSpeaking: {String(conversation.isSpeaking)}</div>
                <div>micMuted: {String(micMuted)}</div>
              </div>
            </details>
          </div>
        )}

        {/* Text alternative link (voice phase only) */}
        {phase === 'voice' && (
          <div className="border-t-[3px] border-stone-900 px-8 py-4 text-center bg-[#F5F0FF]">
            <Link
              href="/discover"
              className="text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors no-underline"
            >
              Prefer typing? Use the text version
            </Link>
          </div>
        )}
      </motion.div>

      {/* Transcript panel */}
      {transcriptVisible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:w-80 bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] overflow-hidden flex flex-col"
        >
          <div className="px-4 py-3 border-b-[3px] border-stone-900 bg-stone-50">
            <h3 className="text-sm font-black text-stone-900">Transcript</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[500px] px-4 py-3 space-y-3">
            {transcript.map((entry, i) => (
              <div key={i} className={`flex gap-2 ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                    entry.role === 'user'
                      ? 'bg-violet-100 text-violet-900 font-medium'
                      : 'bg-stone-100 text-stone-800'
                  }`}
                >
                  {entry.message}
                </div>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        </motion.div>
      )}
      </div>
    </div>
  );
}
