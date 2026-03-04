const STORAGE_KEY = "cv-auth";

export interface CVAuth {
  username: string;
  apiKey: string;
}

export function getCVAuth(): CVAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCVAuth(auth: CVAuth) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
}

export function clearCVAuth() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function verifyCVKey(apiKey: string): Promise<{ valid: boolean; username?: string }> {
  try {
    const res = await fetch("/api/cv-auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    if (!res.ok) return { valid: false };
    return await res.json();
  } catch {
    return { valid: false };
  }
}
