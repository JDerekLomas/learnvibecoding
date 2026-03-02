"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getData, markVisited, hasExerciseData } from "@/lib/progress";

interface ModuleLink {
  href: string;
  label: string;
  tag?: string;
}

const entryPoints: ModuleLink[] = [
  { href: "/landscape", label: "The AI Landscape", tag: "M0-A" },
  { href: "/first-build", label: "Your First Build", tag: "M0-B" },
  { href: "/for-developers", label: "For Developers", tag: "M0-C" },
  { href: "/level-up", label: "Level Up", tag: "M0-D" },
];

const sharedCore: ModuleLink[] = [
  { href: "/know-yourself", label: "Know Yourself", tag: "M1" },
  { href: "/workflow", label: "The Workflow", tag: "M2" },
  { href: "/build", label: "Build Something", tag: "M3" },
  { href: "/debugging", label: "When Things Break", tag: "M4" },
];

const advanced: ModuleLink[] = [
  { href: "/sessions", label: "Mastering Sessions", tag: "M5" },
  { href: "/shipping", label: "Portfolio & Shipping", tag: "M6" },
  { href: "/craft", label: "The Craft", tag: "M7" },
];

type DotState = "none" | "visited" | "done";

function ProgressDot({ state }: { state: DotState }) {
  if (state === "none") return null;
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${
        state === "done"
          ? "bg-emerald-500 dark:bg-emerald-400"
          : "bg-zinc-300 dark:bg-zinc-600"
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
    <div className="mb-6">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        {title}
      </h3>
      <ul className="space-y-1">
        {links.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-100 text-zinc-900 font-medium dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50"
                }`}
              >
                {link.tag && (
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 w-8 shrink-0">
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
  }, [pathname]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:flex lg:gap-12">
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
      <main className="min-w-0 max-w-3xl flex-1">{children}</main>
    </div>
  );
}
