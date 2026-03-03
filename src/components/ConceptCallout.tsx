"use client";

import Image from "next/image";
import Link from "next/link";
import { concepts } from "@/data/concepts";

const THEME_ACCENTS: Record<string, string> = {
  mindset: "border-l-violet-400 bg-violet-50",
  context: "border-l-amber-400 bg-amber-50",
  process: "border-l-blue-400 bg-blue-50",
  ai: "border-l-emerald-400 bg-emerald-50",
  pitfalls: "border-l-red-400 bg-red-50",
};

interface ConceptCalloutProps {
  id: string;
}

export default function ConceptCallout({ id }: ConceptCalloutProps) {
  const concept = concepts.find((c) => c.id === id);
  if (!concept) return null;

  const accent = THEME_ACCENTS[concept.theme] || "border-l-stone-400 bg-stone-50";
  const hasMeme = concept.memeFolder && concept.primaryMeme;

  return (
    <Link
      href={`/concepts#${concept.id}`}
      className="group block my-6 no-underline"
    >
      <div
        className={`flex items-start gap-4 rounded-xl border-l-4 ${accent} p-4 transition-shadow hover:shadow-md`}
      >
        {hasMeme && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-100">
            <Image
              src={`/memes/${concept.memeFolder}/${concept.primaryMeme}`}
              alt={concept.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-bold text-stone-900 leading-tight mb-0.5">
            {concept.title}
          </p>
          <p className="text-xs text-stone-500 leading-snug">
            {concept.tagline}
          </p>
        </div>
      </div>
    </Link>
  );
}
