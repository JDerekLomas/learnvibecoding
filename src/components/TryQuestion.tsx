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
      "You want AI to build a login form. Which prompt will get the best result?",
    options: [
      "Make me a login page",
      'Build a login form with email and password fields, a "Sign in" button, inline validation errors, and a "Forgot password?" link',
      "Create the best login form possible using modern best practices",
      "I need authentication for my app",
    ],
    correctIndex: 1,
    explanation:
      "Specific prompts with concrete requirements produce much better results than vague ones. \"Best practices\" is subjective. \"Make me a login page\" leaves too many decisions to the AI.",
  },
  {
    question:
      "AI generated a component but the styling is off. What's the most effective follow-up?",
    options: [
      "Make it look better",
      "The styling is wrong, fix it",
      "Make the corners more rounded (16px), increase padding to 24px, and add a subtle gradient from white to gray-50",
      "Start over with a completely new design",
    ],
    correctIndex: 2,
    explanation:
      'Effective iteration gives specific, measurable corrections. "Make it look better" gives no direction. Starting over throws away working logic — iterate on what you have.',
  },
  {
    question:
      "You want to build a full e-commerce checkout flow. What's the best approach?",
    options: [
      "Write one detailed prompt describing the entire checkout flow at once",
      "Break it into steps: cart summary, then address form, then payment, then order confirmation",
      "Ask for the whole thing and then fix whatever is wrong",
      "Copy a checkout flow from another site and ask the AI to replicate it",
    ],
    correctIndex: 1,
    explanation:
      "Complex features should be decomposed into sequential steps. Each step can be reviewed before building on it. One massive prompt often produces inconsistent results.",
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
