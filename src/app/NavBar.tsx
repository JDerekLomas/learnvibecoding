'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTeamContext } from '@/lib/team';

const HIDDEN_PATHS = ['/quiz/play', '/quiz-chat'];

const linkClass =
  'px-3 py-1.5 rounded-lg text-sm font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors';

export function NavBar({ isCorporate }: { isCorporate: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [teamSlug, setTeamSlug] = useState<string | null>(null);

  useEffect(() => {
    const ctx = getTeamContext();
    if (ctx) setTeamSlug(ctx.teamSlug);
  }, []);

  if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) {
    return null;
  }

  const links = isCorporate ? (
    <>
      <Link href="/journey" className={linkClass} onClick={() => setOpen(false)}>
        Journey
      </Link>
      <Link href="/quiz" className={linkClass} onClick={() => setOpen(false)}>
        Practice
      </Link>
      {teamSlug && (
        <Link href={`/dashboard/${teamSlug}`} className={linkClass} onClick={() => setOpen(false)}>
          Dashboard
        </Link>
      )}
      <a
        href="https://codevibing.com"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Community
      </a>
    </>
  ) : (
    <>
      <Link href="/quiz" className={linkClass} onClick={() => setOpen(false)}>
        Quiz
      </Link>
      <Link href="/skill-map" className={linkClass} onClick={() => setOpen(false)}>
        Skill Map
      </Link>
      <Link href="/curriculum" className={linkClass} onClick={() => setOpen(false)}>
        Curriculum
      </Link>
      <a
        href="https://codevibing.com"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        Community
      </a>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-stone-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight text-stone-900"
          onClick={() => setOpen(false)}
        >
          {isCorporate ? 'AI Growth' : 'Learn Vibe Coding'}
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">{links}</div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-stone-600"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-stone-200 bg-white/95 backdrop-blur-sm px-6 py-3 flex flex-col gap-1">
          {links}
        </div>
      )}
    </nav>
  );
}
