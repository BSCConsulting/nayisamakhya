import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminCached: SupabaseClient | null = null;

/** Service-role client for webhook + moderation mutations. Returns null if unset. */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key || url.includes("YOUR_PROJECT")) return null;
  if (adminCached) return adminCached;

  adminCached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminCached;
}
