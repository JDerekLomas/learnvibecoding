"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getData, saveDiscovery } from "@/lib/progress";

const FEELINGS = [
  { id: "proud", label: "Proud" },
  { id: "helpful", label: "Helpful" },
  { id: "playful", label: "Playful" },
  { id: "clever", label: "Clever" },
  { id: "artistic", label: "Artistic" },
  { id: "practical", label: "Practical" },
  { id: "connected", label: "Connected" },
  { id: "calm", label: "Calm" },
];

const AUDIENCES = [
  { id: "me", label: "Just me" },
  { id: "someone", label: "Someone I know" },
  { id: "community", label: "A community" },
  { id: "anyone", label: "Anyone" },
];

const PERSON_CONSTRAINTS = [
  "your mom", "your best friend", "a 5-year-old", "your coworker",
  "your future self", "your neighbor", "someone who's never used a computer",
  "your favorite teacher",
];
const ACTION_CONSTRAINTS = [
  "remember something", "make a decision", "track a habit",
  "celebrate a moment", "organize their stuff", "share something beautiful",
  "learn one new thing a day", "find something they lost",
];
const FORM_CONSTRAINTS = [
  "fits on a single page", "works on a phone screen",
  "has exactly 3 buttons", "uses no text — only images",
  "you'd open every morning", "takes 30 seconds to use",
  "could be printed on paper", "works offline",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateConstraint() {
  return {
    person: pickRandom(PERSON_CONSTRAINTS),
    action: pickRandom(ACTION_CONSTRAINTS),
    form: pickRandom(FORM_CONSTRAINTS),
  };
}

function buildVisionPrompt(
  feelings: string[],
  audience: string,
  constraint: { person: string; action: string; form: string },
  spark: string,
): string {
  const feelingWords = feelings
    .map((f) => FEELINGS.find((ff) => ff.id === f)?.label.toLowerCase())
    .filter(Boolean);

  let prompt = "I want to build something";
  if (feelingWords.length > 0) {
    prompt += ` that feels ${feelingWords.join(" and ")}`;
  }
  prompt += ".";

  if (audience && audience !== "me") {
    const aud = AUDIENCES.find((a) => a.id === audience);
    if (aud) prompt += ` It's for ${aud.label.toLowerCase()}.`;
  }

  if (spark.trim()) {
    prompt += ` Here's what's on my mind: ${spark.trim()}`;
  }

  prompt += `\n\nCreative constraint: help ${constraint.person} ${constraint.action}. It ${constraint.form}.`;
  prompt += "\n\nHelp me think about what this could look like, then let's build it.";

  return prompt;
}

// --- Message types ---

type Message =
  | { from: "bot"; text: string; id: string }
  | { from: "user"; text: string; id: string }
  | { from: "bot-options"; options: Array<{ id: string; label: string }>; multi?: boolean; id: string }
  | { from: "bot-constraint"; constraint: { person: string; action: string; form: string }; id: string }
  | { from: "bot-input"; placeholder: string; id: string }
  | { from: "bot-result"; prompt: string; id: string };

type Step = "greeting" | "feeling" | "audience" | "constraint" | "spark" | "result";

function BotAvatar() {
  return (
    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 dark:from-amber-500 dark:to-rose-500 flex items-center justify-center shrink-0">
      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    </div>
  );
}

function BotBubble({ children, animate }: { children: React.ReactNode; animate?: boolean }) {
  return (
    <div className={`flex gap-2.5 items-start ${animate ? "animate-fade-in" : ""}`}>
      <BotAvatar />
      <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5">
        {children}
      </div>
    </div>
  );
}

function UserBubble({ children, animate }: { children: React.ReactNode; animate?: boolean }) {
  return (
    <div className={`flex justify-end ${animate ? "animate-fade-in" : ""}`}>
      <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-amber-500 dark:bg-amber-600 px-4 py-2.5">
        <p className="text-sm text-white">{children}</p>
      </div>
    </div>
  );
}

export default function DesireEngine({ id = "desire-engine" }: { id?: string }) {
  const [step, setStep] = useState<Step>("greeting");
  const [feelings, setFeelings] = useState<string[]>([]);
  const [audience, setAudience] = useState("");
  const [constraint, setConstraint] = useState(generateConstraint);
  const [spark, setSpark] = useState("");
  const [sparkSubmitted, setSparkSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }, []);

  // Start the conversation
  function handleStart() {
    setStarted(true);
    setStep("feeling");
    setMessages([
      { from: "bot", text: "Let's figure out what you want to build.", id: "greet-1" },
      { from: "bot", text: "When you imagine showing someone what you made, how do you want to feel? Pick one or two.", id: "greet-2" },
      { from: "bot-options", options: FEELINGS, multi: true, id: "feeling-opts" },
    ]);
  }

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  // --- Handlers for each step ---

  function handleFeelingSelect(fId: string) {
    setFeelings((prev) => {
      const next = prev.includes(fId)
        ? prev.filter((f) => f !== fId)
        : prev.length < 2
        ? [...prev, fId]
        : [prev[1], fId];
      return next;
    });
  }

  function handleFeelingsConfirm() {
    if (feelings.length === 0) return;
    const labels = feelings.map((f) => FEELINGS.find((ff) => ff.id === f)?.label).filter(Boolean);
    setStep("audience");
    setMessages((prev) => [
      ...prev.filter((m) => m.id !== "feeling-opts"),
      { from: "user", text: labels.join(" & "), id: "feeling-answer" },
      { from: "bot", text: `${labels.join(" and ")} — great taste. Now, who would use this thing you build?`, id: "audience-q" },
      { from: "bot-options", options: AUDIENCES, id: "audience-opts" },
    ]);
  }

  function handleAudienceSelect(aId: string) {
    const label = AUDIENCES.find((a) => a.id === aId)?.label ?? aId;
    setAudience(aId);
    setStep("constraint");
    setMessages((prev) => [
      ...prev.filter((m) => m.id !== "audience-opts"),
      { from: "user", text: label, id: "audience-answer" },
      { from: "bot", text: "Here's a random creative constraint to spark ideas. If you don't like it, re-roll. If part of it clicks, keep going.", id: "constraint-q" },
      { from: "bot-constraint", constraint, id: "constraint-card" },
    ]);
  }

  function handleReroll() {
    const next = generateConstraint();
    setConstraint(next);
    setMessages((prev) =>
      prev.map((m) => (m.id === "constraint-card" ? { ...m, from: "bot-constraint" as const, constraint: next } : m)),
    );
  }

  function handleConstraintAccept() {
    const summary = `Help ${constraint.person} ${constraint.action}. It ${constraint.form}.`;
    setStep("spark");
    setMessages((prev) => [
      ...prev.filter((m) => m.id !== "constraint-card"),
      { from: "user", text: summary, id: "constraint-answer" },
      { from: "bot", text: "Almost done. One last thing — is there something specific that bugs you, something you wish existed, or a problem you keep running into? Even a few words help. Or just skip this.", id: "spark-q" },
      { from: "bot-input", placeholder: "I always forget... / I wish there was...", id: "spark-input" },
    ]);
  }

  function handleSparkSubmit() {
    setSparkSubmitted(true);
    const text = spark.trim() || "(skipped)";
    const visionPrompt = buildVisionPrompt(feelings, audience, constraint, spark);
    setStep("result");
    setMessages((prev) => [
      ...prev.filter((m) => m.id !== "spark-input"),
      { from: "user", text, id: "spark-answer" },
      { from: "bot", text: "Here's your vision prompt. Paste it into Claude Code (or any AI tool) to start building. This is a starting point, not a life commitment.", id: "result-intro" },
      { from: "bot-result", prompt: visionPrompt, id: "result-prompt" },
    ]);
    saveDiscovery({ id, prompt: visionPrompt, feelings, audience });
  }

  function handleCopy(prompt: string) {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleStartOver() {
    setStep("greeting");
    setFeelings([]);
    setAudience("");
    setConstraint(generateConstraint());
    setSpark("");
    setSparkSubmitted(false);
    setCopied(false);
    setMessages([]);
    setStarted(false);
  }

  // --- Render ---

  if (!started) {
    return (
      <div className="my-10">
        <div className="rounded-2xl border border-amber-200/60 dark:border-amber-800/30 bg-gradient-to-br from-amber-50 via-rose-50/50 to-orange-50 dark:from-amber-950/20 dark:via-rose-950/10 dark:to-orange-950/10 overflow-hidden">
          <div className="px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-400 dark:from-amber-500 dark:to-rose-500 mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Find Your Project
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 max-w-sm mx-auto">
              Not sure what to build? Answer 4 quick questions and get a personalized vision prompt you can paste straight into Claude Code.
            </p>
            <button
              onClick={handleStart}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 dark:from-amber-500 dark:to-rose-400 text-white hover:from-amber-600 hover:to-rose-600 dark:hover:from-amber-400 dark:hover:to-rose-300 transition-all shadow-sm"
            >
              Let&apos;s go
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="rounded-2xl border border-amber-200/60 dark:border-amber-800/30 bg-white dark:bg-zinc-900 overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
          <BotAvatar />
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Find Your Project</p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">4 questions to discover what you want to build</p>
          </div>
        </div>

        {/* Chat messages area */}
        <div className="px-4 py-4 space-y-3 max-h-[480px] overflow-y-auto">
          {messages.map((msg) => {
            if (msg.from === "bot") {
              return (
                <BotBubble key={msg.id} animate>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{msg.text}</p>
                </BotBubble>
              );
            }

            if (msg.from === "user") {
              return <UserBubble key={msg.id} animate>{msg.text}</UserBubble>;
            }

            if (msg.from === "bot-options") {
              return (
                <div key={msg.id} className="pl-8 animate-fade-in">
                  <div className="flex flex-wrap gap-2">
                    {msg.options.map((opt) => {
                      // For feeling step (multi), show toggle behavior
                      if (msg.multi && step === "feeling") {
                        const selected = feelings.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleFeelingSelect(opt.id)}
                            className={`px-3.5 py-1.5 text-sm font-medium rounded-full border-2 transition-all ${
                              selected
                                ? "border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                                : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/50 dark:hover:bg-amber-950/20"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      }
                      // For audience step (single select)
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleAudienceSelect(opt.id)}
                          className="px-3.5 py-1.5 text-sm font-medium rounded-full border-2 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300 transition-all"
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  {/* Confirm button for multi-select (feelings) */}
                  {msg.multi && step === "feeling" && feelings.length > 0 && (
                    <button
                      onClick={handleFeelingsConfirm}
                      className="mt-2 px-4 py-1.5 text-xs font-semibold rounded-full bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors"
                    >
                      {feelings.length === 1 ? "That one" : "Those two"} &rarr;
                    </button>
                  )}
                </div>
              );
            }

            if (msg.from === "bot-constraint") {
              return (
                <div key={msg.id} className="pl-8 animate-fade-in">
                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4 max-w-xs">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      Help <span className="font-semibold text-amber-600 dark:text-amber-400">{msg.constraint.person}</span>{" "}
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{msg.constraint.action}</span>.{" "}
                      It <span className="font-semibold text-orange-600 dark:text-orange-400">{msg.constraint.form}</span>.
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleReroll}
                      className="px-3.5 py-1.5 text-xs font-medium rounded-full border-2 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" />
                      </svg>
                      Re-roll
                    </button>
                    <button
                      onClick={handleConstraintAccept}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors"
                    >
                      I like this &rarr;
                    </button>
                  </div>
                </div>
              );
            }

            if (msg.from === "bot-input") {
              if (sparkSubmitted) return null;
              return (
                <div key={msg.id} className="pl-8 animate-fade-in">
                  <div className="flex gap-2 items-end max-w-sm">
                    <input
                      type="text"
                      value={spark}
                      onChange={(e) => setSpark(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSparkSubmit(); }}
                      placeholder={msg.placeholder}
                      className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 transition-colors"
                    />
                    <button
                      onClick={handleSparkSubmit}
                      className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors shrink-0"
                    >
                      {spark.trim() ? "Send" : "Skip"}
                    </button>
                  </div>
                </div>
              );
            }

            if (msg.from === "bot-result") {
              return (
                <div key={msg.id} className="animate-fade-in">
                  <BotBubble>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3">Here&apos;s your vision prompt:</p>
                    <div className="rounded-lg bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-800/40 p-3.5">
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line font-mono">
                        {msg.prompt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => handleCopy(msg.prompt)}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors"
                      >
                        {copied ? "Copied!" : "Copy prompt"}
                      </button>
                      <button
                        onClick={handleStartOver}
                        className="px-3.5 py-1.5 text-xs font-medium rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                      >
                        Start over
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-2.5 italic">
                      This is a great starting project, not your life&apos;s work. You can always come back and discover another.
                    </p>
                  </BotBubble>
                </div>
              );
            }

            return null;
          })}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
