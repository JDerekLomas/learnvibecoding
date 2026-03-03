import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // Rate limit: 30 progress events per IP per minute
    const ip = getClientIP(request);
    const { success } = rateLimit(`progress:${ip}`, { limit: 30, windowMs: 60_000 });
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { memberId, step, status, metadata } = await request.json();

    if (!memberId || !step || !status) {
      return NextResponse.json(
        { error: "memberId, step, and status are required" },
        { status: 400 }
      );
    }

    const validSteps = ["discover", "assess", "learn", "practice", "share"];
    const validStatuses = ["started", "completed"];

    if (!validSteps.includes(step)) {
      return NextResponse.json({ error: "Invalid step" }, { status: 400 });
    }
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Validate that the memberId actually exists
    const { data: member, error: memberError } = await supabase
      .from("team_members")
      .select("id")
      .eq("id", memberId)
      .single();

    if (memberError || !member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const { error } = await supabase.from("progress_events").insert({
      team_member_id: memberId,
      step,
      status,
      metadata: metadata || {},
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to log progress" },
      { status: 500 }
    );
  }
}
