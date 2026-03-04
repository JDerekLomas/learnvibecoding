import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "AI for Your Role — Learn Vibe Coding",
  description: "You don't need to become a developer. Learn how AI applies to the work you already do — marketing, teaching, research, management, and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
