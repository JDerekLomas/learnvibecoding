import Link from "next/link";
import { headers } from "next/headers";
import type { Audience } from "@/lib/audience";
import TryQuestion from "@/components/TryQuestion";
import SkillMap from "@/components/SkillMap";

export default async function Home() {
  const headersList = await headers();
  const audience = (headersList.get("x-audience") || "consumer") as Audience;

  if (audience === "corporate") {
    return <CorporateLanding />;
  }

  return <ConsumerLanding />;
}

function CorporateLanding() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      {/* Doodle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/vibecode-light-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Hero card */}
        <div className="text-center mb-8 bg-white rounded-2xl border-3 border-stone-300 shadow-lg shadow-stone-200/60 px-8 py-10">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
            AI Upskilling for CEOs
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900">
            Ready to 10x
            <br />
            <span className="text-stone-400">Your Organization?</span>
          </h1>
          <p className="mt-4 text-lg font-medium text-stone-500 max-w-lg mx-auto leading-relaxed">
            Your people are your competitive advantage. Give them the AI skills to prove it. A structured program that gets your entire team building with AI — with a dashboard so you can see it happening.
          </p>
        </div>

        {/* CTAs */}
        <div className="mb-8 space-y-3">
          <Link href="/quiz-chat">
            <div className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-extrabold text-base text-center shadow-xl shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-600 transition-all duration-150 border-3 border-white/20">
              Try the AI Assessment Yourself
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/teams/create">
              <div className="w-full py-4 rounded-2xl border-3 border-stone-300 text-stone-700 font-semibold text-base text-center hover:bg-white hover:border-stone-400 transition-all duration-150">
                Enroll Your Team
              </div>
            </Link>
            <Link href="/journey">
              <div className="w-full py-4 rounded-2xl border-3 border-stone-300 text-stone-700 font-semibold text-base text-center hover:bg-white hover:border-stone-400 transition-all duration-150">
                Preview the Journey
              </div>
            </Link>
          </div>
        </div>

        {/* Try a question */}
        <div className="bg-white rounded-2xl border-3 border-stone-300 shadow-lg shadow-stone-200/60 p-6 mb-8">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            Can Your Team Answer This?
          </h3>
          <TryQuestion />
        </div>

        {/* The problem */}
        <div className="bg-white rounded-2xl border-3 border-stone-300 shadow-lg shadow-stone-200/60 p-6 mb-8">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            The Problem
          </h3>
          <div className="space-y-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "AI tools are here. Your team isn't using them.",
                desc: "Copilot seats are purchased. ChatGPT is bookmarked. But nobody's actually building anything with AI yet.",
                color: "bg-red-500",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                ),
                title: "Your competitors are moving faster.",
                desc: "The gap between AI-enabled teams and everyone else is widening every month. This is the year it becomes permanent.",
                color: "bg-amber-500",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Workshops don't stick.",
                desc: "A one-day AI workshop creates excitement, not capability. Your team needs hands-on practice with real projects, not slide decks.",
                color: "bg-stone-500",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-white`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-stone-900">{item.title}</p>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The solution */}
        <div className="bg-white rounded-2xl border-3 border-stone-300 shadow-lg shadow-stone-200/60 p-6 mb-8">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            The Solution
          </h3>
          <div className="space-y-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                ),
                title: "AI Discovery Interview",
                desc: "Each person finds a real project that fits their role. Not a toy demo — something they actually want to build.",
                color: "bg-amber-500",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Adaptive AI Assessment",
                desc: "Meets each person where they are. No one sits through basics they already know. No one gets lost.",
                color: "bg-violet-500",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Hands-On Curriculum",
                desc: "4 modules: self-knowledge, AI workflow, building, and debugging. Interactive exercises, not passive reading.",
                color: "bg-blue-500",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "CEO Dashboard",
                desc: "See every team member's progress in real time. Who's started, who's stuck, who's shipped. No guessing.",
                color: "bg-emerald-500",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-white`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-stone-900">{item.title}</p>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The 5 steps */}
        <div className="bg-white rounded-2xl border-3 border-stone-300 shadow-lg shadow-stone-200/60 p-6 mb-8">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            The 5-Step Journey
          </h3>
          <div className="space-y-3">
            {[
              { label: "Discover", desc: "AI finds the right project for each person's role", color: "bg-amber-500" },
              { label: "Assess", desc: "Adaptive quiz that meets them where they are", color: "bg-violet-500" },
              { label: "Learn", desc: "Structured modules on AI-assisted building", color: "bg-blue-500" },
              { label: "Practice", desc: "Hands-on exercises that build real confidence", color: "bg-emerald-500" },
              { label: "Ship", desc: "Every person delivers a working project", color: "bg-rose-500" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${step.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {i + 1}
                </div>
                <div>
                  <span className="text-sm font-bold text-stone-900">{step.label}</span>
                  <span className="text-sm text-stone-500"> — {step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl border-3 border-stone-300 shadow-lg shadow-stone-200/60 p-6 mb-8">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            Get Your Team Started in 60 Seconds
          </h3>
          <div className="space-y-4">
            {[
              { num: 1, title: "Create a team", desc: "Pick a name, get an invite link. No IT tickets, no SSO setup." },
              { num: 2, title: "Share the link", desc: "Team members join with one click. No accounts or passwords." },
              { num: 3, title: "Watch the dashboard", desc: "See who's discovering, learning, building, and shipping — in real time." },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-extrabold">
                  {item.num}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-stone-900">{item.title}</p>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/teams/create">
            <div className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold text-base text-center shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-600 transition-all duration-150 border-3 border-white/20">
              Enroll Your Team
            </div>
          </Link>
        </div>

        {/* Credibility */}
        <div className="bg-white rounded-2xl border-3 border-stone-300 shadow-lg shadow-stone-200/60 p-6 mb-8">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 text-center">
            Built By
          </h3>
          <div className="text-center">
            <p className="text-sm text-stone-700 leading-relaxed">
              <a href="https://dereklomas.me" className="font-bold text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition-colors" target="_blank" rel="noopener noreferrer">Derek Lomas, PhD</a> — AI/UX researcher, faculty at Delft University of Technology. Published on prompt design, AI-assisted learning, and computational wellbeing. Built{" "}
              <a href="https://sourcelibrary.org" className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition-colors" target="_blank" rel="noopener noreferrer">Source Library</a> (1,900+ AI-translated historical texts) and the{" "}
              <a href="https://codevibing.com" className="underline underline-offset-4 decoration-stone-300 hover:decoration-stone-600 transition-colors" target="_blank" rel="noopener noreferrer">CodeVibing</a> community.
            </p>
          </div>
        </div>

        {/* Free */}
        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl p-6 mb-8 text-center border-3 border-white/20 shadow-xl shadow-indigo-500/15">
          <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
            Currently Free
          </p>
          <p className="text-white text-lg font-bold">
            No credit card. No procurement. Just create a team and go.
          </p>
          <p className="text-white/60 text-sm mt-2">
            Early adopters help shape the product. Get in before we charge.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-stone-800/80 to-stone-950 pt-16 pb-10 px-6 -mt-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-white/70">
            Questions?{" "}
            <a href="mailto:derek@codevibing.com" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors">derek@codevibing.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function ConsumerLanding() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      {/* Doodle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/textures/vibecode-light-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Hero card */}
        <div className="text-center mb-8 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-8 py-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
            Learn Vibe Coding
          </h1>
          <p className="mt-3 text-lg font-medium text-stone-500 max-w-md mx-auto leading-relaxed">
            A structured curriculum for building with AI — from first conversation to shipped product.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400 bg-stone-100 px-3 py-1.5 rounded-full">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            ~30 minutes to your first build
          </p>
        </div>

        {/* Find Your Level CTA */}
        <Link href="/quiz" className="block mb-8">
          <div className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-base text-center shadow-xl shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-600 transition-all duration-150 border-2 border-white/20">
            Take the Quiz to Find Your Level
          </div>
        </Link>

        {/* Interactive Skill Map */}
        <div className="mb-8">
          <SkillMap />
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-stone-800/80 to-stone-950 pt-16 pb-10 px-6 -mt-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-white/70">
            Built by{" "}
            <a href="https://dereklomas.me" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors" target="_blank" rel="noopener noreferrer">
              Derek Lomas
            </a>
            . Part of the{" "}
            <a href="https://codevibing.com" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors" target="_blank" rel="noopener noreferrer">
              CodeVibing
            </a>{" "}
            ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}
