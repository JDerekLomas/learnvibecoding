import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

// GET /api/physics-sessions/[code] — get session + all learners
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const { data: session, error: sessionError } = await supabase
    .from("physics_sessions")
    .select("short_code, display_name, created_at, progress")
    .eq("short_code", code)
    .single();

  if (sessionError || !session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const { data: learners } = await supabase
    .from("physics_learners")
    .select("id, name, progress, created_at, updated_at")
    .eq("session_code", code)
    .order("created_at", { ascending: true });

  return NextResponse.json({
    ...session,
    learners: learners || [],
  });
}

// POST /api/physics-sessions/[code] — join as a learner
export async function POST(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const ip = getClientIP(request);
  const { success } = rateLimit(`join-session:${ip}`, {
    limit: 10,
    windowMs: 60_000,
  });
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { name } = await request.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  // Verify session exists
  const { data: session } = await supabase
    .from("physics_sessions")
    .select("id")
    .eq("short_code", code)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  // Cap at 50 learners per session
  const { count } = await supabase
    .from("physics_learners")
    .select("id", { count: "exact", head: true })
    .eq("session_code", code);

  if (count && count >= 50) {
    return NextResponse.json({ error: "Session is full" }, { status: 400 });
  }

  const { data: learner, error } = await supabase
    .from("physics_learners")
    .insert({
      session_code: code,
      name: name.trim().slice(0, 50),
      progress: {},
    })
    .select("id, name")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(learner);
}
