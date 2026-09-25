import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";
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
  const districtMap = new Map<string, LocationDistrict>();
  const mandalRows: LocationMandal[] = [];

  for (const m of listMandals()) {
    if (!districtMap.has(m.districtSlug)) {
      districtMap.set(m.districtSlug, {
        id: m.districtSlug,
        slug: m.districtSlug,
        name_en: m.district.en,
        name_te: m.district.te,
      });
    }
    mandalRows.push({
      id: `${m.districtSlug}-${m.mandalSlug}`,
      district_id: m.districtSlug,
      slug: m.mandalSlug,
      name_en: m.mandal.en,
      name_te: m.mandal.te,
    });
  }

  const districts = [...districtMap.values()].sort((a, b) =>
    a.name_en.localeCompare(b.name_en),
  );
  const mandals = mandalRows.sort((a, b) => a.name_en.localeCompare(b.name_en));
  return { districts, mandals };
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
        districts = dRes.data as LocationDistrict[];
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
