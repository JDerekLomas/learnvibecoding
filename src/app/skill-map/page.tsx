"use client";

import SkillMap from "@/components/SkillMap";

export default function SkillMapPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      {/* Doodle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/vibecode-light-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        <div className="text-center mb-8 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-8 py-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900">
            Skill Map
          </h1>
          <p className="mt-2 text-lg font-medium text-stone-500">
            Your path from first conversation to shipped product.
          </p>
        </div>
        <SkillMap />
      </div>
    </div>
  );
}
