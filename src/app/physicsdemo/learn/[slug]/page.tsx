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
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timer = setTimeout(() => onDoneRef.current(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onDoneRef.current()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="bg-[#FFF8F0] rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] p-8 text-center max-w-xs mx-4"
      >
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", damping: 10, stiffness: 200 }}
          className="mx-auto mb-4 h-16 w-16 rounded-xl border-[3px] border-stone-900 bg-emerald-400 flex items-center justify-center shadow-[3px_3px_0_#1c1917]"
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
            className="text-white"
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
          className="text-lg font-black text-stone-900"
        >
          Chapter complete!
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-sm font-bold text-stone-400 mt-1"
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
              className={`h-3 w-3 rounded-sm border-[2px] border-stone-900 ${
                i < chapterNum ? "bg-[#E07A5F]" : "bg-white"
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
        <p className="text-stone-500 font-bold">Chapter not found.</p>
        <Link
          href="/physicsdemo/learn"
          className="text-[#E07A5F] font-black underline mt-2 inline-block"
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

      {/* Back nav */}
      <Link
        href="/physicsdemo/learn"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors no-underline mb-5 w-fit"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Chapters
      </Link>

      {/* Hero image */}
      <div className="relative w-full h-48 sm:h-56 mb-6 overflow-hidden rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917]">
        <Image
          src={chapter.heroImage}
          alt={chapter.heroAlt}
          fill
          className="object-cover"
          sizes="(max-width: 672px) 100vw, 672px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-xs font-black uppercase tracking-wider text-white/80 mb-1">
            Chapter {index + 1} of {chapters.length}
          </p>
          <h1 className="text-xl sm:text-2xl font-black text-white drop-shadow-sm">
            {chapter.title}
          </h1>
        </div>
      </div>

      {/* Chapter content */}
      <div className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] px-6 py-6">
        <div className="prose prose-stone prose-sm max-w-none [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ul]:leading-relaxed">
          {chapter.content}
        </div>
      </div>

      {/* Complete & Continue */}
      <div className="mt-6">
        <button
          onClick={handleComplete}
          disabled={completing}
          className="w-full py-3 px-6 rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white font-black text-sm shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#1c1917]"
        >
          {next ? "Complete & Continue" : "Complete & Back to Chapters"}
        </button>
      </div>

      {/* Prev/Next nav */}
      <div className="flex justify-between mt-4">
        {prev ? (
          <Link
            href={`/physicsdemo/learn/${prev.slug}`}
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/physicsdemo/learn/${next.slug}`}
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <Link
            href="/physicsdemo/learn"
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            All chapters &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
