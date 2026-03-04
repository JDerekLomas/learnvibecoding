import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover What to Build — Learn Vibe Coding",
  description:
    "An AI-powered discovery conversation that helps you find the right project to build — based on your interests, role, and what excites you.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
