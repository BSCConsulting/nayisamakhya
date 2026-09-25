import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";
import { listDistricts } from "@/lib/data/districts";
import { listMandals } from "@/lib/data/mandals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type LocationDistrict = {
  id: string;
  slug: string;
  name_en: string;
  name_te: string;
};

export type LocationMandal = {
  id: string;
  district_id: string;
  slug: string;
  name_en: string;
  name_te: string;
};

function staticLocations(): {
  districts: LocationDistrict[];
  mandals: LocationMandal[];
} {
  // Phase 1: always expose all 33 districts from the canonical list.
  const districts: LocationDistrict[] = listDistricts()
    .map((d) => ({
      id: d.slug,
      slug: d.slug,
      name_en: d.name_en,
      name_te: d.name_te,
    }))
    .sort((a, b) => a.name_en.localeCompare(b.name_en));

  // Phase 2 will expand mandals; sample hubs only for now.
  const mandals: LocationMandal[] = listMandals()
    .map((m) => ({
      id: `${m.districtSlug}-${m.mandalSlug}`,
      district_id: m.districtSlug,
      slug: m.mandalSlug,
      name_en: m.mandal.en,
      name_te: m.mandal.te,
    }))
    .sort((a, b) => a.name_en.localeCompare(b.name_en));

  return { districts, mandals };
}

function mergeDistricts(
  base: LocationDistrict[],
  remote: LocationDistrict[],
): LocationDistrict[] {
  const bySlug = new Map(base.map((d) => [d.slug, d]));
  for (const row of remote) {
    bySlug.set(row.slug, row);
  }
  return [...bySlug.values()].sort((a, b) => a.name_en.localeCompare(b.name_en));
}

export async function GET() {
  const fallback = staticLocations();
  let districts = fallback.districts;
  let mandals = fallback.mandals;

  try {
    const supabase = getSupabase();
    if (supabase) {
      const [dRes, mRes] = await Promise.all([
        supabase
          .from("districts")
          .select("id, slug, name_en, name_te")
          .order("name_en", { ascending: true }),
        supabase
          .from("mandals")
          .select("id, district_id, slug, name_en, name_te")
          .order("name_en", { ascending: true }),
      ]);

      if (!dRes.error && dRes.data?.length) {
        // Merge so a partial Supabase seed cannot hide the full 33-district list.
        districts = mergeDistricts(
          fallback.districts,
          dRes.data as LocationDistrict[],
        );
      }
      if (!mRes.error && mRes.data?.length) {
        mandals = mRes.data as LocationMandal[];
      }
    }
  } catch {
    // keep static fallback
  }

  return NextResponse.json(
    { districts, mandals },
    {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
