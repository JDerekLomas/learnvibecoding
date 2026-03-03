"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { chapters } from "@/data/physics-chapters";
import { markVisited } from "@/lib/progress";

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const index = chapters.findIndex((ch) => ch.slug === slug);
  const chapter = chapters[index];

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

  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  function handleComplete() {
    markVisited(`physics-learn-${slug}`);
    if (next) {
      router.push(`/physicsdemo/learn/${next.slug}`);
    } else {
      router.push("/physicsdemo/learn");
    }
  }

  return (
    <div>
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
          className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors shadow-sm"
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
