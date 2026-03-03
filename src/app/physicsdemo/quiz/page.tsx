'use client';

import QuizEngine from '@/components/quiz/QuizEngine';
import { heatQuestions } from '@/data/physics-questions';

export default function PhysicsQuizPage() {
  return <QuizEngine items={heatQuestions} sessionSize={7} themeMode="light" mode="practice" />;
}
