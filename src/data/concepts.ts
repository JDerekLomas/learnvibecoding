export interface Concept {
  id: string;
  title: string;
  tagline: string;
  description: string;
}

export const concepts: Concept[] = [
  { id: "pareto-paradox", title: "The Pareto Paradox", tagline: "90% done in 1% of the time. The last 10% is 90% of the work.", description: "AI can scaffold a working app in minutes. The gap between 'working demo' and 'thing I'd show someone' is where the real time goes." },
  { id: "taste-gap", title: "The Taste Gap", tagline: "AI has no taste. Your judgment is the skill.", description: "AI can't tell you if your app feels right. Noticing your own reaction is the irreplaceable human skill." },
  { id: "build-to-learn", title: "Build to Learn, Then Throw It Away", tagline: "First version is a sketch, not a product.", description: "Build software to learn what you want. Then start over — the second build will be faster and better." },
  { id: "context-rot", title: "Context Rot", tagline: "Longer conversations = worse output.", description: "The longer a conversation goes, the worse the AI gets. Start fresh when things degrade." },
  { id: "context-window", title: "The Context Window Is the Workspace", tagline: "Manage it like a physical desk.", description: "Everything the AI can 'see' at once. Keep it clean, relevant, and organized." },
  { id: "knowing-what-you-want", title: "Knowing What You Want Is the Work", tagline: "The hard part isn't building — it's knowing what to build.", description: "AI can build anything you describe clearly. The bottleneck is your clarity of vision." },
  { id: "encourage-the-machine", title: "Encourage the Machine", tagline: "AI hedges. Push past the first 'no'.", description: "AI is trained to be cautious. When it hedges, push it to be more direct and specific." },
  { id: "junior-dev", title: "The Junior Dev With a Photographic Memory", tagline: "Knows everything, understands nothing.", description: "AI has seen all the code ever written. It doesn't understand what any of it means." },
  { id: "dark-flow", title: "Dark Flow", tagline: "Momentum that masks lack of understanding.", description: "When things are flowing fast, you might not notice you've lost track of what's happening." },
  { id: "the-director", title: "The Director, Not the Screenwriter", tagline: "Direct outcomes, not implementations.", description: "You define what 'done' looks like. The AI figures out the code to get there." },
  { id: "comprehension-debt", title: "Comprehension Debt", tagline: "Every line you don't understand is a loan.", description: "Code you can't read is code you can't fix. The debt compounds with every feature." },
  { id: "one-task-one-session", title: "One Task, One Session", tagline: "Clear the conversation between tasks.", description: "Fresh context for fresh work. Don't carry stale context into new problems." },
  { id: "spec-is-anchor", title: "The Spec Is the Anchor", tagline: "Write what you're building before building it.", description: "A clear spec keeps both you and the AI aligned. Without it, scope creep is guaranteed." },
  { id: "layer-cake", title: "Layer Cake Development", tagline: "Work, then polish, then delight.", description: "First make it work. Then make it right. Then make it delightful. Not all at once." },
  { id: "commit-save-button", title: "Commit Is Your Save Button", tagline: "Git commit early and often.", description: "Every working state is a checkpoint you can return to. Commit before trying something risky." },
  { id: "sycophancy-trap", title: "The Sycophancy Trap", tagline: "AI agrees with bad ideas.", description: "AI wants to please you. It will validate bad approaches instead of pushing back." },
  { id: "scaffold-before-walls", title: "Scaffold Before Walls", tagline: "Set rules before writing code.", description: "CLAUDE.md, project structure, conventions — set the guardrails before the AI writes code." },
  { id: "verification-gap", title: "The Verification Gap", tagline: "'It works' doesn't mean 'it's correct'.", description: "AI code often passes the happy path but fails on edge cases, security, and accessibility." },
  { id: "context-engineering", title: "Context Engineering > Prompt Engineering", tagline: "Right info matters more than perfect prompt.", description: "The quality of what you feed the AI matters more than how you phrase your request." },
  { id: "perception-gap", title: "The Perception Gap", tagline: "Feels faster. Actually slower.", description: "METR study: AI developers felt 20% faster but were 19% slower. Flow state isn't the same as productivity." },
  { id: "plan-before-code", title: "Plan Before Code", tagline: "Ask for a plan before implementation.", description: "Get the AI to outline its approach first. Catch problems before they become code." },
  { id: "security-blindspot", title: "The Security Blindspot", tagline: "AI writes working code, not safe code.", description: "72% of AI-generated code had security vulnerabilities. Working isn't the same as secure." },
  { id: "fresh-eyes", title: "Fresh Eyes Beat Tired Conversations", tagline: "Start fresh, don't debug degraded context.", description: "When a conversation goes sideways, starting over is usually faster than fixing it." },
  { id: "orchestrator-shift", title: "The Orchestrator Shift", tagline: "You define success. AI handles implementation.", description: "The skill shifts from writing code to defining what success looks like." },
  { id: "vibes-are-valid", title: "Vibes Are Valid", tagline: "Your emotional response to what you see is real data.", description: "If something feels off, it probably is. Trust your instincts — they're a form of pattern matching." },
];
