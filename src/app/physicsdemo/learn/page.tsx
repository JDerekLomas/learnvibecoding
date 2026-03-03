"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getData, onProgressChange } from "@/lib/progress";
import { chapters } from "@/data/physics-chapters";

export default function LearnIndex() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(getData().visited);
    return onProgressChange(() => setVisited(getData().visited));
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-stone-900 mb-1">
          Heat &amp; Thermal Energy
        </h1>
        <p className="text-sm text-stone-500">
          Everything around you is vibrating. Heat is the story of that motion:
          how it starts, how it spreads, and why it matters.
        </p>
      </div>

      <div className="space-y-3">
        {chapters.map((ch, i) => {
          const done = visited.includes(`physics-learn-${ch.slug}`);
          return (
            <Link
              key={ch.slug}
              href={`/physicsdemo/learn/${ch.slug}`}
              className="flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-stone-50 transition-colors no-underline group"
            >
              <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                <Image
                  src={ch.heroImage}
                  alt={ch.heroAlt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {i + 1}. {ch.title}
                </p>
                <p className="text-xs text-stone-400 mt-0.5 truncate">
                  {ch.subtitle}
                </p>
              </div>
              {done ? (
                <span className="shrink-0 h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              ) : (
                <span className="shrink-0 h-6 w-6 rounded-full border-2 border-stone-200" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
