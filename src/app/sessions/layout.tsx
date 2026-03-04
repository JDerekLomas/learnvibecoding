import type { Metadata } from "next";
import ModuleLayout from "@/components/ModuleLayout";

export const metadata: Metadata = {
  title: "Mastering Sessions — Learn Vibe Coding",
  description: "Session hygiene, prompt archaeology, and developing your prompting signature. Advanced patterns for productive AI collaboration.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ModuleLayout>{children}</ModuleLayout>;
}
