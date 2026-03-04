"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveAssessment } from "@/lib/progress";

type Confidence = "think" | "know";

interface CompletionExplorerProps {
  id: string;
}

const EXAMPLE_PROMPTS = [
  "The best way to learn programming is",
  "In the year 2050, humans will",
  "The secret to building great software is",
  "Once upon a time, a developer opened their terminal and",
  "The difference between a good prompt and a great prompt is",
];

type ModelStatus = "idle" | "loading-model" | "generating" | "done" | "error";

export default function CompletionExplorer({ id }: CompletionExplorerProps) {
  const [prefix, setPrefix] = useState("");
  const [temperature, setTemperature] = useState(0.9);
  const [gpt2Output, setGpt2Output] = useState("");
  const [claudeOutput, setClaudeOutput] = useState("");
  const [gpt2Status, setGpt2Status] = useState<ModelStatus>("idle");
  const [claudeStatus, setClaudeStatus] = useState<ModelStatus>("idle");
  const [modelProgress, setModelProgress] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [generateCount, setGenerateCount] = useState(0);

  const generatorRef = useRef<unknown>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Load GPT-2 model via transformers.js (lazy, first time only)
  const getGenerator = useCallback(async () => {
    if (generatorRef.current) return generatorRef.current;

    setGpt2Status("loading-model");
    setModelProgress("Downloading GPT-2 (124M params)...");

    const { pipeline, env } = await import("@huggingface/transformers");
    // Disable local model check — always fetch from HF hub
    env.allowLocalModels = false;

    const generator = await pipeline("text-generation", "Xenova/gpt2", {
      progress_callback: (p: { status: string; progress?: number; file?: string }) => {
        if (p.status === "progress" && p.progress !== undefined) {
          setModelProgress(`Downloading: ${Math.round(p.progress)}%`);
        } else if (p.status === "done") {
          setModelProgress("Model ready");
        }
      },
    });

    generatorRef.current = generator;
    return generator;
  }, []);

  // Generate with GPT-2 in browser
  const generateGpt2 = useCallback(
    async (text: string) => {
      setGpt2Status("loading-model");
      setGpt2Output("");
      try {
        const generator = (await getGenerator()) as (
          input: string,
          params: { max_new_tokens: number; temperature: number; do_sample: boolean; top_k: number }
        ) => Promise<Array<{ generated_text: string }>>;
        setGpt2Status("generating");

        const result = await generator(text, {
          max_new_tokens: 100,
          temperature,
          do_sample: true,
          top_k: 50,
        });

        // Show only the generated continuation, not the prefix
        const full = result[0]?.generated_text ?? "";
        const continuation = full.startsWith(text)
          ? full.slice(text.length)
          : full;
        setGpt2Output(continuation);
        setGpt2Status("done");
      } catch (err) {
        setGpt2Output(
          `Error: ${err instanceof Error ? err.message : "Unknown error"}`
        );
        setGpt2Status("error");
      }
    },
    [getGenerator, temperature]
  );

  // Generate with Claude via API
  const generateClaude = useCallback(async (text: string) => {
    setClaudeStatus("generating");
    setClaudeOutput("");

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/completion-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setClaudeOutput(accumulated);
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      setClaudeStatus("done");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setClaudeOutput(
        `Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
      setClaudeStatus("error");
    }
  }, []);

  // Run both models
  const handleGenerate = useCallback(() => {
    const text = prefix.trim();
    if (!text) return;
    setHasGenerated(true);
    setConfidence(null);
    setGenerateCount((c) => c + 1);
    generateGpt2(text);
    generateClaude(text);
  }, [prefix, generateGpt2, generateClaude]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const isGenerating =
    gpt2Status === "generating" ||
    gpt2Status === "loading-model" ||
    claudeStatus === "generating";

  return (
    <div
      id={id}
      className="my-8 rounded-xl border border-cyan-200 dark:border-cyan-800/50 bg-gradient-to-b from-cyan-50/30 to-transparent dark:from-cyan-950/10 dark:to-transparent overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-start gap-3">
        <div className="mt-0.5 h-8 w-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center shrink-0">
          <svg
            className="w-4 h-4 text-cyan-600 dark:text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Completion Explorer
          </h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            See the difference between a raw language model and an
            instruction-tuned one. Same input, completely different behavior.
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 space-y-4">
        {/* Prompt input */}
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-1.5">
            Type a text prefix — both models will continue it
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isGenerating) handleGenerate();
              }}
              placeholder="The best way to learn programming is"
              className="flex-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:focus:ring-cyan-700 focus:bg-white dark:focus:bg-zinc-800"
            />
            <button
              onClick={handleGenerate}
              disabled={!prefix.trim() || isGenerating}
              className="px-5 py-2 text-sm font-medium rounded-lg bg-cyan-600 dark:bg-cyan-500 text-white hover:bg-cyan-700 dark:hover:bg-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm whitespace-nowrap"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {/* Example prompts */}
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500 self-center mr-1">
            Try:
          </span>
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setPrefix(p)}
              className="text-xs px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-cyan-300 dark:hover:border-cyan-700 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
            >
              {p.length > 35 ? p.slice(0, 35) + "..." : p}
            </button>
          ))}
        </div>

        {/* Temperature slider */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            Temperature: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min={0.1}
            max={2.0}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="flex-1 h-1.5 accent-cyan-500"
          />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 w-20 text-right">
            {temperature < 0.5
              ? "Predictable"
              : temperature < 1.2
                ? "Balanced"
                : "Creative"}
          </span>
        </div>

        {/* Output panels */}
        {hasGenerated && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* GPT-2 panel */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-400" />
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    GPT-2 (Base Model)
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  124M params · in your browser
                </span>
              </div>
              <div className="p-3 min-h-[120px]">
                {gpt2Status === "loading-model" && (
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                    </span>
                    {modelProgress}
                  </div>
                )}
                {gpt2Status === "generating" && !gpt2Output && (
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                    </span>
                    Generating...
                  </div>
                )}
                {gpt2Output && (
                  <p className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                    <span className="text-zinc-400 dark:text-zinc-500">
                      {prefix}
                    </span>
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-zinc-900 dark:text-zinc-100">
                      {gpt2Output}
                    </span>
                  </p>
                )}
                {gpt2Status === "error" && (
                  <p className="text-sm text-red-500">{gpt2Output}</p>
                )}
              </div>
              {gpt2Status === "done" && (
                <div className="px-3 py-2 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                    Raw prediction — no instruction following. It just continues
                    the text based on patterns in its training data.
                  </p>
                </div>
              )}
            </div>

            {/* Claude panel */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Claude (Chat Model)
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  instruction-tuned · server
                </span>
              </div>
              <div className="p-3 min-h-[120px]">
                {claudeStatus === "generating" && !claudeOutput && (
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                    </span>
                    Thinking...
                  </div>
                )}
                {claudeOutput && (
                  <p className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                    {claudeOutput}
                  </p>
                )}
                {claudeStatus === "error" && (
                  <p className="text-sm text-red-500">{claudeOutput}</p>
                )}
              </div>
              {claudeStatus === "done" && (
                <div className="px-3 py-2 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                    Interprets your text as a request and responds helpfully.
                    RLHF training taught it to be an assistant, not a text
                    predictor.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confidence check after first generation */}
        {hasGenerated && gpt2Status === "done" && claudeStatus === "done" && (
          <div className="space-y-3">
            {/* Confidence buttons */}
            <AnimatePresence>
              {!confidence && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                    Do you understand why they behave differently?
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setConfidence("think");
                        saveAssessment(`${id}-confidence`, "think");
                      }}
                      className="flex-1 py-3 px-6 rounded-xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-medium text-sm transition-colors"
                    >
                      I think so...
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setConfidence("know");
                        saveAssessment(`${id}-confidence`, "know");
                      }}
                      className="flex-1 py-3 px-6 rounded-xl border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-semibold text-sm shadow-sm transition-colors"
                    >
                      I get it.
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Follow-up based on confidence */}
            <AnimatePresence>
              {confidence === "think" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 px-4 py-3 space-y-2"
                >
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Here&apos;s what to notice
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    <strong>GPT-2</strong> just continues the text — like
                    autocomplete. It doesn&apos;t know you&apos;re asking a
                    question. It just predicts what words typically follow.
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    <strong>Claude</strong> interprets your text as a{" "}
                    <em>request</em> and responds helpfully. That&apos;s learned
                    behavior from RLHF (reinforcement learning from human
                    feedback) — training that taught the raw model to be an
                    assistant.
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Try a few more prompts. The difference becomes more obvious
                    with each one. Also try moving the temperature slider — high
                    temperature makes GPT-2 wilder, low makes it repetitive.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {confidence === "know" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 px-4 py-3 space-y-2"
                >
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Nice. One more thing.
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Try the temperature slider. High values (1.5+) make GPT-2
                    more random and creative — sometimes nonsensical. Low values
                    (0.3) make it predictable and repetitive. This is the{" "}
                    <em>same parameter</em> that controls &quot;creativity&quot;
                    in Claude and other chat models.
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    When you&apos;re vibe coding and Claude gives you something
                    too predictable or too wild, you&apos;re experiencing this
                    same knob — just tuned behind the scenes.
                  </p>
                  {generateCount < 3 && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                      Try {3 - generateCount} more prompt
                      {3 - generateCount > 1 ? "s" : ""} to build your
                      intuition.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
