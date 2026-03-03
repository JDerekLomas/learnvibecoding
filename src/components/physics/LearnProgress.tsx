"use client";

import { useEffect, useState } from "react";
import { getData, onProgressChange } from "@/lib/progress";
import { chapters } from "@/data/physics-chapters";

export default function LearnProgress() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(getData().visited);
    return onProgressChange(() => setVisited(getData().visited));
  }, []);

  const completed = chapters.filter((ch) =>
    visited.includes(`physics-learn-${ch.slug}`)
  ).length;

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {chapters.map((ch, i) => (
          <div
            key={ch.slug}
            className={`h-2 rounded-full transition-colors ${
              i < completed
                ? "bg-amber-500"
                : "bg-stone-200"
            }`}
            style={{ width: `${100 / chapters.length}%`, minWidth: 24 }}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-stone-400 whitespace-nowrap">
        {completed} of {chapters.length}
      </span>
    </div>
  );
}
