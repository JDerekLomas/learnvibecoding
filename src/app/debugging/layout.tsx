import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "Debugging & Recovery — Learn Vibe Coding",
  description: "When AI-generated code breaks, what do you do? Learn to diagnose, fix, and recover — the skill that separates builders from bystanders.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
