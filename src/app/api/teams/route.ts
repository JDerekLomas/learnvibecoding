import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

const MAX_TEAM_NAME_LENGTH = 100;
const MAX_NAME_LENGTH = 50;

function generateSlug(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  for (let i = 0; i < 6; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

export async function POST(request: Request) {
  try {
    // Rate limit: 5 team creations per IP per minute
    const ip = getClientIP(request);
    const { success } = rateLimit(`create-team:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { teamName, creatorName } = await request.json();

    if (!teamName?.trim() || !creatorName?.trim()) {
      return NextResponse.json(
        { error: "Team name and your name are required" },
        { status: 400 }
      );
    }

    const cleanTeamName = teamName.trim().slice(0, MAX_TEAM_NAME_LENGTH);
    const cleanCreatorName = creatorName.trim().slice(0, MAX_NAME_LENGTH);

    // Generate a unique slug (retry on collision)
    let slug = generateSlug();
    let attempts = 0;
    while (attempts < 5) {
      const { data: existing } = await supabase
        .from("teams")
        .select("id")
        .eq("slug", slug)
        .single();
      if (!existing) break;
      slug = generateSlug();
      attempts++;
    }

    // Create the team
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .insert({ slug, name: cleanTeamName, creator_name: cleanCreatorName })
      .select()
      .single();

    if (teamError) {
      return NextResponse.json({ error: teamError.message }, { status: 500 });
    }

    // Auto-join the creator as a member
    const { data: member, error: memberError } = await supabase
      .from("team_members")
      .insert({ team_id: team.id, name: cleanCreatorName })
      .select()
      .single();

    if (memberError) {
      return NextResponse.json({ error: memberError.message }, { status: 500 });
    }

    return NextResponse.json({
      team: { id: team.id, slug: team.slug, name: team.name },
      member: { id: member.id, name: member.name },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}
