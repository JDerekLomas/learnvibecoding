"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Concept } from "@/data/concepts";

const THEME_BORDERS: Record<string, string> = {
  mindset: "border-violet-300 hover:border-violet-500",
  context: "border-amber-300 hover:border-amber-500",
  process: "border-blue-300 hover:border-blue-500",
  ai: "border-emerald-300 hover:border-emerald-500",
  pitfalls: "border-red-300 hover:border-red-500",
};

interface ConceptCardProps {
  concept: Concept;
  mastered: boolean;
  index: number;
  onClick: () => void;
}

export default function ConceptCard({ concept, mastered, index, onClick }: ConceptCardProps) {
  const borderClass = THEME_BORDERS[concept.theme] || "border-stone-300";

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative bg-white rounded-2xl border-2 ${borderClass}
        shadow-sm hover:shadow-lg transition-shadow duration-200
        overflow-hidden text-left cursor-pointer w-full
      `}
    >
      {/* Meme thumbnail */}
      <div className="relative w-full aspect-[4/3] bg-stone-100">
        <Image
          src={`/memes/${concept.memeFolder}/${concept.primaryMeme}`}
          alt={concept.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {mastered && (
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-stone-900 leading-tight">{concept.title}</h3>
        <p className="text-xs text-stone-500 mt-1 line-clamp-2">{concept.tagline}</p>
      </div>
    </motion.button>
  );
}
