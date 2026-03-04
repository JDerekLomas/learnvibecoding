"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCVAuth, setCVAuth, clearCVAuth, verifyCVKey } from "@/lib/codevibing-auth";

export default function ConnectPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [connected, setConnected] = useState<string | null>(null);

  useEffect(() => {
    const auth = getCVAuth();
    if (auth) setConnected(auth.username);
  }, []);

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setVerifying(true);
    setError("");

    const result = await verifyCVKey(apiKey.trim());

    if (result.valid && result.username) {
      setCVAuth({ username: result.username, apiKey: apiKey.trim() });
      setConnected(result.username);
      setApiKey("");
    } else {
      setError("Invalid API key. Check that you copied it correctly.");
    }

    setVerifying(false);
  }

  function handleDisconnect() {
    clearCVAuth();
    setConnected(null);
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
      <div className="mx-auto max-w-md px-6 py-16 relative z-10">
        <h1 className="text-2xl font-extrabold text-stone-900 mb-2">
          Connect Your CodeVibing Account
        </h1>
        <p className="text-sm text-stone-500 mb-8">
          Link your codevibing.com identity to track your learning progress and share achievements with the community.
        </p>

        {connected ? (
          <div className="bg-white rounded-2xl border-2 border-emerald-300 p-6 shadow-lg shadow-emerald-100/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                {connected.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-stone-900">@{connected}</div>
                <div className="text-xs text-stone-500">Connected to codevibing.com</div>
              </div>
            </div>
            <p className="text-sm text-stone-600 mb-4">
              Your learning progress is linked to your community profile. Quiz results and curriculum progress will appear on your profile.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://codevibing.com/u/${connected}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
              >
                View Profile
              </a>
              <button
                onClick={handleDisconnect}
                className="px-3 py-2 rounded-xl text-xs font-medium border border-stone-200 text-stone-500 hover:bg-stone-50 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-2 border-stone-200 p-6 shadow-sm">
            <form onSubmit={handleConnect}>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Your API Key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="cv_..."
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-sm font-mono focus:outline-none focus:border-stone-400 transition-colors"
                autoFocus
              />
              {error && (
                <p className="text-xs text-red-600 mt-2">{error}</p>
              )}
              <button
                type="submit"
                disabled={verifying || !apiKey.trim()}
                className="mt-4 w-full px-4 py-3 rounded-xl text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors disabled:opacity-50"
              >
                {verifying ? "Verifying..." : "Connect Account"}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <p className="text-xs text-stone-500 mb-2">
                Don&apos;t have an account yet?
              </p>
              <a
                href="https://codevibing.com/join"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-xl text-sm font-semibold border-2 border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Join codevibing.com
              </a>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/journey" className="text-sm text-stone-500 hover:text-stone-700 transition-colors">
            Back to Journey
          </Link>
        </div>
      </div>
    </div>
  );
}
