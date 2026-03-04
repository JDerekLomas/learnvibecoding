import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy-init to avoid crashing the module if env vars are missing/malformed
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (_client) return _client;
  const url =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    _client = createClient(url.trim(), key.trim());
    return _client;
  } catch (e) {
    console.error("Failed to create Supabase client:", e);
    return null;
  }
}

// Proxy that silently no-ops if Supabase isn't configured
export const quizChatSupabase = {
  from(table: string) {
    const client = getClient();
    if (!client) {
      return {
        insert: () => Promise.resolve({ error: null }),
        select: () => Promise.resolve({ data: [], error: null }),
      } as unknown as ReturnType<SupabaseClient["from"]>;
    }
    return client.from(table);
  },
};
