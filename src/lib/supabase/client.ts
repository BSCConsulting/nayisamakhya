import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return Boolean(url && key && !url.includes("YOUR_PROJECT"));
}

/** Server-safe anon client. Returns null when env is missing (local static fallback). */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (cached) return cached;

  const fetchWithTimeout: typeof fetch = (input, init) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    if (init?.signal) {
      if (init.signal.aborted) controller.abort();
      else init.signal.addEventListener("abort", () => controller.abort(), { once: true });
    }
    return fetch(input, { ...init, signal: controller.signal }).finally(() =>
      clearTimeout(timeout),
    );
  };

  cached = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim(),
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: fetchWithTimeout },
    },
  );
  return cached;
}
