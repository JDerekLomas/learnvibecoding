"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Concept } from "@/data/concepts";
import { getQuotesForConcept, getMemesForConcept } from "@/data/concept-roadmap";

interface ConceptDetailProps {
  concept: Concept | null;
  mastered: boolean;
  onClose: () => void;
  onToggleMastered: () => void;
}

export default function ConceptDetail({ concept, mastered, onClose, onToggleMastered }: ConceptDetailProps) {
  const [memeIndex, setMemeIndex] = useState(0);

  const memes = concept?.memeFolder ? getMemesForConcept(concept.memeFolder) : [];
  const quotes = concept ? getQuotesForConcept(concept.title) : [];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && memes.length > 1) setMemeIndex((i) => (i + 1) % memes.length);
      if (e.key === "ArrowLeft" && memes.length > 1) setMemeIndex((i) => (i - 1 + memes.length) % memes.length);
    },
    [onClose, memes.length],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset meme index when concept changes
  useEffect(() => {
    setMemeIndex(0);
  }, [concept?.id]);

  return (
    <AnimatePresence>
      {concept && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Meme image */}
            <div className="relative w-full aspect-[4/3] bg-stone-100 rounded-t-2xl overflow-hidden">
              <Image
                src={`/memes/${concept.memeFolder}/${memes[memeIndex] || concept.primaryMeme}`}
                alt={concept.title}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 512px"
              />

              {/* Carousel controls */}
              {memes.length > 1 && (
                <>
                  <button
                    onClick={() => setMemeIndex((i) => (i - 1 + memes.length) % memes.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setMemeIndex((i) => (i + 1) % memes.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </button>
                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {memes.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setMemeIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === memeIndex ? "bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-extrabold text-stone-900">{concept.title}</h2>
              <p className="text-sm font-semibold text-stone-500 mt-1">{concept.tagline}</p>
              <p className="text-base text-stone-700 mt-4 leading-relaxed">{concept.description}</p>

              {/* Quotes */}
              {quotes.length > 0 && (
                <div className="mt-5 space-y-3">
                  {quotes.map((quote, i) => (
                    <blockquote key={i} className="border-l-3 border-stone-300 pl-4 py-1">
                      <p className="text-sm text-stone-600 italic">&ldquo;{quote.text}&rdquo;</p>
                      <p className="text-xs text-stone-400 mt-1 font-semibold">
                        — {quote.author}, {quote.role}
                      </p>
                    </blockquote>
                  ))}
                </div>
              )}

              {/* Mastered toggle */}
              <button
                onClick={onToggleMastered}
                className={`
                  mt-6 w-full py-3 rounded-xl font-bold text-sm transition-all duration-200
                  ${mastered
                    ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300 hover:bg-emerald-200"
                    : "bg-stone-100 text-stone-600 border-2 border-stone-200 hover:bg-stone-200"
                  }
                `}
              >
                {mastered ? "Learned — Click to Unmark" : "Mark as Learned"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
