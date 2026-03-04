"use client";

import { useState, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { getSequentialNav } from "@/data/course-modules";
import { markVisited } from "@/lib/progress";
import CompletionOverlay from "@/components/CompletionOverlay";

export default function ModuleNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [completing, setCompleting] = useState(false);
  const { prev, next, index, total } = getSequentialNav(pathname);
  const onDoneRef = useRef<() => void>(() => {});

  onDoneRef.current = useCallback(() => {
    if (next) {
      router.push(next.slug);
    } else {
      router.push("/curriculum");
    }
  }, [next, router]);

  // Not in the sequential path — don't render
  if (index === -1) return null;

  function handleComplete() {
    markVisited(pathname);
    setCompleting(true);
  }

  return (
    <div className="mt-12 pt-8 border-t-[2.5px] border-stone-900">
      <AnimatePresence>
        {completing && (
          <CompletionOverlay
            currentStep={index + 1}
            totalSteps={total}
            label="Module complete!"
            onDone={() => onDoneRef.current()}
          />
        )}
      </AnimatePresence>

      {/* Complete & Continue button */}
      <button
        onClick={handleComplete}
        disabled={completing}
        className="w-full py-3 px-6 rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white font-black text-sm shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#1c1917]"
      >
        {next ? "Complete & Continue" : "Complete & Back to Curriculum"}
      </button>

      {/* Prev/Next links */}
      <div className="flex justify-between mt-4">
        {prev ? (
          <Link
            href={prev.slug}
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            &larr; {prev.tag}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.slug}
            className="text-xs font-black text-stone-400 hover:text-stone-900 transition-colors no-underline"
          >
            {next.tag}: {next.title} &rarr;
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
