import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Learning Journey — Learn Vibe Coding",
  description:
    "A 5-step guided path: discover your project, assess your skills, learn the fundamentals, practice building, and ship something real.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
