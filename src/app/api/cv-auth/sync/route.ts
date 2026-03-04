import { NextRequest, NextResponse } from "next/server";

// POST /api/cv-auth/sync — proxy learning progress to codevibing.com
export async function POST(request: NextRequest) {
  try {
    const { apiKey, progress } = await request.json();

    if (!apiKey || !progress) {
      return NextResponse.json({ error: "apiKey and progress required" }, { status: 400 });
    }

    const res = await fetch("https://codevibing.com/api/profile/learning", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ progress }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Sync failed" }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
