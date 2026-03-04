import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum — Learn Vibe Coding",
  description:
    "A structured path from first AI conversation to shipped product. 7 modules covering self-knowledge, workflow, building, debugging, and advanced craft.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
