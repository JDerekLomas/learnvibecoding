import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "AI Workflow — Learn Vibe Coding",
  description: "Learn the core loop of working with AI: prompt, review, iterate. Build the habits that make AI collaboration productive.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
