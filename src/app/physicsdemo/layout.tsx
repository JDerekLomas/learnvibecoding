import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heat & Thermal Energy — Physics Demo',
  description:
    'Learn about heat, temperature, and thermal energy through reading, quizzes, AI chat, and voice — an experiment in multi-modal learning.',
};

export default function PhysicsDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-amber-50">
      {children}
    </div>
  );
}
