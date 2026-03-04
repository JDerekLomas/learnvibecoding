export interface ClaudeCodeResource {
  title: string;
  url: string;
  type: "docs" | "article" | "video" | "github" | "tool";
}

export interface ClaudeCodeTopic {
  id: string;
  title: string;
  tagline: string;
  description: string;
  section: string;
  commands?: string[];
  resources: ClaudeCodeResource[];
}

export interface ClaudeCodeSection {
  id: string;
  title: string;
  description: string;
  color: string;
  milestone: string;
}

export const sections: ClaudeCodeSection[] = [
  { id: "getting-started", title: "Getting Started", description: "What vibe coding is and how to set up Claude Code", color: "violet", milestone: "You understand the landscape and have Claude Code running" },
  { id: "context", title: "CLAUDE.md and Context", description: "How to feed your AI the right information", color: "amber", milestone: "You can manage context like a pro" },
  { id: "core-workflow", title: "Core Workflow", description: "The commands and patterns you'll use every day", color: "blue", milestone: "You're productive with Claude Code daily" },
  { id: "skills-tools", title: "Skills and Tools", description: "Extending Claude Code's capabilities", color: "emerald", milestone: "You can customize Claude Code to your workflow" },
  { id: "advanced", title: "Advanced Patterns", description: "Multi-agent workflows, hooks, and automation", color: "cyan", milestone: "You're using advanced orchestration patterns" },
  { id: "scaling", title: "Scaling and Production", description: "Cost optimization, session management, and team workflows", color: "rose", milestone: "You can run Claude Code at scale" },
  { id: "safety", title: "Safety and Best Practices", description: "Security, responsible usage, and community wisdom", color: "red", milestone: "You build safely and contribute back" },
];

export const topics: ClaudeCodeTopic[] = [
  // Getting Started
  {
    id: "what-is-vibe-coding",
    title: "What Is Vibe Coding?",
    tagline: "Code by intent, not by keystroke.",
    description: "Vibe coding means describing what you want in natural language and letting AI write the implementation. You focus on the what and why; the AI handles the how. Coined by Andrej Karpathy, it's a new paradigm where taste and direction matter more than syntax.",
    section: "getting-started",
    resources: [
      { title: "Andrej Karpathy on Vibe Coding", url: "https://x.com/karpathy/status/1886192184808149383", type: "article" },
      { title: "roadmap.sh — What is Vibe Coding?", url: "https://roadmap.sh/claude-code", type: "docs" },
      { title: "Vibe Coding Explained (YouTube)", url: "https://www.youtube.com/results?search_query=vibe+coding+explained", type: "video" },
    ],
  },
  {
    id: "coding-agents",
    title: "Coding Agents",
    tagline: "AI that writes, runs, and debugs code autonomously.",
    description: "Coding agents go beyond autocomplete. They can read your codebase, run commands, fix errors, and iterate until the task is done. Claude Code is Anthropic's agentic coding tool — it operates in your terminal with full access to your project.",
    section: "getting-started",
    resources: [
      { title: "Claude Code Overview", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
      { title: "Agentic Coding Tools Compared", url: "https://roadmap.sh/claude-code", type: "article" },
    ],
  },
  {
    id: "agentic-loop",
    title: "The Agentic Loop",
    tagline: "Read → Plan → Act → Observe → Repeat.",
    description: "Claude Code works in a loop: it reads context, plans an approach, takes action (editing files, running commands), observes the result, and repeats. Understanding this loop helps you give better instructions and intervene at the right moments.",
    section: "getting-started",
    resources: [
      { title: "How Claude Code Works", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
      { title: "Agentic Loop Deep Dive", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
    ],
  },
  {
    id: "setup-installation",
    title: "Setup and Installation",
    tagline: "npm install -g @anthropic-ai/claude-code",
    description: "Claude Code runs in your terminal. Install it globally via npm, authenticate with your Anthropic API key or Claude subscription, and you're ready to go. It works on macOS and Linux, with Windows support via WSL.",
    section: "getting-started",
    commands: ["npm install -g @anthropic-ai/claude-code", "claude"],
    resources: [
      { title: "Installation Guide", url: "https://docs.anthropic.com/en/docs/claude-code/getting-started", type: "docs" },
      { title: "Claude Code GitHub", url: "https://github.com/anthropics/claude-code", type: "github" },
    ],
  },
  {
    id: "ways-to-use",
    title: "Ways to Use Claude Code",
    tagline: "Terminal, IDE, or SDK — pick your surface.",
    description: "Use Claude Code directly in the terminal, through VS Code or JetBrains extensions, as a GitHub Action, or programmatically via the Claude Code SDK. Each surface suits different workflows — terminal for power users, IDE for inline assistance, SDK for automation.",
    section: "getting-started",
    resources: [
      { title: "IDE Extensions", url: "https://docs.anthropic.com/en/docs/claude-code/ide-integrations", type: "docs" },
      { title: "GitHub Actions Integration", url: "https://docs.anthropic.com/en/docs/claude-code/github-actions", type: "docs" },
      { title: "Claude Code SDK", url: "https://docs.anthropic.com/en/docs/claude-code/sdk", type: "docs" },
    ],
  },

  // CLAUDE.md and Context
  {
    id: "claude-md",
    title: "CLAUDE.md",
    tagline: "Your project's instruction manual for AI.",
    description: "CLAUDE.md is a special file that Claude Code reads automatically. It contains project conventions, build commands, architecture notes, and anything else the AI needs to know. Think of it as onboarding docs — but for your AI collaborator.",
    section: "context",
    resources: [
      { title: "CLAUDE.md Documentation", url: "https://docs.anthropic.com/en/docs/claude-code/memory", type: "docs" },
      { title: "Best Practices for CLAUDE.md", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
    ],
  },
  {
    id: "structuring-claude-md",
    title: "Structuring CLAUDE.md",
    tagline: "Hierarchy matters: project, user, local.",
    description: "CLAUDE.md files cascade: project root (shared with team), ~/.claude/CLAUDE.md (personal preferences), and folder-level overrides. Structure them with clear sections — commands, style, architecture, rules. Keep it concise; every line costs context tokens.",
    section: "context",
    resources: [
      { title: "CLAUDE.md File Hierarchy", url: "https://docs.anthropic.com/en/docs/claude-code/memory", type: "docs" },
      { title: "Example CLAUDE.md Files", url: "https://github.com/anthropics/claude-code/blob/main/CLAUDE.md", type: "github" },
    ],
  },
  {
    id: "context-window",
    title: "The Context Window",
    tagline: "Everything the AI can see at once.",
    description: "The context window is Claude's working memory — all the files, conversation history, and instructions it can process at once. Claude Code uses a 200K token window. Managing it well is the single biggest factor in output quality.",
    section: "context",
    resources: [
      { title: "Context Window Management", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
      { title: "Tips for Long Sessions", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
    ],
  },
  {
    id: "managing-context",
    title: "Managing Context",
    tagline: "/clear, /compact — keep your workspace clean.",
    description: "Use /clear to start fresh between tasks. Use /compact to compress context when sessions get long. Add files with @file references. Remove irrelevant context before it degrades output. Think of context management like keeping a clean desk.",
    section: "context",
    commands: ["/clear", "/compact", "@file"],
    resources: [
      { title: "Slash Commands Reference", url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands", type: "docs" },
    ],
  },
  {
    id: "memory-config",
    title: "Memory and Configuration",
    tagline: "Settings that persist across sessions.",
    description: "Claude Code stores settings in ~/.claude/settings.json and project-level .claude/settings.json. Memory files persist information across conversations. Configure allowed tools, custom commands, and permission levels to match your workflow.",
    section: "context",
    resources: [
      { title: "Settings Reference", url: "https://docs.anthropic.com/en/docs/claude-code/settings", type: "docs" },
      { title: "Memory System", url: "https://docs.anthropic.com/en/docs/claude-code/memory", type: "docs" },
    ],
  },
  {
    id: "permissions",
    title: "Permission System",
    tagline: "Control what Claude can and can't do.",
    description: "Claude Code asks before running commands or editing files. You can pre-approve tools in settings, use allowlist patterns, or run in fully autonomous mode. The permission system balances safety with speed — start restrictive, open up as you build trust.",
    section: "context",
    commands: ["--allowedTools", "--dangerouslySkipPermissions"],
    resources: [
      { title: "Permissions Guide", url: "https://docs.anthropic.com/en/docs/claude-code/settings", type: "docs" },
      { title: "Security Model", url: "https://docs.anthropic.com/en/docs/claude-code/security", type: "docs" },
    ],
  },

  // Core Workflow
  {
    id: "basic-commands",
    title: "Basic Commands",
    tagline: "Talk to Claude like a colleague.",
    description: "Just type what you want: 'fix the login bug', 'add a dark mode toggle', 'explain this function'. Claude Code reads your codebase, makes changes, and shows you what it did. Review, approve, and iterate.",
    section: "core-workflow",
    resources: [
      { title: "Getting Started Tutorial", url: "https://docs.anthropic.com/en/docs/claude-code/getting-started", type: "docs" },
    ],
  },
  {
    id: "slash-commands",
    title: "Slash Commands",
    tagline: "/help, /clear, /compact, /cost, /doctor...",
    description: "Slash commands are built-in shortcuts. /help shows all commands, /clear resets context, /compact compresses the conversation, /cost shows token usage, /doctor diagnoses issues. They're the control panel for your AI workflow.",
    section: "core-workflow",
    commands: ["/help", "/clear", "/compact", "/cost", "/doctor", "/config"],
    resources: [
      { title: "Slash Commands Reference", url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands", type: "docs" },
    ],
  },
  {
    id: "thinking-modes",
    title: "Thinking Modes",
    tagline: "Let Claude reason before it acts.",
    description: "Extended thinking lets Claude work through complex problems step-by-step before responding. Use it for architecture decisions, debugging tricky issues, or any task where reasoning quality matters more than speed.",
    section: "core-workflow",
    resources: [
      { title: "Extended Thinking", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
      { title: "When to Use Thinking Mode", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
    ],
  },
  {
    id: "models",
    title: "Model Selection",
    tagline: "Opus for hard problems, Sonnet for speed, Haiku for cost.",
    description: "Claude Code supports multiple models. Opus is the most capable — use it for complex architecture and debugging. Sonnet balances speed and quality for everyday work. Haiku is fast and cheap for simple tasks. Switch models mid-conversation with /model.",
    section: "core-workflow",
    commands: ["/model"],
    resources: [
      { title: "Model Overview", url: "https://docs.anthropic.com/en/docs/about-claude/models", type: "docs" },
    ],
  },
  {
    id: "common-use-cases",
    title: "Common Use Cases",
    tagline: "Bug fixes, features, refactors, tests, docs.",
    description: "The most common workflows: describe a bug and let Claude fix it, ask for a new feature with acceptance criteria, request a refactor with specific goals, generate tests for existing code, or ask Claude to document what it sees. Start specific, iterate from there.",
    section: "core-workflow",
    resources: [
      { title: "Common Workflows", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
      { title: "Tips and Tricks", url: "https://docs.anthropic.com/en/docs/claude-code/tips-and-tricks", type: "docs" },
    ],
  },
  {
    id: "plan-mode",
    title: "Plan Mode",
    tagline: "Read-only exploration before committing to changes.",
    description: "Plan mode lets Claude explore your codebase and design an approach without making any changes. It reads files, searches code, and proposes a plan for your approval. Use it for unfamiliar codebases, risky changes, or when you want to understand before acting.",
    section: "core-workflow",
    commands: ["shift+tab (toggle plan mode)"],
    resources: [
      { title: "Plan Mode Docs", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
    ],
  },

  // Skills and Tools
  {
    id: "built-in-tools",
    title: "Built-in Tools",
    tagline: "Read, Write, Edit, Bash, Glob, Grep...",
    description: "Claude Code has built-in tools for file operations (Read, Write, Edit), search (Glob, Grep), terminal commands (Bash), and web access (WebFetch, WebSearch). Understanding which tool does what helps you give better instructions.",
    section: "skills-tools",
    resources: [
      { title: "Tool Reference", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    tagline: "Reusable prompt templates invoked with /skill-name.",
    description: "Skills are packaged prompt templates that encode expertise. Invoke them with slash commands like /commit or /review. They combine instructions, context, and tool permissions into a single action. Think of them as macros for AI workflows.",
    section: "skills-tools",
    resources: [
      { title: "Skills Documentation", url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands", type: "docs" },
    ],
  },
  {
    id: "creating-skills",
    title: "Creating Custom Skills",
    tagline: "Encode your team's expertise into reusable commands.",
    description: "Create custom skills by adding markdown files to .claude/skills/. Each skill defines a prompt template, required tools, and optional parameters. Share them across your team via git to standardize workflows and encode institutional knowledge.",
    section: "skills-tools",
    resources: [
      { title: "Custom Skills Guide", url: "https://docs.anthropic.com/en/docs/claude-code/slash-commands", type: "docs" },
    ],
  },
  {
    id: "mcp",
    title: "MCP (Model Context Protocol)",
    tagline: "Connect Claude to any external tool or data source.",
    description: "MCP is an open protocol that lets Claude Code talk to external services — databases, APIs, design tools, CI/CD systems. Install MCP servers to give Claude new capabilities without modifying its core. It's the plugin system for AI agents.",
    section: "skills-tools",
    resources: [
      { title: "MCP Documentation", url: "https://docs.anthropic.com/en/docs/claude-code/mcp", type: "docs" },
      { title: "MCP Server Registry", url: "https://github.com/modelcontextprotocol/servers", type: "github" },
      { title: "MCP Specification", url: "https://modelcontextprotocol.io", type: "docs" },
    ],
  },
  {
    id: "editor-extensions",
    title: "Editor Extensions",
    tagline: "VS Code, JetBrains — Claude in your IDE.",
    description: "Use Claude Code inside your editor for inline assistance. The VS Code extension adds a sidebar panel, inline suggestions, and quick actions. JetBrains support brings the same features to IntelliJ, WebStorm, and PyCharm.",
    section: "skills-tools",
    resources: [
      { title: "VS Code Extension", url: "https://docs.anthropic.com/en/docs/claude-code/ide-integrations", type: "docs" },
      { title: "JetBrains Plugin", url: "https://docs.anthropic.com/en/docs/claude-code/ide-integrations", type: "docs" },
    ],
  },

  // Advanced Patterns
  {
    id: "subagents",
    title: "Subagents",
    tagline: "Spawn specialized agents for parallel work.",
    description: "Subagents are child processes that handle specific tasks independently. Use them to parallelize research, run tests while coding, or delegate exploration to a specialist. Each subagent has its own context window and tool access.",
    section: "advanced",
    resources: [
      { title: "Subagent Patterns", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
      { title: "Multi-Agent Workflows", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
    ],
  },
  {
    id: "agent-teams",
    title: "Agent Teams",
    tagline: "Coordinate multiple agents on complex projects.",
    description: "Agent teams let you orchestrate multiple Claude instances working on the same project. A lead agent creates tasks, assigns work to teammates, and coordinates results. Use teams for large refactors, full-stack features, or any work that benefits from parallel execution.",
    section: "advanced",
    resources: [
      { title: "Team Workflows", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
    ],
  },
  {
    id: "hooks",
    title: "Hooks",
    tagline: "Run custom commands on Claude Code events.",
    description: "Hooks are shell commands that execute in response to Claude Code events — before/after tool calls, on file edits, on session start. Use them for linting, formatting, notifications, or any automation triggered by AI actions.",
    section: "advanced",
    resources: [
      { title: "Hooks Documentation", url: "https://docs.anthropic.com/en/docs/claude-code/hooks", type: "docs" },
    ],
  },
  {
    id: "hook-types",
    title: "Hook Types and Events",
    tagline: "PreToolUse, PostToolUse, Notification, and more.",
    description: "Different hook events fire at different points: PreToolUse runs before a tool executes (can block it), PostToolUse runs after, Notification fires on status changes. Combine them to build guardrails, audit logs, or custom workflows.",
    section: "advanced",
    commands: ["PreToolUse", "PostToolUse", "Notification", "Stop"],
    resources: [
      { title: "Hook Events Reference", url: "https://docs.anthropic.com/en/docs/claude-code/hooks", type: "docs" },
    ],
  },
  {
    id: "git-worktrees",
    title: "Git Worktrees",
    tagline: "Isolated branches for safe experimentation.",
    description: "Git worktrees let Claude Code work on an isolated copy of your repo. Each worktree gets its own branch and working directory. Use them for risky experiments, parallel feature work, or when you want to try something without affecting your main branch.",
    section: "advanced",
    commands: ["/worktree"],
    resources: [
      { title: "Worktree Support", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
      { title: "Git Worktrees Explained", url: "https://git-scm.com/docs/git-worktree", type: "docs" },
    ],
  },
  {
    id: "headless-mode",
    title: "Headless Mode",
    tagline: "Run Claude Code without a terminal — CI, scripts, cron.",
    description: "Headless mode runs Claude Code programmatically via the SDK or CLI flags. Use it in CI/CD pipelines, automated scripts, or cron jobs. Pass instructions via arguments, get structured output back. No interactive terminal needed.",
    section: "advanced",
    commands: ["claude -p 'prompt'", "--output-format json"],
    resources: [
      { title: "SDK & Headless Mode", url: "https://docs.anthropic.com/en/docs/claude-code/sdk", type: "docs" },
      { title: "CI/CD Integration", url: "https://docs.anthropic.com/en/docs/claude-code/github-actions", type: "docs" },
    ],
  },

  // Scaling and Production
  {
    id: "pricing",
    title: "Pricing and Token Usage",
    tagline: "/cost to see what you're spending.",
    description: "Claude Code bills by token usage — input and output tokens at model-specific rates. Use /cost to monitor spending in real-time. Opus is ~5x more expensive than Sonnet. Cache hits are 90% cheaper. Understanding pricing helps you optimize workflows.",
    section: "scaling",
    commands: ["/cost"],
    resources: [
      { title: "Anthropic Pricing", url: "https://www.anthropic.com/pricing", type: "docs" },
      { title: "Claude Code Pricing", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
    ],
  },
  {
    id: "prompt-caching",
    title: "Prompt Caching",
    tagline: "Reuse context, cut costs by 90%.",
    description: "Prompt caching stores frequently-used context (like CLAUDE.md and large files) so you don't pay full price every turn. It happens automatically in Claude Code. Long, stable context at the start of conversations benefits most from caching.",
    section: "scaling",
    resources: [
      { title: "Prompt Caching Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching", type: "docs" },
    ],
  },
  {
    id: "session-management",
    title: "Session Management",
    tagline: "Resume sessions, manage handoffs, compress context.",
    description: "Use --resume to continue previous sessions. Use /compact to compress long conversations without losing key context. Save handoff files for complex work-in-progress. Good session management prevents context rot and keeps output quality high.",
    section: "scaling",
    commands: ["--resume", "--continue", "/compact"],
    resources: [
      { title: "Session Management", url: "https://docs.anthropic.com/en/docs/claude-code/overview", type: "docs" },
    ],
  },
  {
    id: "scaling-workflows",
    title: "Scaling Across Teams",
    tagline: "Shared CLAUDE.md, skills, and MCP servers.",
    description: "Scale Claude Code across a team by sharing CLAUDE.md files (project conventions), custom skills (workflow templates), and MCP server configs. Use .claude/settings.json for team-wide tool permissions. Consistency across developers multiplies the benefit.",
    section: "scaling",
    resources: [
      { title: "Team Configuration", url: "https://docs.anthropic.com/en/docs/claude-code/settings", type: "docs" },
      { title: "Best Practices", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
    ],
  },
  {
    id: "output-config",
    title: "Output and Configuration",
    tagline: "JSON output, environment variables, automation flags.",
    description: "Configure Claude Code's behavior with CLI flags, environment variables, and config files. Use --output-format json for structured output in scripts. Set ANTHROPIC_MODEL to change defaults. Combine flags for fully customized automation pipelines.",
    section: "scaling",
    commands: ["--output-format json", "ANTHROPIC_MODEL", "CLAUDE_CODE_MAX_TURNS"],
    resources: [
      { title: "CLI Reference", url: "https://docs.anthropic.com/en/docs/claude-code/cli-reference", type: "docs" },
      { title: "Environment Variables", url: "https://docs.anthropic.com/en/docs/claude-code/settings", type: "docs" },
    ],
  },

  // Safety and Best Practices
  {
    id: "security",
    title: "Security Model",
    tagline: "Sandboxing, permissions, and trust boundaries.",
    description: "Claude Code runs in a sandbox with network restrictions and file access controls. The permission system prevents unauthorized actions. Understand the trust model: Claude can see your code but is constrained by permissions. Review sensitive operations before approving.",
    section: "safety",
    resources: [
      { title: "Security Documentation", url: "https://docs.anthropic.com/en/docs/claude-code/security", type: "docs" },
      { title: "Trust & Safety", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
    ],
  },
  {
    id: "extensions-caution",
    title: "Third-Party Extensions",
    tagline: "MCP servers and skills can be powerful — and risky.",
    description: "Third-party MCP servers and custom skills run with the same permissions as Claude Code. Vet them carefully before installing. Prefer well-known, open-source servers. Review what tools they expose and what data they can access. Trust but verify.",
    section: "safety",
    resources: [
      { title: "MCP Security", url: "https://docs.anthropic.com/en/docs/claude-code/mcp", type: "docs" },
      { title: "Extension Best Practices", url: "https://docs.anthropic.com/en/docs/claude-code/security", type: "docs" },
    ],
  },
  {
    id: "usage-patterns",
    title: "Effective Usage Patterns",
    tagline: "Small tasks, clear specs, frequent commits.",
    description: "The best results come from: breaking work into small, clear tasks; writing specs before asking Claude to build; committing after each successful change; starting fresh sessions for new tasks; and reviewing output carefully rather than blindly accepting.",
    section: "safety",
    resources: [
      { title: "Best Practices", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
      { title: "Tips and Tricks", url: "https://docs.anthropic.com/en/docs/claude-code/tips-and-tricks", type: "docs" },
    ],
  },
  {
    id: "code-intelligence",
    title: "Code Intelligence and Review",
    tagline: "Claude reads code, but you verify correctness.",
    description: "Claude Code can navigate, explain, and modify complex codebases. But it can introduce subtle bugs, security issues, or architectural problems. Always review changes, run tests, and understand what was modified. The verification step is non-negotiable.",
    section: "safety",
    resources: [
      { title: "Code Review Workflows", url: "https://www.anthropic.com/engineering/claude-code-best-practices", type: "article" },
    ],
  },
  {
    id: "community",
    title: "Community and Resources",
    tagline: "Discord, GitHub, roadmap.sh — find your people.",
    description: "Join the Claude Code community on Discord and GitHub. Follow roadmap.sh/claude-code for the full learning path. Contribute to the open-source ecosystem with custom skills, MCP servers, and shared CLAUDE.md templates. The community accelerates everyone's learning.",
    section: "safety",
    resources: [
      { title: "Claude Code GitHub", url: "https://github.com/anthropics/claude-code", type: "github" },
      { title: "roadmap.sh Claude Code", url: "https://roadmap.sh/claude-code", type: "docs" },
      { title: "Anthropic Discord", url: "https://discord.gg/anthropic", type: "tool" },
      { title: "codevibing.com Community", url: "https://codevibing.com", type: "tool" },
    ],
  },
];

export function getSectionGroups(): { section: ClaudeCodeSection; topics: ClaudeCodeTopic[] }[] {
  return sections.map((section) => ({
    section,
    topics: topics.filter((t) => t.section === section.id),
  }));
}
