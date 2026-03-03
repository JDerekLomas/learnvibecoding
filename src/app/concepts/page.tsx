import type { Metadata } from "next";
import ConceptRoadmap from "@/components/ConceptRoadmap";

export const metadata: Metadata = {
  title: "Concept Roadmap — Learn Vibe Coding",
  description: "25 essential vibe coding concepts with memes, quotes, and mastery tracking",
};

export default function ConceptsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-extrabold text-stone-900 text-center mb-2">
        Concept Roadmap
      </h1>
      <p className="text-center text-stone-500 font-medium mb-8">
        25 essential concepts for vibe coding — learn them through memes
      </p>
      <ConceptRoadmap />
    </main>
  );
}
