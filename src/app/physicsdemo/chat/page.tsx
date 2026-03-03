'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STARTERS = [
  'Why does metal feel cold?',
  'How does the sun heat Earth?',
  'Do blankets make heat?',
  'Why is steam more dangerous than boiling water?',
];

/* ── Morphing blob avatar ────────────────────────────────────── */

function TutorBlob({
  size = 28,
  thinking = false,
}: {
  size?: number;
  thinking?: boolean;
}) {
  return (
    <div className="shrink-0 relative" style={{ width: size, height: size }}>
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#E07A5F] to-[#F2CC8F] ${
          thinking ? 'animate-[blob-think_1.8s_ease-in-out_infinite]' : 'animate-[blob-idle_6s_ease-in-out_infinite]'
        }`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width={size * 0.42}
          height={size * 0.42}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z"
            fill="white"
            opacity={0.9}
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Thinking indicator ──────────────────────────────────────── */

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#E07A5F]"
            style={{
              animation: `thinking-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <span className="text-[11px] font-bold text-stone-400 tracking-wide">
        thinking
      </span>
    </div>
  );
}

/* ── Main chat page ──────────────────────────────────────────── */

export default function PhysicsChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 50);
  }, []);

  useEffect(scrollToBottom, [messages, streamingText, scrollToBottom]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height =
        Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  async function sendMessage(userMessage: string) {
    const trimmed = userMessage.trim();
    if (!trimmed || streaming) return;

    setError('');
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: trimmed },
    ];
    setMessages(newMessages);
    setInput('');
    setStreaming(true);
    setStreamingText('');

    try {
      const res = await fetch('/api/physics-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let accumulated = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') continue;
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

      if (accumulated) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: accumulated },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setStreaming(false);
      setStreamingText('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* Keyframe animations */}
      <style>{`
        @keyframes blob-idle {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50%       { border-radius: 50% 60% 30% 60% / 30% 50% 70% 50%; }
          75%       { border-radius: 40% 60% 50% 40% / 60% 30% 60% 40%; }
        }
        @keyframes blob-think {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1); }
          33%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.1); }
          66%      { border-radius: 50% 60% 30% 60% / 30% 50% 70% 50%; transform: scale(0.9); }
        }
        @keyframes thinking-dot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.75); }
          40%           { opacity: 1;    transform: scale(1); }
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Back nav */}
        <Link
          href="/physicsdemo"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors no-underline mb-5 shrink-0 w-fit"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Hub
        </Link>

        {/* ── Chat card (neobrutalist) ──────────────────────── */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b-[3px] border-stone-900 bg-[#FFF8F0] shrink-0">
            <TutorBlob size={32} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-stone-900 leading-tight">
                Physics Tutor
              </p>
              <p className="text-[10px] font-bold text-stone-400">
                Powered by Claude
              </p>
            </div>
            {hasMessages && (
              <button
                onClick={() => {
                  setMessages([]);
                  setError('');
                }}
                className="text-[11px] font-bold text-stone-400 hover:text-stone-900 transition-colors px-2.5 py-1 rounded-md border-2 border-stone-200 hover:border-stone-900 hover:bg-white"
              >
                New chat
              </button>
            )}
          </div>

          {/* Messages area */}
          <div
            className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
            style={{
              backgroundImage:
                'radial-gradient(circle, #e7e5e4 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Welcome / starters */}
            {!hasMessages && !streaming && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-6"
              >
                <div className="flex justify-center mb-4">
                  <TutorBlob size={56} />
                </div>
                <h3 className="text-xl font-black text-stone-900 mb-1">
                  Curious about heat?
                </h3>
                <p className="text-sm text-stone-500 mb-6 max-w-xs mx-auto leading-relaxed">
                  I&apos;m a Socratic tutor &mdash; I&apos;ll ask questions that
                  help you figure things out, not just give you answers.
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {STARTERS.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      onClick={() => sendMessage(s)}
                      className="px-4 py-2.5 text-sm font-bold rounded-lg border-[2.5px] border-stone-900 bg-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none text-stone-800"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Message bubbles */}
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={`${msg.role}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {msg.role === 'assistant' ? (
                    <div className="flex gap-2.5 items-start">
                      <TutorBlob size={28} />
                      <div className="max-w-[85%] rounded-xl rounded-tl-sm border-[2.5px] border-stone-900 bg-white shadow-[2px_2px_0_#d6d3d1] px-4 py-2.5">
                        <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-xl rounded-tr-sm border-[2.5px] border-stone-900 bg-[#E07A5F] shadow-[2px_2px_0_#943c2a] px-4 py-2.5">
                        <p className="text-sm text-white font-medium whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Streaming text */}
            {streaming && streamingText && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2.5 items-start"
              >
                <TutorBlob size={28} />
                <div className="max-w-[85%] rounded-xl rounded-tl-sm border-[2.5px] border-stone-900 bg-white shadow-[2px_2px_0_#d6d3d1] px-4 py-2.5">
                  <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">
                    {streamingText}
                    <span className="inline-block w-[3px] h-4 bg-[#E07A5F] ml-0.5 animate-pulse rounded-sm align-text-bottom" />
                  </p>
                </div>
              </motion.div>
            )}

            {/* Thinking indicator */}
            {streaming && !streamingText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex gap-2.5 items-start"
              >
                <TutorBlob size={28} thinking />
                <div className="rounded-xl border-[2.5px] border-stone-900 bg-white px-4 py-3">
                  <ThinkingIndicator />
                </div>
              </motion.div>
            )}

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2.5 items-start"
              >
                <TutorBlob size={28} />
                <div className="rounded-xl border-[2.5px] border-red-400 bg-red-50 px-4 py-2.5">
                  <p className="text-sm font-bold text-red-600">{error}</p>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input bar */}
          <div className="border-t-[3px] border-stone-900 px-4 py-3 bg-[#FFF8F0] shrink-0">
            <div className="flex gap-2.5 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  streaming
                    ? 'Thinking...'
                    : 'Ask about heat and thermal energy...'
                }
                disabled={streaming}
                rows={1}
                className="flex-1 rounded-lg border-[2.5px] border-stone-900 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:ring-offset-1 transition-all resize-none disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={streaming || !input.trim()}
                className="px-5 py-2.5 text-sm font-black rounded-lg border-[2.5px] border-stone-900 bg-[#E07A5F] text-white shadow-[3px_3px_0_#1c1917] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#1c1917] shrink-0"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
