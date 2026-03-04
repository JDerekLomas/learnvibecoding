'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTeamContext } from '@/lib/team';
import { getCVAuth, clearCVAuth } from '@/lib/codevibing-auth';

const HIDDEN_PATHS = ['/quiz/play', '/quiz-chat'];

const linkClass =
  'px-3 py-1.5 rounded-lg text-sm font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors';

function UserMenu({ username, onDisconnect, mobile }: { username: string; onDisconnect: () => void; mobile?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  if (mobile) {
    return (
      <>
        <div className="px-3 py-1.5 text-sm font-semibold text-emerald-600">@{username}</div>
        <a
          href={`https://codevibing.com/u/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors pl-6"
        >
          Profile
        </a>
        <Link
          href="/connect"
          className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors pl-6"
        >
          API Key
        </Link>
        <button
          onClick={onDisconnect}
          className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors pl-6 text-left"
        >
          Disconnect
        </button>
      </>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="px-3 py-1.5 rounded-lg text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
      >
        @{username}
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl border border-stone-200 shadow-lg py-1 z-50">
          <a
            href={`https://codevibing.com/u/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </a>
          <Link
            href="/connect"
            className="block px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            API Key
          </Link>
          <div className="border-t border-stone-100 my-1" />
          <button
            onClick={() => { onDisconnect(); setMenuOpen(false); }}
            className="block w-full text-left px-4 py-2.5 text-sm font-medium text-stone-500 hover:bg-stone-50 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export function NavBar({ isCorporate }: { isCorporate: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [teamSlug, setTeamSlug] = useState<string | null>(null);
  const [cvUsername, setCvUsername] = useState<string | null>(null);

  useEffect(() => {
    const ctx = getTeamContext();
    if (ctx) setTeamSlug(ctx.teamSlug);
    const auth = getCVAuth();
    if (auth) setCvUsername(auth.username);
  }, []);

  if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) {
    return null;
  }

  function handleDisconnect() {
    clearCVAuth();
    setCvUsername(null);
    setOpen(false);
  }

  const consumerLinks = (mobile?: boolean) => (
    <>
      <Link href="/curriculum" className={linkClass} onClick={() => setOpen(false)}>
        Learn
      </Link>
      <Link href="/quiz" className={linkClass} onClick={() => setOpen(false)}>
        Practice
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
      {cvUsername && (
        <UserMenu username={cvUsername} onDisconnect={handleDisconnect} mobile={mobile} />
      )}
    </>
  );

  const corporateLinks = (mobile?: boolean) => (
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
      {cvUsername ? (
        <UserMenu username={cvUsername} onDisconnect={handleDisconnect} mobile={mobile} />
      ) : (
        <Link href="/connect" className={linkClass} onClick={() => setOpen(false)}>
          Connect
        </Link>
      )}
    </>
  );

  const renderLinks = isCorporate ? corporateLinks : consumerLinks;

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-stone-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight text-stone-900"
          onClick={() => setOpen(false)}
        >
          {isCorporate ? 'AI Growth Net' : 'Learn Vibe Coding'}
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">{renderLinks()}</div>

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
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
}
