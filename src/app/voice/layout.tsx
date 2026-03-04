import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice Discovery — Learn Vibe Coding",
  description:
    "Discover what you want to create through a voice conversation with AI. Unlock your vision and walk away with a project you're excited to build.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
