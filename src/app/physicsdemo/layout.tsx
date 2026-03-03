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
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/vibecode-light-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
