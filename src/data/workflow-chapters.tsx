import Callout from "@/components/Callout";
import ConceptCallout from "@/components/ConceptCallout";
import ProjectShowcase from "@/components/ProjectShowcase";
import BuildSession from "@/components/BuildSession";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import CompletionExplorer from "@/components/CompletionExplorer";

export interface WorkflowChapter {
  slug: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export const chapters: WorkflowChapter[] = [
  {
    slug: "the-rhythm",
    title: "The Rhythm",
    subtitle:
      "Vision, Build, Deploy, Refine, Delegate, Resume — the pattern behind every build.",
    content: (
      <>
        <p>
          From thousands of real building sessions, a rhythm emerged. Not a
          methodology — a <em>rhythm</em>. Like music, it has patterns you can
          feel but shouldn&apos;t over-formalize.
        </p>

        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          Vision → Build → Deploy → Refine → Delegate → Resume
        </pre>

        <h3>1. Vision: paint the destination</h3>
        <p>
          Start loose. You&apos;re not writing a spec — you&apos;re painting a
          picture.
        </p>
        <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4">
          &ldquo;I want to build a website where people can share AI-generated
          React components. Like a gallery. Clean, minimal, easy to
          browse.&rdquo;
        </blockquote>
        <p>
          Notice what&apos;s <em>not</em> there: no tech stack, no database
          schema, no component hierarchy. Just the destination.
        </p>
        <p>
          <strong>Why this works:</strong> Claude fills ambiguity with
          competence. When you describe the destination, Claude chooses a
          reasonable route. When you describe the route, Claude follows it even
          if it&apos;s a bad one.
        </p>

        <h3>2. Build: let it happen</h3>
        <p>
          After the vision, Claude starts building. Your job is to{" "}
          <em>watch</em>, not direct.
        </p>
        <p>
          Read the output. See what Claude chose. If it&apos;s reasonable, let
          it continue. If something&apos;s wrong, speak up — but give it a
          chance.
        </p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          {`# Good: course correction
"The header is too tall. Shrink it."

# Bad: premature takeover
"Stop. Let me specify exactly what each component should look like."`}
        </pre>

        <h3>3. Deploy: put it on the internet</h3>
        <p>Deploy early, even when it&apos;s incomplete.</p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          Deploy this to Vercel
        </pre>
        <p>
          Why? Because looking at something on a real URL changes how you see
          it. Issues that are invisible in development become obvious on your
          phone. And having a live link lets you share progress with others.
        </p>
        <p>Deploy early. Deploy often. It&apos;s free and reversible.</p>

        <ProjectShowcase
          caption="Real projects built with this workflow"
          projects={[
            {
              title: "Source Library",
              description:
                "An open-access library of 1,900+ translated historical texts across Latin, Arabic, and Hebrew — built through AI-assisted translation at a scale no human team could match.",
              url: "https://sourcelibrary.org",
              tags: ["Claude Code", "research", "scholarship"],
            },
            {
              title: "Prompt Archaeology",
              description:
                "10,497 prompts from 68 days of Claude Code usage, extracted and visualized to reveal patterns in real vibe coding sessions.",
              url: "https://dereklomas.me/projects/promptarchaeology",
              tags: ["Claude Code", "data viz", "self-reflection"],
            },
          ]}
        />

        <h3>4. Refine: iterate with vibes</h3>
        <p>This is where the magic happens. Small, fast adjustments:</p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          {`"Darker"
"More breathing room"
"The text is hard to read"
"Mobile is broken"
"Too busy. Simplify."`}
        </pre>
        <p>
          Notice: these are <em>feelings</em>, not specifications.
          &ldquo;Darker&rdquo; doesn&apos;t specify a hex code. &ldquo;More
          breathing room&rdquo; doesn&apos;t specify padding values. You&apos;re
          describing the experience you want, and Claude translates that into
          code.
        </p>

        <Callout type="tip" title="The terse prompt style">
          Once Claude has context, you can be brief. &ldquo;mobile&rdquo;,
          &ldquo;push it&rdquo;, &ldquo;try again&rdquo;, &ldquo;darker&rdquo;
          — these all work. Trust the shared context. You wouldn&apos;t explain
          the whole project to a colleague sitting next to you every time you
          make a request.
        </Callout>

        <h3>5. Delegate: hand over the wheel</h3>
        <p>
          At some point, you have enough shared context that you can give Claude
          larger tasks:
        </p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          {`"Work through the remaining todos"
"Handle the responsive design for all pages"
"Add error handling everywhere it's missing"`}
        </pre>
        <p>
          This is the Delegation pattern. It works when context is rich. It
          fails when context is thin. If you just started a session, don&apos;t
          delegate — build context first.
        </p>

        <h3>6. Resume: pick up tomorrow</h3>
        <p>
          Sessions end. Context gets compressed or cleared. When you come back:
        </p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          &ldquo;Where were we...&rdquo;
        </pre>
        <p>Or look at your handoff notes, if you saved them:</p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          &ldquo;Continue from @.claude/handoffs/2026-03-01-project.md&rdquo;
        </pre>
        <p>
          The resume step is the least glamorous but most important for long
          projects. Good session hygiene — compact at 75%, save handoffs, commit
          before ending — makes resuming painless.
        </p>
      </>
    ),
  },
  {
    slug: "under-the-hood",
    title: "Under the Hood",
    subtitle:
      "See the difference between a raw language model and an instruction-tuned one.",
    content: (
      <>
        <p>
          Before you build more, it helps to <em>feel</em> what&apos;s actually
          happening when you talk to an AI.
        </p>
        <p>
          Every language model starts as a{" "}
          <strong>completion engine</strong> — it predicts what text comes next,
          like autocomplete on steroids. That&apos;s it. No understanding, no
          intent, no helpfulness. Just: &ldquo;given this text so far, what word
          is statistically likely to follow?&rdquo;
        </p>
        <p>
          The AI you&apos;re talking to in Claude Code went through additional
          training (RLHF) that taught it to <em>interpret</em> your text as a
          request and respond like an assistant. That&apos;s a learned behavior,
          not a fundamental capability.
        </p>
        <p>
          Try it yourself. Type the same text into both models and watch the
          difference:
        </p>

        <CompletionExplorer id="workflow-completion-explorer" />
      </>
    ),
  },
  {
    slug: "context-management",
    title: "Context Management",
    subtitle:
      "Claude has a finite working memory. Manage it or lose it.",
    content: (
      <>
        <p>
          Claude Code has a finite context window. Think of it as working
          memory. Manage it:
        </p>

        <ConceptCallout id="context-rot" />

        <h3>/compact</h3>
        <p>
          At ~75% context usage, compress the conversation. Claude summarizes
          what&apos;s happened and frees space. Use this proactively —
          don&apos;t wait until it&apos;s too late.
        </p>

        <h3>/clear</h3>
        <p>
          Fresh start. Use when switching tasks or when the context has become
          confused. Better to start clean than to fight stale context.
        </p>

        <ConceptCallout id="context-engineering" />

        <h3>Be specific</h3>
        <p>
          &ldquo;Look at src/components/Header.tsx&rdquo; is better than
          &ldquo;look at the header.&rdquo; Help Claude find things quickly
          instead of searching.
        </p>

        <h3>One thing at a time</h3>
        <p>
          Big, multi-part prompts waste context. &ldquo;Add dark mode, fix the
          mobile nav, update the footer, and change the font&rdquo; is four
          tasks crammed into one. Do them sequentially — each one builds on the
          last.
        </p>

        <ConceptCallout id="one-task-one-session" />
      </>
    ),
  },
  {
    slug: "toolchain-and-building",
    title: "The Toolchain & Building",
    subtitle: "The tools, the stack, and your next project.",
    content: (
      <>
        <h3>The primary stack</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Claude Code</strong> — the AI coding agent (terminal-based)
          </li>
          <li>
            <strong>GitHub</strong> — version control and collaboration (via{" "}
            <code>gh</code> CLI)
          </li>
          <li>
            <strong>Vercel</strong> — deployment (via <code>vercel</code> CLI)
          </li>
          <li>
            <strong>Next.js + Tailwind</strong> — the web framework
            (Claude&apos;s default choice, and a good one)
          </li>
        </ul>
        <p>
          Everything else is optional. MCP servers, custom skills, hooks — these
          add power but aren&apos;t needed to start.
        </p>
        <p>
          <strong>Alternatives that work fine:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Cursor instead of Claude Code (IDE-based instead of terminal)</li>
          <li>Netlify instead of Vercel</li>
          <li>Replit for fully browser-based development</li>
          <li>
            Any AI model instead of Claude (the principles transfer)
          </li>
        </ul>
        <p>
          The principles matter more than the tools. If you prefer a different
          stack, use it. The workflow is the same.
        </p>

        <hr className="my-8 border-zinc-200 dark:border-zinc-700" />

        <h3>Guided walkthrough: building project #2</h3>
        <p>
          You already built something in M0. Now let&apos;s build something with
          intention.
        </p>

        <h4>Step 1: Choose from desire</h4>
        <p>
          Don&apos;t pick from a list. Think:{" "}
          <strong>what would be useful to me right now?</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>A tool that solves a small daily annoyance</li>
          <li>
            A website for something you care about (a hobby, a cause, a
            community)
          </li>
          <li>
            A gift for someone — a personalized page, a birthday countdown, a
            shared photo gallery
          </li>
          <li>A prototype of an idea you&apos;ve been sitting on</li>
        </ul>

        <h4>Step 2: Vision prompt</h4>
        <p>Open Claude Code in a new folder and describe what you want:</p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          mkdir my-second-project &amp;&amp; cd my-second-project &amp;&amp;
          claude
        </pre>
        <p>Then:</p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          {`I want to build [your thing]. [Why it matters to you].
Help me think about what this should look like.`}
        </pre>
        <p>
          Let Claude respond. Have a conversation. Don&apos;t rush to building.
        </p>

        <h4>Step 3: Build and deploy</h4>
        <p>When the vision feels right:</p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          Let&apos;s build it.
        </pre>
        <p>Then after the first version exists:</p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          Deploy it.
        </pre>

        <h4>Step 4: Live refinement</h4>
        <p>
          Open the deployed URL on your phone. On your laptop. Show someone.
          Then iterate:
        </p>
        <pre className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-700 dark:text-zinc-300 my-4">
          [What you notice that&apos;s wrong or could be better]
        </pre>
        <p>
          Keep going until you&apos;re proud of it — or until you&apos;ve
          learned what you came to learn.
        </p>

        <BuildSession
          id="workflow-project2"
          module="workflow"
          prompt="Build project #2. Follow the walkthrough above — choose from desire, vision prompt, build, deploy, refine. Set your intention here, then go build."
          suggestedDuration={30}
        />

        <ReflectionPrompt
          id="workflow-click"
          prompt="After building project #2, describe the moment in the session where it clicked — or the moment where it almost fell apart. What happened?"
        />
      </>
    ),
  },
];
