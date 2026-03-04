import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "Your First Build — Learn Vibe Coding",
  description: "Go from zero to a working project in 30 minutes. Guided step-by-step with AI doing the heavy lifting.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
