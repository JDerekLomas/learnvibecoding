import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function generateSlug(): string {
  // 6-char alphanumeric slug
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  for (let i = 0; i < 6; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}

export async function POST(request: Request) {
  try {
    const { teamName, creatorName } = await request.json();

    if (!teamName?.trim() || !creatorName?.trim()) {
      return NextResponse.json(
        { error: "Team name and your name are required" },
        { status: 400 }
      );
    }

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
      .insert({ slug, name: teamName.trim(), creator_name: creatorName.trim() })
      .select()
      .single();

    if (teamError) {
      return NextResponse.json({ error: teamError.message }, { status: 500 });
    }

    // Auto-join the creator as a member
    const { data: member, error: memberError } = await supabase
      .from("team_members")
      .insert({ team_id: team.id, name: creatorName.trim() })
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
