import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Growth Net — Strategy & Development",
  description: "Advisory draft — product vision, competitive landscape, and development roadmap.",
  robots: { index: false, follow: false },
};

export default function StrategyPage() {
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
        {/* ── Header ── */}
        <div className="text-center mb-8 bg-white rounded-2xl border-3 border-stone-300 shadow-lg shadow-stone-200/60 px-8 py-10">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
            Advisory Draft — March 2026
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            AI Growth Net
            <br />
            <span className="text-stone-400">Strategy &amp; Development</span>
          </h1>
          <p className="mt-4 text-sm text-stone-500">
            <a
              href="mailto:derek@codevibing.com"
              className="text-indigo-600 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
            >
              derek@codevibing.com
            </a>
          </p>
        </div>

        {/* ── Executive Summary ── */}
        <Card label="Executive Summary">
          <p className="text-sm text-stone-600 leading-relaxed">
            AI Growth Net is a self-serve AI upskilling platform for organizations. Where
            competitors charge $750–$28,000 per seat and require months of procurement, we
            let a CEO create a team in 60 seconds, try the AI assessment themselves, and
            watch their people progress through a 5-step journey — for free during early
            access. The platform is AI-native: assessments adapt in real time, discovery
            interviews find personally relevant projects, and the curriculum teaches
            building <em>with</em> AI, not <em>about</em> AI. With backing from TU Delft,
            there is a path to becoming the first university-backed program combining AI
            capability building with human-centered design research.
          </p>
        </Card>

        {/* ── What Exists Today ── */}
        <Card label="What Exists Today">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            Live Product
          </p>
          <div className="space-y-3 mb-6">
            {[
              {
                href: "https://ai-growth.net",
                title: "ai-growth.net",
                desc: "Corporate landing — team creation CTA, interactive demo question",
              },
              {
                href: "https://ai-growth.net/quiz-chat",
                title: "/quiz-chat",
                desc: "AI assessment chatbot — adaptive, confidence-based, 96 items across 11 topics",
              },
              {
                href: "https://ai-growth.net/journey",
                title: "/journey",
                desc: "5-step guided experience: Discover → Assess → Learn → Practice → Ship",
              },
              {
                href: "https://ai-growth.net/teams/create",
                title: "/teams/create → /dashboard",
                desc: "Team management — invite link, real-time progress grid, manager controls",
              },
              {
                href: "https://learnvibecoding.vercel.app",
                title: "learnvibecoding.vercel.app",
                desc: "Consumer curriculum — skill map, 7 modules, interactive exercises",
              },
            ].map((item) => (
              <div key={item.href} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2" />
                <div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-indigo-600 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
                  >
                    {item.title}
                  </a>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            Tech Stack
          </p>
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            Next.js 16, React 19, Tailwind 4, Supabase (teams &amp; progress),
            Gemini (quiz chat), Claude (discovery interview), ElevenLabs (voice),
            Vercel (hosting &amp; edge middleware for audience routing).
          </p>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            Current Status
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Pre-launch. Core product functional. No paid users yet. Seeking
            advisors and early enterprise pilots.
          </p>
        </Card>

        {/* ── Competitive Landscape ── */}
        <Card label="Competitive Landscape">
          {/* 2×2 matrix */}
          <div className="mb-6 rounded-xl border-2 border-stone-200 overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="p-4 border-b-2 border-r-2 border-stone-200 bg-stone-50">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Expensive + Sales-Led
                </p>
                <p className="text-xs font-bold text-stone-700">Berkeley Haas</p>
                <p className="text-xs text-stone-400">$6,500–$28K</p>
              </div>
              <div className="p-4 border-b-2 border-stone-200 bg-stone-50">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Expensive + Self-Serve
                </p>
                <p className="text-xs font-bold text-stone-700">SectionAI</p>
                <p className="text-xs text-stone-400">$750/seat</p>
              </div>
              <div className="p-4 border-r-2 border-stone-200 bg-indigo-50">
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">
                  Free + Self-Serve ← Us
                </p>
                <p className="text-xs font-bold text-indigo-700">AI Growth Net</p>
                <p className="text-xs text-indigo-400">Free (early access)</p>
              </div>
              <div className="p-4 bg-stone-50">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Free/Low + Sales-Led
                </p>
                <p className="text-xs font-bold text-stone-700">Multiverse</p>
                <p className="text-xs text-stone-400">Levy-funded (UK)</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CompetitorCard
              name="SectionAI"
              color="border-l-amber-500"
              detail="Closest competitor. Their ProfAI platform offers enterprise AI training with instructor-led cohorts. $750/seat with bulk discounts. Strong content but slow enrollment cycle — requires procurement. Weakness: no self-serve path; a CEO can't try it in 60 seconds."
            />
            <CompetitorCard
              name="Multiverse"
              color="border-l-violet-500"
              detail="Best-designed product in the space. Levy-funded apprenticeship model (free for UK employers). Beautiful UX, strong community. Weakness: UK-only, tied to apprenticeship levy structure. Not transferable to other markets."
            />
            <CompetitorCard
              name="Berkeley Haas Executive Education"
              color="border-l-blue-500"
              detail="Prestige positioning — 'Leading AI-Driven Innovation' program. $6,500–$28K price point attracts senior leaders. Multi-week, instructor-led. Weakness: glacial pace, extreme price, zero personalization. Teaches about AI, not building with AI."
            />
            <CompetitorCard
              name="Generic LMS / Coursera / LinkedIn Learning"
              color="border-l-stone-400"
              detail="Massive libraries of AI courses, but completion rates are abysmal (3–5%). No team accountability, no adaptive assessment, no project-based outcome. Weakness: content dumps without capability building. Checking the box, not changing behavior."
            />
          </div>
        </Card>

        {/* ── Differentiation ── */}
        <Card label="Differentiation">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            The 5-Step Journey as IP
          </p>
          <p className="text-sm text-stone-600 leading-relaxed mb-5">
            Our core methodology — Discover → Assess → Learn → Practice → Ship — is
            the structural IP. Each step is AI-powered and adaptive. The journey
            produces a real, shipped artifact, not a certificate of completion.
          </p>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            What No One Else Does
          </p>
          <div className="space-y-2 mb-5">
            {[
              "Instant self-serve: CEO creates a team in 60 seconds, no procurement",
              "CEO-tries-first: the decision-maker experiences the product before buying",
              "AI-native assessment: adapts in real time, not a static pre/post test",
              "Speed: hours to first value, not months of onboarding",
              "Outcome-based: every participant ships a working project",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <div className="flex-shrink-0 w-1 h-1 rounded-full bg-indigo-500 mt-2" />
                <p className="text-sm text-stone-600">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            TU Delft Angle
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            AI + human-centered design is a unique academic lens. TU Delft provides
            research credibility, access to the European innovation ecosystem, and a
            potential path to university-backed certification. No competitor has this
            combination of AI-native product <em>and</em> design research backing.
          </p>
        </Card>

        {/* ── Go-to-Market Options ── */}
        <Card label="Go-to-Market Options">
          <div className="space-y-4">
            <GTMOption
              number={1}
              title="Self-Serve Only"
              subtitle="Product-led growth"
              pros={[
                "Zero sales cost — scales with product quality",
                "Fast iteration cycle — ship and measure",
                "Lower barrier to entry — viral potential",
                "Current model, already built",
              ]}
              cons={[
                "Hard to reach enterprise buyers who expect sales contact",
                "Free users may never convert to paid",
                "No relationship-building with decision-makers",
                "Revenue ceiling without enterprise contracts",
              ]}
            />
            <GTMOption
              number={2}
              title="Enterprise Sales"
              subtitle="Dedicated sales, custom pricing"
              pros={[
                "Higher ACV ($10K–$100K+ per contract)",
                "Relationship with decision-maker drives expansion",
                "Feedback loop with real enterprise needs",
                "Credibility signal: 'used by X company'",
              ]}
              cons={[
                "Requires building a sales team or hiring reps",
                "Long sales cycles (3–12 months)",
                "Custom work / feature requests from large clients",
                "Takes focus away from product development",
              ]}
            />
            <GTMOption
              number={3}
              title="Hybrid"
              subtitle="Self-serve + sales-assisted"
              pros={[
                "Self-serve for small teams (<20), sales for enterprise",
                "CEO tries it free → sales follows up when team grows",
                "Product-qualified leads reduce sales effort",
                "Best of both worlds if executed well",
              ]}
              cons={[
                "Complexity: two motions to manage simultaneously",
                "Risk of neither being done well",
                "Need to define the handoff point (when does self-serve → sales?)",
                "Still requires sales investment, just less",
              ]}
            />
          </div>

          <div className="mt-5 p-4 rounded-xl bg-indigo-50 border-2 border-indigo-200">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
              Open Question
            </p>
            <p className="text-sm text-indigo-800">
              What&apos;s the right entry point? The product is built for self-serve, but
              enterprise buyers may need a human touchpoint to commit budget. Is
              the CEO-tries-first model sufficient, or do we need outbound sales?
            </p>
          </div>
        </Card>

        {/* ── Development Roadmap ── */}
        <Card label="Development Roadmap">
          <div className="space-y-6">
            <RoadmapPhase
              phase="Phase 1"
              timing="Now"
              color="bg-emerald-500"
              items={[
                "Core product: assessment, curriculum, team dashboard",
                "AI discovery interview (text + voice)",
                "Audience routing (ai-growth.net → corporate, learnvibecoding → consumer)",
                "Team creation, invite links, progress tracking",
                "96-item adaptive quiz across 11 topics",
              ]}
            />
            <RoadmapPhase
              phase="Phase 2"
              timing="Next"
              color="bg-amber-500"
              items={[
                "Certificate system — completion certificates for individuals and teams",
                "Manager reports — exportable progress summaries, skill gap analysis",
                "Assessment scoring — quantified results with benchmarking",
                "Onboarding flow — guided first-time experience for managers",
                "Content expansion — advanced modules, industry-specific tracks",
              ]}
            />
            <RoadmapPhase
              phase="Phase 3"
              timing="Later"
              color="bg-violet-500"
              items={[
                "Enterprise features: SSO, LMS integration (SCORM/xAPI), custom branding",
                "Research partnerships — TU Delft collaboration, published outcomes",
                "API access — integrate assessment into existing HR/L&D workflows",
                "Multi-language support — Dutch, German, French",
                "Community features — cross-team leaderboards, peer learning",
              ]}
            />
          </div>
        </Card>

        {/* ── Open Questions ── */}
        <Card label="Open Questions for Advisors">
          <div className="space-y-5">
            {[
              {
                q: "Enterprise sales: build an internal sales team, partner with a reseller/consulting firm, or stay self-serve?",
                context:
                  "Current product is fully self-serve. Enterprise buyers in L&D typically expect a sales contact, demo, and procurement process. But building sales is expensive and changes company DNA.",
              },
              {
                q: "Pricing: what triggers payment? Team size, features, certification, or time?",
                context:
                  "Currently free during early access. Need a pricing model that doesn't kill the self-serve motion. Freemium (free for small teams, paid for enterprise features like SSO/reports) is the default assumption.",
              },
              {
                q: "TU Delft: formal university program, spin-off, or independent company with research partnership?",
                context:
                  "Each path has different implications for speed, credibility, IP ownership, and funding. A formal program provides credibility but limits agility. Independence preserves speed but requires building credibility from scratch.",
              },
              {
                q: "Target market: CEO upskilling, L&D teams, or individual professionals?",
                context:
                  "The product currently speaks to CEOs ('10x your organization'). L&D teams are the actual budget holders in larger companies. Individual professionals are the easiest to reach but hardest to monetize.",
              },
              {
                q: "Geography: start with Netherlands/EU or go global from day one?",
                context:
                  "TU Delft gives a European anchor. EU has strong L&D budgets and AI regulation driving upskilling demand. But the product is in English and the competitive landscape is global.",
              },
              {
                q: "Certification: proprietary badge, university-backed certificate, or integration with existing credentialing systems?",
                context:
                  "University-backed carries weight in enterprise sales. Proprietary is faster to ship. Integration with LinkedIn/Credly increases visibility but adds complexity.",
              },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-sm font-bold text-stone-900">
                  {i + 1}. {item.q}
                </p>
                <p className="text-sm text-stone-500 mt-1">{item.context}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Footer ── */}
        <div className="text-center mt-4 mb-8">
          <p className="text-sm text-stone-500">
            Feedback welcome —{" "}
            <a
              href="mailto:derek@codevibing.com"
              className="text-indigo-600 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
            >
              derek@codevibing.com
            </a>
          </p>
          <p className="text-xs text-stone-400 mt-2">March 2026</p>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable sub-components ── */

function Card({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border-3 border-stone-300 shadow-lg shadow-stone-200/60 p-6 mb-8">
      <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
        {label}
      </h2>
      {children}
    </div>
  );
}

function CompetitorCard({
  name,
  color,
  detail,
}: {
  name: string;
  color: string;
  detail: string;
}) {
  return (
    <div className={`border-l-4 ${color} pl-4 py-1`}>
      <p className="text-sm font-bold text-stone-900">{name}</p>
      <p className="text-sm text-stone-500 mt-1">{detail}</p>
    </div>
  );
}

function GTMOption({
  number,
  title,
  subtitle,
  pros,
  cons,
}: {
  number: number;
  title: string;
  subtitle: string;
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="rounded-xl border-2 border-stone-200 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
          {number}
        </div>
        <div>
          <p className="text-sm font-bold text-stone-900">{title}</p>
          <p className="text-xs text-stone-400">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1.5">
            Pros
          </p>
          <ul className="space-y-1">
            {pros.map((p) => (
              <li key={p} className="text-xs text-stone-600 flex items-start gap-1.5">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1.5">
            Cons
          </p>
          <ul className="space-y-1">
            {cons.map((c) => (
              <li key={c} className="text-xs text-stone-600 flex items-start gap-1.5">
                <span className="text-red-400 mt-0.5 flex-shrink-0">−</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RoadmapPhase({
  phase,
  timing,
  color,
  items,
}: {
  phase: string;
  timing: string;
  color: string;
  items: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`flex-shrink-0 px-2.5 py-1 rounded-lg ${color} text-white text-xs font-bold`}
        >
          {phase}
        </div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          {timing}
        </p>
      </div>
      <div className="ml-1 border-l-2 border-stone-200 pl-4 space-y-1.5">
        {items.map((item) => (
          <p key={item} className="text-sm text-stone-600">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
