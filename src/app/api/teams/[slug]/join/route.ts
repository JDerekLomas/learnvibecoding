import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

const MAX_NAME_LENGTH = 50;
const MAX_TEAM_SIZE = 100;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Rate limit: 10 joins per IP per minute
  const ip = getClientIP(request);
  const { success } = rateLimit(`join-team:${ip}`, { limit: 10, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const { name } = await request.json();

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const cleanName = name.trim().slice(0, MAX_NAME_LENGTH);

  // Find the team
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("id, slug, name")
    .eq("slug", slug)
    .single();

  if (teamError || !team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  // Check existing membership (idempotent)
  const { data: existing } = await supabase
    .from("team_members")
    .select("id, name")
    .eq("team_id", team.id)
    .eq("name", cleanName)
    .single();

  if (existing) {
    return NextResponse.json({
      team: { id: team.id, slug: team.slug, name: team.name },
      member: { id: existing.id, name: existing.name },
    });
  }

  // Cap team size
  const { count } = await supabase
    .from("team_members")
    .select("id", { count: "exact", head: true })
    .eq("team_id", team.id);

  if ((count ?? 0) >= MAX_TEAM_SIZE) {
    return NextResponse.json(
      { error: "This team has reached its member limit" },
      { status: 400 }
    );
  }

  const { data: member, error: memberError } = await supabase
    .from("team_members")
    .insert({ team_id: team.id, name: cleanName })
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
