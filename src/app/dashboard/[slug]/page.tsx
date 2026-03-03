"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

interface MemberProgress {
  id: string;
  name: string;
  joinedAt: string;
  progress: Record<string, { status: string; metadata: Record<string, unknown> } | null>;
}

interface DashboardData {
  team: {
    id: string;
    slug: string;
    name: string;
    creatorName: string;
    createdAt: string;
  };
  members: MemberProgress[];
}

const STEPS = [
  { key: "discover", label: "Discover", short: "D" },
  { key: "assess", label: "Assess", short: "A" },
  { key: "learn", label: "Learn", short: "L" },
  { key: "practice", label: "Practice", short: "P" },
  { key: "share", label: "Share", short: "S" },
];

function StatusCell({ value }: { value: { status: string } | null }) {
  if (!value) {
    return (
      <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200" />
    );
  }
  if (value.status === "completed") {
    return (
      <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
    );
  }
  // started
  return (
    <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-white" />
    </div>
  );
}

export default function DashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/teams/${slug}/dashboard`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Not found")))
      .then(setData)
      .catch(() => setError("Team not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  function handleCopyInvite() {
    navigator.clipboard.writeText(`${window.location.origin}/join/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <p className="text-stone-500 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <p className="text-red-600 font-medium">{error || "Something went wrong"}</p>
      </div>
    );
  }

  const completionCounts = STEPS.map((step) => ({
    ...step,
    completed: data.members.filter(
      (m) => m.progress[step.key]?.status === "completed"
    ).length,
  }));

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
      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Header */}
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-extrabold text-stone-900">
              {data.team.name}
            </h1>
            <span className="text-sm text-stone-400 font-medium">
              {data.members.length} member{data.members.length !== 1 ? "s" : ""}
            </span>
          </div>
          <p className="text-sm text-stone-500 mb-4">
            Created by {data.team.creatorName}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleCopyInvite}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
            >
              {copied ? "Copied!" : "Copy Invite Link"}
            </button>
            <Link
              href="/journey"
              className="px-4 py-2 rounded-xl border-2 border-stone-200 text-stone-700 text-sm font-semibold hover:bg-stone-50 transition-colors"
            >
              My Journey
            </Link>
          </div>
        </div>

        {/* Summary bar */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {completionCounts.map((s) => (
            <div
              key={s.key}
              className="bg-white rounded-xl border-2 border-stone-200 p-3 text-center"
            >
              <div className="text-2xl font-extrabold text-stone-900">
                {s.completed}
                <span className="text-sm font-medium text-stone-400">
                  /{data.members.length}
                </span>
              </div>
              <div className="text-xs text-stone-500 font-semibold mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Members grid */}
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_repeat(5,40px)] gap-2 px-5 py-3 border-b-2 border-stone-100 bg-stone-50">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Member
            </div>
            {STEPS.map((s) => (
              <div
                key={s.key}
                className="text-xs font-bold text-stone-400 uppercase tracking-wider text-center"
                title={s.label}
              >
                {s.short}
              </div>
            ))}
          </div>

          {/* Member rows */}
          {data.members.map((member) => (
            <div
              key={member.id}
              className="grid grid-cols-[1fr_repeat(5,40px)] gap-2 px-5 py-3 border-b border-stone-100 last:border-b-0 items-center"
            >
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  {member.name}
                </p>
              </div>
              {STEPS.map((step) => (
                <div key={step.key} className="flex justify-center">
                  <StatusCell value={member.progress[step.key]} />
                </div>
              ))}
            </div>
          ))}

          {data.members.length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-stone-500">
                No members yet. Share the invite link to get started.
              </p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-stone-100 border border-stone-200" />
            <span className="text-xs text-stone-400">Not started</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-400" />
            <span className="text-xs text-stone-400">In progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500" />
            <span className="text-xs text-stone-400">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
