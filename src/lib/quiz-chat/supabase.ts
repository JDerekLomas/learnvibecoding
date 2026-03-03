import { createClient } from "@supabase/supabase-js";

// Use NEXT_PUBLIC_ versions to avoid needing extra env vars —
// the anon key with RLS insert policies is already configured.
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const quizChatSupabase = createClient(supabaseUrl, supabaseKey);
