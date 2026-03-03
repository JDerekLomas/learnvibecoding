"use client";

import { useState, useCallback } from "react";

interface DemoQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    question:
      "You want AI to build a login page for your SaaS app. Which prompt will get the best result?",
    options: [
      'Build a login form with email and password fields, a "Sign in" button, input validation that shows errors inline, and a "Forgot password?" link below',
      "I need a login page. Research how Linear, Clerk, and Supabase handle theirs, then build something that feels that clean. Dark mode, minimal.",
      "Make me a login page",
      "Create the best login form possible using modern best practices",
    ],
    correctIndex: 1,
    explanation:
      "In vibe coding, you paint the destination and let the AI bring its competence. Pointing at reference sites gives a taste target — the AI researches real examples and synthesizes something informed. Over-specifying pixel details upfront limits the AI's judgment. Strategic ambiguity wins.",
  },
  {
    question:
      "The AI built your landing page but something feels off. What's the best way to iterate?",
    options: [
      "Change the border-radius to 16px, padding to 24px, and use a linear-gradient from #fff to #f9fafb",
      "The hero section feels cramped and corporate. I want it to breathe more — look at how Notion's landing page uses whitespace. Warmer, more inviting.",
      "Make it look better",
      "Start over with a completely new design",
    ],
    correctIndex: 1,
    explanation:
      "Effective iteration describes the feeling you want, not the CSS values. \"Cramped and corporate\" tells the AI what's wrong. Pointing at Notion gives a reference for the vibe. The AI translates feelings into code better than you'd write the spec yourself.",
  },
  {
    question:
      "You're starting a new project with Claude Code. What's the most important thing to set up first?",
    options: [
      "A detailed technical spec listing every component, route, and database schema",
      "Your CLAUDE.md file — describing your aesthetic, how you work, and what \"good\" looks like to you",
      "A list of the exact npm packages you want to use",
      "A wireframe of every screen before writing any code",
    ],
    correctIndex: 1,
    explanation:
      "Your CLAUDE.md is a portrait of your taste and working style. It shapes every interaction — the AI learns whether you prefer minimal or bold, fast iteration or careful planning. This context is worth more than any technical spec because it helps the AI make thousands of small decisions the way you would.",
  },
];

type Phase = "ready" | "selected" | "revealed";

export default function TryQuestion() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("ready");

  const q = DEMO_QUESTIONS[questionIndex];

  const handleSelect = useCallback(
    (i: number) => {
      if (phase !== "ready") return;
      setSelected(i);
      setPhase("selected");
      // Brief pause then reveal
      setTimeout(() => setPhase("revealed"), 600);
    },
    [phase]
  );

  const handleNext = useCallback(() => {
    const next = (questionIndex + 1) % DEMO_QUESTIONS.length;
    setQuestionIndex(next);
    setSelected(null);
    setPhase("ready");
  }, [questionIndex]);

  const isCorrect = selected === q.correctIndex;

  return (
    <div>
      {/* Question */}
      <p className="text-base font-bold text-stone-900 mb-4 leading-relaxed">
        {q.question}
      </p>

      {/* Options */}
      <div className="space-y-2.5">
        {q.options.map((option, i) => {
          let style =
            "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50 cursor-pointer";

          if (phase === "selected" && selected === i) {
            style =
              "border-indigo-400 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200";
          }

          if (phase === "revealed") {
            if (i === q.correctIndex) {
              style =
                "border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200";
            } else if (selected === i) {
              style =
                "border-red-300 bg-red-50 text-red-800 ring-2 ring-red-200";
            } else {
              style = "border-stone-200 bg-stone-50 text-stone-400";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={phase !== "ready"}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${style}`}
            >
              <span className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current/20 flex items-center justify-center text-xs font-bold mt-0.5">
                  {phase === "revealed" && i === q.correctIndex ? (
                    <svg
                      className="w-4 h-4 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : phase === "revealed" && selected === i ? (
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span>{option}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {phase === "revealed" && (
        <div
          className={`mt-4 p-4 rounded-xl border-2 text-sm leading-relaxed ${
            isCorrect
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-amber-200 bg-amber-50 text-amber-800"
          }`}
        >
          <p className="font-bold mb-1">{isCorrect ? "Correct!" : "Not quite."}</p>
          <p>{q.explanation}</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Try another
            </button>
            <a
              href="/quiz"
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-600 text-xs font-semibold hover:bg-white transition-colors"
            >
              See all 96 questions
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
