"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { chapters } from "@/data/workflow-chapters";
import { markVisited } from "@/lib/progress";
import CompletionOverlay from "@/components/CompletionOverlay";
import ModuleNav from "@/components/ModuleNav";

export default function WorkflowChapterPage() {
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
      router.push(`/workflow/${next.slug}`);
    } else {
      router.push("/workflow");
    }
  }, [next, router]);

  if (!chapter) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500 font-medium">Section not found.</p>
        <Link
          href="/workflow"
          className="text-blue-600 dark:text-blue-400 underline mt-2 inline-block"
        >
          Back to Workflow
        </Link>
      </div>
    );
  }

  function handleComplete() {
    markVisited(`workflow-${slug}`);
    setCompleting(true);
  }

  const isLastChapter = !next;

  return (
    <div>
      <AnimatePresence>
        {completing && (
          <CompletionOverlay
            currentStep={index + 1}
            totalSteps={chapters.length}
            label="Section complete!"
            onDone={() => onDoneRef.current()}
          />
        )}
      </AnimatePresence>

      {/* Back nav */}
      <Link
        href="/workflow"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors no-underline mb-5 w-fit"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        The Vibe Coding Workflow
      </Link>

      {/* Chapter header */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800/50 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/10 dark:to-transparent px-6 py-5 mb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-500 dark:text-blue-400 mb-1">
          Section {index + 1} of {chapters.length}
        </p>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {chapter.title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {chapter.subtitle}
        </p>
      </div>

      {/* Chapter content */}
      <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none [&>p]:mb-4 [&>p]:leading-relaxed [&>h3]:text-base [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>h4]:text-sm [&>h4]:font-semibold [&>h4]:mt-6 [&>h4]:mb-2">
        {chapter.content}
      </div>

      {/* Complete & Continue */}
      <div className="mt-8">
        <button
          onClick={handleComplete}
          disabled={completing}
          className="w-full py-3 px-6 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-semibold text-sm hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          {next ? "Complete & Continue" : "Complete & Back to Overview"}
        </button>
      </div>

      {/* Prev/Next nav */}
      <div className="flex justify-between mt-4 mb-2">
        {prev ? (
          <Link
            href={`/workflow/${prev.slug}`}
            className="text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors no-underline"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/workflow/${next.slug}`}
            className="text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors no-underline"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <Link
            href="/workflow"
            className="text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors no-underline"
          >
            All sections &rarr;
          </Link>
        )}
      </div>

      {/* Show ModuleNav only on last chapter */}
      {isLastChapter && <ModuleNav />}
    </div>
  );
}
