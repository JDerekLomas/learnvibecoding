import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Map — Learn Vibe Coding",
  description:
    "Visual map of vibe coding skills across 11 topics. See where you are and where to go next.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
