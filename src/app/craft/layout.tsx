import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "The Craft — Learn Vibe Coding",
  description: "Advanced patterns, multi-service architectures, and naming your own moves. The mastery stage of vibe coding.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
