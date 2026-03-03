"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { saveDiscovery } from "@/lib/progress";
import { reportProgress } from "@/lib/team";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function BotAvatar() {
  return (
    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 dark:from-amber-500 dark:to-rose-500 flex items-center justify-center shrink-0">
      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    </div>
  );
}

export default function DesireEngine({ id = "desire-engine", audience = "consumer" }: { id?: string; audience?: "consumer" | "corporate" }) {
  const isCorporate = audience === "corporate";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [prepContext, setPrepContext] = useState<string | undefined>();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Read prep context from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("discovery-prep");
      if (stored) {
        setPrepContext(stored);
        sessionStorage.removeItem("discovery-prep");
      }
    } catch {
      // sessionStorage not available
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }, []);

  useEffect(scrollToBottom, [messages, streamingText, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  async function sendMessage(userMessage: string) {
    const trimmed = userMessage.trim();
    if (!trimmed || streaming) return;

    setError("");
    const newMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);
    setStreamingText("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, userContext: prepContext, audience }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              accumulated += parsed.text;
              setStreamingText(accumulated);
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }

      // Add the complete assistant message
      if (accumulated) {
        setMessages((prev) => [...prev, { role: "assistant", content: accumulated }]);

        // Check if this looks like a final response with a vision prompt
        if (accumulated.includes("Starter prompt") || accumulated.includes("starter prompt") || accumulated.includes("Skills to assess")) {
          // Extract feelings/audience from conversation for localStorage
          const allUserText = newMessages
            .filter((m) => m.role === "user")
            .map((m) => m.content)
            .join(" ");
          saveDiscovery({
            id,
            prompt: accumulated,
            feelings: [],
            audience: allUserText.slice(0, 100),
          });
          reportProgress("discover", "completed");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setStreaming(false);
      setStreamingText("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  async function handleStart() {
    setStarted(true);
    setStreaming(true);
    reportProgress("discover", "started");
    setStreamingText("");
    setError("");

    try {
      // Send empty conversation to get the opening message
      const kickoff = prepContext
        ? `[The user just clicked 'Start' to begin the discovery conversation. They already shared some context in a warm-up: "${prepContext}" — use it to skip the basics and go deeper. Send your opening message. Don't introduce yourself or explain the process. Just ask your first question.]`
        : isCorporate
          ? "[The user just clicked 'Start' to begin the discovery conversation. This is a team lead or manager exploring AI for their team. Send your opening message — direct, no fluff. Ask about a specific team pain point. Don't introduce yourself or explain the process.]"
          : "[The user just clicked 'Start' to begin the discovery conversation. Send your opening message — something surprising and thought-provoking. Don't introduce yourself or explain the process. Just ask your first question.]";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: kickoff }],
          userContext: prepContext,
          audience,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              accumulated += parsed.text;
              setStreamingText(accumulated);
            }
          } catch {
            // Skip
          }
        }
      }

      if (accumulated) {
        // Store the hidden system kick-off + response, but only show the assistant response
        setMessages([
          { role: "user", content: kickoff },
          { role: "assistant", content: accumulated },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start conversation");
    } finally {
      setStreaming(false);
      setStreamingText("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleCopy(text: string) {
    // Extract just the starter prompt if possible
    // Extract the blockquoted starter prompt section
    const lines = text.split("\n");
    const promptLines: string[] = [];
    let inPrompt = false;
    for (const line of lines) {
      if (line.startsWith("> ")) {
        inPrompt = true;
        promptLines.push(line.slice(2));
      } else if (inPrompt && line.trim() === "") {
        break;
      } else if (inPrompt) {
        promptLines.push(line);
      }
    }
    const toCopy = promptLines.length > 0 ? promptLines.join("\n").trim() : text;
    navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleStartOver() {
    setMessages([]);
    setInput("");
    setStreaming(false);
    setStreamingText("");
    setStarted(false);
    setError("");
    setCopied(false);
  }

  // Render the visible messages (hide the system kick-off)
  const visibleMessages = messages.filter(
    (m) => !(m.role === "user" && m.content.startsWith("[The user just clicked"))
  );

  // Check if the conversation seems complete (has a vision prompt)
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const isComplete = lastAssistant?.content.includes("Starter prompt") || lastAssistant?.content.includes("starter prompt");

  // Landing state
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
              {isCorporate ? "Find Your Team's First AI Project" : "Discover What You Want to Build"}
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 max-w-sm mx-auto">
              {isCorporate
                ? "A quick conversation to identify the right first project for your team. Three questions, then a concrete plan."
                : "A short conversation to help you figure out what actually excites you. No menus, no quizzes — just honest questions and a vision prompt at the end."}
            </p>
            <button
              onClick={handleStart}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 dark:from-amber-500 dark:to-rose-400 text-white hover:from-amber-600 hover:to-rose-600 dark:hover:from-amber-400 dark:hover:to-rose-300 transition-all shadow-sm"
            >
              Let&apos;s go
            </button>
            {isCorporate && (
              <a
                href="/quiz-chat"
                className="block mt-3 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                Already know what you need? Skip to assessment
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="rounded-2xl border border-amber-200/60 dark:border-amber-800/30 bg-white dark:bg-zinc-900 overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-2.5">
            <BotAvatar />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{isCorporate ? "Team Project Discovery" : "Discover Your Project"}</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{isCorporate ? "Find your team's first AI win" : "AI-powered discovery interview"}</p>
            </div>
          </div>
          {messages.length > 2 && (
            <button
              onClick={handleStartOver}
              className="text-[11px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              Start over
            </button>
          )}
        </div>

        {/* Chat messages */}
        <div className="px-4 py-4 space-y-4 max-h-[520px] overflow-y-auto">
          {visibleMessages.map((msg, i) => {
            if (msg.role === "assistant") {
              const isFinal = isComplete && i === visibleMessages.length - 1;
              return (
                <div key={i} className="flex gap-2.5 items-start animate-fade-in">
                  <BotAvatar />
                  <div className="max-w-[85%]">
                    <div className="rounded-2xl rounded-tl-md bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5">
                      <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                    {isFinal && (
                      <div className="flex items-center gap-2 mt-2 pl-1">
                        <button
                          onClick={() => handleCopy(msg.content)}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors"
                        >
                          {copied ? "Copied!" : "Copy starter prompt"}
                        </button>
                        <button
                          onClick={handleStartOver}
                          className="px-3.5 py-1.5 text-xs font-medium rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                        >
                          Try again
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={i} className="flex justify-end animate-fade-in">
                <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-amber-500 dark:bg-amber-600 px-4 py-2.5">
                  <p className="text-sm text-white whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            );
          })}

          {/* Streaming text */}
          {streaming && streamingText && (
            <div className="flex gap-2.5 items-start">
              <BotAvatar />
              <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {streamingText}
                  <span className="inline-block w-1.5 h-4 bg-amber-400 dark:bg-amber-500 ml-0.5 animate-pulse rounded-sm" />
                </p>
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {streaming && !streamingText && (
            <div className="flex gap-2.5 items-start">
              <BotAvatar />
              <div className="rounded-2xl rounded-tl-md bg-zinc-100 dark:bg-zinc-800 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex gap-2.5 items-start">
              <BotAvatar />
              <div className="rounded-2xl rounded-tl-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 px-4 py-2.5">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                <button
                  onClick={handleStartOver}
                  className="mt-1.5 text-xs text-red-500 dark:text-red-400 underline hover:no-underline"
                >
                  Start over
                </button>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        {!isComplete && (
          <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 py-3 bg-zinc-50/50 dark:bg-zinc-800/20">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={streaming ? "Thinking..." : "Type your answer..."}
                disabled={streaming}
                rows={1}
                className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 transition-colors resize-none disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={streaming || !input.trim()}
                className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
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
