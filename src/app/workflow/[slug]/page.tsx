"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { chapters } from "@/data/workflow-chapters";
import ChapterNav from "@/components/ChapterNav";

export default function WorkflowChapterPage() {
  const params = useParams();
  const slug = params.slug as string;

  const index = chapters.findIndex((ch) => ch.slug === slug);
  const chapter = chapters[index];

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

  return (
    <div>
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
          Chapter {index + 1} of {chapters.length}
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

      {/* Chapter navigation */}
      <ChapterNav />
    </div>
  );
}
