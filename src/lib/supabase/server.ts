import { createClient } from "@supabase/supabase-js";

// Server-side admin client. Requires SUPABASE_SERVICE_ROLE_KEY in env.
// Falls back to anon key if service role not configured (admin writes will fail
// on admin-only tables, but tracking/submissions still work via RLS policies).
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
