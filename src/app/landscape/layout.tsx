import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "The AI Landscape — Learn Vibe Coding",
  description: "Understand the tools and ecosystem of AI-assisted development. What's available, what's hype, and what actually works.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
