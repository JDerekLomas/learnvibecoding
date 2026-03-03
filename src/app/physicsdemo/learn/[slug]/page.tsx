"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "@/data/physics-chapters";
import { markVisited } from "@/lib/progress";

function CompletionOverlay({
  chapterNum,
  total,
  onDone,
}: {
  chapterNum: number;
  total: number;
  onDone: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-xs mx-4"
      >
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", damping: 10, stiffness: 200 }}
          className="mx-auto mb-4 h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center"
        >
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-600"
          >
            <motion.polyline
              points="20 6 9 17 4 12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg font-extrabold text-stone-900"
        >
          Chapter complete!
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-sm text-stone-400 mt-1"
        >
          {chapterNum} of {total} done
        </motion.p>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex justify-center gap-2 mt-4"
        >
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={i === chapterNum - 1 ? { scale: 0 } : {}}
              animate={i === chapterNum - 1 ? { scale: 1 } : {}}
              transition={
                i === chapterNum - 1
                  ? { delay: 0.8, type: "spring", damping: 10 }
                  : {}
              }
              className={`h-2.5 w-2.5 rounded-full ${
                i < chapterNum ? "bg-amber-500" : "bg-stone-200"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [completing, setCompleting] = useState(false);
  const onDoneRef = useRef<() => void>(() => {});

  const index = chapters.findIndex((ch) => ch.slug === slug);
  const chapter = chapters[index];

  const next = index < chapters.length - 1 ? chapters[index + 1] : null;
  const prev = index > 0 ? chapters[index - 1] : null;

  onDoneRef.current = useCallback(() => {
    if (next) {
      router.push(`/physicsdemo/learn/${next.slug}`);
    } else {
      router.push("/physicsdemo/learn");
    }
  }, [next, router]);

  if (!chapter) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-500">Chapter not found.</p>
        <Link
          href="/physicsdemo/learn"
          className="text-amber-600 underline mt-2 inline-block"
        >
          Back to chapters
        </Link>
      </div>
    );
  }

  function handleComplete() {
    markVisited(`physics-learn-${slug}`);
    setCompleting(true);
  }

  return (
    <div>
      <AnimatePresence>
        {completing && (
          <CompletionOverlay
            chapterNum={index + 1}
            total={chapters.length}
            onDone={() => onDoneRef.current()}
          />
        )}
      </AnimatePresence>

      {/* Hero image */}
      <div className="relative w-full h-48 sm:h-56 -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 overflow-hidden rounded-t-2xl">
        <Image
          src={chapter.heroImage}
          alt={chapter.heroAlt}
          fill
          className="object-cover"
          sizes="(max-width: 672px) 100vw, 672px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
            Chapter {index + 1} of {chapters.length}
          </p>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-sm">
            {chapter.title}
          </h1>
        </div>
      </div>

      {/* Chapter content */}
      <div className="prose prose-stone prose-sm max-w-none [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ul]:leading-relaxed">
        {chapter.content}
      </div>

      {/* Complete & Continue */}
      <div className="mt-8 pt-6 border-t border-stone-200">
        <button
          onClick={handleComplete}
          disabled={completing}
          className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold text-sm transition-colors shadow-sm"
        >
          {next ? "Complete & Continue" : "Complete & Back to Chapters"}
        </button>
      </div>

      {/* Prev/Next nav */}
      <div className="flex justify-between mt-4">
        {prev ? (
          <Link
            href={`/physicsdemo/learn/${prev.slug}`}
            className="text-xs font-semibold text-stone-400 hover:text-stone-600 transition-colors no-underline"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/physicsdemo/learn/${next.slug}`}
            className="text-xs font-semibold text-stone-400 hover:text-stone-600 transition-colors no-underline"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <Link
            href="/physicsdemo/learn"
            className="text-xs font-semibold text-stone-400 hover:text-stone-600 transition-colors no-underline"
          >
            All chapters &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
