"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, useMemo, useCallback, FormEvent } from "react";
import Link from "next/link";
import { QuizCard } from "./QuizCard";
import type { QuizAnswerResult } from "./QuizCard";
import { saveQuizResult } from "@/lib/progress";
import { reportProgress, getTeamContext } from "@/lib/team";

interface QuizToolOutput {
  questionId: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  exhausted?: boolean;
  message?: string;
}

interface ChatConfig {
  apiEndpoint?: string;
  backHref?: string;
  headerTitle?: string;
  welcomeTitle?: string;
  welcomeDescription?: string;
  suggestions?: { label: string; prompt: string }[];
  journeyStep?: string;
}

const DEFAULT_CONFIG: Required<ChatConfig> = {
  apiEndpoint: "/api/quiz-chat",
  backHref: "/journey",
  headerTitle: "AI Quiz",
  welcomeTitle: "Vibecoding Quiz",
  welcomeDescription: "Test your vibecoding knowledge with interactive quiz cards.",
  suggestions: [
    { label: "Quiz me on vibecoding!", prompt: "Quiz me on vibecoding!" },
    { label: "Working with Claude", prompt: "Quiz me on working with Claude" },
    { label: "Shipping projects", prompt: "Quiz me on shipping projects" },
  ],
  journeyStep: "assess",
};

const MIN_QUESTIONS_FOR_FINISH = 3;

export function Chat({ config }: { config?: ChatConfig } = {}) {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const sessionIdRef = useRef(crypto.randomUUID());
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: cfg.apiEndpoint,
        body: { sessionId: sessionIdRef.current },
      }),
    [cfg.apiEndpoint]
  );
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const [answerCount, setAnswerCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleQuizAnswer = useCallback((result: QuizAnswerResult) => {
    sendMessage({ text: result.text });
    setAnswerCount((c) => c + 1);

    // Save to local progress (XP, skill map)
    saveQuizResult({
      itemId: result.questionId,
      correct: result.correct,
      confidence: "know", // chatbot doesn't have confidence ratings
      timestamp: Date.now(),
      tags: [result.topic],
    });
  }, [sendMessage]);

  const handleFinish = useCallback(() => {
    setFinished(true);
    // Report journey completion for team members
    reportProgress(cfg.journeyStep as "assess", "completed", {
      questionsAnswered: answerCount,
      sessionId: sessionIdRef.current,
    });
  }, [answerCount, cfg.journeyStep]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleSuggestion = (text: string) => {
    sendMessage({ text });
  };

  const showFinishButton = answerCount >= MIN_QUESTIONS_FOR_FINISH && !finished;
  const hasTeam = typeof window !== "undefined" && getTeamContext() !== null;

  return (
    <div className="chat-container">
      <div className="chat-header">
        <Link href={cfg.backHref} className="chat-back-btn" aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <span className="chat-header-title">{cfg.headerTitle}</span>
        {showFinishButton ? (
          <Link
            href={cfg.backHref}
            onClick={handleFinish}
            className="chat-finish-btn"
          >
            Done
          </Link>
        ) : finished ? (
          <Link href={cfg.backHref} className="chat-finish-btn chat-finish-done">
            Done
          </Link>
        ) : (
          <div style={{ width: 36 }} />
        )}
      </div>
      <div className="messages">
        {messages.length === 0 && (
          <div className="welcome">
            <h1>{cfg.welcomeTitle}</h1>
            <p>{cfg.welcomeDescription}</p>
            <div className="suggestions">
              {cfg.suggestions.map((s, i) => (
                <button key={i} onClick={() => handleSuggestion(s.prompt)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => {
          const textContent = message.parts
            .filter((p): p is { type: "text"; text: string } => p.type === "text")
            .map((p) => p.text)
            .join("")
            .trim();

          if (message.role === "user" && textContent.startsWith("[Quiz Answer]")) {
            return null;
          }

          return (
            <div key={message.id} className={`message ${message.role}`}>
              {message.role === "user" && textContent && (
                <div className="message-bubble user-bubble">{textContent}</div>
              )}

              {message.role === "assistant" && (
                <>
                  {textContent && (
                    <div className="message-bubble assistant-bubble">
                      {textContent}
                    </div>
                  )}
                  {message.parts.map((part, i) => {
                    if (
                      part.type !== "tool-quizQuestion" &&
                      part.type !== "tool-generateQuestion"
                    )
                      return null;

                    const toolPart = part as unknown as {
                      type: string;
                      toolCallId: string;
                      state: string;
                      output?: QuizToolOutput;
                    };

                    if (toolPart.state === "output-available" && toolPart.output) {
                      if (toolPart.output.exhausted) {
                        return null;
                      }
                      return (
                        <QuizCard
                          key={toolPart.toolCallId}
                          questionId={toolPart.output.questionId}
                          topic={toolPart.output.topic}
                          question={toolPart.output.question}
                          options={toolPart.output.options}
                          correctIndex={toolPart.output.correctIndex}
                          explanation={toolPart.output.explanation}
                          onAnswer={handleQuizAnswer}
                        />
                      );
                    }
                    return (
                      <div key={toolPart.toolCallId || `loading-${i}`} className="quiz-loading">
                        <div className="loading-spinner" />
                        Loading question...
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          );
        })}

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="message assistant">
            <div className="message-bubble assistant-bubble typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <form onSubmit={handleSubmit} className="input-form">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
