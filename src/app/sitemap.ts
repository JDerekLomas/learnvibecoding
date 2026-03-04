import type { MetadataRoute } from "next";

const BASE_URL = "https://learnvibecoding.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: "/", changeFrequency: "weekly" as const, priority: 1.0 },
    { url: "/quiz", changeFrequency: "monthly" as const, priority: 0.9 },
    { url: "/quiz-chat", changeFrequency: "monthly" as const, priority: 0.9 },
    { url: "/curriculum", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/skill-map", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/journey", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/discover", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/voice", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/claude-code", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/concepts", changeFrequency: "monthly" as const, priority: 0.6 },
    // Curriculum modules
    { url: "/know-yourself", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/landscape", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/workflow", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/first-build", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/build", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/debugging", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/level-up", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/connect", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/for-developers", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/sessions", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/shipping", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/craft", changeFrequency: "monthly" as const, priority: 0.6 },
    // Physics demo
    { url: "/physicsdemo", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/physicsdemo/learn", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/physicsdemo/quiz", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/physicsdemo/quiz-chat", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/physicsdemo/chat", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/physicsdemo/voice", changeFrequency: "monthly" as const, priority: 0.6 },
    // Teams
    { url: "/teams/create", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  return staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
