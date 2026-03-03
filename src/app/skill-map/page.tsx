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
          opacity: 0.12,
        }}
      />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            Skill Map
          </h1>
          <p className="mt-2 text-stone-500">
            Your path from first conversation to shipped product.
          </p>
        </div>
        <SkillMap />
      </div>
    </div>
  );
}
