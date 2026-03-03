import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Get team
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("id, slug, name, creator_name, created_at")
    .eq("slug", slug)
    .single();

  if (teamError || !team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  // Get all members
  const { data: members } = await supabase
    .from("team_members")
    .select("id, name, created_at")
    .eq("team_id", team.id)
    .order("created_at", { ascending: true });

  // Get all progress events for this team's members
  const memberIds = (members || []).map((m) => m.id);

  let progressEvents: Array<{
    team_member_id: string;
    step: string;
    status: string;
    metadata: Record<string, unknown>;
    created_at: string;
  }> = [];

  if (memberIds.length > 0) {
    const { data } = await supabase
      .from("progress_events")
      .select("team_member_id, step, status, metadata, created_at")
      .in("team_member_id", memberIds)
      .order("created_at", { ascending: false });
    progressEvents = data || [];
  }

  // Build progress summary per member: latest status per step
  const steps = ["discover", "assess", "learn", "practice", "share"] as const;
  const memberProgress = (members || []).map((member) => {
    const memberEvents = progressEvents.filter(
      (e) => e.team_member_id === member.id
    );
    const progress: Record<string, { status: string; metadata: Record<string, unknown> } | null> = {};
    for (const step of steps) {
      const latest = memberEvents.find((e) => e.step === step);
      progress[step] = latest
        ? { status: latest.status, metadata: latest.metadata }
        : null;
    }
    return {
      id: member.id,
      name: member.name,
      joinedAt: member.created_at,
      progress,
    };
  });

  return NextResponse.json({
    team: {
      id: team.id,
      slug: team.slug,
      name: team.name,
      creatorName: team.creator_name,
      createdAt: team.created_at,
    },
    members: memberProgress,
  });
}
