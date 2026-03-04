import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Assessment — Learn Vibe Coding",
  description:
    "Test your AI building skills across 11 topics. Confidence-based questions that adapt to what you know.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
