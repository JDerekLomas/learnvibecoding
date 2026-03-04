"use client";

import { useState, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { getChapterNav } from "@/data/course-modules";
import { markVisited } from "@/lib/progress";
import CompletionOverlay from "@/components/CompletionOverlay";

export default function ChapterNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [completing, setCompleting] = useState(false);
  const onDoneRef = useRef<() => void>(() => {});

  const nav = getChapterNav(pathname);
  if (!nav) return null;

  const {
    moduleSlug,
    moduleTitle,
    chapterIndex,
    totalChapters,
    prevChapterPath,
    prevChapterTitle,
    nextChapterPath,
    nextChapterTitle,
    nextModulePath,
    nextModuleTitle,
    isLastChapter,
  } = nav;

  onDoneRef.current = useCallback(() => {
    if (nextChapterPath) {
      router.push(nextChapterPath);
    } else if (nextModulePath) {
      router.push(nextModulePath);
    } else {
      router.push("/curriculum");
    }
  }, [nextChapterPath, nextModulePath, router]);

  function handleComplete() {
    markVisited(pathname);
    setCompleting(true);
  }

  const buttonLabel = isLastChapter
    ? nextModulePath
      ? "Complete Module & Continue"
      : "Complete & Back to Curriculum"
    : "Complete & Continue";

  const overlayLabel = isLastChapter ? "Module complete!" : "Chapter complete!";
  const overlayStep = isLastChapter ? totalChapters : chapterIndex + 1;

  return (
    <div className="mt-12 pt-8 border-t-[2.5px] border-stone-900">
      <AnimatePresence>
        {completing && (
          <CompletionOverlay
            currentStep={overlayStep}
            totalSteps={totalChapters}
            label={overlayLabel}
            onDone={() => onDoneRef.current()}
          />
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <p className="text-xs font-bold text-stone-400 mb-3 text-center uppercase tracking-wider">
        Chapter {chapterIndex + 1} of {totalChapters}
      </p>

      {/* Complete & Continue button */}
      <button
        onClick={handleComplete}
        disabled={completing}
        className="w-full py-3 px-6 rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white font-black text-sm shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#1c1917]"
      >
        {buttonLabel}
      </button>

      {/* Prev/Next links */}
      <div className="flex justify-between mt-4">
        {prevChapterPath ? (
          <Link
            href={prevChapterPath}
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            &larr; {prevChapterTitle}
          </Link>
        ) : (
          <Link
            href={moduleSlug}
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            &larr; {moduleTitle}
          </Link>
        )}
        {nextChapterPath ? (
          <Link
            href={nextChapterPath}
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            {nextChapterTitle} &rarr;
          </Link>
        ) : nextModulePath ? (
          <Link
            href={nextModulePath}
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            {nextModuleTitle} &rarr;
          </Link>
        ) : (
          <Link
            href="/curriculum"
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            All modules &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
