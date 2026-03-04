import { Chat } from "@/components/quiz-chat/Chat";

export const metadata = {
  title: "AI Physics Quiz | Heat & Thermal Energy",
  description: "Test your understanding of heat, temperature, and thermal energy with an AI-powered interactive quiz.",
};

export default function PhysicsQuizChatPage() {
  return (
    <Chat
      config={{
        apiEndpoint: "/api/physics-quiz-chat",
        backHref: "/physicsdemo",
        headerTitle: "Physics Quiz",
        welcomeTitle: "Heat & Thermal Energy",
        welcomeDescription: "Test your understanding of heat, temperature, and thermal energy with interactive quiz cards.",
        suggestions: [
          { label: "Quiz me on heat!", prompt: "Quiz me on heat and thermal energy!" },
          { label: "Conduction & insulation", prompt: "Quiz me on conduction and insulation" },
          { label: "Phase changes", prompt: "Quiz me on phase changes and latent heat" },
        ],
        journeyStep: "practice",
      }}
    />
  );
}
