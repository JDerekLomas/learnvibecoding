import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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
