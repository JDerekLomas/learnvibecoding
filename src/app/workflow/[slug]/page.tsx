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
        <p className="text-stone-500 font-bold">Section not found.</p>
        <Link
          href="/workflow"
          className="text-blue-700 underline mt-2 inline-block font-bold"
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
        className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors no-underline mb-5 w-fit"
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
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-wider text-stone-400 mb-1">
          Chapter {index + 1} of {chapters.length}
        </p>
        <h1 className="text-xl font-black tracking-tight text-stone-900">
          {chapter.title}
        </h1>
        <p className="text-sm font-medium text-stone-500 mt-1">
          {chapter.subtitle}
        </p>
      </div>

      {/* Chapter content */}
      <div className="prose prose-stone prose-sm max-w-none [&>p]:mb-4 [&>p]:leading-relaxed [&>h3]:text-base [&>h3]:font-black [&>h3]:mt-8 [&>h3]:mb-3 [&>h4]:text-sm [&>h4]:font-bold [&>h4]:mt-6 [&>h4]:mb-2">
        {chapter.content}
      </div>

      {/* Chapter navigation */}
      <ChapterNav />
    </div>
  );
}
