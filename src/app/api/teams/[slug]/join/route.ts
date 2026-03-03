import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { name } = await request.json();

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  // Find the team
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("id, slug, name")
    .eq("slug", slug)
    .single();

  if (teamError || !team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  // Join (or get existing membership if already joined)
  const { data: existing } = await supabase
    .from("team_members")
    .select("id, name")
    .eq("team_id", team.id)
    .eq("name", name.trim())
    .single();

  if (existing) {
    return NextResponse.json({
      team: { id: team.id, slug: team.slug, name: team.name },
      member: { id: existing.id, name: existing.name },
    });
  }

  const { data: member, error: memberError } = await supabase
    .from("team_members")
    .insert({ team_id: team.id, name: name.trim() })
    .select()
    .single();

  if (memberError) {
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  return NextResponse.json({
    team: { id: team.id, slug: team.slug, name: team.name },
    member: { id: member.id, name: member.name },
  });
}
