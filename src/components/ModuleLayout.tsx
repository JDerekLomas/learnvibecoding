"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getData, markVisited, hasExerciseData, onProgressChange } from "@/lib/progress";
import { MODULES, type CourseModule } from "@/data/course-modules";

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

function NavSection({
  title,
  links,
  currentPath,
  dotStates,
}: {
  title: string;
  links: CourseModule[];
  currentPath: string;
  dotStates: Record<string, DotState>;
}) {
  return (
    <div className="mb-5">
      <h3 className="mb-2 text-xs font-black uppercase tracking-wider text-stone-400">
        {title}
      </h3>
      <ul className="space-y-1">
        {links.map((link) => {
          const isActive = currentPath === link.slug;
          return (
            <li key={link.slug}>
              <Link
                href={link.slug}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-white border-[2.5px] border-stone-900 shadow-[2px_2px_0_#1c1917] font-bold text-stone-900"
                    : "text-stone-500 hover:text-stone-900 hover:bg-white/60 border-[2.5px] border-transparent"
                }`}
              >
                {link.tag && (
                  <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${link.color} shrink-0`}>
                    {link.tag}
                  </span>
                )}
                <span className="flex-1">{link.title}</span>
                <ProgressDot state={dotStates[link.slug] || "none"} />
              </Link>
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

  const entryPoints = MODULES.filter((m) => m.section === "entry");
  const core = MODULES.filter((m) => m.section === "core");
  const advanced = MODULES.filter((m) => m.section === "advanced");

  useEffect(() => {
    markVisited(pathname);

    function refreshDots() {
      const d = getData();
      const states: Record<string, DotState> = {};
      for (const mod of MODULES) {
        if (hasExerciseData(mod.slug)) {
          states[mod.slug] = "done";
        } else if (d.visited.includes(mod.slug)) {
          states[mod.slug] = "visited";
        } else {
          states[mod.slug] = "none";
        }
      }
      setDotStates(states);
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
            />
            <NavSection
              title="Core"
              links={core}
              currentPath={pathname}
              dotStates={dotStates}
            />
            <NavSection
              title="Advanced"
              links={advanced}
              currentPath={pathname}
              dotStates={dotStates}
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
