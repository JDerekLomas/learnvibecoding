"use client";

import SkillMap from "@/components/SkillMap";

export default function SkillMapPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <div className="mx-auto max-w-2xl px-6 py-12">
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
