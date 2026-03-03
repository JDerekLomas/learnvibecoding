import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  try {
    const ip = getClientIP(request);
    const { success } = rateLimit(`remove-member:${ip}`, { limit: 10, windowMs: 60_000 });
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { slug, id: targetMemberId } = await params;
    const { memberId: requesterId } = await request.json();

    if (!requesterId) {
      return NextResponse.json({ error: "memberId is required" }, { status: 400 });
    }

    // Find the team
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("id")
      .eq("slug", slug)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Check if this is self-removal or creator removing someone else
    const isSelfRemoval = requesterId === targetMemberId;

    if (!isSelfRemoval) {
      // Verify the requester is the creator (first member)
      const { data: firstMember } = await supabase
        .from("team_members")
        .select("id")
        .eq("team_id", team.id)
        .order("created_at", { ascending: true })
        .limit(1)
        .single();

      if (!firstMember || firstMember.id !== requesterId) {
        return NextResponse.json(
          { error: "Only the team creator can remove other members" },
          { status: 403 }
        );
      }

      // Don't let creator remove themselves via this endpoint (use DELETE /teams/[slug] instead)
      if (targetMemberId === firstMember.id) {
        return NextResponse.json(
          { error: "Creator cannot be removed. Delete the team instead." },
          { status: 400 }
        );
      }
    }

    // Verify target member exists and belongs to this team
    const { data: targetMember } = await supabase
      .from("team_members")
      .select("id")
      .eq("id", targetMemberId)
      .eq("team_id", team.id)
      .single();

    if (!targetMember) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Delete progress events for this member
    await supabase.from("progress_events").delete().eq("team_member_id", targetMemberId);

    // Delete the member
    await supabase.from("team_members").delete().eq("id", targetMemberId);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to remove member" }, { status: 500 });
  }
}
