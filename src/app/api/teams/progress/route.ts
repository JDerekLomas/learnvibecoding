import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
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
