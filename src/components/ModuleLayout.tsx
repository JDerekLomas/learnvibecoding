"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getData, markVisited, hasExerciseData, onProgressChange } from "@/lib/progress";
import { MODULES, type CourseModule } from "@/data/course-modules";
import { isModuleVisited } from "@/lib/progress";

type DotState = "none" | "visited" | "done";

function ProgressDot({ state }: { state: DotState }) {
  if (state === "none") return null;
  return (
    <span
      className={`inline-block w-2.5 h-2.5 rounded-sm border-[1.5px] border-stone-900 shrink-0 ${
        state === "done" ? "bg-emerald-400" : "bg-stone-200"
      }`}
    />
  );
}

function ChapterItem({
  href,
  title,
  isActive,
  dotState,
}: {
  href: string;
  title: string;
  isActive: boolean;
  dotState: DotState;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-all ml-4 ${
          isActive
            ? "bg-white border-[2px] border-stone-900 shadow-[1.5px_1.5px_0_#1c1917] font-bold text-stone-900"
            : "text-stone-400 hover:text-stone-700 hover:bg-white/40 border-[2px] border-transparent"
        }`}
      >
        <span className="flex-1 truncate">{title}</span>
        <ProgressDot state={dotState} />
      </Link>
    </li>
  );
}

function NavSection({
  title,
  links,
  currentPath,
  dotStates,
  chapterDotStates,
}: {
  title: string;
  links: CourseModule[];
  currentPath: string;
  dotStates: Record<string, DotState>;
  chapterDotStates: Record<string, DotState>;
}) {
  return (
    <div className="mb-5">
      <h3 className="mb-2 text-xs font-black uppercase tracking-wider text-stone-400">
        {title}
      </h3>
      <ul className="space-y-1">
        {links.map((link) => {
          const isModuleActive = currentPath === link.slug;
          const isInsideModule = currentPath.startsWith(link.slug + "/");
          const showChapters = link.chapters && (isModuleActive || isInsideModule);

          return (
            <li key={link.slug}>
              <Link
                href={link.slug}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                  isModuleActive
                    ? "bg-white border-[2.5px] border-stone-900 shadow-[2px_2px_0_#1c1917] font-bold text-stone-900"
                    : isInsideModule
                      ? "bg-white/60 border-[2.5px] border-stone-400 font-bold text-stone-700"
                      : "text-stone-500 hover:text-stone-900 hover:bg-white/60 border-[2.5px] border-transparent"
                }`}
              >
                <span className="flex-1">{link.title}</span>
                <ProgressDot state={dotStates[link.slug] || "none"} />
              </Link>
              {showChapters && link.chapters && (
                <ul className="mt-1 space-y-0.5">
                  {link.chapters.map((ch) => {
                    const chapterPath = `${link.slug}/${ch.slug}`;
                    return (
                      <ChapterItem
                        key={ch.slug}
                        href={chapterPath}
                        title={ch.title}
                        isActive={currentPath === chapterPath}
                        dotState={chapterDotStates[chapterPath] || "none"}
                      />
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [dotStates, setDotStates] = useState<Record<string, DotState>>({});
  const [chapterDotStates, setChapterDotStates] = useState<Record<string, DotState>>({});

  const entryPoints = MODULES.filter((m) => m.section === "entry");
  const core = MODULES.filter((m) => m.section === "core");
  const advanced = MODULES.filter((m) => m.section === "advanced");

  useEffect(() => {
    markVisited(pathname);

    function refreshDots() {
      const d = getData();
      const states: Record<string, DotState> = {};
      const chStates: Record<string, DotState> = {};

      for (const mod of MODULES) {
        if (mod.chapters) {
          // Module with chapters: rollup from chapter states
          const { visited: modVisited, done: modDone } = isModuleVisited(mod.slug);
          if (modDone) {
            states[mod.slug] = "done";
          } else if (modVisited) {
            states[mod.slug] = "visited";
          } else {
            states[mod.slug] = "none";
          }
          // Individual chapter dots
          for (const ch of mod.chapters) {
            const chPath = `${mod.slug}/${ch.slug}`;
            if (hasExerciseData(chPath)) {
              chStates[chPath] = "done";
            } else if (d.visited.includes(chPath)) {
              chStates[chPath] = "visited";
            } else {
              chStates[chPath] = "none";
            }
          }
        } else {
          // Module without chapters: old behavior
          if (hasExerciseData(mod.slug)) {
            states[mod.slug] = "done";
          } else if (d.visited.includes(mod.slug)) {
            states[mod.slug] = "visited";
          } else {
            states[mod.slug] = "none";
          }
        }
      }

      setDotStates(states);
      setChapterDotStates(chStates);
    }

    refreshDots();
    return onProgressChange(refreshDots);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="mx-auto max-w-5xl px-6 py-12 lg:flex lg:gap-10 relative z-10">
        <aside className="hidden lg:block lg:w-56 lg:shrink-0">
          <div className="sticky top-24">
            <NavSection
              title="Start Here"
              links={entryPoints}
              currentPath={pathname}
              dotStates={dotStates}
              chapterDotStates={chapterDotStates}
            />
            <NavSection
              title="Core"
              links={core}
              currentPath={pathname}
              dotStates={dotStates}
              chapterDotStates={chapterDotStates}
            />
            <NavSection
              title="Advanced"
              links={advanced}
              currentPath={pathname}
              dotStates={dotStates}
              chapterDotStates={chapterDotStates}
            />
          </div>
        </aside>
        <main className="min-w-0 max-w-3xl flex-1">
          <div className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] px-8 py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
