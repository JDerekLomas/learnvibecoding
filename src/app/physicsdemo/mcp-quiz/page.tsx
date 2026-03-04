'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const INSTALL_CONFIG = `{
  "mcpServers": {
    "physics-quiz": {
      "command": "npx",
      "args": ["-y", "mcq-quiz-server", "--stdio"]
    }
  }
}`;

export default function MCPQuizPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('claude mcp add physics-quiz npx -y mcq-quiz-server --stdio');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="max-w-2xl mx-auto px-6 py-12"
      style={{
        backgroundImage: 'radial-gradient(circle, #e7e5e4 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/physicsdemo"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors mb-6 no-underline"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M10 4l-4 4 4 4" />
          </svg>
          Back to Physics Demo
        </Link>

        <div className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] px-8 py-8 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-[2px] border-stone-900 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-black uppercase tracking-wider mb-4">
            MCP Quiz
          </div>
          <h1 className="text-2xl font-black text-stone-900 mb-3">
            Quiz inside Claude
          </h1>
          <p className="text-stone-500 font-medium leading-relaxed mb-6">
            Take the physics quiz directly inside Claude Code or Claude Desktop.
            Interactive quiz cards appear right in the conversation — no browser tab needed.
            Your answers flow back into the conversation so Claude can adapt.
          </p>

          <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 mb-3">
            How it works
          </h2>
          <ol className="space-y-3 mb-8">
            {[
              'Install the MCP server (one-time setup)',
              'Ask Claude to quiz you on heat and thermal energy',
              'Interactive quiz cards appear in the conversation',
              'Claude sees your answers and adapts the session',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-medium text-stone-600">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-xs font-black flex items-center justify-center border-[1.5px] border-stone-900">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 mb-3">
            Install in Claude Code
          </h2>
          <div className="relative">
            <pre className="bg-stone-900 text-stone-100 rounded-lg border-[2px] border-stone-700 px-4 py-3 text-sm font-mono overflow-x-auto">
              claude mcp add physics-quiz npx -y mcq-quiz-server --stdio
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-2.5 py-1 text-xs font-bold rounded border border-stone-600 text-stone-300 hover:text-white hover:border-stone-400 transition-colors"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <details className="mt-4">
            <summary className="text-sm font-bold text-stone-400 cursor-pointer hover:text-stone-600 transition-colors">
              Claude Desktop config (manual)
            </summary>
            <pre className="mt-2 bg-stone-900 text-stone-100 rounded-lg border-[2px] border-stone-700 px-4 py-3 text-sm font-mono overflow-x-auto">
              {INSTALL_CONFIG}
            </pre>
          </details>
        </div>

        <div className="bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] px-6 py-5">
          <h2 className="text-sm font-black uppercase tracking-wider text-stone-400 mb-3">
            What is MCP?
          </h2>
          <p className="text-sm font-medium text-stone-600 leading-relaxed mb-3">
            Model Context Protocol lets AI assistants use interactive tools.
            Instead of just reading text, Claude can render quiz cards you click on,
            see your results, and respond accordingly — all without leaving the conversation.
          </p>
          <p className="text-sm font-medium text-stone-600 leading-relaxed">
            This is the same physics quiz content available in the{' '}
            <Link href="/physicsdemo/quiz-chat" className="text-cyan-600 underline hover:text-cyan-800 transition-colors">
              AI Quiz
            </Link>
            {' '}and{' '}
            <Link href="/physicsdemo/quiz" className="text-cyan-600 underline hover:text-cyan-800 transition-colors">
              Quiz
            </Link>
            {' '}modes, but delivered through Claude instead of a web page.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
