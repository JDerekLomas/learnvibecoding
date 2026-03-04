import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const res = await fetch("https://codevibing.com/api/auth/claim", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      return NextResponse.json({ valid: false });
    }

    const data = await res.json();
    return NextResponse.json({ valid: true, username: data.username });
  } catch {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
