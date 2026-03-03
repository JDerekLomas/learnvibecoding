import { concepts, themes, type Concept, type Theme } from "./concepts";
import { quotes, type Quote } from "./quotes";

export function getConceptsByTheme(themeId: string): Concept[] {
  return concepts.filter((c) => c.theme === themeId);
}

export function getThemeGroups(): { theme: Theme; concepts: Concept[] }[] {
  return themes.map((theme) => ({
    theme,
    concepts: getConceptsByTheme(theme.id),
  }));
}

export function getQuotesForConcept(conceptTitle: string): Quote[] {
  return quotes.filter(
    (q) => q.concept === conceptTitle || conceptTitle.startsWith(q.concept),
  );
}

/** List all meme images in a concept's folder */
const memeManifest: Record<string, string[]> = {
  "pareto-paradox": ["01-iceberg.png"],
  "taste-gap": ["01-soulless-food.png"],
  "knowing-what-you-want": ["01-blank-canvas.png"],
  "orchestrator-shift": ["01-conductor.png"],
  "vibes-are-valid": ["01-fabric-touch.png"],
  "context-rot": ["01-vim-trap.png", "02-bell-curve.png"],
  "context-workspace": ["01-clean-vs-messy.png"],
  "one-task-one-session": ["01-sushi-chef.png"],
  "context-over-prompt": ["01-librarian.png"],
  "fresh-eyes": ["01-fresh-air.png"],
  "build-to-learn": ["01-first-pancake.png"],
  "spec-anchor": ["01-blueprint-shield.png"],
  "layer-cake": ["01-building-layers.png"],
  "git-commit": ["01-in-case-of-fire.png", "02-commit-msg-entropy.jpeg", "03-blank-commit-msg.png"],
  "scaffold-before-walls": ["01-construction.png"],
  "plan-before-code": ["01-measure-twice.png"],
  "claude-pilled": ["01-google-engineer-not-joking.png"],
  "junior-dev": ["01-junior-vs-senior.png", "02-me-as-junior.jpeg", "03-who-broke-build.png", "04-oreilly-danger.png", "05-trainee-code.png"],
  "director": ["01-director-robot.png"],
  "dark-flow": ["01-dog-driving.png"],
  "sycophancy-trap": ["01-yes-robot.png"],
  "comprehension-debt": ["01-self-driving.png"],
  "verification-gap": ["01-backwards-binoculars.png"],
  "security": ["01-ai-replacing-after-define.png"],
  "perception-gap": ["01-speedometer.png"],
};

export function getMemesForConcept(memeFolder: string): string[] {
  return memeManifest[memeFolder] || [];
}
