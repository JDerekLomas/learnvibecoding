import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

function generateCode(): string {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789"; // no 0/o/1/l ambiguity
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);
    const { success } = rateLimit(`create-session:${ip}`, {
      limit: 10,
      windowMs: 60_000,
    });
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const { displayName, progress } = await request.json();

    if (!progress || typeof progress !== "object") {
      return NextResponse.json(
        { error: "Progress data required" },
        { status: 400 }
      );
    }

    // Generate unique short code
    let code = generateCode();
    let attempts = 0;
    while (attempts < 5) {
      const { data: existing } = await supabase
        .from("physics_sessions")
        .select("id")
        .eq("short_code", code)
        .single();
      if (!existing) break;
      code = generateCode();
      attempts++;
    }

    const { data, error } = await supabase
      .from("physics_sessions")
      .insert({
        short_code: code,
        display_name: displayName?.trim()?.slice(0, 50) || null,
        progress,
      })
      .select("short_code")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ code: data.short_code });
  } catch {
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
