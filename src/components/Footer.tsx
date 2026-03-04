export default function Footer() {
  return (
    <div className="relative z-10 bg-gradient-to-b from-transparent via-stone-800/80 to-stone-950 pt-16 pb-10 px-6 -mt-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm text-white/70">
          Built by{" "}
          <a href="https://dereklomas.me" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors" target="_blank" rel="noopener noreferrer">
            Derek Lomas
          </a>
          . Part of the{" "}
          <a href="https://codevibing.com" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors" target="_blank" rel="noopener noreferrer">
            CodeVibing
          </a>{" "}
          ecosystem.
        </p>
      </div>
    </div>
  );
}
