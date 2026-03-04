import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

// PATCH /api/physics-sessions/[code]/learners/[id] — sync progress
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ code: string; id: string }> }
) {
  const { code, id } = await params;

  const ip = getClientIP(request);
  const { success } = rateLimit(`sync-learner:${ip}`, {
    limit: 30,
    windowMs: 60_000,
  });
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { progress } = await request.json();

  if (!progress || typeof progress !== "object") {
    return NextResponse.json(
      { error: "Progress data required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("physics_learners")
    .update({
      progress,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("session_code", code);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
