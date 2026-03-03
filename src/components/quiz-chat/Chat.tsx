"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, useMemo, FormEvent } from "react";
import { QuizCard } from "./QuizCard";

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

export function Chat() {
  const sessionIdRef = useRef(crypto.randomUUID());
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/quiz-chat",
        body: { sessionId: sessionIdRef.current },
      }),
    []
  );
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleQuizAnswer = (result: string) => {
    sendMessage({ text: result });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleSuggestion = (text: string) => {
    sendMessage({ text });
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.length === 0 && (
          <div className="welcome">
            <h1>Vibecoding Quiz</h1>
            <p>Test your vibecoding knowledge with interactive quiz cards.</p>
            <div className="suggestions">
              <button onClick={() => handleSuggestion("Quiz me on vibecoding!")}>
                Quiz me on vibecoding!
              </button>
              <button
                onClick={() =>
                  handleSuggestion("Quiz me on working with Claude")
                }
              >
                Working with Claude
              </button>
              <button
                onClick={() =>
                  handleSuggestion("Quiz me on shipping projects")
                }
              >
                Shipping projects
              </button>
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
