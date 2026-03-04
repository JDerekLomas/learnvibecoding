import { QuizItem } from './types';

// ── Math items (legacy, still functional) ────────────────────────────

export const mathQuestions: QuizItem[] = [
  {
    id: 'math_1',
    domain: 'math',
    tags: ['linear-equations', 'algebra'],
    difficulty: 'developing',
    title: 'Solving Linear Equations',
    question: 'Solve for x: 3x + 7 = 22',
    correctAnswer: '5',
    distractors: ['3', '7', '15'],
    explanation:
      'Subtract 7 from both sides: 3x = 15. Then divide both sides by 3: x = 5. If you chose 15, you forgot to divide by 3. If you chose 7, you confused the constant with the answer.',
    hints: ['First isolate the variable term', 'Subtract 7 from both sides'],
    misconceptions: ['Forgetting to divide by the coefficient after isolating'],
  },
  {
    id: 'math_2',
    domain: 'math',
    tags: ['fractions', 'addition'],
    difficulty: 'developing',
    title: 'Fraction Operations',
    question: 'What is 2/3 + 1/4?',
    correctAnswer: '11/12',
    distractors: ['3/7', '3/12', '8/12'],
    explanation:
      'Find a common denominator (12). Convert: 8/12 + 3/12 = 11/12. If you chose 3/7, you added numerators and denominators separately. If you chose 3/12, you only converted one fraction.',
    misconceptions: ['Adding numerators and denominators separately'],
  },
  {
    id: 'math_3',
    domain: 'math',
    tags: ['geometry', 'area'],
    difficulty: 'proficient',
    title: 'Area of Triangles',
    question: 'A triangle has a base of 10 cm and a height of 6 cm. What is its area?',
    correctAnswer: '30 cm²',
    distractors: ['60 cm²', '16 cm²', '36 cm²'],
    explanation:
      'Area = (1/2) × base × height = (1/2) × 10 × 6 = 30 cm². If you chose 60, you forgot to multiply by 1/2. If you chose 16, you added instead of multiplying.',
    misconceptions: ['Forgetting to halve (using rectangle formula instead)'],
  },
  {
    id: 'math_4',
    domain: 'math',
    tags: ['order-of-operations'],
    difficulty: 'beginning',
    title: 'Order of Operations',
    question: 'What is 3 + 4 × 2?',
    correctAnswer: '11',
    distractors: ['14', '10', '24'],
    explanation:
      'Multiplication before addition (PEMDAS). 4 × 2 = 8, then 3 + 8 = 11. If you chose 14, you added first then multiplied.',
    misconceptions: ['Computing left-to-right without respecting precedence'],
  },
  {
    id: 'math_5',
    domain: 'math',
    tags: ['percentages'],
    difficulty: 'proficient',
    title: 'Percentage Calculations',
    question: 'A shirt costs $80 and is 25% off. What is the sale price?',
    correctAnswer: '$60',
    distractors: ['$55', '$65', '$20'],
    explanation:
      '25% of $80 = $20 discount. Sale price = $80 - $20 = $60. If you chose $20, that\'s the discount, not the price.',
    misconceptions: ['Reporting the discount amount instead of the final price'],
  },
  {
    id: 'math_6',
    domain: 'math',
    tags: ['negative-numbers', 'integers'],
    difficulty: 'developing',
    title: 'Negative Numbers',
    question: 'What is -8 + 3?',
    correctAnswer: '-5',
    distractors: ['-11', '5', '11'],
    explanation:
      'Starting at -8, move 3 right on the number line: -5. If you chose -11, you subtracted instead of adding.',
    misconceptions: ['Subtracting instead of adding when one number is negative'],
  },
  {
    id: 'math_7',
    domain: 'math',
    tags: ['ratio', 'proportion'],
    difficulty: 'proficient',
    title: 'Ratio and Proportion',
    question: 'Boys to girls ratio is 3:5, 24 students total. How many girls?',
    correctAnswer: '15',
    distractors: ['9', '12', '16'],
    explanation:
      '3+5=8 parts. Each part = 24÷8 = 3. Girls = 5×3 = 15. If you chose 9, you found boys instead.',
    misconceptions: ['Calculating the wrong part of the ratio'],
  },
];

// ── Vibe Coding items ────────────────────────────────────────────────

export const vibecodingQuestions: QuizItem[] = [
  // ── Prompt Engineering ──
  {
    id: 'vc_prompt_1',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'specificity'],
    difficulty: 'beginning',
    title: 'Strategic Prompting',
    question: 'You want AI to build a login page for your SaaS app. Which prompt will get the best result?',
    correctAnswer: 'I need a login page. Research how Linear, Clerk, and Supabase handle theirs, then build something that feels that clean. Dark mode, minimal.',
    distractors: [
      'Build a login form with email and password fields, a "Sign in" button, input validation that shows errors inline, and a "Forgot password?" link below',
      'Make me a login page',
      'Create the best login form possible using modern best practices',
    ],
    explanation:
      'In vibe coding, you paint the destination and let the AI bring its competence. Pointing at reference sites gives a taste target — the AI researches real examples and synthesizes something informed. Over-specifying pixel details upfront limits the AI\'s judgment. Strategic ambiguity wins.',
    misconceptions: ['Over-specifying implementation details instead of describing the vibe you want'],
  },
  {
    id: 'vc_prompt_2',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'iteration'],
    difficulty: 'developing',
    title: 'Iterating on AI Output',
    question: 'The AI built your landing page but something feels off. What\'s the best way to iterate?',
    correctAnswer: 'The hero section feels cramped and corporate. I want it to breathe more — look at how Notion\'s landing page uses whitespace. Warmer, more inviting.',
    distractors: [
      'Change the border-radius to 16px, padding to 24px, and use a linear-gradient from #fff to #f9fafb',
      'Make it look better',
      'Start over with a completely new design',
    ],
    explanation:
      'Effective iteration describes the feeling you want, not the CSS values. "Cramped and corporate" tells the AI what\'s wrong. Pointing at Notion gives a reference for the vibe. The AI translates feelings into code better than you\'d write the spec yourself.',
    misconceptions: ['Specifying CSS values instead of describing the feeling you want'],
  },
  {
    id: 'vc_prompt_3',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'context'],
    difficulty: 'proficient',
    title: 'Providing Context',
    question: 'You\'re adding a feature to an existing Next.js app. What context should you give Claude Code first?',
    correctAnswer: 'Show it the relevant existing files — the component you\'re extending, the data types, and the current routing structure',
    distractors: [
      'Describe the entire app architecture in detail before asking for anything',
      'Just ask for the feature and let it figure out the codebase',
      'Paste your entire package.json so it knows all dependencies',
    ],
    explanation:
      'Claude Code can read your files directly — pointing it to the relevant ones gives it real context without noise. Describing everything manually is error-prone and slow. Letting it guess leads to wrong assumptions. package.json shows dependencies but not how your app is structured.',
    misconceptions: ['Thinking you need to manually describe code that Claude Code can read directly'],
  },
  {
    id: 'vc_prompt_4',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'decomposition'],
    difficulty: 'proficient',
    title: 'Tackling Complex Features',
    question: 'You want to build a full e-commerce checkout flow. What\'s the best approach?',
    correctAnswer: 'Look at how Shopify, Linear, and Stripe Checkout handle theirs. Tell the AI to build something that feels that smooth, then iterate on what feels off.',
    distractors: [
      'Break it into 12 micro-steps: first the cart icon, then the cart drawer animation, then the quantity selector...',
      'Write one massive prompt describing every field, button, and validation rule at once',
      'Ask for the whole thing and then fix whatever is wrong',
    ],
    explanation:
      'Reference sites give the AI concrete taste targets. It can research what makes those checkouts great and synthesize the best patterns. Over-decomposing into micro-steps limits the AI to your plan instead of letting it bring its own design judgment. One massive prompt or "fix it" both lack direction.',
    misconceptions: ['Micro-managing every step instead of painting the destination and trusting the AI'],
  },

  // ── Reading & Evaluating AI Code ──
  {
    id: 'vc_read_1',
    domain: 'vibe-coding',
    tags: ['reading-code', 'security'],
    difficulty: 'proficient',
    title: 'Spotting Security Issues',
    question: 'Claude generated an API route that takes user input and runs: `db.query("SELECT * FROM users WHERE name = \'" + name + "\'")`. What\'s the problem?',
    correctAnswer: 'SQL injection — user input is directly concatenated into the query string',
    distractors: [
      'The query is too slow and needs an index',
      'SELECT * is inefficient, should select specific columns',
      'The single quotes should be double quotes',
    ],
    explanation:
      'Concatenating user input directly into SQL queries allows attackers to inject malicious SQL. Use parameterized queries instead. While SELECT * and missing indexes are real concerns, they\'re performance issues, not security vulnerabilities. Quote style is irrelevant here.',
    misconceptions: ['Focusing on performance before security when reviewing AI-generated code'],
  },
  {
    id: 'vc_read_2',
    domain: 'vibe-coding',
    tags: ['reading-code', 'react'],
    difficulty: 'developing',
    title: 'Understanding React State',
    question: 'This React code doesn\'t update the UI when clicked:\n\n`let count = 0;\nconst handleClick = () => { count++; };`\n\nWhy?',
    correctAnswer: 'Regular variables don\'t trigger re-renders — you need useState to make React update the UI',
    distractors: [
      'The variable should be declared with const instead of let',
      'handleClick needs to be wrapped in useCallback',
      'You need to call forceUpdate() after changing the variable',
    ],
    explanation:
      'React only re-renders when state (via useState/useReducer) or props change. A plain variable changing doesn\'t tell React anything happened. const would make it unassignable. useCallback is for memoization, not reactivity. forceUpdate is a class component escape hatch, not the solution.',
    misconceptions: ['Not understanding that React needs useState to track changes and trigger re-renders'],
  },
  {
    id: 'vc_read_3',
    domain: 'vibe-coding',
    tags: ['reading-code', 'ai-workflow'],
    difficulty: 'developing',
    title: 'AI Stuck in a Loop',
    question: 'Claude has tried to fix the same bug three times and keeps generating similar broken code. What should you do?',
    correctAnswer: 'Reframe the problem — describe what you want to happen instead of asking it to fix the same error, or ask for a completely different approach',
    distractors: [
      'Keep asking — it will get it right eventually with enough attempts',
      'Add "please try harder" to your prompt',
      'Copy the broken code into ChatGPT for a second opinion',
    ],
    explanation:
      'When AI gets stuck in a loop, repeating the same prompt won\'t help — it\'s following the same reasoning path. Reframing ("here\'s what I want to happen" instead of "fix this error") gives it a fresh angle. Describing the desired outcome often works better than pointing at the problem.',
    misconceptions: ['Thinking more attempts with the same prompt will produce different results'],
  },
  {
    id: 'vc_read_4',
    domain: 'vibe-coding',
    tags: ['reading-code', 'api'],
    difficulty: 'proficient',
    title: 'API Error Handling',
    question: 'Claude generated a fetch call but didn\'t handle errors:\n\n`const data = await fetch("/api/users").then(r => r.json());`\n\nWhat could go wrong?',
    correctAnswer: 'If the request fails or returns a non-200 status, r.json() will either throw or return error HTML parsed as JSON, crashing the app',
    distractors: [
      'Nothing — fetch handles errors automatically',
      'The await is unnecessary since .then() already handles the promise',
      'You need to use axios instead of fetch for error handling',
    ],
    explanation:
      'fetch doesn\'t throw on HTTP errors (404, 500) — it only throws on network failures. You need to check response.ok before parsing. The await is needed to get the final value from the .then() chain. axios isn\'t required — fetch works fine with proper error checking.',
    misconceptions: ['Assuming fetch throws on HTTP error status codes like 404 or 500'],
  },

  // ── Dev Tooling & Workflow ──
  {
    id: 'vc_tool_1',
    domain: 'vibe-coding',
    tags: ['tooling', 'ai-tools'],
    difficulty: 'beginning',
    title: 'Choosing the Right AI Tool',
    question: 'You need to add a feature to an existing codebase with 50+ files. Which tool is best?',
    correctAnswer: 'Claude Code (CLI) — it can read your files, understand the project structure, and make targeted edits',
    distractors: [
      'ChatGPT web — paste the files you think are relevant into the chat',
      'Cursor — it only works for small projects',
      'Write it manually — AI can\'t handle existing codebases',
    ],
    explanation:
      'Claude Code can explore your full codebase, read files, understand dependencies, and make precise edits. Pasting files into ChatGPT loses project context and structure. Cursor actually works well for existing projects too (it\'s not limited to small ones). AI handles existing codebases well when given proper access.',
    misconceptions: ['Thinking you need to manually paste code into AI chat for it to help'],
  },
  {
    id: 'vc_tool_2',
    domain: 'vibe-coding',
    tags: ['tooling', 'git'],
    difficulty: 'beginning',
    title: 'Git Basics',
    question: 'You just finished a feature. What\'s the correct order of git commands to save and share your work?',
    correctAnswer: 'git add, git commit, git push',
    distractors: [
      'git push, git commit, git add',
      'git commit, git push',
      'git save, git upload',
    ],
    explanation:
      'Git has a staging workflow: add (stage files) → commit (save a snapshot locally) → push (upload to remote). You can\'t push before committing, and you can\'t commit without adding. There are no "save" or "upload" commands in git.',
    misconceptions: ['Thinking git commit automatically uploads to GitHub'],
  },
  {
    id: 'vc_tool_3',
    domain: 'vibe-coding',
    tags: ['tooling', 'npm'],
    difficulty: 'developing',
    title: 'Package Management',
    question: 'You cloned a repo and ran `npm start` but got errors about missing modules. What should you do first?',
    correctAnswer: 'Run npm install — the node_modules directory isn\'t included in git repos, so you need to install dependencies locally',
    distractors: [
      'Delete the project and clone it again',
      'Manually download each missing module from npm\'s website',
      'Run npm update to get the latest versions of everything',
    ],
    explanation:
      'node_modules is gitignored (it\'s huge). After cloning, you need npm install to download dependencies listed in package.json. Re-cloning won\'t help since node_modules still won\'t be there. npm update changes versions, which could introduce breaking changes.',
    misconceptions: ['Not understanding that dependencies must be installed after cloning'],
  },
  {
    id: 'vc_tool_4',
    domain: 'vibe-coding',
    tags: ['tooling', 'environment'],
    difficulty: 'proficient',
    title: 'Environment Variables',
    question: 'Your app needs an API key. Where should you put it?',
    correctAnswer: 'In a .env file that\'s listed in .gitignore, and set as an environment variable in your deployment platform',
    distractors: [
      'Hardcode it in your JavaScript file — it\'s the simplest approach',
      'Put it in a comment in your code so you remember it',
      'Store it in package.json under a "secrets" field',
    ],
    explanation:
      'API keys should never be in code or version control. .env files + .gitignore keeps them out of git. Deployment platforms (Vercel, Netlify) have their own environment variable settings. Hardcoding, comments, or package.json all expose secrets in your git history.',
    misconceptions: ['Hardcoding secrets in source code because it\'s convenient'],
  },

  // ── Web Fundamentals ──
  {
    id: 'vc_web_1',
    domain: 'vibe-coding',
    tags: ['react', 'components'],
    difficulty: 'beginning',
    title: 'React Components',
    question: 'What is a React component?',
    correctAnswer: 'A function that returns JSX (HTML-like code) and can accept props as input',
    distractors: [
      'A CSS class that styles HTML elements',
      'A database table that stores user data',
      'A server that handles API requests',
    ],
    explanation:
      'React components are JavaScript functions that return UI (JSX). They can receive data via props and manage internal state. CSS classes are for styling, not components. Database tables and servers are backend concerns, not React concepts.',
    misconceptions: ['Confusing React components with HTML elements or CSS classes'],
  },
  {
    id: 'vc_web_2',
    domain: 'vibe-coding',
    tags: ['nextjs', 'routing'],
    difficulty: 'developing',
    title: 'Next.js File-Based Routing',
    question: 'In Next.js App Router, where do you create a file to make a page at /about?',
    correctAnswer: 'src/app/about/page.tsx',
    distractors: [
      'src/pages/about.tsx',
      'src/routes/about.tsx',
      'src/components/About.tsx',
    ],
    explanation:
      'Next.js App Router uses the file system for routing. A page.tsx inside app/about/ creates the /about route. pages/about.tsx is the old Pages Router pattern. routes/ doesn\'t exist in Next.js. Components don\'t automatically create routes.',
    misconceptions: ['Confusing App Router and Pages Router file conventions'],
  },
  {
    id: 'vc_web_3',
    domain: 'vibe-coding',
    tags: ['tailwind', 'css'],
    difficulty: 'beginning',
    title: 'Tailwind CSS Basics',
    question: 'What does `className="bg-blue-500 text-white p-4 rounded-lg"` do?',
    correctAnswer: 'Sets a blue background, white text, padding on all sides, and rounded corners',
    distractors: [
      'Creates a blue button with an onClick handler',
      'Imports the Blue component from Tailwind\'s library',
      'Generates a CSS file called blue-500.css',
    ],
    explanation:
      'Tailwind uses utility classes: bg-blue-500 (background), text-white (text color), p-4 (padding), rounded-lg (border radius). These are CSS classes, not components or file generators. No JavaScript behavior is added by className.',
    misconceptions: ['Thinking Tailwind classes add behavior, not just styling'],
  },
  {
    id: 'vc_web_4',
    domain: 'vibe-coding',
    tags: ['deployment', 'vercel'],
    difficulty: 'developing',
    title: 'Deploying to Vercel',
    question: 'What happens when you run `vercel --prod` in your Next.js project?',
    correctAnswer: 'Your code is uploaded to Vercel\'s servers, built remotely, and deployed to a live URL',
    distractors: [
      'It builds locally and uploads the built files',
      'It creates a Docker container on your machine',
      'It sends your code to npm for others to install',
    ],
    explanation:
      'Vercel builds remotely on their infrastructure (faster than local builds). It deploys to a live URL you can share. It does NOT build locally — that\'s a common misconception. Docker and npm are unrelated to Vercel deployment.',
    misconceptions: ['Thinking vercel --prod runs a local build'],
  },

  // ── Debugging with AI ──
  {
    id: 'vc_debug_1',
    domain: 'vibe-coding',
    tags: ['debugging', 'error-messages'],
    difficulty: 'beginning',
    title: 'Reading Error Messages',
    question: 'You see: "TypeError: Cannot read properties of undefined (reading \'map\')". What does this mean?',
    correctAnswer: 'You\'re calling .map() on a variable that is undefined — the data hasn\'t loaded yet or doesn\'t exist',
    distractors: [
      'The map() function has a bug in JavaScript itself',
      'Your computer doesn\'t have the Map library installed',
      'The array is too large for JavaScript to handle',
    ],
    explanation:
      'This error means something is undefined when you try to use .map() on it. Common cause: trying to map over API data before the fetch completes. Fix: add a loading check or default to an empty array. JavaScript\'s map works fine — the issue is your data.',
    misconceptions: ['Blaming the language or library instead of checking your data'],
  },
  {
    id: 'vc_debug_2',
    domain: 'vibe-coding',
    tags: ['debugging', 'ai-assisted'],
    difficulty: 'developing',
    title: 'Getting Help from AI with Bugs',
    question: 'Your app has a bug. What should you share with Claude to get the best fix?',
    correctAnswer: 'The error message, the relevant code, what you expected to happen, and what actually happened',
    distractors: [
      'Just the error message — that\'s enough context',
      'Your entire codebase — more context is always better',
      'A screenshot of the broken page — AI can figure it out visually',
    ],
    explanation:
      'Good bug reports have: error message, relevant code, expected vs. actual behavior. Just the error lacks context. Your entire codebase adds noise. Screenshots help but don\'t show the code causing the issue. The combination gives AI everything needed for a precise fix.',
    misconceptions: ['Thinking the error message alone is enough context for debugging'],
  },
  {
    id: 'vc_debug_3',
    domain: 'vibe-coding',
    tags: ['debugging', 'deployment'],
    difficulty: 'proficient',
    title: 'Build vs. Runtime Errors',
    question: 'Your app works perfectly in dev (`npm run dev`) but fails on Vercel. Most likely cause?',
    correctAnswer: 'TypeScript strict mode or build-time checks catch errors that dev mode ignores — check the Vercel build logs',
    distractors: [
      'Vercel uses a different programming language',
      'Your code only works on Mac, not Linux',
      'Vercel doesn\'t support Next.js',
    ],
    explanation:
      'Dev mode (next dev) is lenient — it skips type checking and some optimizations. Production builds (next build) are strict. Common failures: TypeScript errors, missing imports, dynamic code that assumes browser APIs exist during server rendering. Vercel is the company behind Next.js, so compatibility isn\'t the issue.',
    misconceptions: ['Assuming if it works in dev, it will work in production'],
  },
  {
    id: 'vc_debug_4',
    domain: 'vibe-coding',
    tags: ['debugging', 'hydration'],
    difficulty: 'advanced',
    title: 'Hydration Errors',
    question: 'You see "Hydration failed because the initial UI does not match what was rendered on the server." What causes this?',
    correctAnswer: 'Your component renders different content on the server vs. the browser — often from using browser-only values like window, Date, or Math.random() during render',
    distractors: [
      'Your CSS isn\'t loading fast enough',
      'React is out of date and needs to be updated',
      'Your HTML has invalid nesting (like a div inside a p tag)',
    ],
    explanation:
      'Hydration errors happen when server-rendered HTML doesn\'t match what React generates in the browser. Common causes: Date.now(), window.innerWidth, random values, or localStorage in the render path. While invalid HTML nesting can also cause this, browser-only APIs are the most common culprit. CSS timing and React versions are unrelated.',
    misconceptions: ['Not understanding server vs. client rendering in Next.js'],
  },

  // ── Prompt Engineering (continued) ──
  {
    id: 'vc_prompt_5',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'claude-code'],
    difficulty: 'developing',
    title: 'CLAUDE.md Files',
    question: 'What is the purpose of a CLAUDE.md file in your project?',
    correctAnswer: 'It\'s your taste portrait — it teaches Claude Code your aesthetic, working style, and what "good" means to you, so it makes decisions the way you would',
    distractors: [
      'It\'s a changelog that Claude writes after each session',
      'It\'s required for Claude Code to run — the CLI won\'t start without it',
      'It\'s a backup of your conversation history with Claude',
    ],
    explanation:
      'CLAUDE.md is your taste portrait that Claude Code reads at the start of every session. Beyond coding conventions and deployment commands, it captures your aesthetic preferences, working style, and values. This context shapes thousands of small decisions — the AI learns whether you prefer minimal or bold, move fast or plan carefully. It\'s optional, not required, and not auto-generated.',
    misconceptions: ['Thinking CLAUDE.md is auto-generated or required'],
  },
  {
    id: 'vc_prompt_6',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'multi-turn'],
    difficulty: 'proficient',
    title: 'Multi-Turn Strategy',
    question: 'You\'re building a dashboard. Claude created the layout but the charts feel static and lifeless. Best next prompt?',
    correctAnswer: 'The charts feel dead — I want them to feel alive like the Stripe Dashboard. Hovering should feel responsive, clicking should let me drill down. Make it feel explorable.',
    distractors: [
      'Add hover tooltips showing the exact value, onClick handlers that dispatch a filterByCategory action, and a 200ms transition on the tooltip fade',
      'The charts should be interactive',
      'Delete the charts and use a different charting library',
    ],
    explanation:
      'Describing the feeling ("dead" → "alive", "explorable") and pointing to a reference (Stripe Dashboard) gives the AI a clear target while leaving room for its design judgment. Over-specifying tooltip timing and action names micro-manages the implementation. "Be interactive" is too vague. Switching libraries is drastic.',
    misconceptions: ['Specifying implementation details when you should be describing the experience you want'],
  },
  {
    id: 'vc_prompt_7',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'system-prompts'],
    difficulty: 'developing',
    title: 'System Prompts',
    question: 'You want Claude to always respond with TypeScript code that uses Tailwind CSS. Where is the best place to put this instruction?',
    correctAnswer: 'In a system prompt or CLAUDE.md file so it applies to every message without repeating yourself',
    distractors: [
      'Mention it at the end of every single message you send',
      'Put it in a comment inside your package.json',
      'Configure it in your tsconfig.json compiler options',
    ],
    explanation:
      'System prompts (or CLAUDE.md for Claude Code) set persistent context for the entire conversation. This avoids repeating instructions and ensures consistency. tsconfig.json controls TypeScript compiler behavior, not AI behavior. package.json comments don\'t affect anything.',
    misconceptions: ['Repeating the same instruction in every prompt instead of setting it once'],
  },
  {
    id: 'vc_prompt_8',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'few-shot'],
    difficulty: 'proficient',
    title: 'Few-Shot Examples',
    question: 'You want Claude to generate API routes in a specific format your team uses. What\'s the most reliable way to ensure consistency?',
    correctAnswer: 'Show Claude 2-3 examples of existing routes in your codebase and say "follow this same pattern"',
    distractors: [
      'Describe the format in a long paragraph of text',
      'Ask Claude to guess your team\'s style from the project name',
      'Tell Claude to use best practices and hope it matches',
    ],
    explanation:
      'Few-shot prompting (providing examples) is far more effective than describing patterns in words. Concrete examples remove ambiguity about spacing, naming, error handling, and structure. Descriptions can be misinterpreted. Guessing from a project name is unreliable. "Best practices" is subjective.',
    misconceptions: ['Describing patterns in words when showing an example would be clearer'],
  },
  {
    id: 'vc_prompt_9',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'chain-of-thought'],
    difficulty: 'proficient',
    title: 'Chain-of-Thought Prompting',
    question: 'You need Claude to design a complex database schema. Which prompt strategy helps it think through the problem better?',
    correctAnswer: '"First list the entities and their relationships, then define the tables, then add indexes based on the query patterns I\'ll describe"',
    distractors: [
      '"Give me the SQL for the entire database right now"',
      '"Think hard about this"',
      '"Be very careful and don\'t make mistakes"',
    ],
    explanation:
      'Breaking the reasoning into explicit steps (chain-of-thought) helps the AI work through complexity methodically. Asking for everything at once skips important design thinking. "Think hard" and "be careful" are vague meta-instructions that don\'t guide the actual reasoning process.',
    misconceptions: ['Thinking "be careful" or "think hard" are effective ways to improve AI output quality'],
  },
  {
    id: 'vc_prompt_10',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'persona'],
    difficulty: 'beginning',
    title: 'Persona-Based Prompting',
    question: 'You want code review feedback. Which prompt approach gets the most useful response?',
    correctAnswer: '"Review this code as a senior developer focused on security and performance. Flag any issues and explain why they matter."',
    distractors: [
      '"Is this code good?"',
      '"Rate this code from 1 to 10"',
      '"Find every possible thing wrong with this code"',
    ],
    explanation:
      'Giving the AI a specific role (senior developer) with clear focus areas (security, performance) and a format (flag + explain) produces targeted, actionable feedback. "Is this good?" gets a yes/no. Ratings aren\'t actionable. "Find everything wrong" produces overwhelming nitpicks.',
    misconceptions: ['Asking for vague quality assessments instead of specific review criteria'],
  },
  {
    id: 'vc_prompt_11',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'constraints'],
    difficulty: 'developing',
    title: 'Setting Guardrails',
    question: 'You want the AI to build a simple component but it keeps over-engineering with Redux, context providers, and custom hooks. How do you steer it?',
    correctAnswer: '"This should feel lightweight — like a quick utility, not a framework. Think single-file, minimal dependencies. If you\'re reaching for Redux, it\'s too much."',
    distractors: [
      '"Use only useState — no external state libraries, no useReducer, no context. Keep it under 80 lines."',
      '"Make it simple"',
      '"Write clean code"',
    ],
    explanation:
      'Describing the weight and feel you want ("lightweight", "quick utility, not a framework") gives the AI a clear creative direction. Micro-managing which hooks to use limits the AI to your technical plan. "Simple" and "clean" are too vague. The best constraints describe the vibe, not the implementation.',
    misconceptions: ['Constraining the AI with a list of forbidden tools instead of describing the feel you want'],
  },
  {
    id: 'vc_prompt_12',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'output-format'],
    difficulty: 'beginning',
    title: 'First Project Setup',
    question: 'You\'re starting a new project with Claude Code. What\'s the most important thing to set up first?',
    correctAnswer: 'Your CLAUDE.md file — describing your aesthetic, how you work, and what "good" looks like to you',
    distractors: [
      'A detailed technical spec listing every component, route, and database schema',
      'A list of the exact npm packages you want to use',
      'A wireframe of every screen before writing any code',
    ],
    explanation:
      'Your CLAUDE.md is a portrait of your taste and working style. It shapes every interaction — the AI learns whether you prefer minimal or bold, fast iteration or careful planning. This context is worth more than any technical spec because it helps the AI make thousands of small decisions the way you would.',
    misconceptions: ['Starting with a technical spec instead of teaching the AI your taste'],
  },

  // ── Reading & Evaluating AI Code (continued) ──
  {
    id: 'vc_read_5',
    domain: 'vibe-coding',
    tags: ['reading-code', 'async'],
    difficulty: 'developing',
    title: 'Async/Await',
    question: 'What happens if you forget the `await` keyword before a fetch call?\n\n`const data = fetch("/api/users");`',
    correctAnswer: 'data will be a Promise object, not the actual response — any code using data.json() or data.status will fail or behave unexpectedly',
    distractors: [
      'The code will throw an error immediately',
      'The fetch will still work, just slightly slower',
      'Nothing — await is optional syntax sugar',
    ],
    explanation:
      'Without await, fetch returns a Promise (a placeholder for the future result). The code continues immediately with the unresolved Promise. It won\'t crash right away, but using the Promise as if it were the response will fail. await is not optional — it\'s how you get the actual value.',
    misconceptions: ['Thinking await is optional and fetch returns data directly'],
  },
  {
    id: 'vc_read_6',
    domain: 'vibe-coding',
    tags: ['reading-code', 'typescript'],
    difficulty: 'developing',
    title: 'TypeScript Types',
    question: 'Claude added `interface User { name: string; age: number; }` to your code. What does this do?',
    correctAnswer: 'It defines the shape of a User object — TypeScript will warn you if you try to create a User with missing or wrong-typed fields',
    distractors: [
      'It creates a User class with name and age methods',
      'It adds name and age columns to your database',
      'It generates a user registration form',
    ],
    explanation:
      'TypeScript interfaces define the structure of data — they\'re compile-time type checking, not runtime code. They don\'t create classes, touch databases, or generate UI. They help catch bugs early by ensuring your code uses data correctly.',
    misconceptions: ['Confusing TypeScript interfaces with classes, database schemas, or UI'],
  },
  {
    id: 'vc_read_7',
    domain: 'vibe-coding',
    tags: ['reading-code', 'ai-output'],
    difficulty: 'developing',
    title: 'AI Over-Engineering',
    question: 'You asked Claude for a simple contact form. It generated a multi-step form wizard with validation schemas, a custom hook library, and a state machine. What should you do?',
    correctAnswer: '"This is way too complex. I need a single-page form with name, email, and message. No wizard, no state machine. Keep it simple."',
    distractors: [
      'Accept it — the AI knows best practices better than you',
      'Delete everything and try a different AI tool',
      'Ask the AI to add more features since it\'s already complex',
    ],
    explanation:
      'AI sometimes over-engineers, especially when the prompt is ambiguous. The fix is direct feedback about scope: tell it what\'s too much and what you actually need. Don\'t accept unnecessary complexity just because the AI built it. You set the scope, the AI fills it.',
    misconceptions: ['Accepting over-engineered AI output because it looks impressive'],
  },
  {
    id: 'vc_read_8',
    domain: 'vibe-coding',
    tags: ['reading-code', 'prop-drilling'],
    difficulty: 'developing',
    title: 'Recognizing Prop Drilling',
    question: 'Claude built a component tree where `userId` is passed from App → Layout → Sidebar → UserMenu → Avatar. Each middle component just passes it through without using it. What is this pattern called?',
    correctAnswer: 'Prop drilling — passing data through multiple layers of components that don\'t need it themselves',
    distractors: [
      'Dependency injection — a clean way to share data',
      'Data binding — how React automatically syncs state',
      'Component composition — the recommended React pattern',
    ],
    explanation:
      'Prop drilling is when data passes through intermediary components that don\'t use it, just to reach a deeply nested component. It makes refactoring hard and clutters component interfaces. Solutions include React Context, state management libraries, or component composition patterns.',
    misconceptions: ['Thinking prop drilling is the standard way to share data in React'],
  },
  {
    id: 'vc_read_9',
    domain: 'vibe-coding',
    tags: ['reading-code', 'iteration'],
    difficulty: 'proficient',
    title: 'When to Start Over',
    question: 'You\'ve been iterating with Claude for 20 minutes. The component works but the code is a mess of patches on patches. What\'s the best approach?',
    correctAnswer: 'Ask Claude to rewrite the component from scratch, describing the final working behavior — the AI now understands the requirements better from your iterations',
    distractors: [
      'Keep patching — the code works and that\'s what matters',
      'Manually clean up the code yourself line by line',
      'Start a brand new conversation and re-explain everything from scratch',
    ],
    explanation:
      'After several iterations, the AI has learned what you actually want. A "clean rewrite" prompt captures that understanding without the accumulated mess. You don\'t need a new conversation — the current one has valuable context about your requirements. Manual cleanup is slow when the AI can do it.',
    misconceptions: ['Thinking you need to keep every line of iteratively-built code'],
  },
  {
    id: 'vc_read_10',
    domain: 'vibe-coding',
    tags: ['reading-code', 'understanding'],
    difficulty: 'beginning',
    title: 'You Don\'t Need Every Line',
    question: 'Claude generated a 200-line component and you don\'t understand half the code. Should you be worried?',
    correctAnswer: 'Focus on understanding WHAT it does (inputs, outputs, behavior) not HOW every line works — you can always ask Claude to explain specific parts',
    distractors: [
      'Yes — you should never ship code you don\'t fully understand line by line',
      'No — if it works, the code doesn\'t matter at all',
      'Rewrite everything yourself so you understand it',
    ],
    explanation:
      'In vibe coding, your job is to understand behavior, not implementation. Can you describe what the component does? Does it handle the cases you care about? You should understand the "what" even if the "how" is fuzzy. But "it works so ignore it" is dangerous — you still need to test edge cases and review security-sensitive parts.',
    misconceptions: ['Thinking you must understand every line or nothing at all — there\'s a practical middle ground'],
  },
  {
    id: 'vc_read_11',
    domain: 'vibe-coding',
    tags: ['reading-code', 'testing'],
    difficulty: 'developing',
    title: 'The Happy Path Trap',
    question: 'You tested your AI-built form and it works perfectly when you fill everything in correctly. What are you missing?',
    correctAnswer: 'Edge cases — what happens with empty fields, very long text, special characters, slow connections, or if the API is down?',
    distractors: [
      'Nothing — if the form works with valid data, it\'s done',
      'You need to add more form fields to be thorough',
      'Check that the CSS looks good in dark mode',
    ],
    explanation:
      'The "happy path" (everything goes right) is just one scenario. Real users submit empty forms, paste essays into name fields, lose internet mid-submit, and do things you\'d never expect. AI often builds the happy path perfectly but skips error handling. Always test: empty, wrong types, very long, very short, no network.',
    misconceptions: ['Assuming a feature is done because it works under ideal conditions'],
  },
  {
    id: 'vc_read_12',
    domain: 'vibe-coding',
    tags: ['reading-code', 'integration'],
    difficulty: 'developing',
    title: 'Copying Between AI Tools',
    question: 'You built a great component in Claude Artifacts and want to use it in your Next.js project. You paste it in but it doesn\'t work. What\'s the most likely issue?',
    correctAnswer: 'Missing dependencies — the Artifact used libraries that aren\'t installed in your project, or imports that don\'t match your file structure',
    distractors: [
      'Artifacts code is different from real React — you need to rewrite it',
      'You need to convert it from JavaScript to TypeScript first',
      'The code is encrypted and only works inside Artifacts',
    ],
    explanation:
      'Artifacts and real projects use the same React, but Artifacts have pre-installed libraries and a flat file structure. When moving code, check: are all imports available? Are the packages installed? Do file paths match your project structure? This is the most common "works in Artifacts, breaks in my project" issue.',
    misconceptions: ['Thinking code from AI tools should work in any project without adjustment'],
  },

  // ── Dev Tooling & Workflow (continued) ──
  {
    id: 'vc_tool_5',
    domain: 'vibe-coding',
    tags: ['tooling', 'terminal'],
    difficulty: 'beginning',
    title: 'Terminal Basics',
    question: 'What does `cd` do in the terminal?',
    correctAnswer: 'Changes the current directory — like navigating to a different folder',
    distractors: [
      'Creates a new directory',
      'Copies a directory to a new location',
      'Deletes a directory permanently',
    ],
    explanation:
      'cd = "change directory." It navigates you to a different folder in your file system. mkdir creates directories. cp copies. rm deletes. These are fundamental terminal commands worth memorizing.',
    misconceptions: ['Confusing cd, mkdir, cp, and rm commands'],
  },
  {
    id: 'vc_tool_6',
    domain: 'vibe-coding',
    tags: ['tooling', 'git'],
    difficulty: 'developing',
    title: 'Git Branches',
    question: 'Why would you create a git branch before working on a new feature?',
    correctAnswer: 'To isolate your changes from the main code, so you can experiment without breaking what\'s already working',
    distractors: [
      'Git requires a new branch for every file change',
      'Branches make your code run faster',
      'You need a branch to be able to save files',
    ],
    explanation:
      'Branches let you work on features independently. If something goes wrong, main is unaffected. You can merge when ready. Git doesn\'t require branches for every change — it\'s a best practice for collaboration and safety. Branches have no effect on performance.',
    misconceptions: ['Thinking branches are required rather than a safety practice'],
  },
  {
    id: 'vc_tool_7',
    domain: 'vibe-coding',
    tags: ['tooling', 'git'],
    difficulty: 'beginning',
    title: '.gitignore Purpose',
    question: 'What does a `.gitignore` file do?',
    correctAnswer: 'Tells git which files and folders to NOT track — like node_modules, .env files, and build artifacts',
    distractors: [
      'Deletes files from your project permanently',
      'Hides files so they\'re invisible on your computer',
      'Prevents other people from reading your code on GitHub',
    ],
    explanation:
      '.gitignore lists patterns of files/folders that git should ignore. This keeps your repo clean by excluding generated files (node_modules, .next), secrets (.env), and OS files (.DS_Store). The files still exist locally — they\'re just not tracked or pushed to the remote.',
    misconceptions: ['Thinking .gitignore deletes files or makes them invisible'],
  },
  {
    id: 'vc_tool_8',
    domain: 'vibe-coding',
    tags: ['tooling', 'npm'],
    difficulty: 'beginning',
    title: 'npm Scripts',
    question: 'In a Next.js project, what\'s the difference between `npm run dev`, `npm run build`, and `npm run start`?',
    correctAnswer: 'dev starts a local development server with hot reload, build creates an optimized production bundle, start runs the built production bundle',
    distractors: [
      'They all do the same thing — just different names for running the app',
      'dev deploys to staging, build deploys to production, start opens the browser',
      'dev installs dependencies, build compiles TypeScript, start uploads to npm',
    ],
    explanation:
      'These three scripts serve different stages: dev is for local development (fast, with hot reload), build creates optimized production files, and start serves those built files. You run dev while coding, build before deploying, and start in production. They are NOT interchangeable.',
    misconceptions: ['Using npm run dev in production instead of build + start'],
  },
  {
    id: 'vc_tool_9',
    domain: 'vibe-coding',
    tags: ['tooling', 'npm'],
    difficulty: 'developing',
    title: 'Package Lock Files',
    question: 'Your project has both `package.json` and `package-lock.json`. Why is the lock file important?',
    correctAnswer: 'It records the exact version of every dependency installed, so everyone on the team gets identical packages',
    distractors: [
      'It\'s a backup of package.json in case it gets deleted',
      'It locks the project so no one else can install packages',
      'It\'s automatically generated but safe to delete — it rebuilds itself',
    ],
    explanation:
      'package-lock.json ensures reproducible installs. Without it, `npm install` might get different versions on different machines (because package.json uses version ranges like ^1.2.0). The lock file pins exact versions. Always commit it to git. Deleting it can cause "works on my machine" bugs.',
    misconceptions: ['Thinking the lock file is unnecessary or should be gitignored'],
  },
  {
    id: 'vc_tool_10',
    domain: 'vibe-coding',
    tags: ['tooling', 'feedback'],
    difficulty: 'beginning',
    title: 'Visual Feedback for AI',
    question: 'Your app looks wrong but you can\'t describe what\'s off. What\'s the most effective way to get AI help?',
    correctAnswer: 'Take a screenshot and share it — Claude can see images and identify visual problems faster than you can describe them in words',
    distractors: [
      'Describe every CSS property you think needs changing',
      'Paste the entire component code and say "fix the styling"',
      'Open the browser inspector and read out all the computed styles',
    ],
    explanation:
      'A screenshot is worth a thousand words of CSS descriptions. Claude can see images and identify visual problems (spacing, alignment, colors) faster than you can describe them. Pair it with "this is what I have" and "I want it to look more like [reference]" for the best results.',
    misconceptions: ['Trying to describe visual problems in words when a screenshot would be clearer'],
  },
  {
    id: 'vc_tool_11',
    domain: 'vibe-coding',
    tags: ['tooling', 'cost'],
    difficulty: 'developing',
    title: 'AI Token Awareness',
    question: 'Your Claude Code session has been running for an hour on a complex feature. The context is almost full and responses are getting less focused. What\'s happening?',
    correctAnswer: 'The context window is filling up, which means higher costs and degrading quality — time to /compact or break the task into smaller pieces',
    distractors: [
      'This is normal — longer sessions always produce better results',
      'Claude is being thorough — more files read means better understanding',
      'Nothing to worry about — context size doesn\'t affect cost or quality',
    ],
    explanation:
      'Every token in and out costs money, and AI quality degrades as context fills up. Long, unfocused sessions waste tokens on irrelevant context. The fix: use /compact to summarize, delegate research to subagents, or break large tasks into focused sessions. Being mindful of context is both a cost and quality strategy.',
    misconceptions: ['Ignoring context window usage as a signal for session health'],
  },
  {
    id: 'vc_tool_12',
    domain: 'vibe-coding',
    tags: ['tooling', 'understanding'],
    difficulty: 'beginning',
    title: 'When to Ask AI to Explain',
    question: 'Claude just made changes across 8 files to add a feature. When should you ask it to explain what it did?',
    correctAnswer: 'When the changes touch critical areas (auth, payments, data handling) — for routine UI changes, testing it is enough',
    distractors: [
      'Always — you should understand every change before accepting it',
      'Never — just test if it works and move on',
      'Only when you plan to modify those files yourself later',
    ],
    explanation:
      'You don\'t need to understand every line, but you should understand changes to critical systems: authentication, payments, data handling, and user privacy. For a new button or a styling tweak? Test it and move on. For changes to how user data is stored? Absolutely ask for an explanation.',
    misconceptions: ['Either reviewing everything or reviewing nothing — risk-based review is the sweet spot'],
  },

  // ── Web Fundamentals (continued) ──
  {
    id: 'vc_web_5',
    domain: 'vibe-coding',
    tags: ['nextjs', 'server-components'],
    difficulty: 'proficient',
    title: 'Client vs Server Components',
    question: 'In Next.js App Router, what determines whether a component runs on the server or the client?',
    correctAnswer: 'Components are server components by default. Adding "use client" at the top of the file makes it a client component.',
    distractors: [
      'Files in the /server folder are server components, everything else is client',
      'Components with useState are automatically server components',
      'You choose in next.config.js which components are server vs client',
    ],
    explanation:
      'In Next.js App Router, all components are server components by default — they render on the server and send HTML. Adding "use client" makes a component render in the browser, enabling hooks like useState and useEffect. There\'s no /server folder convention or config setting for this.',
    misconceptions: ['Not understanding that server components are the default in App Router'],
  },
  {
    id: 'vc_web_6',
    domain: 'vibe-coding',
    tags: ['tailwind', 'responsive'],
    difficulty: 'developing',
    title: 'Responsive Design with Tailwind',
    question: 'What does `className="grid grid-cols-1 md:grid-cols-3"` do in Tailwind?',
    correctAnswer: 'Shows 1 column on mobile, then switches to 3 columns on medium-sized screens (768px+)',
    distractors: [
      'Always shows 3 columns but makes them narrower on mobile',
      'Shows 1 column on desktop and 3 columns on mobile',
      'Creates a grid that automatically picks between 1 and 3 columns based on content',
    ],
    explanation:
      'Tailwind\'s responsive prefixes (sm:, md:, lg:) apply styles at that breakpoint AND above. The base (no prefix) is mobile-first. So grid-cols-1 is the default, and md:grid-cols-3 kicks in at 768px+. This is mobile-first design — you style for small screens first, then add overrides for larger ones.',
    misconceptions: ['Thinking responsive prefixes target only that exact screen size'],
  },
  {
    id: 'vc_web_7',
    domain: 'vibe-coding',
    tags: ['css', 'flexbox'],
    difficulty: 'beginning',
    title: 'CSS Flexbox Basics',
    question: 'You want to center a div both horizontally and vertically on the page. Which Tailwind classes do this?',
    correctAnswer: '"flex items-center justify-center h-screen" — flex enables flexbox, items-center centers vertically, justify-center centers horizontally',
    distractors: [
      '"text-center" — this centers everything in the element',
      '"mx-auto my-auto" — auto margins center in both directions',
      '"position-center" — this is the CSS centering property',
    ],
    explanation:
      'Flexbox is the modern way to center elements. `flex` activates it, `items-center` aligns on the cross axis (vertical), `justify-center` aligns on the main axis (horizontal). text-center only centers inline content horizontally. mx-auto only works horizontally with a set width. There is no "position-center" property.',
    misconceptions: ['Thinking text-center handles all centering needs'],
  },
  {
    id: 'vc_web_8',
    domain: 'vibe-coding',
    tags: ['nextjs', 'api'],
    difficulty: 'developing',
    title: 'API Routes in Next.js',
    question: 'Where do you create an API endpoint at `/api/users` in Next.js App Router?',
    correctAnswer: 'Create src/app/api/users/route.ts with exported functions like GET and POST',
    distractors: [
      'Create src/api/users.ts and export a default function',
      'Add the endpoint in next.config.js under the "api" section',
      'Create src/pages/api/users.ts with a handler function',
    ],
    explanation:
      'In App Router, API routes use route.ts files (not page.ts) with named exports for HTTP methods (GET, POST, etc.). The file path determines the URL. pages/api/ is the old Pages Router pattern. There\'s no API config in next.config.js.',
    misconceptions: ['Confusing App Router route.ts with Pages Router pages/api/ conventions'],
  },
  {
    id: 'vc_web_9',
    domain: 'vibe-coding',
    tags: ['react', 'forms'],
    difficulty: 'developing',
    title: 'Form Handling in React',
    question: 'Claude generated a form with `<input value={name} />` but typing in it does nothing. Why?',
    correctAnswer: 'It\'s a controlled input with no onChange handler — React prevents the value from changing because nothing calls setName',
    distractors: [
      'You need to use defaultValue instead of value',
      'HTML inputs don\'t work in React — you need a special Input component',
      'The input is disabled by default in Next.js',
    ],
    explanation:
      'In React, setting `value` on an input makes it "controlled" — React owns the value, and you must provide an onChange handler to update state. Without it, the input appears frozen. Fix: add `onChange={(e) => setName(e.target.value)}`. Using defaultValue creates an "uncontrolled" input, which is a different pattern.',
    misconceptions: ['Not understanding controlled vs uncontrolled inputs in React'],
  },
  {
    id: 'vc_web_10',
    domain: 'vibe-coding',
    tags: ['nextjs', 'performance'],
    difficulty: 'proficient',
    title: 'Image Optimization',
    question: 'Why should you use Next.js `<Image>` instead of a plain `<img>` tag?',
    correctAnswer: 'Next.js Image automatically lazy-loads, serves optimized formats (WebP), and generates responsive sizes — improving performance without manual work',
    distractors: [
      'Plain img tags don\'t work in React at all',
      'Next.js Image adds copyright protection to your images',
      'It\'s just a style preference — they render identically',
    ],
    explanation:
      'The Next.js Image component handles lazy loading (only loads when visible), automatic format conversion (WebP/AVIF), responsive srcsets, and size optimization. Plain img tags work fine in React but miss these optimizations, leading to slower page loads. The difference is significant for performance.',
    misconceptions: ['Thinking img and Image are functionally identical'],
  },

  // ── Debugging with AI (continued) ──
  {
    id: 'vc_debug_5',
    domain: 'vibe-coding',
    tags: ['debugging', 'console'],
    difficulty: 'beginning',
    title: 'Console.log Strategies',
    question: 'Your component renders but shows wrong data. What\'s the best way to use console.log to debug it?',
    correctAnswer: 'Log the data right before it\'s rendered with a label: `console.log("users data:", users)` — then check the browser console',
    distractors: [
      'Add console.log everywhere in the file to see everything',
      'console.log only works in Node.js, not in the browser',
      'Use alert() instead — it\'s more reliable than console.log',
    ],
    explanation:
      'Strategic console.log with descriptive labels helps you pinpoint where data goes wrong. Log at the point of use, not everywhere. console.log works in both browsers and Node.js. alert() blocks execution and can\'t display objects — it\'s terrible for debugging.',
    misconceptions: ['Scattering console.log everywhere instead of placing it strategically'],
  },
  {
    id: 'vc_debug_6',
    domain: 'vibe-coding',
    tags: ['debugging', 'react-devtools'],
    difficulty: 'developing',
    title: 'React DevTools',
    question: 'Your component isn\'t getting the right props. What tool helps you inspect the actual props a component receives at runtime?',
    correctAnswer: 'React DevTools browser extension — it shows the component tree with current props, state, and hooks values',
    distractors: [
      'The Elements tab in Chrome DevTools — it shows all component props in the HTML',
      'TypeScript — if the types are correct, the props must be correct',
      'View Source — you can see the props in the page source code',
    ],
    explanation:
      'React DevTools adds a "Components" tab to browser devtools that shows the React component tree, current props, state, and hook values in real time. The Elements tab shows DOM, not React components. TypeScript checks types at compile time, not runtime values. View Source shows the initial HTML, not live React state.',
    misconceptions: ['Trying to debug React state by inspecting the DOM instead of using React DevTools'],
  },
  {
    id: 'vc_debug_7',
    domain: 'vibe-coding',
    tags: ['debugging', 'network'],
    difficulty: 'developing',
    title: 'Network Tab Debugging',
    question: 'Your app calls an API but nothing happens. Where do you check what the API actually returned?',
    correctAnswer: 'Browser DevTools Network tab — click the request to see the URL, status code, request headers, and response body',
    distractors: [
      'Check the Elements tab for the API response',
      'Look at the terminal where you ran npm run dev',
      'API responses aren\'t visible anywhere — you can only see them in your code',
    ],
    explanation:
      'The Network tab records every HTTP request your app makes. You can see the exact URL, request/response headers, status codes (200, 404, 500), and the response body. This is essential for debugging API issues. The dev server terminal shows server-side logs, not client-side API responses.',
    misconceptions: ['Not knowing the Network tab exists for debugging API calls'],
  },
  {
    id: 'vc_debug_8',
    domain: 'vibe-coding',
    tags: ['debugging', 'stack-traces'],
    difficulty: 'proficient',
    title: 'Reading Stack Traces',
    question: 'You see an error stack trace that lists 15 files. Which line should you look at first?',
    correctAnswer: 'The first line that references YOUR code (not node_modules or framework internals) — that\'s where the error originated in your project',
    distractors: [
      'Always the very first line — that\'s where the error is',
      'Always the very last line — errors start from the bottom',
      'Ignore the stack trace and just read the error message',
    ],
    explanation:
      'Stack traces show the call chain from the error point. Most lines are framework/library internals. Find the first reference to your own code (your src/ files) — that\'s usually where the bug is. The error message alone often isn\'t enough without knowing WHERE in your code it happens.',
    misconceptions: ['Ignoring stack traces because they look overwhelming'],
  },
  {
    id: 'vc_debug_9',
    domain: 'vibe-coding',
    tags: ['debugging', 'cors'],
    difficulty: 'proficient',
    title: 'CORS Errors',
    question: 'Your frontend at localhost:3000 tries to fetch from localhost:8000/api and gets a CORS error. What\'s happening?',
    correctAnswer: 'The browser blocks requests to a different origin (port counts). The backend needs to send Access-Control-Allow-Origin headers to permit it.',
    distractors: [
      'Your API is down — CORS errors mean the server isn\'t running',
      'You need to switch from fetch to axios to avoid CORS',
      'CORS is a Next.js bug that\'s fixed by updating to the latest version',
    ],
    explanation:
      'CORS (Cross-Origin Resource Sharing) is a browser security feature. Different ports = different origins. The fix is on the server side: add CORS headers allowing your frontend origin. Using axios doesn\'t bypass CORS (it\'s a browser restriction, not a library issue). CORS isn\'t a bug — it\'s intentional security.',
    misconceptions: ['Thinking CORS is a frontend bug or can be fixed by switching HTTP libraries'],
  },
  {
    id: 'vc_debug_10',
    domain: 'vibe-coding',
    tags: ['debugging', 'typescript'],
    difficulty: 'developing',
    title: 'TypeScript "any" Escape Hatch',
    question: 'Claude added `as any` to fix a TypeScript error. Why is this dangerous?',
    correctAnswer: 'It silences the type checker completely for that value — the bug is still there, you just can\'t see the warning anymore',
    distractors: [
      'It makes the code run slower because TypeScript can\'t optimize it',
      'It converts the value to a special "any" data type at runtime',
      'It\'s perfectly fine — that\'s what "any" is designed for',
    ],
    explanation:
      '`as any` tells TypeScript to stop checking types for that value. The underlying problem (wrong type, missing field, incompatible data) still exists — you just suppressed the warning. It\'s like turning off a smoke alarm instead of finding the fire. TypeScript types are compile-time only and don\'t affect runtime performance.',
    misconceptions: ['Using "as any" to fix type errors instead of fixing the actual type mismatch'],
  },

  // ── Testing & Quality ──
  {
    id: 'vc_test_1',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'beginning',
    title: 'Why Write Tests',
    question: 'Your app works perfectly right now. Why should you still write tests?',
    correctAnswer: 'Tests protect against future changes breaking existing features — they catch regressions before your users do',
    distractors: [
      'Tests are only needed for apps with bugs — if it works, don\'t test it',
      'Tests make your code run faster in production',
      'You only need tests if your team has a QA department',
    ],
    explanation:
      'Every code change risks breaking something else. Tests are a safety net: they verify existing behavior stays correct as you add features, refactor, or update dependencies. Even solo developers benefit because you can\'t manually re-test everything after every change. Tests don\'t affect runtime performance.',
    misconceptions: ['Thinking tests are only for buggy code or large teams'],
  },
  {
    id: 'vc_test_2',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'developing',
    title: 'Unit vs Integration Tests',
    question: 'What\'s the difference between a unit test and an integration test?',
    correctAnswer: 'A unit test checks one function or component in isolation. An integration test checks how multiple parts work together.',
    distractors: [
      'Unit tests are for JavaScript, integration tests are for TypeScript',
      'Unit tests run locally, integration tests only run in CI/CD',
      'Unit tests are written by developers, integration tests are written by QA',
    ],
    explanation:
      'Unit tests isolate a single piece (function, component) and verify it works correctly on its own. Integration tests check that pieces work together (e.g., a form component that calls an API). Both are written by developers, both run locally AND in CI, and both work with any language.',
    misconceptions: ['Thinking unit and integration tests differ by who writes them or where they run'],
  },
  {
    id: 'vc_test_3',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'beginning',
    title: 'Writing a First Test',
    question: 'What does this test do?\n\n`expect(add(2, 3)).toBe(5);`',
    correctAnswer: 'It calls the add function with 2 and 3, and checks that the result equals 5 — failing the test if it doesn\'t',
    distractors: [
      'It creates a function called add that returns 5',
      'It prints "5" to the console for manual verification',
      'It sets the add function\'s default return value to 5',
    ],
    explanation:
      'This is an assertion: call the function, then assert the result matches your expectation. `expect(X).toBe(Y)` means "X should equal Y." If add(2, 3) returns anything other than 5, the test fails. Tests don\'t create functions or print values — they verify behavior.',
    misconceptions: ['Confusing test assertions with function definitions or console output'],
  },
  {
    id: 'vc_test_4',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'proficient',
    title: 'Mocking',
    question: 'Your component fetches data from an API. Why would you mock the API in tests instead of calling the real one?',
    correctAnswer: 'Mocks make tests fast, reliable, and offline-capable — real API calls are slow, can fail, and make tests depend on external servers',
    distractors: [
      'You can\'t use fetch in a test environment at all',
      'Mocking is required by law for API calls in tests',
      'Real API calls would change your production database',
    ],
    explanation:
      'Mocking replaces real dependencies with controlled fakes. For API calls, this means tests run instantly (no network), work offline, and don\'t depend on server availability. You can also test error scenarios by making the mock return errors. fetch works in test environments; mocking is a choice, not a requirement.',
    misconceptions: ['Thinking mocking is required rather than a testing strategy choice'],
  },
  {
    id: 'vc_test_5',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'developing',
    title: 'Test-Driven Development Basics',
    question: 'In test-driven development (TDD), what do you do FIRST?',
    correctAnswer: 'Write a failing test that describes what the code should do, then write the code to make it pass',
    distractors: [
      'Write all the code first, then add tests at the end',
      'Write the test and the code at the same time in the same file',
      'Ask the AI to generate both the code and tests together',
    ],
    explanation:
      'TDD follows red-green-refactor: write a failing test (red), write minimal code to pass it (green), then clean up (refactor). Writing tests first forces you to think about what the code should do before how. This is especially useful with AI — describe the behavior in tests, then let AI implement it.',
    misconceptions: ['Thinking tests should always come after the implementation'],
  },
  {
    id: 'vc_test_6',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'proficient',
    title: 'Testing User Interactions',
    question: 'You want to test that clicking a "Submit" button shows a success message. Which testing approach is best?',
    correctAnswer: 'Use a testing library to simulate the click, then assert the success message appears in the DOM',
    distractors: [
      'Manually click the button in the browser and take a screenshot',
      'Check that the onClick function exists on the button element',
      'Verify the button\'s CSS class changes after clicking',
    ],
    explanation:
      'Libraries like React Testing Library let you simulate user interactions and check the resulting UI. Testing that the success message appears (the user-visible outcome) is more meaningful than checking implementation details like onClick existence or CSS classes. Manual testing doesn\'t scale.',
    misconceptions: ['Testing implementation details instead of user-visible behavior'],
  },
  {
    id: 'vc_test_7',
    domain: 'vibe-coding',
    tags: ['testing', 'ai-workflow'],
    difficulty: 'developing',
    title: 'AI-Written Tests',
    question: 'You ask Claude Code to write tests for a feature it just built. What\'s the biggest risk with this approach?',
    correctAnswer: 'The AI may write tests that pass but don\'t verify the right behavior — tests that confirm what the code does, not what it should do',
    distractors: [
      'AI can\'t write tests — only humans can write meaningful tests',
      'The tests will be too strict and break on every code change',
      'There\'s no risk — AI-written tests are just as good as human-written ones',
    ],
    explanation:
      'When the same AI writes code and tests, it may test its own assumptions rather than your requirements. The tests might pass while missing edge cases you care about. The fix: describe the expected behavior in your prompt ("test that empty names are rejected") rather than saying "write tests for this code."',
    misconceptions: ['Assuming AI-written tests verify requirements rather than confirming existing behavior'],
  },
  {
    id: 'vc_test_8',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'developing',
    title: 'CI/CD Test Automation',
    question: 'What does it mean to "run tests in CI"?',
    correctAnswer: 'Tests run automatically on a server every time you push code — if any test fails, the deployment is blocked',
    distractors: [
      'CI stands for "Code Inspector" — it reviews your code style',
      'Tests run on your local machine when you save a file',
      'CI only applies to teams of 10+ developers',
    ],
    explanation:
      'CI (Continuous Integration) automatically runs tests on a server (like GitHub Actions) when you push code. If tests fail, the PR can\'t be merged and the deploy is blocked. This catches bugs before they reach production. CI works for solo developers too — it\'s about automation, not team size.',
    misconceptions: ['Thinking CI/CD is only for large teams'],
  },

  // ── Security ──
  {
    id: 'vc_sec_1',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'developing',
    title: 'XSS Prevention',
    question: 'Claude used `dangerouslySetInnerHTML` to render user-submitted content. Why is this risky?',
    correctAnswer: 'It renders raw HTML, so a user could inject malicious scripts that steal data from other users visiting the page',
    distractors: [
      'It\'s just named "dangerously" as a convention — it\'s actually safe',
      'It only affects server-side rendering, not the browser',
      'React automatically sanitizes all HTML passed to dangerouslySetInnerHTML',
    ],
    explanation:
      'XSS (Cross-Site Scripting) lets attackers inject scripts into pages other users view. dangerouslySetInnerHTML renders raw HTML without sanitization, including <script> tags. React normally escapes HTML in JSX — dangerouslySetInnerHTML bypasses that protection. The name "dangerously" is a real warning, not a convention.',
    misconceptions: ['Thinking the "dangerous" prefix is just naming convention, not a real warning'],
  },
  {
    id: 'vc_sec_2',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'developing',
    title: 'HTTPS Basics',
    question: 'Why does your browser show a padlock icon on some websites but a warning on others?',
    correctAnswer: 'The padlock means the connection uses HTTPS — data between your browser and the server is encrypted and can\'t be read by others on the network',
    distractors: [
      'The padlock means the website has no viruses',
      'It means the website is verified as trustworthy by the government',
      'The padlock means your password is stored securely on the server',
    ],
    explanation:
      'HTTPS encrypts data in transit between browser and server using TLS. Without it (plain HTTP), anyone on your network (coffee shop WiFi, ISP) can read your data. The padlock doesn\'t verify the site is trustworthy or virus-free — it only means the connection is encrypted. A scam site can have HTTPS.',
    misconceptions: ['Thinking HTTPS means a website is safe or trustworthy'],
  },
  {
    id: 'vc_sec_3',
    domain: 'vibe-coding',
    tags: ['security', 'auth'],
    difficulty: 'developing',
    title: 'Don\'t Build Your Own Auth',
    question: 'You need user login for your app. Claude offers to build it with bcrypt, JWTs, and session management from scratch. What should you do instead?',
    correctAnswer: 'Use an auth service like Supabase Auth, Clerk, or NextAuth — they handle security correctly out of the box',
    distractors: [
      'Let Claude build it — AI-generated auth is as secure as a library',
      'Build it from scratch so you understand how auth works',
      'Skip auth entirely and use a password field with a JavaScript check',
    ],
    explanation:
      'Auth is one of the hardest things to get right: password hashing, session management, CSRF protection, rate limiting, OAuth flows, and more. Auth services have dedicated security teams. AI can generate auth code that looks correct but has subtle vulnerabilities. Use a battle-tested service.',
    misconceptions: ['Thinking AI-generated auth code is as secure as dedicated auth services'],
  },
  {
    id: 'vc_sec_4',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'proficient',
    title: 'API Key Exposure',
    question: 'Claude put your OpenAI API key directly in a React component: `const key = "sk-abc123..."`. What\'s the problem?',
    correctAnswer: 'Client-side code is visible to anyone — users can open DevTools and steal your API key, running up your bill',
    distractors: [
      'React hides variables in components from the browser automatically',
      'It\'s fine as long as you don\'t push it to GitHub',
      'API keys in JavaScript are automatically encrypted by the browser',
    ],
    explanation:
      'ALL client-side JavaScript is visible in the browser. Anyone can open DevTools and find hardcoded keys. The fix: use server-side API routes (e.g., Next.js route handlers) to call APIs — the key stays on the server, never sent to the browser. Even if you don\'t push it to GitHub, it\'s in the bundle users download.',
    misconceptions: ['Thinking client-side code is hidden from users'],
  },
  {
    id: 'vc_sec_5',
    domain: 'vibe-coding',
    tags: ['security', 'validation'],
    difficulty: 'developing',
    title: 'Client-Side Validation Isn\'t Security',
    question: 'Your form prevents users from submitting empty fields using JavaScript validation. Is your data safe?',
    correctAnswer: 'No — anyone can bypass client-side validation using DevTools or by calling your API directly. You must also validate on the server.',
    distractors: [
      'Yes — if the form blocks empty submissions, the data is always valid',
      'Yes — React prevents users from manipulating form behavior',
      'Only if you also add a CAPTCHA to prevent bots',
    ],
    explanation:
      'Client-side validation improves UX (instant feedback) but provides zero security. Users can disable JavaScript, modify the DOM, or call your API endpoint directly with any data. Always validate on the server too. This applies to type checks, length limits, and required fields — all must be enforced server-side.',
    misconceptions: ['Treating client-side form validation as a security measure'],
  },
  {
    id: 'vc_sec_6',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'proficient',
    title: 'Input Sanitization',
    question: 'A user submits a form with the name: `<img src=x onerror=alert("hacked")>`. What should your app do?',
    correctAnswer: 'Sanitize the input by stripping or escaping HTML tags before storing or displaying it',
    distractors: [
      'Nothing — modern browsers automatically prevent this',
      'Check if the name contains the word "hacked" and reject it',
      'Store it as-is — the database will handle sanitization',
    ],
    explanation:
      'User input should never be trusted. The example injects an image tag with JavaScript in the onerror handler. Sanitization strips or escapes dangerous characters. Checking for specific words is trivially bypassed. Databases store data as-is — they don\'t sanitize HTML. Browsers help with JSX escaping in React, but raw HTML rendering bypasses that.',
    misconceptions: ['Trusting user input because "the framework handles it"'],
  },
  {
    id: 'vc_sec_7',
    domain: 'vibe-coding',
    tags: ['security', 'launch'],
    difficulty: 'developing',
    title: 'Before Going Public',
    question: 'Your AI-built app works great locally. Before sharing the URL publicly, what\'s the most important thing to check?',
    correctAnswer: 'That API keys are in environment variables (not in client code), database access is restricted, and users can\'t see other users\' data',
    distractors: [
      'That the design looks polished — security can wait until you have users',
      'Nothing — Vercel handles all security automatically',
      'Just make sure it loads fast — performance is the main concern',
    ],
    explanation:
      'Before going public, do a quick security pass: are secrets in environment variables? Does your database have access controls (like Supabase RLS)? Can a user manipulate the URL to see someone else\'s data? AI-generated code often skips these protections. A security breach is much harder to fix after the fact.',
    misconceptions: ['Thinking security can be added later after launch'],
  },
  {
    id: 'vc_sec_8',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'developing',
    title: 'Dependency Vulnerabilities',
    question: 'You run `npm audit` and it reports 5 high-severity vulnerabilities. What does this mean?',
    correctAnswer: 'Some of your project\'s dependencies have known security issues — you should update the affected packages',
    distractors: [
      'Your own code has 5 bugs that npm detected',
      'npm is broken and needs to be reinstalled',
      'These are warnings about code style, not security',
    ],
    explanation:
      'npm audit checks your dependency tree against a database of known vulnerabilities. High-severity means an attacker could exploit those packages. Run `npm audit fix` to auto-update where possible. These are in third-party packages, not your code. npm itself is fine — it\'s reporting on your dependencies.',
    misconceptions: ['Ignoring npm audit warnings because they\'re not in your own code'],
  },

  // ── AI Tool Selection ──
  {
    id: 'vc_aitool_1',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'beginning',
    title: 'Choosing AI Coding Tools',
    question: 'You have an idea for a new web app and want to create it from scratch quickly. Which tool is the best starting point?',
    correctAnswer: 'v0 or Claude Artifacts — they generate full working prototypes you can preview instantly, perfect for exploring ideas',
    distractors: [
      'Claude Code CLI — always start with the terminal for new projects',
      'GitHub Copilot — it writes code as you type, which is fastest',
      'ChatGPT — paste your idea and copy the code it gives you into files manually',
    ],
    explanation:
      'For rapid prototyping, visual tools like v0 or Claude Artifacts let you see results immediately without any setup. Once the idea is validated, move to Claude Code or Cursor for the real codebase. Copilot is great for existing code but doesn\'t generate full apps. Manually copying from ChatGPT is slow and error-prone.',
    misconceptions: ['Using the most powerful tool when a simpler one would be faster'],
  },
  {
    id: 'vc_aitool_2',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'developing',
    title: 'Claude Code vs Cursor',
    question: 'When would you choose Claude Code (CLI) over Cursor (IDE)?',
    correctAnswer: 'When you want the AI to autonomously handle multi-step tasks — exploring code, running tests, making changes, and deploying — without hand-holding each step',
    distractors: [
      'Claude Code is always better because it\'s made by Anthropic',
      'Only use Claude Code if you don\'t have VS Code installed',
      'Cursor is only for Python — Claude Code handles JavaScript',
    ],
    explanation:
      'Claude Code excels at autonomous workflows: it explores your codebase, makes cross-file edits, runs commands, and deploys without hand-holding. Cursor is great for IDE-integrated AI where you code alongside the AI with visual diffs. Both have agent capabilities now, but Claude Code is more autonomous while Cursor keeps you closer to the editor. Many developers use both.',
    misconceptions: ['Thinking one AI tool is always better than the others'],
  },
  {
    id: 'vc_aitool_3',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'proficient',
    title: 'When AI Struggles',
    question: 'Which type of task is AI LEAST reliable at?',
    correctAnswer: 'Complex state machines, precise mathematical algorithms, and anything requiring exact numerical correctness',
    distractors: [
      'Writing CSS and styling components',
      'Generating CRUD operations and boilerplate',
      'Converting designs into React components',
    ],
    explanation:
      'AI excels at pattern-heavy tasks (CRUD, styling, boilerplate, UI from designs) but struggles with precise logic: state machines with many edge cases, complex math, cryptographic code, and algorithms where off-by-one errors matter. For these, AI-generated code needs extra careful review and testing.',
    misconceptions: ['Trusting AI equally for all types of coding tasks'],
  },
  {
    id: 'vc_aitool_4',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'developing',
    title: 'Recognizing AI Hallucinations',
    question: 'Claude suggests using a library called `react-super-tables` that you\'ve never heard of. What should you do?',
    correctAnswer: 'Search npm for the library before installing it — AI sometimes invents package names that don\'t exist or confuses similar packages',
    distractors: [
      'Install it immediately — if Claude suggests it, it must exist',
      'Assume it\'s a new package you haven\'t learned about yet',
      'Ask Claude if it\'s real — it will always correct itself',
    ],
    explanation:
      'AI models can "hallucinate" package names, API methods, and library features. Always verify on npm, GitHub, or official docs before using suggested packages. Installing a non-existent package will fail; worse, a malicious package with that name could exist. Asking the AI to verify doesn\'t help — it may double down on the hallucination.',
    misconceptions: ['Blindly trusting AI-suggested package names without verification'],
  },
  {
    id: 'vc_aitool_5',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'developing',
    title: 'Artifacts vs CLI',
    question: 'When should you use Claude\'s Artifacts (web) instead of Claude Code (CLI)?',
    correctAnswer: 'When you want to quickly prototype a single component or page and see a live preview without setting up a project',
    distractors: [
      'Artifacts are always better because they have a visual preview',
      'CLI is only for DevOps tasks like deployment, not coding',
      'Use Artifacts for backend code and CLI for frontend code',
    ],
    explanation:
      'Artifacts excel at rapid visual prototyping — you see results instantly without git, npm, or any setup. Claude Code is better for real projects with multiple files, existing codebases, and deployment workflows. The choice isn\'t about frontend vs backend — it\'s about prototype vs production.',
    misconceptions: ['Thinking one mode replaces the other entirely'],
  },
  {
    id: 'vc_aitool_6',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'beginning',
    title: 'Matching Tool to Task',
    question: 'You need to build a quick mockup to show your friend an app idea. Tomorrow you\'ll start building for real. Which tools fit each phase?',
    correctAnswer: 'Mockup: v0 or Claude Artifacts (instant visual results). Real build: Claude Code (works with your actual project files and deployment)',
    distractors: [
      'Use Claude Code for both — always use the most powerful tool available',
      'Use Artifacts for both — it can handle full production projects',
      'Use Figma for the mockup and hire a developer for the real build',
    ],
    explanation:
      'Different tools excel at different phases. Scaffolding tools (v0, Artifacts, Lovable) give instant visual results — perfect for validating ideas. CLI tools (Claude Code, Cursor) excel at real projects with multiple files, testing, and deployment. Using the right tool for each phase maximizes your speed at every stage.',
    misconceptions: ['Using one tool for everything instead of matching tools to phases'],
  },
  {
    id: 'vc_aitool_7',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'advanced',
    title: 'Context Window Management',
    question: 'You\'re working with Claude Code on a large project and the conversation is getting very long. What should you do?',
    correctAnswer: 'Use /compact to summarize the conversation so far, or start a new session with relevant context — long conversations degrade response quality',
    distractors: [
      'Keep going — longer conversations always give better context',
      'Copy the entire conversation and paste it into a new chat',
      'Delete older messages manually to free up space',
    ],
    explanation:
      'AI models have context windows (how much text they can consider). As conversations grow, older context gets less attention. /compact in Claude Code summarizes the conversation to free up space while preserving key information. Starting fresh with targeted context can be better than dragging a massive thread forward.',
    misconceptions: ['Thinking longer conversations always mean better AI understanding'],
  },
  {
    id: 'vc_aitool_8',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'advanced',
    title: 'MCP Servers',
    question: 'What is an MCP server in the context of Claude Code?',
    correctAnswer: 'A plugin that gives Claude Code new capabilities — like connecting to databases, APIs, or external tools beyond its built-in features',
    distractors: [
      'A server that runs your Next.js application in production',
      'A special computer at Anthropic that processes your code',
      'A monitoring service that tracks errors in your deployed app',
    ],
    explanation:
      'MCP (Model Context Protocol) servers extend Claude Code\'s capabilities. They let Claude interact with external services: databases, GitHub, Jira, design tools, and more. Think of them as plugins that give AI access to real-world tools. They run locally or remotely but are not Anthropic\'s servers or your app\'s hosting.',
    misconceptions: ['Confusing MCP servers with application hosting or Anthropic infrastructure'],
  },

  // ── Architecture ──
  {
    id: 'vc_arch_1',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'developing',
    title: 'Component Decomposition',
    question: 'Claude generated a single 400-line React component. What\'s the best way to improve it?',
    correctAnswer: 'Break it into smaller, focused components — each handling one piece of the UI (header, form, list, etc.)',
    distractors: [
      'It\'s fine — large components are more efficient because React has fewer components to manage',
      'Split it into 400 separate files, one line each',
      'Convert it to a class component — they handle large files better',
    ],
    explanation:
      'Large components are hard to understand, test, and reuse. Breaking them into smaller pieces (each with a single responsibility) makes code maintainable. Fewer components doesn\'t mean better performance. One-line files are absurd. Class components aren\'t better for organization — the problem is structure, not syntax.',
    misconceptions: ['Thinking fewer, larger components are better for performance'],
  },
  {
    id: 'vc_arch_2',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'proficient',
    title: 'State Management Choices',
    question: 'When should you reach for a state management library like Zustand instead of just using React\'s useState?',
    correctAnswer: 'When multiple unrelated components need to share and update the same state, and prop drilling or Context gets unwieldy',
    distractors: [
      'Always — useState is only for small demos, not real apps',
      'Never — React\'s built-in state is always sufficient',
      'Only when you have more than 100 components',
    ],
    explanation:
      'useState is great for local component state. Context works for data a whole subtree needs. External state libraries shine when many distant components share complex state (like a shopping cart, auth, or multi-step forms). The right choice depends on your sharing pattern, not component count.',
    misconceptions: ['Thinking you always need an external state management library'],
  },
  {
    id: 'vc_arch_3',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'developing',
    title: 'Next.js Folder Structure',
    question: 'In a Next.js App Router project, what belongs in `src/app/` vs `src/components/` vs `src/lib/`?',
    correctAnswer: 'app/ for pages and routes, components/ for reusable UI pieces, lib/ for utility functions and shared logic',
    distractors: [
      'Put everything in app/ — Next.js only reads from that folder',
      'app/ for backend code, components/ for frontend code, lib/ for tests',
      'It doesn\'t matter — organize however you want with no conventions',
    ],
    explanation:
      'This is a common convention: app/ contains route-specific pages (page.tsx, layout.tsx, route.ts), components/ has reusable UI components used across multiple pages, and lib/ holds non-UI utilities (data fetching, helpers, types). Next.js only requires app/ for routing, but the structure helps maintainability.',
    misconceptions: ['Thinking all code must go inside the app/ directory'],
  },
  {
    id: 'vc_arch_4',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'proficient',
    title: 'API Design Basics',
    question: 'You\'re designing a REST API for a blog. What\'s the correct URL pattern for getting a specific post?',
    correctAnswer: 'GET /api/posts/123 — use the resource name (posts) and ID in the URL path',
    distractors: [
      'GET /api/getPost?id=123 — put the action in the URL',
      'POST /api/posts with { action: "get", id: 123 } in the body',
      'GET /api/post/find/123/details — be as descriptive as possible',
    ],
    explanation:
      'REST APIs use resource-based URLs: nouns (posts), not verbs (getPost). The HTTP method indicates the action (GET = read, POST = create, PUT = update, DELETE = delete). IDs go in the path. Putting actions in URLs or using POST for reads violates REST conventions and makes APIs harder to understand.',
    misconceptions: ['Putting action verbs in REST API URLs instead of using HTTP methods'],
  },
  {
    id: 'vc_arch_5',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'advanced',
    title: 'Database Selection',
    question: 'You\'re building a quick prototype that needs to store user profiles and their posts. Which database makes the most sense to start with?',
    correctAnswer: 'A simple relational database (like Supabase/Postgres or PlanetScale/MySQL) — structured data with relationships between users and posts fits naturally',
    distractors: [
      'MongoDB — it\'s the default choice for all modern apps',
      'Redis — it\'s the fastest database available',
      'A spreadsheet — databases are overkill for prototypes',
    ],
    explanation:
      'Relational databases excel at structured data with clear relationships (users have posts, posts have comments). MongoDB is great for unstructured/flexible data but adds complexity for relational data. Redis is an in-memory cache, not a primary database. Spreadsheets don\'t scale and lack proper querying.',
    misconceptions: ['Choosing a database based on popularity rather than data structure fit'],
  },
  {
    id: 'vc_arch_6',
    domain: 'vibe-coding',
    tags: ['architecture', 'shipping'],
    difficulty: 'beginning',
    title: 'Ship Then Improve',
    question: 'You\'ve been building your app for two weeks. It works but the code isn\'t "clean enough" and you want to add three more features before showing anyone. What should you do?',
    correctAnswer: 'Ship it now — a working app in users\' hands teaches you more than another week of polishing. You can always improve after launch.',
    distractors: [
      'Refactor the entire codebase first — clean code is more important than shipping',
      'Add the three features first — users expect a complete product',
      'Wait until a senior developer reviews your code',
    ],
    explanation:
      'The biggest vibe coding trap is endless polishing. Perfect is the enemy of shipped. Real user feedback reveals which features actually matter — often different from what you imagined. Ship the core experience, see how people use it, then improve based on real data. The first version just needs to work.',
    misconceptions: ['Thinking your app needs to be perfect before anyone sees it'],
  },
  {
    id: 'vc_arch_7',
    domain: 'vibe-coding',
    tags: ['architecture', 'concepts'],
    difficulty: 'beginning',
    title: 'Understanding Your Stack',
    question: 'Someone asks "what\'s your tech stack?" for your AI-built Next.js app on Vercel with Supabase. Which answer shows you understand what you built?',
    correctAnswer: '"Next.js for the frontend and API routes, Supabase for the database and auth, deployed on Vercel" — you know what each piece does',
    distractors: [
      '"I used Claude to build it" — the AI tool is your tech stack',
      '"React, JavaScript, HTML, CSS, Node.js, PostgreSQL, Ubuntu, TCP/IP..." — list every technology involved',
      '"I\'m not sure, the AI chose everything" — you don\'t need to know',
    ],
    explanation:
      'Your tech stack is the key technologies you chose and why. You don\'t need to list every sub-dependency, but you should know the major pieces: what serves your pages (Next.js), where data lives (Supabase), and how it reaches users (Vercel). "The AI built it" isn\'t a stack. Listing TCP/IP is too low-level.',
    misconceptions: ['Not knowing what technologies your own app uses'],
  },
  {
    id: 'vc_arch_8',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'developing',
    title: 'Environment-Specific Configs',
    question: 'Your app needs different API URLs for development (localhost:8000) and production (api.myapp.com). How do you handle this?',
    correctAnswer: 'Use environment variables — .env.local for development and set production values in your hosting platform (Vercel, Netlify)',
    distractors: [
      'Use an if statement in your code: if (dev) use localhost, else use production URL',
      'Create two separate copies of your codebase, one for each environment',
      'Always use the production URL, even during development',
    ],
    explanation:
      'Environment variables let the same code run in different environments without changes. Your code reads process.env.API_URL, and each environment sets it differently. Hardcoded if statements are fragile and easy to ship with wrong values. Two codebases doubles maintenance. Using production during dev risks corrupting real data.',
    misconceptions: ['Hardcoding environment-specific values instead of using env variables'],
  },

  // ── Shipping & Deployment ──
  {
    id: 'vc_ship_1',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'beginning',
    title: 'DNS and Domains',
    question: 'You bought myapp.com but it shows "this site can\'t be reached." What\'s missing?',
    correctAnswer: 'DNS records — you need to point your domain to your hosting provider\'s servers (add A or CNAME records)',
    distractors: [
      'The domain needs 48 hours to "warm up" before it works',
      'You need to upload your code directly to the domain registrar',
      'Buying a domain automatically creates a website',
    ],
    explanation:
      'A domain name is just an address — DNS records tell browsers which server to connect to. You set these up at your domain registrar (Namecheap, Google Domains) pointing to your hosting (Vercel, Netlify). DNS propagation can take time, but the records must be configured first. Buying a domain doesn\'t host a site.',
    misconceptions: ['Thinking buying a domain automatically creates a working website'],
  },
  {
    id: 'vc_ship_2',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'developing',
    title: 'Preview Deployments',
    question: 'Vercel creates a unique URL for every git push. What is this useful for?',
    correctAnswer: 'Preview deployments let you test and share changes before they go live — each branch/PR gets its own URL',
    distractors: [
      'They\'re old versions that should be deleted for security',
      'They replace your production site every time you push',
      'They\'re only visible to Vercel employees for debugging',
    ],
    explanation:
      'Preview deployments are one of the best features of modern hosting. Every push gets a unique URL you can share with teammates, clients, or testers. They don\'t affect production. When the PR merges, the main deployment updates. This workflow catches issues before they reach users.',
    misconceptions: ['Not using preview deployments for review before merging'],
  },
  {
    id: 'vc_ship_3',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'developing',
    title: 'Environment Variables in Production',
    question: 'Your app works locally but crashes in production with "undefined API key." What happened?',
    correctAnswer: 'You set the API key in your local .env file but forgot to add it to your hosting platform\'s environment variables',
    distractors: [
      '.env files are automatically uploaded during deployment',
      'The API key expired because production is a different environment',
      'Production servers can\'t read environment variables',
    ],
    explanation:
      '.env files are gitignored (never deployed). Each environment needs its own variable configuration. In Vercel, you set them in the project settings. This is a very common "it works locally" bug. The key didn\'t expire — it was never set. Production servers absolutely support environment variables.',
    misconceptions: ['Assuming .env files are automatically deployed with your code'],
  },
  {
    id: 'vc_ship_4',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'proficient',
    title: 'Monitoring and Error Tracking',
    question: 'Your deployed app has users, but you have no idea if they\'re encountering errors. What should you set up?',
    correctAnswer: 'An error tracking service like Sentry that captures runtime errors, shows stack traces, and alerts you when things break',
    distractors: [
      'Check the browser console of every user remotely',
      'Ask users to email you screenshots when something breaks',
      'If no one complains, there are no errors',
    ],
    explanation:
      'Error tracking services automatically capture unhandled errors in production, including context (browser, URL, user actions). You can\'t access users\' consoles, and most users don\'t report bugs — they just leave. Services like Sentry, LogRocket, and Datadog give you visibility into real-world issues.',
    misconceptions: ['Thinking no complaints means no errors'],
  },
  {
    id: 'vc_ship_5',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'developing',
    title: 'Performance Basics (Lighthouse)',
    question: 'You run Lighthouse on your deployed site and get a performance score of 45/100. What should you check first?',
    correctAnswer: 'Image sizes and unoptimized assets — large images are the most common cause of poor Lighthouse scores',
    distractors: [
      'Your JavaScript variable names — shorter names load faster',
      'The color scheme — dark mode is faster than light mode',
      'Your hosting provider — switch to a faster server immediately',
    ],
    explanation:
      'Lighthouse measures real performance metrics (load time, interactivity, visual stability). Large unoptimized images are the #1 culprit for bad scores. Other common fixes: lazy loading, code splitting, and using Next.js Image. Variable names don\'t affect bundle size meaningfully. Colors don\'t affect performance. Server speed matters, but assets matter more.',
    misconceptions: ['Blaming the server when unoptimized assets are the real bottleneck'],
  },
  {
    id: 'vc_ship_6',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'beginning',
    title: 'SEO Fundamentals',
    question: 'You built a beautiful portfolio site but it doesn\'t show up in Google search results. What\'s the most likely issue?',
    correctAnswer: 'Missing metadata — your pages need proper title tags, descriptions, and Open Graph tags for search engines to index them correctly',
    distractors: [
      'You need to pay Google to list your site',
      'Single-page apps can\'t appear in search results',
      'Google only indexes sites with more than 100 pages',
    ],
    explanation:
      'Search engines need metadata (title, description, canonical URL) to understand and rank your pages. Next.js makes this easy with the metadata export. You don\'t pay for organic search results. SPAs with server-side rendering (like Next.js) are indexable. Google indexes sites of all sizes, including single-page sites.',
    misconceptions: ['Thinking SEO requires paying Google or having a large site'],
  },
  {
    id: 'vc_ship_7',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'proficient',
    title: 'Analytics Setup',
    question: 'You want to know which features of your app users actually use. What\'s the best approach?',
    correctAnswer: 'Add analytics (like Vercel Analytics, PostHog, or Plausible) to track page views and key user actions (clicks, form submissions)',
    distractors: [
      'Watch users over their shoulder to see how they use the app',
      'Count the number of API requests in your server logs',
      'Ask every user to fill out a survey after each session',
    ],
    explanation:
      'Analytics tools automatically track user behavior at scale: which pages are visited, which buttons are clicked, where users drop off. Server logs show API requests but not user interactions. Surveys have low response rates and recall bias. Modern analytics tools are privacy-respecting and easy to add.',
    misconceptions: ['Relying on manual observation or surveys instead of automated analytics'],
  },
  {
    id: 'vc_ship_8',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'proficient',
    title: 'Rollback Strategies',
    question: 'You deployed a new version but it has a critical bug. Users are affected right now. What\'s the fastest fix?',
    correctAnswer: 'Roll back to the previous deployment — platforms like Vercel let you instantly revert to the last working version',
    distractors: [
      'Fix the bug locally, test it, and deploy a new version (this could take hours)',
      'Take the site down completely while you fix the bug',
      'Email all users and ask them to clear their cache',
    ],
    explanation:
      'Rollback is the fastest way to stop user impact. Vercel, Netlify, and most platforms keep previous deployments and let you revert in seconds. Then you can calmly fix the bug and redeploy. Taking the site down is worse than rolling back. Fixing forward is slower. Cache clearing doesn\'t fix server-side bugs.',
    misconceptions: ['Trying to fix forward under pressure instead of rolling back first'],
  },
  // ── Claude Code Power Features (2026) ──
  {
    id: 'vc_tool_13',
    domain: 'vibe-coding',
    tags: ['tooling'],
    difficulty: 'developing',
    title: 'Claude Code Hooks',
    question: 'You want to automatically run your linter every time Claude Code edits a file. Which hook event should you use?',
    correctAnswer: 'PostToolUse — it fires after the edit so your linter checks the changed file',
    distractors: [
      'PreToolUse — it fires before the edit so you can check the code first',
      'Notification — it fires whenever Claude sends a message',
      'Stop — it fires when Claude finishes the entire task',
    ],
    explanation:
      'PostToolUse fires after a tool runs successfully — the file has already been changed, so your linter can check the new code. PreToolUse fires before the action and is used for blocking/approving operations (like a security gate). The two hooks have fundamentally different purposes: Pre = gatekeeper, Post = reactor.',
    misconceptions: ['Confusing PreToolUse (gatekeeper) with PostToolUse (reactor)'],
  },
  {
    id: 'vc_tool_14',
    domain: 'vibe-coding',
    tags: ['tooling'],
    difficulty: 'proficient',
    title: 'Hook Security Gates',
    question: 'Your team wants to prevent Claude Code from ever running destructive shell commands like `rm -rf`. Which approach actually enforces this?',
    correctAnswer: 'A PreToolUse hook on Bash that checks the command and exits with code 1 to block it',
    distractors: [
      'A PostToolUse hook that reverts any destructive commands after they run',
      'A CLAUDE.md instruction that says "never run rm -rf"',
      'A Notification hook that alerts the team when a dangerous command runs',
    ],
    explanation:
      'PreToolUse hooks can block tool execution (exit code 1 = deny). This is the only way to programmatically prevent actions. PostToolUse fires after — too late. CLAUDE.md instructions are advisory, not enforced. Notification hooks just alert. If you need a hard guarantee, hooks are the mechanism.',
    misconceptions: ['Thinking CLAUDE.md instructions are enforced rather than advisory'],
  },
  {
    id: 'vc_tool_15',
    domain: 'vibe-coding',
    tags: ['tooling'],
    difficulty: 'proficient',
    title: 'Multi-Agent Teams',
    question: 'You\'re refactoring a large codebase — updating the API, frontend components, and tests simultaneously. What\'s the best Claude Code approach?',
    correctAnswer: 'Spawn a team with agents in separate worktrees — one for API, one for frontend, one for tests — coordinating through a shared task list',
    distractors: [
      'Do each part sequentially in one conversation to maintain full context',
      'Open three separate Claude Code sessions and manually copy changes between them',
      'Use /compact after each section to fit everything in one context window',
    ],
    explanation:
      'Claude Code multi-agent teams let agents work in parallel in isolated worktrees (separate branches) with a shared task list for coordination. Each agent gets its own context window, preventing conflicts. This is faster than sequential work and avoids the manual coordination headaches of separate sessions.',
    misconceptions: ['Thinking everything must happen in a single sequential conversation'],
  },
  {
    id: 'vc_tool_16',
    domain: 'vibe-coding',
    tags: ['tooling'],
    difficulty: 'developing',
    title: 'Subagent Context Isolation',
    question: 'You ask Claude Code to investigate a bug, but it reads 30+ files and your context window is filling up fast. What should you have done differently?',
    correctAnswer: 'Delegate the investigation to a subagent — it explores in its own context window and reports back a summary',
    distractors: [
      'Run /compact after every 5 files to keep the context small',
      'Tell Claude to only read 3 files at a time',
      'Start a new session and paste the bug description again',
    ],
    explanation:
      'Subagents get their own context window. They can explore dozens of files without filling your main conversation. When done, they return a concise summary. This is the primary strategy for keeping your main context clean during research-heavy tasks — delegate the exploration, keep the results.',
    misconceptions: ['Not knowing about subagent context isolation'],
  },
  // ── CLAUDE.md & Skills ──
  {
    id: 'vc_prompt_13',
    domain: 'vibe-coding',
    tags: ['prompt-engineering'],
    difficulty: 'developing',
    title: 'CLAUDE.md Hierarchy',
    question: 'Your team has shared coding standards, but you personally prefer different formatting. Where should each instruction go?',
    correctAnswer: 'Team standards in CLAUDE.md (checked into git), personal preferences in CLAUDE.local.md (gitignored)',
    distractors: [
      'Both in CLAUDE.md — it handles conflicts automatically',
      'Team standards in package.json, personal preferences in .env',
      'Team standards in CLAUDE.md, personal preferences in ~/.claude/settings.json',
    ],
    explanation:
      'CLAUDE.md is version-controlled and shared with the team — perfect for project conventions. CLAUDE.local.md is gitignored and overrides CLAUDE.md for personal preferences. This mirrors how .env and .env.local work. Settings.json controls Claude Code behavior (permissions, model), not coding style instructions.',
    misconceptions: ['Not knowing about the .local.md override pattern'],
  },
  {
    id: 'vc_prompt_14',
    domain: 'vibe-coding',
    tags: ['prompt-engineering'],
    difficulty: 'proficient',
    title: 'Custom Skills',
    question: 'You find yourself repeating the same complex deployment process every time. What\'s the best way to teach Claude Code your workflow?',
    correctAnswer: 'Create a skill in .claude/skills/ with a SKILL.md that describes when to trigger and the step-by-step process',
    distractors: [
      'Add all the deployment steps to CLAUDE.md so Claude always knows them',
      'Create a bash script and tell Claude to run it',
      'Save the conversation and load it next time with /resume',
    ],
    explanation:
      'Skills in .claude/skills/ are loaded on-demand based on their description — they don\'t bloat every conversation like CLAUDE.md would. The SKILL.md frontmatter specifies when the skill should activate automatically. A bash script handles simple commands but can\'t handle the nuanced decision-making a skill provides.',
    misconceptions: ['Putting everything in CLAUDE.md instead of using skills for specialized workflows'],
  },
  // ── Context Management ──
  {
    id: 'vc_tool_17',
    domain: 'vibe-coding',
    tags: ['tooling'],
    difficulty: 'developing',
    title: 'Context Window Management',
    question: 'You\'re deep into a coding session and Claude\'s responses are getting slower and less focused. The context indicator shows 75% full. What should you do?',
    correctAnswer: 'Run /compact to summarize the conversation while preserving key decisions, modified files, and current task state',
    distractors: [
      'Start a completely new session and re-explain everything from scratch',
      'Keep going — Claude handles long contexts just as well',
      'Delete old messages manually to free up space',
    ],
    explanation:
      '/compact summarizes the conversation, typically reducing context by 60-70% while preserving critical information: what files were changed, what was decided, and what\'s still in progress. Starting fresh loses all context. Ignoring the problem causes degraded performance. You can\'t manually delete messages.',
    misconceptions: ['Thinking you need to start over when context gets long'],
  },
  {
    id: 'vc_tool_18',
    domain: 'vibe-coding',
    tags: ['tooling'],
    difficulty: 'proficient',
    title: 'Session Handoffs',
    question: 'You need to stop working on a complex feature but want another dev (or future you) to continue seamlessly with Claude Code. What\'s the best practice?',
    correctAnswer: 'Save a handoff document to .claude/handoffs/ describing what was done, current state, and next steps',
    distractors: [
      'Leave the terminal open so they can scroll up and read your conversation',
      'Write a detailed commit message explaining everything',
      'Trust that CLAUDE.md has enough context for anyone to continue',
    ],
    explanation:
      'Handoff documents capture session-specific context — what was accomplished, where things stand, and what comes next. Terminal history is ephemeral and won\'t survive a new session. Commit messages describe what changed in code, not the broader task state. CLAUDE.md has project-level instructions, not session-level context.',
    misconceptions: ['Thinking project-level docs capture session-level state'],
  },
  // ── Model Selection (2026) ──
  {
    id: 'vc_aitool_9',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'developing',
    title: 'Opus vs Sonnet in 2026',
    question: 'Claude Sonnet 4.6 scores within 1-2% of Opus 4.6 on most coding benchmarks but costs 40% less. When should you still choose Opus?',
    correctAnswer: 'Complex multi-step reasoning, multi-agent coordination, or tasks requiring deep architectural thinking',
    distractors: [
      'Always — Opus is strictly better at everything',
      'Never — Sonnet 4.6 matches Opus on all tasks',
      'Only for non-coding tasks like writing and analysis',
    ],
    explanation:
      'Sonnet 4.6 is near-Opus quality for straightforward coding. But Opus 4.6 significantly outperforms on complex reasoning and multi-agent coordination. Sonnet is the daily driver for 90%+ of tasks; reach for Opus when the problem is genuinely hard or requires coordinating multiple agents.',
    misconceptions: ['Thinking more expensive always means better for every task'],
  },
  {
    id: 'vc_aitool_10',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'beginning',
    title: 'Scaffolding vs CLI Tools',
    question: 'You want to go from zero to a working prototype with a polished UI as fast as possible. No complex backend logic. Which approach fits best?',
    correctAnswer: 'v0 or Lovable — they generate complete, polished UIs from a description and deploy instantly',
    distractors: [
      'Claude Code — it\'s the most powerful AI coding tool',
      'VS Code with Copilot — it\'s the industry standard',
      'Write it by hand — AI tools produce low-quality prototypes',
    ],
    explanation:
      'v0 (Vercel) and Lovable excel at rapid UI prototyping — describe what you want and get a deployable React app in minutes. Claude Code is more powerful for complex projects with existing codebases, but has a higher learning curve. Match the tool to the task: scaffolding tools for quick prototypes, Claude Code for deep work.',
    misconceptions: ['Always reaching for the most powerful tool when a simpler one is faster'],
  },
  {
    id: 'vc_aitool_11',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'developing',
    title: 'Claude Code\'s Superpower',
    question: 'Which scenario is Claude Code (CLI) best suited for compared to browser-based tools like v0 or Bolt?',
    correctAnswer: 'Working on an existing codebase with 50+ files where you need to understand and modify the project structure',
    distractors: [
      'Building a simple landing page from scratch',
      'Generating a single React component to paste into your project',
      'Creating a quick demo to show a client',
    ],
    explanation:
      'Claude Code\'s superpower is working with existing codebases — it can read files, understand project structure, run tests, and make targeted changes across many files. Browser-based tools are better for greenfield projects and quick prototypes. Claude Code shines when you need deep understanding of what\'s already there.',
    misconceptions: ['Using browser-based tools for complex existing codebases, or Claude Code for simple prototypes'],
  },
  // ── MCP (Model Context Protocol) ──
  {
    id: 'vc_tool_19',
    domain: 'vibe-coding',
    tags: ['tooling'],
    difficulty: 'developing',
    title: 'Why MCP Exists',
    question: 'The MCP ecosystem has 1,800+ servers. What fundamental problem does Model Context Protocol solve?',
    correctAnswer: 'The N×M integration problem — instead of every AI app building custom connectors for every service, each side implements the protocol once',
    distractors: [
      'It makes AI models run faster by caching responses locally',
      'It provides a standard way to fine-tune models on private data',
      'It encrypts communication between AI models and databases',
    ],
    explanation:
      'Without MCP, 10 AI apps connecting to 10 services requires 100 custom integrations. With MCP, each AI app implements one client and each service implements one server — 20 implementations total. Originally created by Anthropic in 2024, it\'s now adopted by OpenAI, Google, and most AI tooling companies.',
    misconceptions: ['Thinking MCP is about model performance rather than tool integration'],
  },
  {
    id: 'vc_tool_20',
    domain: 'vibe-coding',
    tags: ['tooling'],
    difficulty: 'proficient',
    title: 'MCP Resources vs Tools',
    question: 'In MCP, what\'s the difference between a Resource and a Tool?',
    correctAnswer: 'Resources are read-only data retrieval with no side effects; Tools can perform actions that change state',
    distractors: [
      'Resources are for local files; Tools are for remote APIs',
      'Resources are faster; Tools are more powerful',
      'Resources run in the browser; Tools run on the server',
    ],
    explanation:
      'MCP distinguishes between Resources (safe, read-only data access) and Tools (actions that can modify state). This separation lets AI hosts make smarter decisions about what to auto-approve vs what needs user confirmation. Reading a database = Resource. Inserting a row = Tool.',
    misconceptions: ['Thinking the distinction is about location or performance rather than side effects'],
  },
  // ── Supabase & Security ──
  {
    id: 'vc_sec_9',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'developing',
    title: 'Supabase RLS Trap',
    question: 'You create a new Supabase table and start storing user data. A week later, you discover anyone can read all records through the API. What went wrong?',
    correctAnswer: 'New tables have Row Level Security disabled by default — you forgot to enable it and add access policies',
    distractors: [
      'Your Supabase project is on the free tier which doesn\'t support security',
      'You used the anon key instead of the service_role key',
      'The table needs to be moved to a "private" schema',
    ],
    explanation:
      'This is the #1 Supabase security mistake. New tables have RLS off by default, meaning anyone with the API URL and anon key can read/write everything. You must enable RLS AND create policies defining who can do what. Just enabling RLS without policies blocks everyone (returns empty results) — you need both steps.',
    misconceptions: ['Thinking RLS is enabled by default on new tables'],
  },
  {
    id: 'vc_sec_10',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'proficient',
    title: 'Supabase Key Management',
    question: 'Your Supabase project has two keys: anon and service_role. Where should each be used?',
    correctAnswer: 'anon key in the frontend (it respects RLS policies); service_role key only in server-side code (it bypasses ALL security)',
    distractors: [
      'anon key for read operations, service_role for write operations',
      'anon key for development, service_role for production',
      'Either key works — they just have different rate limits',
    ],
    explanation:
      'The anon key is safe to expose in frontend code because RLS policies control what it can access. The service_role key bypasses ALL security policies — it\'s "god mode" and must never appear in client-side code. If someone finds it in your JavaScript bundle, they get unrestricted access to your entire database.',
    misconceptions: ['Thinking service_role is just the "production" key or has better rate limits'],
  },
  // ── Next.js 16 ──
  {
    id: 'vc_web_11',
    domain: 'vibe-coding',
    tags: ['nextjs'],
    difficulty: 'developing',
    title: 'Next.js 16 Caching',
    question: 'In Next.js 14, data was cached by default and developers struggled with stale data. What changed in Next.js 16?',
    correctAnswer: 'Caching is now opt-in — nothing is cached unless you explicitly add "use cache" to a page, component, or function',
    distractors: [
      'Next.js 16 removed caching entirely',
      'You need to add revalidate: 0 to every fetch call to disable caching',
      'Caching works the same but has better defaults',
    ],
    explanation:
      'Next.js 16 flipped the default: everything is dynamic (uncached) unless you opt in with the "use cache" directive. This fixed the biggest complaint about Next.js 14 — surprising stale data. If you see stale data in Next.js 16, look for a "use cache" directive and either remove it or set a shorter revalidation.',
    misconceptions: ['Assuming Next.js caching behavior is the same across versions'],
  },
  {
    id: 'vc_web_12',
    domain: 'vibe-coding',
    tags: ['nextjs', 'server-components'],
    difficulty: 'proficient',
    title: 'Server Components for Data',
    question: 'You need to fetch data from your database and display it. In Next.js App Router, what\'s the simplest approach?',
    correctAnswer: 'Fetch directly in a Server Component (the default) — it runs on the server and can access the database without exposing credentials',
    distractors: [
      'Create an API route at /api/data and fetch from it in a Client Component',
      'Use a useEffect hook to fetch data after the page loads',
      'Add "use client" and use a data fetching library like SWR',
    ],
    explanation:
      'Server Components are the default in App Router and run only on the server. They can directly query databases, read files, and use secrets without exposing anything to the browser — no API route needed. Client Components ("use client") are for interactivity (useState, onClick). Creating API routes just to fetch data in your own app is unnecessary overhead.',
    misconceptions: ['Creating API routes for data your own Server Components could fetch directly'],
  },
  // ── Vercel AI SDK ──
  {
    id: 'vc_arch_9',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'developing',
    title: 'Streaming AI Responses',
    question: 'You\'re building a chat UI where AI responses appear word-by-word. Using the Vercel AI SDK, which pattern accomplishes this?',
    correctAnswer: 'streamText() on the server paired with useChat() on the client',
    distractors: [
      'generateText() with a setTimeout to reveal words gradually',
      'fetch() with response.json() and a CSS typing animation',
      'generateObject() with a streaming option set to true',
    ],
    explanation:
      'The Vercel AI SDK\'s streamText() sends tokens as they\'re generated from the model, and useChat() is a React hook that manages the streaming state on the client. This gives real streaming. generateText() waits for the full response before returning — faking it with animations is a poor substitute for actual token streaming.',
    misconceptions: ['Faking streaming with animations over a completed response'],
  },
  // ── Common Beginner Mistakes ──
  {
    id: 'vc_debug_11',
    domain: 'vibe-coding',
    tags: ['debugging'],
    difficulty: 'beginning',
    title: 'The Hard-Coded Data Trap',
    question: 'You built an app with AI and it looks great — the product list shows 10 items. But when you add products to the database, nothing changes on the site. What likely happened?',
    correctAnswer: 'The AI hard-coded the product data directly in the component instead of fetching it from the database',
    distractors: [
      'The database needs to be restarted to pick up new records',
      'You need to redeploy the app every time data changes',
      'The browser is caching the old page and needs a hard refresh',
    ],
    explanation:
      'This is one of the most common vibe coding traps. AI tools often generate impressive-looking UIs with hard-coded data arrays right in the component — it looks functional but isn\'t connected to anything real. Always verify that displayed data comes from actual API calls or database queries, not const arrays in the source.',
    misconceptions: ['Assuming an app that displays data is actually connected to a live data source'],
  },
  {
    id: 'vc_sec_11',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'beginning',
    title: 'AI Code Security Review',
    question: 'Studies show AI-generated code has 2-3x higher rates of security vulnerabilities. What\'s the best defense?',
    correctAnswer: 'Review AI-generated code before shipping — especially authentication, database queries, and user input handling',
    distractors: [
      'Use a more expensive AI model — they produce more secure code',
      'Add a disclaimer that your app was built with AI',
      'Only use AI for frontend code since it can\'t cause security issues there',
    ],
    explanation:
      'AI generates plausible-looking code that may contain SQL injection, XSS, missing auth checks, or exposed secrets. The most critical areas to review: anything touching user input, authentication flows, database queries, and secret management. Frontend code can absolutely have security issues (XSS, exposed API keys in bundles).',
    misconceptions: ['Thinking frontend code is inherently safe from security vulnerabilities'],
  },
  // ── Vibe Coding Philosophy ──
  {
    id: 'vc_prompt_15',
    domain: 'vibe-coding',
    tags: ['prompt-engineering'],
    difficulty: 'developing',
    title: 'Planning Before Prompting',
    question: 'You want to build a full-stack app with auth, a dashboard, and real-time updates. What should you do BEFORE your first prompt?',
    correctAnswer: 'Write a brief plan — what features you need, what the user flow looks like, and what technologies to use',
    distractors: [
      'Just start prompting and iterate — planning slows you down',
      'Ask the AI to plan the entire architecture and follow it exactly',
      'Find a tutorial for a similar app and follow it step by step',
    ],
    explanation:
      'Even in vibe coding, 10 minutes of planning saves hours of rework. A brief plan (not a 50-page spec) clarifies what you\'re building so your prompts have direction. Without it, you end up with a Frankenstein of disconnected features. The plan doesn\'t need to be perfect — just enough to give your session coherence.',
    misconceptions: ['Thinking planning and vibe coding are opposites'],
  },
  {
    id: 'vc_prompt_16',
    domain: 'vibe-coding',
    tags: ['prompt-engineering'],
    difficulty: 'beginning',
    title: 'Origin of Vibe Coding',
    question: 'Who coined the term "vibe coding" and what does it mean?',
    correctAnswer: 'Andrej Karpathy in 2025 — describing what you want to an AI and focusing on the outcome, not the implementation',
    distractors: [
      'Sam Altman in 2024 — using ChatGPT to write code by copying and pasting',
      'A TikTok trend where developers code while listening to lo-fi music',
      'A consulting firm\'s methodology for enterprise AI adoption',
    ],
    explanation:
      'Andrej Karpathy (OpenAI co-founder, ex-Tesla AI lead) coined "vibe coding" in February 2025: "fully give in to the vibes, embrace exponentials, and forget that the code even exists." It became Collins Dictionary\'s Word of the Year 2025. The core idea: describe what you want, not how to build it.',
    misconceptions: ['Thinking vibe coding is just copy-pasting AI output or using ChatGPT'],
  },
  {
    id: 'vc_prompt_17',
    domain: 'vibe-coding',
    tags: ['prompt-engineering'],
    difficulty: 'proficient',
    title: 'Strategic Ambiguity',
    question: 'You\'re prompting Claude Code to build a dashboard. Which prompt produces the best results?',
    correctAnswer: '"Build a team analytics dashboard. Think Linear meets Notion — clean, data-dense, no wasted space. The metrics a startup CEO checks every morning."',
    distractors: [
      '"Create a dashboard with 4 cards in a 2x2 grid. Card 1: revenue (line chart, blue). Card 2: users (big number). Card 3: table, 5 rows. Card 4: pie chart."',
      '"Make a dashboard"',
      '"Build the best dashboard possible using the latest best practices and modern design patterns"',
    ],
    explanation:
      'Strategic ambiguity gives Claude a clear destination (what and why) while letting it bring its competence to the how. Reference apps paint a taste target. Over-specifying layout limits the AI\'s judgment. Under-specifying gives nothing to work with. Vague superlatives ("best possible") are empty calories — they sound specific but contain no information.',
    misconceptions: ['Confusing strategic ambiguity with vagueness — good prompts are specific about goals, not implementation'],
  },
  {
    id: 'vc_ship_9',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'beginning',
    title: 'Commit Before Deploy',
    question: 'Your app works locally. You deploy to Vercel and it works there too. But your teammate pulls from git and gets errors. What happened?',
    correctAnswer: 'You deployed from local files but didn\'t commit and push — Vercel has your code but git doesn\'t',
    distractors: [
      'Your teammate needs to run npm install first',
      'Vercel uses a different Node.js version than your machine',
      'You need to add your teammate as a Vercel collaborator',
    ],
    explanation:
      'When you deploy with `vercel --prod` locally, Vercel deploys whatever is on disk — even uncommitted changes. Your teammate only has what\'s in git. Always commit and push before (or immediately after) deploying so git and production stay in sync. Otherwise you get "works on Vercel but nobody can reproduce it."',
    misconceptions: ['Thinking a successful deploy means the code is in version control'],
  },
  // ── Vibe Coding Foundations (core mindset) ──
  {
    id: 'vc_prompt_18',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'mindset'],
    difficulty: 'beginning',
    title: 'The Command-Follower Trap',
    question: 'You want Claude to build a settings page. Which prompt gets a better result?',
    correctAnswer: '"Build a settings page for a productivity app. Think Notion or Linear — clean, organized, nothing unnecessary."',
    distractors: [
      '"Create a settings page with these exact sections: 1. Profile (name, email, avatar). 2. Notifications (3 toggles). 3. Theme (light/dark radio). Use a sidebar layout with 12px gaps."',
      '"Make a settings page"',
      '"Build a settings page using best practices and modern design patterns"',
    ],
    explanation:
      'Over-specifying turns the AI into a typist — it follows your commands exactly but doesn\'t think. It won\'t add smart features you didn\'t list, won\'t consider edge cases you missed, and won\'t bring design judgment. Giving a clear destination with taste references lets the AI bring its full competence. You direct, the AI builds.',
    misconceptions: ['Treating AI as a typist that needs line-by-line instructions instead of a collaborator that can think'],
  },
  {
    id: 'vc_prompt_19',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'research'],
    difficulty: 'beginning',
    title: 'Research-First Prompting',
    question: 'You\'re building your first landing page. Which prompt approach leads to the best design?',
    correctAnswer: '"Research how Stripe, Linear, and Notion handle their landing pages. Then build something that captures that level of quality for my [app description]."',
    distractors: [
      '"Build a landing page with a hero section, features grid, testimonials, and a CTA button"',
      '"Make the best landing page possible"',
      '"Copy Stripe\'s landing page but change the colors and text"',
    ],
    explanation:
      'Asking the AI to research real examples first gives it concrete taste targets. The AI studies what makes those pages great and synthesizes the best patterns into something original. Listing sections gives you a generic layout. "Best possible" gives no direction. Copying a specific site produces a knock-off, not an original.',
    misconceptions: ['Listing layout sections instead of pointing at quality targets'],
  },
  {
    id: 'vc_prompt_20',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'ambition'],
    difficulty: 'beginning',
    title: 'Don\'t Limit the AI',
    question: 'You\'ve never coded before but want to build a recipe app. What should your first prompt be?',
    correctAnswer: '"Build a recipe app where I can save recipes, search by ingredient, and share with friends. Think Pinterest meets Notion. Beautiful, fast, and fun to use."',
    distractors: [
      '"I\'m a beginner, so let\'s start small — just make a text field where I can type a recipe name"',
      '"Can AI even build a real app? Just show me what\'s possible first"',
      '"Build a recipe app but keep it simple because I\'m new to this"',
    ],
    explanation:
      'AI doesn\'t need you to be modest. It handles the same complexity whether you\'re a beginner or an expert — building a great app isn\'t harder for it than building a minimal one. Starting with an ambitious, complete vision gives the AI room to build something impressive. You can always scale back. Starting too small means endless incremental prompting to get where you could have started.',
    misconceptions: ['Limiting your ambition because you think beginners should start small with AI'],
  },
  {
    id: 'vc_tool_21',
    domain: 'vibe-coding',
    tags: ['tooling', 'context'],
    difficulty: 'developing',
    title: 'Context Rot',
    question: 'You\'ve been iterating with Claude for 30 minutes. It keeps building things that don\'t match your original vision — adding features you didn\'t ask for and forgetting earlier decisions. What\'s happening?',
    correctAnswer: 'Context rot — after many back-and-forth messages, the AI loses track of the original intent. Re-state your core vision clearly or start a focused new session.',
    distractors: [
      'The AI is getting tired and needs a break',
      'Your original idea was bad and the AI is improving on it',
      'This is normal — AI always drifts over time and you can\'t prevent it',
    ],
    explanation:
      'Context rot happens when lengthy conversations bury the original intent under layers of iteration. The AI weighs recent messages more heavily, so your early vision fades. The fix: periodically re-state what you\'re building and why, use /compact to clean up, or start a fresh session with a clear brief. The AI isn\'t tired or rebellious — it\'s lost in noise.',
    misconceptions: ['Thinking the AI is deliberately ignoring your vision when it\'s actually lost in conversation noise'],
  },
  {
    id: 'vc_prompt_21',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'mindset'],
    difficulty: 'developing',
    title: 'Why Prescriptive Prompts Backfire',
    question: 'A developer writes extremely detailed prompts specifying every import, variable name, and line of code — treating the AI like a typist. What\'s the problem?',
    correctAnswer: 'The AI can\'t bring its own judgment, pattern recognition, or creativity — you\'re doing all the thinking and using AI as a keyboard',
    distractors: [
      'Nothing — detailed prompts always produce the best code',
      'The AI will refuse to follow such specific instructions',
      'The code will run slower because the AI didn\'t optimize it',
    ],
    explanation:
      'When you dictate every line, you cap the output at your own knowledge. The AI knows patterns, best practices, and edge cases you might miss — but only if you give it room to think. Strategic ambiguity (describing the what and why, not the how) lets the AI\'s competence complement yours. Over-prescription creates an expensive autocomplete, not a collaborator.',
    misconceptions: ['Thinking more detailed instructions always produce better AI output'],
  },
  {
    id: 'vc_read_13',
    domain: 'vibe-coding',
    tags: ['reading-code', 'evaluation'],
    difficulty: 'beginning',
    title: 'Let the AI Surprise You',
    question: 'Claude built your app but added a dark mode toggle and keyboard shortcuts you didn\'t ask for. What should you do?',
    correctAnswer: 'Evaluate them on their merits — the AI brought its knowledge of good UX patterns. Keep what improves the app, remove what doesn\'t fit.',
    distractors: [
      'Remove everything you didn\'t explicitly ask for — it should only build what you requested',
      'This is a bug — the AI shouldn\'t add unrequested features',
      'Accept everything — the AI always knows better than you',
    ],
    explanation:
      'Good AI-generated features are like suggestions from a skilled collaborator. The AI knows common UX patterns and may add them when they genuinely improve the product. Your job is to curate: does this fit the vision? Is it well-executed? You\'re the creative director, not a task manager issuing orders. But blind acceptance is just as bad as blind rejection.',
    misconceptions: ['Treating unrequested AI additions as bugs instead of evaluating them as suggestions'],
  },
];

// ── Combined & utility functions ─────────────────────────────────────

export const sampleQuestions: QuizItem[] = vibecodingQuestions;

export const allQuestions: QuizItem[] = [...vibecodingQuestions, ...mathQuestions];

export function getQuestionsByDomain(domain: string): QuizItem[] {
  return allQuestions.filter((q) => q.domain === domain);
}

export function getQuestionsByTag(tag: string): QuizItem[] {
  return allQuestions.filter((q) => q.tags.includes(tag));
}

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function buildQuizOptions(item: QuizItem): {
  options: string[];
  correctIndex: number;
} {
  const correctAnswer = String(item.correctAnswer);
  const distractors = item.distractors.map(String).slice(0, 3);

  while (distractors.length < 3) {
    distractors.push(`Option ${distractors.length + 2}`);
  }

  const allOptions = [correctAnswer, ...distractors];
  const shuffled = shuffleArray(allOptions);
  const correctIndex = shuffled.indexOf(correctAnswer);

  return { options: shuffled, correctIndex };
}

// ── Topic mapping for cross-topic assessment ────────────────────────

export const TOPIC_TAGS: Record<string, { label: string; tags: string[]; color: string }> = {
  'prompt-engineering': { label: 'Prompt Engineering', tags: ['prompt-engineering'], color: 'amber' },
  'reading-code': { label: 'Reading AI Code', tags: ['reading-code'], color: 'blue' },
  'tooling': { label: 'Dev Tooling', tags: ['tooling'], color: 'emerald' },
  'web': { label: 'Web Fundamentals', tags: ['react', 'nextjs', 'tailwind', 'deployment', 'css', 'server-components', 'responsive', 'api', 'forms', 'performance'], color: 'red' },
  'debugging': { label: 'Debugging with AI', tags: ['debugging'], color: 'indigo' },
  'testing': { label: 'Testing & Quality', tags: ['testing'], color: 'cyan' },
  'security': { label: 'Security', tags: ['security'], color: 'rose' },
  'ai-tool-selection': { label: 'AI Tool Selection', tags: ['ai-tool-selection'], color: 'purple' },
  'architecture': { label: 'Architecture', tags: ['architecture'], color: 'orange' },
  'shipping-deploy': { label: 'Shipping & Deploy', tags: ['shipping-deploy'], color: 'teal' },
};

/**
 * Maps quiz topics to related concept IDs from src/data/concepts.ts.
 * Used to show concept remediation links when questions are answered wrong.
 */
export const TOPIC_CONCEPTS: Record<string, string[]> = {
  'prompt-engineering': ['knowing-what-you-want', 'the-director', 'encourage-the-machine'],
  'reading-code': ['comprehension-debt', 'junior-dev'],
  'tooling': ['scaffold-before-walls', 'commit-save-button', 'context-engineering'],
  'web': ['build-to-learn', 'layer-cake'],
  'debugging': ['context-rot', 'fresh-eyes', 'verification-gap'],
  'testing': ['verification-gap', 'security-blindspot'],
  'security': ['security-blindspot', 'verification-gap'],
  'ai-tool-selection': ['orchestrator-shift', 'the-director'],
  'architecture': ['layer-cake', 'spec-is-anchor', 'plan-before-code'],
  'shipping-deploy': ['commit-save-button', 'pareto-paradox'],
};

/** Returns concept IDs related to a question based on its topic */
export function getConceptsForQuestion(tags: string[]): string[] {
  const topic = getPrimaryTopic(tags);
  return TOPIC_CONCEPTS[topic] || [];
}

/** Returns the topic ID for a question based on its tags, or 'unknown' */
export function getPrimaryTopic(tags: string[]): string {
  for (const [topicId, topic] of Object.entries(TOPIC_TAGS)) {
    if (tags.some((tag) => topic.tags.includes(tag))) {
      return topicId;
    }
  }
  return 'unknown';
}

/** Select one question per topic for cross-topic assessment */
export function selectCrossTopicQuestions(questions: QuizItem[]): QuizItem[] {
  const topicIds = Object.keys(TOPIC_TAGS);
  const grouped = new Map<string, QuizItem[]>();

  for (const q of questions) {
    const topic = getPrimaryTopic(q.tags);
    if (topic === 'unknown') continue;
    if (!grouped.has(topic)) grouped.set(topic, []);
    grouped.get(topic)!.push(q);
  }

  const selected: QuizItem[] = [];
  for (const topicId of topicIds) {
    const pool = grouped.get(topicId);
    if (pool && pool.length > 0) {
      const shuffled = shuffleArray(pool);
      selected.push(shuffled[0]);
    }
  }

  // If we somehow have fewer than 10 (shouldn't happen), fill randomly
  if (selected.length < 10) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const remaining = shuffleArray(questions.filter((q) => !selectedIds.has(q.id)));
    for (const q of remaining) {
      if (selected.length >= 10) break;
      selected.push(q);
    }
  }

  return shuffleArray(selected);
}
