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

const THEME_PLACEHOLDER: Record<string, string> = {
  mindset: "from-violet-100 to-indigo-100 text-violet-400",
  context: "from-amber-100 to-orange-100 text-amber-400",
  process: "from-blue-100 to-indigo-100 text-blue-400",
  ai: "from-emerald-100 to-teal-100 text-emerald-400",
  pitfalls: "from-red-100 to-rose-100 text-red-400",
};

interface ConceptCardProps {
  concept: Concept;
  mastered: boolean;
  index: number;
  onClick: () => void;
}

export default function ConceptCard({ concept, mastered, index, onClick }: ConceptCardProps) {
  const borderClass = THEME_BORDERS[concept.theme] || "border-stone-300";
  const hasMeme = concept.memeFolder && concept.primaryMeme;
  const placeholderClass = THEME_PLACEHOLDER[concept.theme] || "from-stone-100 to-stone-200 text-stone-400";

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
      {/* Meme thumbnail or placeholder */}
      <div className="relative w-full aspect-[4/3] bg-stone-100">
        {hasMeme ? (
          <Image
            src={`/memes/${concept.memeFolder}/${concept.primaryMeme}`}
            alt={concept.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${placeholderClass} flex items-center justify-center`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        )}
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
