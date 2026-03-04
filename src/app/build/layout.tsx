import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "Building with AI — Learn Vibe Coding",
  description: "Level up from first build to real projects. Patterns for structuring AI sessions, managing complexity, and shipping quality work.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
