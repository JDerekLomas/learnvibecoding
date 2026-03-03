import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn Vibe Coding",
  description:
    "A structured curriculum for building with AI — from first conversation to shipped product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-stone-50/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-stone-950/80">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              Learn Vibe Coding
            </Link>
            <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
              <Link href="/skill-map" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Skill Map
              </Link>
              <Link href="/curriculum" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Curriculum
              </Link>
              <a
                href="https://codevibing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Community
              </a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
