import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "Level Up — Learn Vibe Coding",
  description: "Advanced techniques for AI-assisted development. Multi-file projects, API integrations, and building production-grade apps.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
