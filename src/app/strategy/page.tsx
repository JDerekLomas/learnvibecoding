import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Growth Net — Business Opportunity",
  description:
    "AI upskilling for organizations — market opportunity, product, and projections.",
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
            Advisor Briefing — March 2026
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            AI Growth Net
          </h1>
          <p className="mt-2 text-lg font-medium text-stone-400">
            The opportunity in AI upskilling
          </p>
          <p className="mt-4 text-sm text-stone-500">
            Derek Lomas, PhD — TU Delft
            <br />
            <a
              href="mailto:derek@codevibing.com"
              className="text-indigo-600 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
            >
              derek@codevibing.com
            </a>
          </p>
        </div>

        {/* ── The Opportunity ── */}
        <Card label="The Opportunity">
          <p className="text-sm text-stone-600 leading-relaxed mb-5">
            Every organization needs to upskill its people on AI. The corporate
            training market is{" "}
            <strong className="text-stone-900">$400B globally</strong>, and the
            AI-specific segment is projected to reach{" "}
            <strong className="text-stone-900">$10.4B by 2033</strong> (25%
            CAGR). Over 80% of enterprises will deploy GenAI applications by
            2026 — but most employees don&apos;t know how to use them. The #1
            barrier to AI adoption isn&apos;t technology, it&apos;s skills.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <StatCard value="$400B" label="Corporate training market" />
            <StatCard value="25%" label="CAGR, AI training segment" />
            <StatCard value="80%" label="Enterprises deploying GenAI by 2026" />
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Current solutions are either too expensive ($750–$28K/seat), too
            slow (months of procurement), or too generic (Coursera completion
            rates: 3–5%). There is no product that lets a CEO try an AI
            assessment in 60 seconds, enroll their team, and watch real
            capability develop — until now.
          </p>
        </Card>

        {/* ── What We're Building ── */}
        <Card label="What We're Building">
          <p className="text-sm text-stone-600 leading-relaxed mb-5">
            AI Growth Net is a self-serve AI upskilling platform for
            organizations. The core product is a 5-step journey — Discover,
            Assess, Learn, Practice, Ship — where every participant ends with a
            working AI project, not a certificate. The platform is AI-native:
            assessments adapt in real time, discovery interviews find personally
            relevant projects, and the curriculum teaches building{" "}
            <em>with</em> AI.
          </p>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            Live Product — Try It
          </p>
          <div className="space-y-2.5 mb-5">
            {[
              {
                href: "https://ai-growth.net",
                title: "ai-growth.net",
                desc: "Corporate landing + interactive demo",
              },
              {
                href: "https://ai-growth.net/quiz-chat",
                title: "/quiz-chat",
                desc: "AI assessment — 96 items, 11 topics, adaptive",
              },
              {
                href: "https://ai-growth.net/journey",
                title: "/journey",
                desc: "5-step guided experience",
              },
              {
                href: "https://ai-growth.net/teams/create",
                title: "/teams/create",
                desc: "Create a team, get a dashboard in 60 seconds",
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
                  <span className="text-sm text-stone-500">
                    {" "}
                    — {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            Key Differentiators
          </p>
          <div className="space-y-2">
            {[
              "Self-serve: CEO creates a team in 60 seconds, no procurement",
              "CEO-tries-first: decision-maker experiences the product before buying",
              "AI-native assessment: adapts to each person in real time",
              "Outcome-based: every participant ships a real project",
              "Speed: hours to first value, not months of onboarding",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <div className="flex-shrink-0 w-1 h-1 rounded-full bg-indigo-500 mt-2" />
                <p className="text-sm text-stone-600">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Business Model & Revenue Projections ── */}
        <Card label="Business Model">
          <p className="text-sm text-stone-600 leading-relaxed mb-5">
            Freemium with enterprise tiers. Free for small teams (up to 5
            people). Paid tiers unlock team management, analytics, certificates,
            and enterprise features. Revenue scales with seats.
          </p>

          <div className="rounded-xl border-2 border-stone-200 overflow-hidden mb-5">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-stone-50 border-b-2 border-stone-200">
                  <th className="text-left p-3 font-bold text-stone-500 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="text-left p-3 font-bold text-stone-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left p-3 font-bold text-stone-500 uppercase tracking-wider">
                    Includes
                  </th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                <tr className="border-b border-stone-100">
                  <td className="p-3 font-bold text-stone-900">Free</td>
                  <td className="p-3">$0</td>
                  <td className="p-3">
                    5 seats, assessment, curriculum, basic dashboard
                  </td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="p-3 font-bold text-stone-900">Team</td>
                  <td className="p-3">$29/seat/mo</td>
                  <td className="p-3">
                    Unlimited seats, manager reports, certificates, priority
                    support
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">Enterprise</td>
                  <td className="p-3">Custom</td>
                  <td className="p-3">
                    SSO, LMS integration, custom branding, dedicated CSM,
                    invoicing
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            Revenue Scenarios (Year 1–3)
          </p>
          <div className="rounded-xl border-2 border-stone-200 overflow-hidden mb-5">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-stone-50 border-b-2 border-stone-200">
                  <th className="text-left p-3 font-bold text-stone-500 uppercase tracking-wider">
                    Scenario
                  </th>
                  <th className="text-right p-3 font-bold text-stone-500 uppercase tracking-wider">
                    Year 1
                  </th>
                  <th className="text-right p-3 font-bold text-stone-500 uppercase tracking-wider">
                    Year 2
                  </th>
                  <th className="text-right p-3 font-bold text-stone-500 uppercase tracking-wider">
                    Year 3
                  </th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                <tr className="border-b border-stone-100">
                  <td className="p-3">
                    <span className="font-bold text-stone-900">
                      Conservative
                    </span>
                    <br />
                    <span className="text-stone-400">
                      20 teams, 15 seats avg
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono">$104K</td>
                  <td className="p-3 text-right font-mono">$313K</td>
                  <td className="p-3 text-right font-mono">$626K</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="p-3">
                    <span className="font-bold text-stone-900">Base</span>
                    <br />
                    <span className="text-stone-400">
                      50 teams, 20 seats avg
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono">$348K</td>
                  <td className="p-3 text-right font-mono">$1.0M</td>
                  <td className="p-3 text-right font-mono">$2.1M</td>
                </tr>
                <tr>
                  <td className="p-3">
                    <span className="font-bold text-stone-900">
                      Aggressive
                    </span>
                    <br />
                    <span className="text-stone-400">
                      100 teams, 30 seats avg + enterprise
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono">$1.0M</td>
                  <td className="p-3 text-right font-mono">$3.5M</td>
                  <td className="p-3 text-right font-mono">$8.7M</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Conservative assumes organic growth only. Base assumes light
            marketing + partnerships. Aggressive assumes enterprise sales motion
            + 2–3 large contracts ($50K+ each). All scenarios assume $29/seat/mo
            with 3x YoY growth on team tier.
          </p>
        </Card>

        {/* ── Unit Economics ── */}
        <Card label="Unit Economics">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl bg-stone-50 border-2 border-stone-200 p-4 text-center">
              <p className="text-2xl font-extrabold text-stone-900">~$0</p>
              <p className="text-xs text-stone-500 mt-1">
                Customer acquisition (self-serve)
              </p>
            </div>
            <div className="rounded-xl bg-stone-50 border-2 border-stone-200 p-4 text-center">
              <p className="text-2xl font-extrabold text-stone-900">$29</p>
              <p className="text-xs text-stone-500 mt-1">
                Revenue per seat/mo
              </p>
            </div>
            <div className="rounded-xl bg-stone-50 border-2 border-stone-200 p-4 text-center">
              <p className="text-2xl font-extrabold text-stone-900">~$2</p>
              <p className="text-xs text-stone-500 mt-1">
                Marginal cost per seat/mo
              </p>
            </div>
            <div className="rounded-xl bg-stone-50 border-2 border-stone-200 p-4 text-center">
              <p className="text-2xl font-extrabold text-stone-900">93%</p>
              <p className="text-xs text-stone-500 mt-1">Gross margin</p>
            </div>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Infrastructure is serverless (Vercel + Supabase). AI API costs
            (Gemini, Claude) are the primary variable expense at ~$0.02–0.05 per
            assessment interaction. No instructors, no physical materials.
            Software margins from day one.
          </p>
        </Card>

        {/* ── Competitive Landscape ── */}
        <Card label="Competitive Landscape">
          <div className="mb-6 rounded-xl border-2 border-stone-200 overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="p-4 border-b-2 border-r-2 border-stone-200 bg-stone-50">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  High Price + Sales-Led
                </p>
                <p className="text-xs font-bold text-stone-700">
                  Berkeley Haas
                </p>
                <p className="text-xs text-stone-400">$6,500–$28K/person</p>
              </div>
              <div className="p-4 border-b-2 border-stone-200 bg-stone-50">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  High Price + Platform
                </p>
                <p className="text-xs font-bold text-stone-700">SectionAI</p>
                <p className="text-xs text-stone-400">$750/seat</p>
              </div>
              <div className="p-4 border-r-2 border-stone-200 bg-indigo-50">
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">
                  Freemium + Self-Serve
                </p>
                <p className="text-xs font-bold text-indigo-700">
                  AI Growth Net
                </p>
                <p className="text-xs text-indigo-400">$0–$29/seat</p>
              </div>
              <div className="p-4 bg-stone-50">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Government-Funded
                </p>
                <p className="text-xs font-bold text-stone-700">Multiverse</p>
                <p className="text-xs text-stone-400">Levy-funded (UK only)</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CompetitorCard
              name="SectionAI ($750/seat)"
              color="border-l-amber-500"
              detail="Closest competitor. Instructor-led cohorts, strong content. But slow enrollment, requires procurement. A CEO can't try it themselves. We're 25x cheaper and instant."
            />
            <CompetitorCard
              name="Multiverse (UK, levy-funded)"
              color="border-l-violet-500"
              detail="Best UX in the space. But UK-only, tied to apprenticeship levy. Not transferable to other markets. We're global from day one."
            />
            <CompetitorCard
              name="Berkeley Haas ($6.5K–$28K)"
              color="border-l-blue-500"
              detail="Prestige play for senior leaders. Multi-week, instructor-led. Teaches about AI, not building with AI. We deliver hands-on capability at 1% of the cost."
            />
            <CompetitorCard
              name="Coursera / LinkedIn Learning"
              color="border-l-stone-400"
              detail="Massive libraries, 3–5% completion rates. No team accountability, no adaptive assessment, no real outcome. We focus on capability, not content."
            />
          </div>
        </Card>

        {/* ── TU Delft & Credibility ── */}
        <Card label="Academic Foundation">
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            AI Growth Net is developed by{" "}
            <strong className="text-stone-900">Derek Lomas, PhD</strong>,
            faculty at{" "}
            <strong className="text-stone-900">TU Delft</strong> (Delft
            University of Technology, #2 in Europe for engineering). Published
            researcher on AI-assisted learning, prompt design, and computational
            wellbeing. Previously built{" "}
            <a
              href="https://sourcelibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
            >
              Source Library
            </a>{" "}
            (1,900+ AI-translated historical texts) and the{" "}
            <a
              href="https://codevibing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
            >
              CodeVibing
            </a>{" "}
            community.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            The TU Delft connection opens three paths: (1) university-backed
            certification that carries weight in enterprise sales, (2) research
            partnerships that validate learning outcomes, and (3) access to the
            European innovation and L&amp;D ecosystem. No competitor has the
            combination of an AI-native product <em>and</em> human-centered
            design research backing.
          </p>
        </Card>

        {/* ── Go-to-Market ── */}
        <Card label="Go-to-Market">
          <p className="text-sm text-stone-600 leading-relaxed mb-5">
            Phase 1 is product-led growth: free tier drives adoption, CEO tries
            it first, team grows organically. Phase 2 adds a lightweight
            enterprise motion where product-qualified leads (teams &gt;20 seats)
            get outreach from a sales contact for enterprise tier conversion.
          </p>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            Growth Channels
          </p>
          <div className="space-y-3 mb-5">
            {[
              {
                title: "CEO-tries-first loop",
                desc: "CEO takes assessment → enrolls team → dashboard creates accountability → team grows. Zero friction entry.",
              },
              {
                title: "Content marketing & thought leadership",
                desc: "AI upskilling research, TU Delft credibility, LinkedIn/newsletter. Positions Derek as the expert voice.",
              },
              {
                title: "Partnership channel",
                desc: "Consulting firms, accelerators, and L&D platforms that need an AI upskilling component but don't want to build one.",
              },
              {
                title: "Enterprise outbound (Phase 2)",
                desc: "Target L&D leaders at mid-market companies (500–5,000 employees). Product demo is the product itself — no slideware.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2" />
                <div>
                  <p className="text-sm font-bold text-stone-900">
                    {item.title}
                  </p>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border-2 border-indigo-200">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
              Key Insight
            </p>
            <p className="text-sm text-indigo-800">
              The product <em>is</em> the sales demo. Every prospect interaction
              starts with &quot;try the assessment yourself&quot; — not a
              slideshow. This is the self-serve wedge that no competitor offers.
            </p>
          </div>
        </Card>

        {/* ── Development Roadmap ── */}
        <Card label="Roadmap">
          <div className="space-y-6">
            <RoadmapPhase
              phase="Now"
              timing="Shipped"
              color="bg-emerald-500"
              items={[
                "AI assessment chatbot (96 items, 11 topics, adaptive)",
                "5-step journey: Discover → Assess → Learn → Practice → Ship",
                "Team creation, invite links, real-time dashboard",
                "Voice-based AI discovery interview (ElevenLabs)",
                "Dual-audience routing (ai-growth.net + learnvibecoding)",
              ]}
            />
            <RoadmapPhase
              phase="Q2 2026"
              timing="Next"
              color="bg-amber-500"
              items={[
                "Completion certificates (individual + team)",
                "Manager reports — exportable, skill gap analysis",
                "Assessment scoring with benchmarking",
                "Stripe integration — Team tier billing",
                "First 10 paying teams (target: $8.7K MRR)",
              ]}
            />
            <RoadmapPhase
              phase="Q3–Q4 2026"
              timing="Scale"
              color="bg-violet-500"
              items={[
                "Enterprise tier: SSO, LMS integration (SCORM/xAPI), custom branding",
                "Partner API — white-label for consulting firms",
                "Multi-language (Dutch, German, French)",
                "TU Delft research publication on learning outcomes",
                "First enterprise contract ($50K+ ACV)",
              ]}
            />
          </div>
        </Card>

        {/* ── The Ask ── */}
        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl p-6 mb-8 border-3 border-white/20 shadow-xl shadow-indigo-500/15">
          <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-3 text-center">
            What I&apos;m Looking For
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Advisory input",
                desc: "Strategic guidance on GTM, pricing, and enterprise sales — especially from people who've sold to L&D teams.",
              },
              {
                title: "Introductions",
                desc: "Warm intros to L&D leaders, HR heads, or CEOs at companies (500–5,000 employees) who need AI upskilling.",
              },
              {
                title: "Pilot partners",
                desc: "3–5 organizations willing to run a paid pilot ($5K–$15K, 3 months). Product is live and ready.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/60 mt-2" />
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Open Questions ── */}
        <Card label="Open Questions">
          <div className="space-y-4">
            {[
              {
                q: "Enterprise sales: hire a sales rep, partner with a consulting firm, or stay self-serve longer?",
                context:
                  "Product is self-serve. Enterprise L&D expects a sales contact. Building sales is expensive but may be necessary for $50K+ contracts.",
              },
              {
                q: "Pricing validation: is $29/seat/mo the right anchor? Should enterprise be usage-based, per-seat, or flat-fee?",
                context:
                  "SectionAI charges $750/seat. We're 25x cheaper. Is that an advantage or does it signal 'not serious'?",
              },
              {
                q: "TU Delft: formal spin-off, research partnership, or fully independent?",
                context:
                  "University backing adds credibility. But spin-off processes are slow and IP can get complicated.",
              },
              {
                q: "Target buyer: CEOs directly, L&D/HR teams, or consulting partners who resell?",
                context:
                  "Currently targeting CEOs. L&D teams hold the budget. Consultants have the relationships.",
              },
              {
                q: "Geography: start Netherlands/EU or go global immediately?",
                context:
                  "TU Delft gives EU anchor. EU AI regulation is driving upskilling demand. Product is English-only currently.",
              },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-sm font-bold text-stone-900">
                  {i + 1}. {item.q}
                </p>
                <p className="text-xs text-stone-500 mt-1">{item.context}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Footer ── */}
        <div className="text-center mt-4 mb-8">
          <p className="text-sm text-stone-500">
            <a
              href="mailto:derek@codevibing.com"
              className="text-indigo-600 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
            >
              derek@codevibing.com
            </a>
            {" · "}
            <a
              href="https://ai-growth.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
            >
              ai-growth.net
            </a>
          </p>
          <p className="text-xs text-stone-400 mt-2">March 2026</p>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

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

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-stone-50 border-2 border-stone-200 p-3 text-center">
      <p className="text-xl font-extrabold text-stone-900">{value}</p>
      <p className="text-[10px] text-stone-500 mt-1 leading-tight">{label}</p>
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
      <p className="text-xs text-stone-500 mt-1">{detail}</p>
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
