import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice Discovery — Learn Vibe Coding",
  description:
    "Talk through what you want to build with an AI voice tutor. A conversational way to discover your first project.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
