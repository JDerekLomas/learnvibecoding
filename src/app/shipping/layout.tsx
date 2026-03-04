import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "Portfolio & Shipping — Learn Vibe Coding",
  description: "The gap between 'built' and 'shipped' — and how to close it. Deploy, share, and build your portfolio of AI-assisted projects.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
