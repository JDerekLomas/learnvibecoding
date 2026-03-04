import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect — Learn Vibe Coding",
  description: "Connect with the CodeVibing community. Find your people, share what you're building, and learn together.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
