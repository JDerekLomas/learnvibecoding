const STORAGE_KEY = "ai-growth-team";

export interface TeamContext {
  teamId: string;
  teamSlug: string;
  teamName: string;
  memberId: string;
  memberName: string;
}

export type JourneyStep = "discover" | "assess" | "learn" | "practice" | "share";
export type StepStatus = "started" | "completed";

export function getTeamContext(): TeamContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setTeamContext(ctx: TeamContext) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ctx));
}

export function clearTeamContext() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Report a progress event to the server.
 * No-op if user has no team context (solo learner).
 */
export async function reportProgress(
  step: JourneyStep,
  status: StepStatus,
  metadata?: Record<string, unknown>
): Promise<void> {
  const ctx = getTeamContext();
  if (!ctx) return; // Solo learner — no tracking

  try {
    await fetch("/api/teams/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId: ctx.memberId,
        step,
        status,
        metadata,
      }),
    });
  } catch {
    // Best-effort — don't block the UI
  }
}
