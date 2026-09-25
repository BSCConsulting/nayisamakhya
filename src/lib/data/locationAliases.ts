/**
 * Normalize location slugs from live Supabase so duplicate backend rows
 * (e.g. ranga-reddy vs rangareddy) collapse to the canonical directory.
 */

const DISTRICT_SLUG_ALIASES: Record<string, string> = {
  "ranga-reddy": "rangareddy",
};

const MANDAL_SLUG_ALIASES: Record<string, string> = {
  thallada: "tallada",
  kallur: "kalluru",
  chivvemla: "chivemla",
};

export function canonicalDistrictSlug(slug: string): string {
  return DISTRICT_SLUG_ALIASES[slug] || slug;
}

export function canonicalMandalSlug(slug: string): string {
  return MANDAL_SLUG_ALIASES[slug] || slug;
}
