"use client";

import { useCallback, useState } from "react";
import { AnswerOption } from "./AnswerOption";
import { FeedbackPanel } from "./FeedbackPanel";

interface QuizCardProps {
  questionId: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  onAnswer: (result: string) => void;
}

function getQuestionSource(questionId: string): "bank" | "generated" {
  return questionId.startsWith("gen-") ? "generated" : "bank";
}

export function QuizCard({
  questionId,
  topic,
  question,
  options,
  correctIndex,
  explanation,
  onAnswer,
}: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = useCallback(
    (index: number) => {
      if (showFeedback) return;
      setSelectedIndex(index);
      setShowFeedback(true);

      const correct = index === correctIndex;
      const selectedAnswer = options[index];
      const correctAnswer = options[correctIndex];
      const source = getQuestionSource(questionId);

      setTimeout(() => {
        onAnswer(
          correct
            ? `[Quiz Answer] [qid:${questionId}] [source:${source}] [topic:${topic}] Question: "${question}" \u2014 I answered [${index}] "${selectedAnswer}" \u2014 CORRECT.`
            : `[Quiz Answer] [qid:${questionId}] [source:${source}] [topic:${topic}] Question: "${question}" \u2014 I answered [${index}] "${selectedAnswer}" \u2014 INCORRECT. The correct answer was [${correctIndex}] "${correctAnswer}".`
        );
      }, 2000);
    },
    [showFeedback, correctIndex, options, question, questionId, topic, onAnswer]
  );

  return (
    <div className="quiz-card-wrapper">
      <div className="quiz-card" key={questionId}>
        <div className="topic-label">{topic}</div>
        <h2 className="question-text">{question}</h2>
        <div className="answer-options">
          {options.map((option, i) => (
            <AnswerOption
              key={i}
              index={i}
              text={option}
              selected={selectedIndex === i}
              correctIndex={showFeedback ? correctIndex : null}
              disabled={showFeedback}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>
      </div>
      {showFeedback && (
        <FeedbackPanel
          correct={selectedIndex === correctIndex}
          explanation={explanation}
        />
      )}
    </div>
  );
}
