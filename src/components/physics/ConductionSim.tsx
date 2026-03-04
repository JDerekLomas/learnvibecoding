"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const CHAIN_LENGTH = 12;
const SPACING = 28;
const RADIUS = 8;

interface SimState {
  energy: number[];
  material: "metal" | "wood";
}

export default function ConductionSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<SimState>({
    energy: new Array(CHAIN_LENGTH).fill(0),
    material: "metal",
  });
  const [material, setMaterial] = useState<"metal" | "wood">("metal");
  const [heating, setHeating] = useState(false);
  const heatingRef = useRef(false);

  const conductivity = material === "metal" ? 0.15 : 0.03;

  const reset = useCallback(() => {
    stateRef.current.energy = new Array(CHAIN_LENGTH).fill(0);
  }, []);

  useEffect(() => {
    stateRef.current.material = material;
    reset();
  }, [material, reset]);

  useEffect(() => {
    heatingRef.current = heating;
  }, [heating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = CHAIN_LENGTH * SPACING + 40;
    const h = 80;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    let raf: number;
    const cy = h / 2;

    function draw() {
      if (!ctx) return;
      const state = stateRef.current;
      const k =
        state.material === "metal" ? 0.15 : 0.03;

      // Heat source
      if (heatingRef.current) {
        state.energy[0] = Math.min(state.energy[0] + 0.08, 1);
      }

      // Conduct heat along chain
      const newEnergy = [...state.energy];
      for (let i = 0; i < CHAIN_LENGTH - 1; i++) {
        const flow = (state.energy[i] - state.energy[i + 1]) * k;
        newEnergy[i] -= flow;
        newEnergy[i + 1] += flow;
      }
      // Dissipate from last node
      newEnergy[CHAIN_LENGTH - 1] *= 0.995;
      state.energy = newEnergy;

      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < CHAIN_LENGTH - 1; i++) {
        const x1 = 20 + i * SPACING;
        const x2 = 20 + (i + 1) * SPACING;
        ctx.beginPath();
        ctx.moveTo(x1, cy);
        ctx.lineTo(x2, cy);
        ctx.strokeStyle = "#d6d3d1";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw molecules
      for (let i = 0; i < CHAIN_LENGTH; i++) {
        const baseX = 20 + i * SPACING;
        const e = state.energy[i];
        // Vibrate based on energy
        const jitter = e * 4;
        const x = baseX + (Math.random() - 0.5) * jitter;
        const y = cy + (Math.random() - 0.5) * jitter;

        // Color: stone → orange → red based on energy
        const r = Math.round(168 + e * 87);
        const g = Math.round(162 + e * (115 - 162));
        const b = Math.round(158 + e * (22 - 158));
        const color = `rgb(${r},${g},${b})`;

        ctx.beginPath();
        ctx.arc(x, y, RADIUS + e * 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Flame indicator on first molecule
      if (heatingRef.current) {
        const fx = 20;
        const fy = cy + 20;
        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.fillText("🔥", fx, fy + 14);
      }

      // Hand on last molecule
      ctx.font = "14px serif";
      ctx.textAlign = "center";
      const lastE = state.energy[CHAIN_LENGTH - 1];
      if (lastE > 0.3) {
        ctx.fillText("🫷", 20 + (CHAIN_LENGTH - 1) * SPACING, cy - 18);
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [material]);

  return (
    <div className="my-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
          ~
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
          Interactive: Conduction Chain
        </span>
      </div>

      <div className="px-5 pb-5">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setMaterial("metal")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              material === "metal"
                ? "bg-emerald-500 text-white"
                : "bg-white border border-stone-200 text-stone-500 hover:border-emerald-300"
            }`}
          >
            Metal Spoon
          </button>
          <button
            onClick={() => setMaterial("wood")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              material === "wood"
                ? "bg-emerald-500 text-white"
                : "bg-white border border-stone-200 text-stone-500 hover:border-emerald-300"
            }`}
          >
            Wooden Spoon
          </button>
        </div>

        <div className="bg-white rounded-xl border-2 border-stone-200 p-2 flex justify-center overflow-x-auto">
          <canvas ref={canvasRef} />
        </div>

        <button
          onMouseDown={() => setHeating(true)}
          onMouseUp={() => setHeating(false)}
          onMouseLeave={() => setHeating(false)}
          onTouchStart={() => setHeating(true)}
          onTouchEnd={() => setHeating(false)}
          className={`mt-3 w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
            heating
              ? "bg-red-500 text-white scale-[0.98] shadow-inner"
              : "bg-red-100 text-red-600 hover:bg-red-200 shadow-sm"
          }`}
        >
          {heating ? "Heating..." : "Hold to Heat the Tip"}
        </button>

        <p className="mt-3 text-xs text-stone-400 italic">
          {material === "metal"
            ? "Metal conducts fast — energy zips through the chain. The other end heats up quickly."
            : "Wood conducts slowly — energy barely moves. That's why wooden handles don't burn you."}
        </p>
      </div>
    </div>
  );
}
