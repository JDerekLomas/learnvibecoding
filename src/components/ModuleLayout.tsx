"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getData, markVisited, hasExerciseData, onProgressChange } from "@/lib/progress";
import DoodleBg from "@/components/quiz/DoodleBg";

interface ModuleLink {
  href: string;
  label: string;
  tag?: string;
  color: string;
}

const entryPoints: ModuleLink[] = [
  { href: "/landscape", label: "The AI Landscape", tag: "M0-A", color: "bg-violet-500" },
  { href: "/first-build", label: "Your First Build", tag: "M0-B", color: "bg-amber-500" },
  { href: "/for-developers", label: "For Developers", tag: "M0-C", color: "bg-blue-500" },
  { href: "/level-up", label: "Level Up", tag: "M0-D", color: "bg-emerald-500" },
];

const sharedCore: ModuleLink[] = [
  { href: "/know-yourself", label: "Know Yourself", tag: "M1", color: "bg-amber-500" },
  { href: "/workflow", label: "The Workflow", tag: "M2", color: "bg-blue-500" },
  { href: "/build", label: "Build Something", tag: "M3", color: "bg-emerald-500" },
  { href: "/debugging", label: "When Things Break", tag: "M4", color: "bg-red-500" },
];

const advanced: ModuleLink[] = [
  { href: "/sessions", label: "Mastering Sessions", tag: "M5", color: "bg-indigo-500" },
  { href: "/shipping", label: "Portfolio & Shipping", tag: "M6", color: "bg-teal-500" },
  { href: "/craft", label: "The Craft", tag: "M7", color: "bg-purple-500" },
];

type DotState = "none" | "visited" | "done";

function ProgressDot({ state }: { state: DotState }) {
  if (state === "none") return null;
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full shrink-0 ${
        state === "done" ? "bg-emerald-500" : "bg-stone-300"
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
  links: ModuleLink[];
  currentPath: string;
  dotStates: Record<string, DotState>;
}) {
  return (
    <div className="mb-5">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-400">
        {title}
      </h3>
      <ul className="space-y-1">
        {links.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-white border-2 border-stone-200 shadow-sm font-bold text-stone-900"
                    : "text-stone-500 hover:text-stone-900 hover:bg-white/60 border-2 border-transparent"
                }`}
              >
                {link.tag && (
                  <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${link.color} shrink-0`}>
                    {link.tag}
                  </span>
                )}
                <span className="flex-1">{link.label}</span>
                <ProgressDot state={dotStates[link.href] || "none"} />
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

  useEffect(() => {
    markVisited(pathname);

    function refreshDots() {
      const d = getData();
      const allLinks = [...entryPoints, ...sharedCore, ...advanced];
      const states: Record<string, DotState> = {};
      for (const link of allLinks) {
        if (hasExerciseData(link.href)) {
          states[link.href] = "done";
        } else if (d.visited.includes(link.href)) {
          states[link.href] = "visited";
        } else {
          states[link.href] = "none";
        }
      }
      setDotStates(states);
    }

    refreshDots();
    return onProgressChange(refreshDots);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      <DoodleBg src="/textures/vibecode-light-1.png" opacity={0.08} />
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
              links={sharedCore}
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
          <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-8 py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
