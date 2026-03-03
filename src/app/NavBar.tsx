'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HIDDEN_PATHS = ['/quiz/play'];

export function NavBar({ isCorporate }: { isCorporate: boolean }) {
  const pathname = usePathname();

  if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-stone-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight text-stone-900"
        >
          {isCorporate ? 'AI Growth' : 'Learn Vibe Coding'}
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/quiz"
            className="px-3 py-1.5 rounded-lg text-sm font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            Quiz
          </Link>
          {!isCorporate && (
            <>
              <Link
                href="/skill-map"
                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Skill Map
              </Link>
              <Link
                href="/curriculum"
                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Curriculum
              </Link>
            </>
          )}
          <a
            href="https://codevibing.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-sm font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            Community
          </a>
        </div>
      </div>
    </nav>
  );
}
