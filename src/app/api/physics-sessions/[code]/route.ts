import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const { data, error } = await supabase
    .from("physics_sessions")
    .select("short_code, display_name, progress, created_at, updated_at")
    .eq("short_code", code)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const ip = getClientIP(request);
  const { success } = rateLimit(`update-session:${ip}`, {
    limit: 30,
    windowMs: 60_000,
  });
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { progress, displayName } = await request.json();

  if (!progress || typeof progress !== "object") {
    return NextResponse.json(
      { error: "Progress data required" },
      { status: 400 }
    );
  }

  const update: Record<string, unknown> = {
    progress,
    updated_at: new Date().toISOString(),
  };
  if (displayName !== undefined) {
    update.display_name = displayName?.trim()?.slice(0, 50) || null;
  }

  const { error } = await supabase
    .from("physics_sessions")
    .update(update)
    .eq("short_code", code);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
