import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "Know Yourself — Learn Vibe Coding",
  description: "Discover your strengths, learning style, and what you want to build with AI. The foundation of your vibe coding journey.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
