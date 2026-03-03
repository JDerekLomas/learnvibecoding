'use client';

import { useConversation } from '@elevenlabs/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useCallback, useRef, useEffect } from 'react';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '';

/* ── Canvas voice orb ────────────────────────────────────────── */

function VoiceOrb({
  speaking,
  active,
  size = 220,
}: {
  speaking: boolean;
  active: boolean;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    time: 0,
    smoothSpeaking: 0,
    smoothActive: 0,
    pointRadii: new Float32Array(10),
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
      // Smooth transitions — fast attack, slow release
      state.smoothSpeaking +=
        ((speaking ? 1 : 0) - state.smoothSpeaking) *
        (speaking ? 0.14 : 0.06);
      state.smoothActive +=
        ((active ? 1 : 0) - state.smoothActive) * (active ? 0.08 : 0.04);

      const sl = state.smoothSpeaking;
      const al = state.smoothActive;

      // Time advances faster when speaking
      state.time += 0.012 + sl * 0.028;
      const t = state.time;

      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const baseRadius = size * 0.28;
      const angleStep = (Math.PI * 2) / numPoints;

      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = angleStep * i;

        // Organic wobble: stacked sines at irrational frequency ratios
        const wobble =
          Math.sin(t * 1.1 + i * 2.1) * 0.06 +
          Math.sin(t * 0.7 + i * 3.4) * 0.05 +
          Math.sin(t * 1.9 + i * 1.3) * 0.03;

        // Speech reactivity: rapid pseudo-random oscillation
        const speechPulse =
          sl *
          (Math.sin(t * 4.7 + i * 2.9) * 0.13 +
            Math.sin(t * 6.3 + i * 1.7) * 0.09 +
            Math.sin(t * 3.1 + i * 4.1) * 0.06);

        // Breathing: slow pulse when connected but not speaking
        const breathing = al * (1 - sl) * Math.sin(t * 0.8) * 0.04;

        const targetR = baseRadius * (1 + wobble + speechPulse + breathing);

        // Per-point smoothing
        const currentR = state.pointRadii[i] || baseRadius;
        const smoothR = currentR + (targetR - currentR) * 0.18;
        state.pointRadii[i] = smoothR;

        points.push({
          x: cx + Math.cos(angle) * smoothR,
          y: cy + Math.sin(angle) * smoothR,
        });
      }

      // Draw blob shape
      ctx.beginPath();
      catmullRomClosed(ctx, points, 0.4);

      // Gradient fill — terracotta / gold
      const grad = ctx.createRadialGradient(
        cx - baseRadius * 0.25,
        cy - baseRadius * 0.25,
        baseRadius * 0.1,
        cx,
        cy,
        baseRadius * (1.3 + sl * 0.2)
      );
      grad.addColorStop(0, '#F2CC8F');
      grad.addColorStop(0.5, '#E07A5F');
      grad.addColorStop(1, '#943c2a');
      ctx.fillStyle = grad;
      ctx.fill();

      // Glow
      ctx.save();
      ctx.shadowColor = `rgba(224, 122, 95, ${0.15 + sl * 0.5})`;
      ctx.shadowBlur = 20 + sl * 50;
      ctx.fill();
      ctx.restore();

      // Specular highlight
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
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      specGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specGrad;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [speaking, active, size]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} style={{ width: size, height: size }} />
      {/* Star overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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

/* ── Main page ───────────────────────────────────────────────── */

export default function PhysicsVoicePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState('');
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const startedRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      const msg =
        typeof err === 'string' ? err : err.message || 'Connection error';
      setError(msg);
      setStatusLog((prev) => [...prev, `Error: ${msg}`]);
    },
  });

  const handleStartVoice = useCallback(async () => {
    if (!AGENT_ID) {
      setError('Voice agent not configured. Try the text chat instead.');
      return;
    }
    if (startedRef.current) return;

    try {
      setError('');
      setStatusLog((prev) => [...prev, 'Requesting mic...']);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatusLog((prev) => [...prev, 'Mic granted, connecting...']);
      startedRef.current = true;

      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'websocket' as const,
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
  }, [conversation]);

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

  /* ── Fallback: no agent ID ──────────────────────────────── */

  if (!AGENT_ID) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Link
          href="/physicsdemo"
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
          Back to Hub
        </Link>
        <div className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] p-8 text-center">
          <div className="flex justify-center mb-4">
            <VoiceOrb speaking={false} active={false} size={100} />
          </div>
          <h2 className="text-xl font-black text-stone-900 mb-2">
            Voice coming soon
          </h2>
          <p className="text-sm text-stone-500 mb-6">
            Voice conversations require an ElevenLabs agent. In the meantime,
            try the text chat.
          </p>
          <Link
            href="/physicsdemo/chat"
            className="inline-block px-5 py-2.5 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all no-underline"
          >
            Try the text chat instead
          </Link>
        </div>
      </div>
    );
  }

  /* ── Main voice UI ──────────────────────────────────────── */

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Back nav */}
      <Link
        href="/physicsdemo"
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
        Back to Hub
      </Link>

      {/* Voice card — neobrutalist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] overflow-hidden"
      >
        <div
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
              speaking={conversation.isSpeaking}
              active={isConnected}
              size={200}
            />
          </div>

          {/* Status text */}
          <h2 className="text-2xl font-black text-stone-900 mb-2">
            {isConnecting
              ? 'Connecting...'
              : isConnected
                ? conversation.isSpeaking
                  ? 'Tutor is speaking...'
                  : 'Listening...'
                : 'Voice Physics Tutor'}
          </h2>

          <p className="text-sm font-medium text-stone-500 mb-8 max-w-sm mx-auto leading-relaxed">
            {isConnected
              ? conversation.isSpeaking
                ? 'The tutor is explaining — listen up.'
                : 'Your turn — ask about heat, temperature, or thermal energy.'
              : 'Have a voice conversation about heat and thermal energy. The tutor will guide you with questions.'}
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
              className="px-8 py-3.5 text-base font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[4px_4px_0_#1c1917] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#1c1917] cursor-pointer"
            >
              {isConnecting ? 'Connecting...' : 'Start Conversation'}
            </button>
          ) : (
            <button
              onClick={handleEndVoice}
              className="px-6 py-3 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-white text-stone-900 shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all cursor-pointer"
            >
              End Conversation
            </button>
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
        </div>

        {/* Debug log */}
        {statusLog.length > 0 && (
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
              </div>
            </details>
          </div>
        )}

        {/* Text alternative */}
        <div className="border-t-[3px] border-stone-900 px-8 py-4 text-center bg-[#FFF8F0]">
          <Link
            href="/physicsdemo/chat"
            className="text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            Prefer typing? Use the text chat
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
