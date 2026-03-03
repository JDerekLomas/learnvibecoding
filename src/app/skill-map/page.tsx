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

      <div className="mx-auto max-w-2xl px-6 py-8 relative z-10">
        <div className="mb-6 px-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">
            Skill Map
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Track your progress across all vibe coding skills. Complete quizzes to unlock topics.
          </p>
        </div>
        <SkillMap />
      </div>
    </div>
  );
}
