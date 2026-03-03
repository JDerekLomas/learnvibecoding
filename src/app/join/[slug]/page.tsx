"use client";

import { useState, useEffect, use } from "react";
import { setTeamContext, getTeamContext } from "@/lib/team";
import { useRouter } from "next/navigation";

interface TeamInfo {
  name: string;
  slug: string;
  creator_name: string;
  memberCount: number;
}

export default function JoinTeamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [team, setTeam] = useState<TeamInfo | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // If already on this team, redirect to journey
    const ctx = getTeamContext();
    if (ctx && ctx.teamSlug === slug) {
      router.replace("/journey");
      return;
    }

    fetch(`/api/teams/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Team not found")))
      .then((data) => setTeam(data))
      .catch(() => setError("Team not found. Check the invite link."))
      .finally(() => setFetching(false));
  }, [slug, router]);

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/teams/${slug}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to join team");

      setTeamContext({
        teamId: data.team.id,
        teamSlug: data.team.slug,
        teamName: data.team.name,
        memberId: data.member.id,
        memberName: data.member.name,
      });

      router.push("/journey");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <p className="text-stone-500 font-medium">Loading...</p>
      </div>
    );
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
          {team ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-extrabold text-stone-900">
                  Join {team.name}
                </h1>
                <p className="text-sm text-stone-500 mt-1">
                  Created by {team.creator_name} · {team.memberCount} member{team.memberCount !== 1 ? "s" : ""}
                </p>
              </div>

              <form onSubmit={handleJoin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-indigo-400 transition-colors"
                    autoFocus
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
                  {loading ? "Joining..." : "Join Team"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
