import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "For Developers — Learn Vibe Coding",
  description: "Already a developer? Here's how AI tools change your workflow. Skip the basics and go straight to what matters for experienced builders.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
