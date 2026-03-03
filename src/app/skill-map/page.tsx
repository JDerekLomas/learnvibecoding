"use client";

import SkillMap from "@/components/SkillMap";

export default function SkillMapPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Skill Map
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Your path from first conversation to shipped product.
        </p>
      </div>
      <SkillMap />
    </div>
  );
}
