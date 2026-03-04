"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function createParticles(
  count: number,
  speed: number,
  width: number,
  height: number
): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const s = speed * (0.6 + Math.random() * 0.8);
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * s,
      vy: Math.sin(angle) * s,
    };
  });
}

function Canvas({
  particles,
  width,
  height,
  color,
}: {
  particles: Particle[];
  width: number;
  height: number;
  color: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef(particles);
  particlesRef.current = particles;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const ps = particlesRef.current;
      for (const p of ps) {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        // Bounce
        if (p.x < 4 || p.x > width - 4) p.vx *= -1;
        if (p.y < 4 || p.y > height - 4) p.vy *= -1;
        p.x = Math.max(4, Math.min(width - 4, p.x));
        p.y = Math.max(4, Math.min(height - 4, p.y));
        // Draw
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const radius = 3 + speed * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.7 + speed * 0.05;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [width, height, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      className="rounded-lg"
    />
  );
}

export default function MoleculeSim() {
  const [mode, setMode] = useState<"cup" | "bathtub">("cup");
  const [cupParticles] = useState(() => createParticles(12, 3.5, 120, 100));
  const [tubParticles] = useState(() => createParticles(60, 1.8, 240, 100));

  const active = mode === "cup";

  return (
    <div className="my-6 rounded-2xl border-2 border-orange-200 bg-orange-50/50 overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
          ~
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">
          Interactive: Molecules in Motion
        </span>
      </div>

      <div className="px-5 pb-5">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("cup")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              active
                ? "bg-orange-500 text-white"
                : "bg-white border border-stone-200 text-stone-500 hover:border-orange-300"
            }`}
          >
            Boiling Cup (100°C)
          </button>
          <button
            onClick={() => setMode("bathtub")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              !active
                ? "bg-orange-500 text-white"
                : "bg-white border border-stone-200 text-stone-500 hover:border-orange-300"
            }`}
          >
            Warm Bathtub (40°C)
          </button>
        </div>

        <div className="flex items-end gap-4">
          <div
            className={`bg-white rounded-xl border-2 transition-all duration-300 ${
              active ? "border-orange-400 shadow-md shadow-orange-100" : "border-stone-200"
            }`}
            style={{ width: 120, height: 100, display: active ? "block" : "none" }}
          >
            <Canvas particles={cupParticles} width={120} height={100} color="#f97316" />
          </div>
          <div
            className={`bg-white rounded-xl border-2 transition-all duration-300 ${
              !active ? "border-orange-400 shadow-md shadow-orange-100" : "border-stone-200"
            }`}
            style={{ width: 240, height: 100, display: !active ? "block" : "none" }}
          >
            <Canvas particles={tubParticles} width={240} height={100} color="#fb923c" />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white rounded-lg p-2.5 border border-stone-200">
            <p className="font-bold text-stone-900">Temperature</p>
            <p className="text-stone-500 mt-0.5">
              {active ? (
                <span>
                  <span className="text-orange-600 font-bold">100°C</span> — molecules are FAST
                </span>
              ) : (
                <span>
                  <span className="text-orange-600 font-bold">40°C</span> — molecules are slower
                </span>
              )}
            </p>
          </div>
          <div className="bg-white rounded-lg p-2.5 border border-stone-200">
            <p className="font-bold text-stone-900">Thermal Energy</p>
            <p className="text-stone-500 mt-0.5">
              {active ? (
                <span>
                  <span className="text-orange-600 font-bold">Low</span> — only 12 molecules
                </span>
              ) : (
                <span>
                  <span className="text-orange-600 font-bold">HIGH</span> — 60 molecules total
                </span>
              )}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-stone-400 italic">
          The cup has faster molecules (higher temperature) but the bathtub has way more molecules (higher total energy).
        </p>
      </div>
    </div>
  );
}
