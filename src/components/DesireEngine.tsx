"use client";

import { useState, useEffect, useCallback } from "react";
import { getData, saveDiscovery } from "@/lib/progress";

const FEELINGS = [
  { id: "proud", label: "Proud", desc: "Something to show off" },
  { id: "helpful", label: "Helpful", desc: "Solve a real problem" },
  { id: "playful", label: "Playful", desc: "Fun and surprising" },
  { id: "clever", label: "Clever", desc: "Elegant and smart" },
  { id: "artistic", label: "Artistic", desc: "Beautiful to look at" },
  { id: "practical", label: "Practical", desc: "Useful every day" },
  { id: "connected", label: "Connected", desc: "Brings people together" },
  { id: "calm", label: "Calm", desc: "Peaceful and organized" },
];

const AUDIENCES = [
  { id: "me", label: "Just me", desc: "A personal tool or experiment" },
  { id: "someone", label: "Someone I know", desc: "A gift or favor for a specific person" },
  { id: "community", label: "A community", desc: "A group you belong to or care about" },
  { id: "anyone", label: "Anyone", desc: "Something useful for strangers" },
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
  "has exactly 3 buttons", "uses no text, only images",
  "you'd open every morning", "takes 30 seconds to use",
  "could be printed on paper", "works offline",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateConstraint(): { person: string; action: string; form: string } {
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
  const audienceText = AUDIENCES.find((a) => a.id === audience);

  let prompt = "I want to build something";
  if (feelingWords.length > 0) {
    prompt += ` that feels ${feelingWords.join(" and ")}`;
  }
  prompt += ".";

  if (audienceText && audience !== "me") {
    prompt += ` It's for ${audienceText.label.toLowerCase()} — ${audienceText.desc.toLowerCase()}.`;
  }

  if (spark.trim()) {
    prompt += ` Here's what's on my mind: ${spark.trim()}`;
  }

  prompt += `\n\nCreative constraint: help ${constraint.person} ${constraint.action}. It ${constraint.form}.`;

  prompt += "\n\nHelp me think about what this could look like, then let's build it.";

  return prompt;
}

type Step = "feeling" | "audience" | "constraint" | "spark" | "result";
const STEPS: Step[] = ["feeling", "audience", "constraint", "spark", "result"];

export default function DesireEngine({ id = "desire-engine" }: { id?: string }) {
  const [step, setStep] = useState<Step>("feeling");
  const [feelings, setFeelings] = useState<string[]>([]);
  const [audience, setAudience] = useState("");
  const [constraint, setConstraint] = useState(generateConstraint);
  const [lockedParts, setLockedParts] = useState<Record<string, boolean>>({});
  const [spark, setSpark] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    const d = getData();
    if (d.discoveries && d.discoveries.length > 0) {
      setHasPrevious(true);
    }
  }, []);

  const stepIndex = STEPS.indexOf(step);

  function next() {
    const nextIdx = stepIndex + 1;
    if (nextIdx < STEPS.length) setStep(STEPS[nextIdx]);
  }

  function back() {
    const prevIdx = stepIndex - 1;
    if (prevIdx >= 0) setStep(STEPS[prevIdx]);
  }

  function toggleFeeling(id: string) {
    setFeelings((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : prev.length < 2
        ? [...prev, id]
        : [prev[1], id],
    );
  }

  function rerollConstraint() {
    setConstraint((prev) => ({
      person: lockedParts.person ? prev.person : pickRandom(PERSON_CONSTRAINTS),
      action: lockedParts.action ? prev.action : pickRandom(ACTION_CONSTRAINTS),
      form: lockedParts.form ? prev.form : pickRandom(FORM_CONSTRAINTS),
    }));
  }

  function toggleLock(part: string) {
    setLockedParts((prev) => ({ ...prev, [part]: !prev[part] }));
  }

  const visionPrompt = buildVisionPrompt(feelings, audience, constraint, spark);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(visionPrompt);
    setCopied(true);
    saveDiscovery({ id, prompt: visionPrompt, feelings, audience });
    setTimeout(() => setCopied(false), 2000);
  }, [visionPrompt, id, feelings, audience]);

  function startOver() {
    setStep("feeling");
    setFeelings([]);
    setAudience("");
    setConstraint(generateConstraint());
    setLockedParts({});
    setSpark("");
    setCopied(false);
  }

  const canAdvance =
    (step === "feeling" && feelings.length > 0) ||
    (step === "audience" && audience !== "") ||
    step === "constraint" ||
    step === "spark";

  return (
    <div className="my-10">
      {/* Warm gradient header area */}
      <div className="rounded-t-2xl bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-amber-950/30 dark:via-rose-950/20 dark:to-orange-950/20 border border-b-0 border-amber-200/60 dark:border-amber-800/30 px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-rose-400 dark:from-amber-500 dark:to-rose-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
              Find Your Project
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Four quick questions to discover what you want to build.
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1.5 mt-4">
          {STEPS.slice(0, -1).map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i < stepIndex
                  ? "bg-amber-400 dark:bg-amber-500"
                  : i === stepIndex
                  ? "bg-gradient-to-r from-amber-400 to-rose-400 dark:from-amber-500 dark:to-rose-500"
                  : "bg-amber-200/50 dark:bg-amber-800/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="rounded-b-2xl border border-t-0 border-amber-200/60 dark:border-amber-800/30 bg-white dark:bg-zinc-900 px-6 py-5">

        {/* Step 1: Feeling */}
        {step === "feeling" && (
          <div>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              How do you want to feel?
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              When you imagine showing someone what you built, what feeling do you want? Pick one or two.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FEELINGS.map((f) => {
                const selected = feelings.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFeeling(f.id)}
                    className={`group relative text-left rounded-xl px-3.5 py-3 border-2 transition-all ${
                      selected
                        ? "border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-sm shadow-amber-100 dark:shadow-amber-950/50 scale-[1.02]"
                        : "border-zinc-100 dark:border-zinc-800 hover:border-amber-200 dark:hover:border-amber-800/50 hover:bg-amber-50/30 dark:hover:bg-amber-950/10"
                    }`}
                  >
                    <span className={`block text-sm font-semibold ${
                      selected ? "text-amber-700 dark:text-amber-300" : "text-zinc-700 dark:text-zinc-300"
                    }`}>
                      {f.label}
                    </span>
                    <span className="block text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {f.desc}
                    </span>
                    {selected && (
                      <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-amber-400 dark:bg-amber-500 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Audience */}
        {step === "audience" && (
          <div>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Who is this for?
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Building for someone specific makes your prompts clearer and the result more useful.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {AUDIENCES.map((a) => {
                const selected = audience === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => setAudience(a.id)}
                    className={`text-left rounded-xl px-4 py-3 border-2 transition-all ${
                      selected
                        ? "border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-sm"
                        : "border-zinc-100 dark:border-zinc-800 hover:border-amber-200 dark:hover:border-amber-800/50"
                    }`}
                  >
                    <span className={`block text-sm font-semibold ${
                      selected ? "text-amber-700 dark:text-amber-300" : "text-zinc-700 dark:text-zinc-300"
                    }`}>
                      {a.label}
                    </span>
                    <span className="block text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {a.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Constraint */}
        {step === "constraint" && (
          <div>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              A creative constraint
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Constraints fuel creativity. Lock what you like, re-roll the rest.
            </p>
            <div className="space-y-2.5">
              {[
                { key: "person", prefix: "Help", value: constraint.person },
                { key: "action", prefix: "to", value: constraint.action },
                { key: "form", prefix: "It", value: constraint.form },
              ].map(({ key, prefix, value }) => (
                <div
                  key={key}
                  className="flex items-center gap-2 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 px-4 py-3"
                >
                  <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider w-10 shrink-0">
                    {prefix}
                  </span>
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 flex-1">
                    {value}
                  </span>
                  <button
                    onClick={() => toggleLock(key)}
                    className={`h-7 w-7 rounded-lg flex items-center justify-center transition-colors ${
                      lockedParts[key]
                        ? "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                    }`}
                    title={lockedParts[key] ? "Unlock" : "Lock"}
                  >
                    {lockedParts[key] ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={rerollConstraint}
              className="mt-3 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" />
              </svg>
              Re-roll
            </button>
          </div>
        )}

        {/* Step 4: Spark */}
        {step === "spark" && (
          <div>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              What bugs you?
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              What annoys you, what do you wish existed, what would make your day easier? Even a few words help.
            </p>
            <textarea
              value={spark}
              onChange={(e) => setSpark(e.target.value)}
              placeholder="I always forget... / I wish there was... / It bugs me that..."
              rows={3}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 focus:bg-white dark:focus:bg-zinc-900 resize-y transition-colors"
            />
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
              Optional — skip this if nothing comes to mind.
            </p>
          </div>
        )}

        {/* Step 5: Result */}
        {step === "result" && (
          <div>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
              Your vision prompt
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Paste this into Claude Code (or any AI tool) to start building. This is a starting point, not a life commitment.
            </p>
            <div className="relative rounded-xl bg-gradient-to-b from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/10 border border-amber-200 dark:border-amber-800/40 p-5">
              <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line font-mono">
                {visionPrompt}
              </p>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-zinc-800 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors shadow-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={startOver}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Try again
              </button>
              {hasPrevious && (
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  You&apos;ve used this before — each time gives you a different starting point.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        {step !== "result" && (
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            {stepIndex > 0 ? (
              <button
                onClick={back}
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                &larr; Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={next}
              disabled={!canAdvance}
              className="px-5 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 dark:from-amber-500 dark:to-rose-400 text-white hover:from-amber-600 hover:to-rose-600 dark:hover:from-amber-400 dark:hover:to-rose-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {step === "spark" ? "See my prompt" : "Next"} &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
