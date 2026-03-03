import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data: team, error } = await supabase
    .from("teams")
    .select("id, slug, name, creator_name, created_at")
    .eq("slug", slug)
    .single();

  if (error || !team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  const { count } = await supabase
    .from("team_members")
    .select("id", { count: "exact", head: true })
    .eq("team_id", team.id);

  return NextResponse.json({
    ...team,
    memberCount: count || 0,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const ip = getClientIP(request);
    const { success } = rateLimit(`delete-team:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { slug } = await params;
    const { memberId } = await request.json();

    if (!memberId) {
      return NextResponse.json({ error: "memberId is required" }, { status: 400 });
    }

    // Find the team
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("id, creator_name")
      .eq("slug", slug)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Verify the requester is the creator (first member of the team)
    const { data: firstMember } = await supabase
      .from("team_members")
      .select("id")
      .eq("team_id", team.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    if (!firstMember || firstMember.id !== memberId) {
      return NextResponse.json({ error: "Only the team creator can delete the team" }, { status: 403 });
    }

    // Delete progress events for all members of this team
    const { data: members } = await supabase
      .from("team_members")
      .select("id")
      .eq("team_id", team.id);

    if (members && members.length > 0) {
      const memberIds = members.map((m) => m.id);
      await supabase.from("progress_events").delete().in("team_member_id", memberIds);
    }

    // Delete all members
    await supabase.from("team_members").delete().eq("team_id", team.id);

    // Delete the team
    await supabase.from("teams").delete().eq("id", team.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete team" }, { status: 500 });
  }
}
