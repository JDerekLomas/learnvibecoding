"use client";

import { useRef, useEffect, useState, useCallback } from "react";

// Simplified water heating curve:
// Ice: -20°C → 0°C (solid, energy 0-20)
// Melting: 0°C plateau (energy 20-50)
// Water: 0°C → 100°C (liquid, energy 50-150)
// Boiling: 100°C plateau (energy 150-200)
// Steam: 100°C+ (gas, energy 200+)

function energyToTemp(energy: number): number {
  if (energy <= 20) return -20 + energy; // ice warming
  if (energy <= 50) return 0; // melting plateau
  if (energy <= 150) return (energy - 50); // water warming
  if (energy <= 200) return 100; // boiling plateau
  return 100 + (energy - 200) * 0.5; // steam (slower rise)
}

function energyToPhase(energy: number): string {
  if (energy <= 20) return "Ice";
  if (energy <= 50) return "Melting...";
  if (energy <= 150) return "Water";
  if (energy <= 200) return "Boiling...";
  return "Steam";
}

function energyToEmoji(energy: number): string {
  if (energy <= 20) return "🧊";
  if (energy <= 50) return "🧊💧";
  if (energy <= 150) return "💧";
  if (energy <= 200) return "💧☁️";
  return "☁️";
}

const MAX_ENERGY = 220;
const GRAPH_W = 280;
const GRAPH_H = 140;
const PAD = 30;

export default function HeatingCurve() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [energy, setEnergy] = useState(0);
  const [heating, setHeating] = useState(false);
  const energyRef = useRef(0);
  const heatingRef = useRef(false);
  const historyRef = useRef<Array<{ e: number; t: number }>>([]);

  useEffect(() => {
    heatingRef.current = heating;
  }, [heating]);

  useEffect(() => {
    energyRef.current = energy;
  }, [energy]);

  useEffect(() => {
    let raf: number;

    function tick() {
      if (heatingRef.current && energyRef.current < MAX_ENERGY) {
        const newE = Math.min(energyRef.current + 0.5, MAX_ENERGY);
        energyRef.current = newE;
        setEnergy(newE);

        // Record history for graph
        const t = energyToTemp(newE);
        const hist = historyRef.current;
        if (hist.length === 0 || Math.abs(hist[hist.length - 1].e - newE) > 0.8) {
          hist.push({ e: newE, t });
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Draw graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const totalW = GRAPH_W + PAD * 2;
    const totalH = GRAPH_H + PAD * 2;
    canvas.width = totalW * dpr;
    canvas.height = totalH * dpr;
    canvas.style.width = `${totalW}px`;
    canvas.style.height = `${totalH}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, totalW, totalH);

    // Axes
    ctx.strokeStyle = "#d6d3d1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, PAD);
    ctx.lineTo(PAD, PAD + GRAPH_H);
    ctx.lineTo(PAD + GRAPH_W, PAD + GRAPH_H);
    ctx.stroke();

    // Y-axis labels
    ctx.fillStyle = "#a8a29e";
    ctx.font = "10px system-ui";
    ctx.textAlign = "right";
    for (const t of [-20, 0, 50, 100]) {
      const y = PAD + GRAPH_H - ((t + 20) / 140) * GRAPH_H;
      ctx.fillText(`${t}°`, PAD - 4, y + 3);
      // Grid line
      ctx.strokeStyle = "#f5f5f4";
      ctx.beginPath();
      ctx.moveTo(PAD, y);
      ctx.lineTo(PAD + GRAPH_W, y);
      ctx.stroke();
    }

    // X-axis label
    ctx.fillStyle = "#a8a29e";
    ctx.textAlign = "center";
    ctx.fillText("Heat Added →", PAD + GRAPH_W / 2, PAD + GRAPH_H + 18);

    // Phase change zones (subtle bg)
    const meltStart = (20 / MAX_ENERGY) * GRAPH_W;
    const meltEnd = (50 / MAX_ENERGY) * GRAPH_W;
    const boilStart = (150 / MAX_ENERGY) * GRAPH_W;
    const boilEnd = (200 / MAX_ENERGY) * GRAPH_W;

    ctx.fillStyle = "rgba(147, 197, 253, 0.15)";
    ctx.fillRect(PAD + meltStart, PAD, meltEnd - meltStart, GRAPH_H);
    ctx.fillStyle = "rgba(253, 186, 116, 0.15)";
    ctx.fillRect(PAD + boilStart, PAD, boilEnd - boilStart, GRAPH_H);

    // Zone labels
    ctx.fillStyle = "#93c5fd";
    ctx.font = "9px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("melting", PAD + (meltStart + meltEnd) / 2, PAD + 12);
    ctx.fillStyle = "#fdba74";
    ctx.fillText("boiling", PAD + (boilStart + boilEnd) / 2, PAD + 12);

    // Draw the curve
    const hist = historyRef.current;
    if (hist.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      for (let i = 0; i < hist.length; i++) {
        const x = PAD + (hist[i].e / MAX_ENERGY) * GRAPH_W;
        const y = PAD + GRAPH_H - ((hist[i].t + 20) / 140) * GRAPH_H;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Current point
      const last = hist[hist.length - 1];
      const cx = PAD + (last.e / MAX_ENERGY) * GRAPH_W;
      const cy = PAD + GRAPH_H - ((last.t + 20) / 140) * GRAPH_H;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ea580c";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [energy]);

  const temp = energyToTemp(energy);
  const phase = energyToPhase(energy);
  const emoji = energyToEmoji(energy);
  const isPlateau = (energy > 20 && energy < 50) || (energy > 150 && energy < 200);

  const handleReset = useCallback(() => {
    setEnergy(0);
    energyRef.current = 0;
    historyRef.current = [];
    setHeating(false);
  }, []);

  return (
    <div className="my-6 rounded-2xl border-2 border-violet-200 bg-violet-50/50 overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">
          ~
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
          Interactive: Heating Curve
        </span>
      </div>

      <div className="px-5 pb-5">
        {/* Status */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{emoji}</span>
          <div>
            <p className="text-sm font-bold text-stone-900">
              {Math.round(temp)}°C — {phase}
            </p>
            {isPlateau && (
              <p className="text-xs text-violet-600 font-semibold animate-pulse">
                Temperature stuck! Energy is breaking bonds...
              </p>
            )}
          </div>
        </div>

        {/* Graph */}
        <div className="bg-white rounded-xl border-2 border-stone-200 p-1 flex justify-center overflow-x-auto">
          <canvas ref={canvasRef} />
        </div>

        {/* Controls */}
        <div className="flex gap-2 mt-3">
          <button
            onMouseDown={() => setHeating(true)}
            onMouseUp={() => setHeating(false)}
            onMouseLeave={() => setHeating(false)}
            onTouchStart={() => setHeating(true)}
            onTouchEnd={() => setHeating(false)}
            disabled={energy >= MAX_ENERGY}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              heating
                ? "bg-orange-500 text-white scale-[0.98] shadow-inner"
                : energy >= MAX_ENERGY
                  ? "bg-stone-100 text-stone-400"
                  : "bg-orange-100 text-orange-600 hover:bg-orange-200 shadow-sm"
            }`}
          >
            {heating ? "Adding Heat..." : energy >= MAX_ENERGY ? "Max Heat Reached" : "Hold to Add Heat"}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl text-sm font-bold bg-white border border-stone-200 text-stone-500 hover:bg-stone-50 transition-colors"
          >
            Reset
          </button>
        </div>

        <p className="mt-3 text-xs text-stone-400 italic">
          Watch the flat spots — that&apos;s where all your heat goes into breaking bonds instead of raising temperature. That&apos;s latent heat.
        </p>
      </div>
    </div>
  );
}
