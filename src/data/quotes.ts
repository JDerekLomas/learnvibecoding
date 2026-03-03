export interface Quote {
  text: string;
  author: string;
  role: string;
  source: string;
  concept: string;
}

export const quotes: Quote[] = [
  {
    text: "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists.",
    author: "Andrej Karpathy",
    role: "Co-founder of OpenAI",
    source: "https://x.com/karpathy/status/1886192184808149383",
    concept: "Vibes Are Valid",
  },
  {
    text: "The hottest new programming language is English.",
    author: "Andrej Karpathy",
    role: "Co-founder of OpenAI",
    source: "https://x.com/karpathy/status/1617979122625712128",
    concept: "Context Engineering",
  },
  {
    text: "Code is suddenly free, ephemeral, malleable, discardable after single use.",
    author: "Andrej Karpathy",
    role: "Co-founder of OpenAI",
    source: "https://karpathy.bearblog.dev/year-in-review-2025/",
    concept: "Build to Learn",
  },
  {
    text: "For 25% of the Winter 2025 batch, 95% of lines of code are LLM generated.",
    author: "Garry Tan",
    role: "CEO of Y Combinator",
    source: "https://x.com/garrytan/status/1897303270311489931",
    concept: "The Pareto Paradox",
  },
  {
    text: "For the first time, I don't feel the wall between 'designer' and 'developer.' I feel like both. I feel like a one-person startup.",
    author: "Anonymous product designer",
    role: "Product designer",
    source: "https://medium.com/design-bootcamp/no-27-vibe-coding-as-a-product-designer-lessons-learned-6405587036c3",
    concept: "The Orchestrator Shift",
  },
  {
    text: "I would mass-vibe-code for almost everything, then bring in a professional for review, hardening, and edgecases.",
    author: "Simon Willison",
    role: "Creator of Django",
    source: "https://simonwillison.net/2025/Mar/19/vibe-coding/",
    concept: "The Taste Gap",
  },
  {
    text: "The best AI-assisted developers aren't the ones who write the most prompts. They're the ones who know what good looks like.",
    author: "Addy Osmani",
    role: "Engineering lead at Google Chrome",
    source: "https://addyosmani.com/blog/ai-coding/",
    concept: "The Taste Gap",
  },
  {
    text: "Context engineering is the art of providing all the information, tools, and structure the LLM needs to plausibly solve a task.",
    author: "Andrej Karpathy",
    role: "Co-founder of OpenAI",
    source: "https://x.com/karpathy/status/1937208846958985698",
    concept: "Context Engineering",
  },
  {
    text: "AI coding tools saved me time but also created new categories of problems I'd never seen before.",
    author: "Steve Yegge",
    role: "Head of Engineering at Sourcegraph",
    source: "https://sourcegraph.com/blog/the-death-of-the-junior-developer",
    concept: "The Verification Gap",
  },
  {
    text: "Effective immediately, using Copilot and similar tools is an expectation at Shopify.",
    author: "Tobi Lutke",
    role: "CEO of Shopify",
    source: "https://x.com/toaborern/status/1909636811277603106",
    concept: "The Orchestrator Shift",
  },
  {
    text: "The key insight is that you're not coding anymore — you're directing. And directing requires taste, not syntax.",
    author: "Addy Osmani",
    role: "Engineering lead at Google Chrome",
    source: "https://addyosmani.com/blog/ai-coding/",
    concept: "The Director",
  },
  {
    text: "72% of AI-generated code contained at least one security vulnerability.",
    author: "Veracode",
    role: "Security research firm",
    source: "https://www.veracode.com/state-of-software-security",
    concept: "The Security Blindspot",
  },
  {
    text: "Try 3 times, then start fresh. Stale conversations produce stale code.",
    author: "Peter Yang",
    role: "Product lead at Roblox",
    source: "https://creatoreconomy.so/p/how-i-vibe-code-with-cursor-practical-guide",
    concept: "Fresh Eyes Beat Tired Conversations",
  },
  {
    text: "Don't look at the code. Just look at the output. Does it feel right?",
    author: "Andrej Karpathy",
    role: "Co-founder of OpenAI",
    source: "https://x.com/karpathy/status/1886192184808149383",
    concept: "Vibes Are Valid",
  },
  {
    text: "AI developers completed tasks 19% slower overall than the control group, despite perceiving themselves as 20% faster.",
    author: "METR",
    role: "AI research organization",
    source: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev/",
    concept: "The Perception Gap",
  },
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
