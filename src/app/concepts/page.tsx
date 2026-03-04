import type { Metadata } from "next";
import ConceptRoadmap from "@/components/ConceptRoadmap";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Concept Roadmap — Learn Vibe Coding",
  description: "25 essential vibe coding concepts with memes, quotes, and mastery tracking",
};

export default function ConceptsPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <main className="mx-auto max-w-2xl px-6 py-10 relative z-10">
        <h1 className="text-3xl font-black text-stone-900 text-center mb-2">
          Concept Roadmap
        </h1>
        <p className="text-center text-stone-500 font-medium mb-8">
          25 essential concepts for vibe coding — learn them through memes
        </p>
        <ConceptRoadmap />
      </main>
      <Footer />
    </div>
  );
}
