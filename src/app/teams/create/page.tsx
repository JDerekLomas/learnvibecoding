"use client";

import { useState } from "react";
import { setTeamContext } from "@/lib/team";
import { useRouter } from "next/navigation";

export default function CreateTeamPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    slug: string;
    inviteUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!teamName.trim() || !creatorName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName: teamName.trim(), creatorName: creatorName.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create team");

      // Save team context
      setTeamContext({
        teamId: data.team.id,
        teamSlug: data.team.slug,
        teamName: data.team.name,
        memberId: data.member.id,
        memberName: data.member.name,
      });

      const inviteUrl = `${window.location.origin}/join/${data.team.slug}`;
      setResult({ slug: data.team.slug, inviteUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
      <div className="mx-auto max-w-md px-6 py-12 relative z-10">
        <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-8">
          <h1 className="text-2xl font-extrabold text-stone-900 text-center mb-2">
            Create a Team
          </h1>
          <p className="text-sm text-stone-500 text-center mb-8">
            Set up a learning group. Share the invite link to get everyone started.
          </p>

          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Team name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Product Engineering"
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Your name
                </label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-600 transition-all disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Team"}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-emerald-700 mb-1">
                  Team created!
                </p>
                <p className="text-xs text-emerald-600">
                  Share this link with your team members.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-700">
                  Invite link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={result.inviteUrl}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-700 text-sm font-mono"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors shrink-0"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/journey")}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-violet-600 transition-all"
                >
                  Start Learning
                </button>
                <button
                  onClick={() => router.push(`/dashboard/${result.slug}`)}
                  className="flex-1 py-3.5 rounded-xl border-2 border-stone-200 text-stone-700 font-semibold hover:bg-stone-50 transition-colors"
                >
                  Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
