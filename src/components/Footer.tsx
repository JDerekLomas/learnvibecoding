import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative z-10 bg-gradient-to-b from-transparent via-stone-800/80 to-stone-950 pt-16 pb-10 px-6 -mt-4">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Learn */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/curriculum" className="text-sm text-white/70 hover:text-white transition-colors">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-sm text-white/70 hover:text-white transition-colors">
                  Quiz
                </Link>
              </li>
              <li>
                <Link href="/discover" className="text-sm text-white/70 hover:text-white transition-colors">
                  Discover
                </Link>
              </li>
            </ul>
          </div>

          {/* Reference */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">Reference</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/claude-code" className="text-sm text-white/70 hover:text-white transition-colors">
                  Claude Code Roadmap
                </Link>
              </li>
              <li>
                <Link href="/concepts" className="text-sm text-white/70 hover:text-white transition-colors">
                  Key Concepts
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://codevibing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  CodeVibing
                </a>
              </li>
              <li>
                <Link href="/connect" className="text-sm text-white/70 hover:text-white transition-colors">
                  Connect Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center border-t border-white/10 pt-6">
          <p className="text-sm text-white/70">
            Built by{" "}
            <a
              href="https://dereklomas.me"
              className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Derek Lomas
            </a>
            . Part of the{" "}
            <a
              href="https://codevibing.com"
              className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeVibing
            </a>{" "}
            ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}
