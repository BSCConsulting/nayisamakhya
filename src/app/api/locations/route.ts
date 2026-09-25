import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";
import { listDistricts } from "@/lib/data/districts";
import { listMandalsDirectory } from "@/lib/data/mandalsDirectory";

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
  // Client selector uses slug as district id so cascading stays stable
  // whether data comes from static files or Supabase UUIDs.
  const districts: LocationDistrict[] = listDistricts()
    .map((d) => ({
      id: d.slug,
      slug: d.slug,
      name_en: d.name_en,
      name_te: d.name_te,
    }))
    .sort((a, b) => a.name_en.localeCompare(b.name_en));

  const mandals: LocationMandal[] = listMandalsDirectory()
    .map((m) => ({
      id: `${m.district_slug}-${m.slug}`,
      district_id: m.district_slug,
      slug: m.slug,
      name_en: m.name_en,
      name_te: m.name_te,
    }))
    .sort((a, b) => a.name_en.localeCompare(b.name_en));

  return { districts, mandals };
}

function mergeBySlug<T extends { slug: string }>(
  base: T[],
  remote: T[],
  keyFn: (row: T) => string = (row) => row.slug,
): T[] {
  const map = new Map(base.map((row) => [keyFn(row), row]));
  for (const row of remote) {
    map.set(keyFn(row), row);
  }
  return [...map.values()];
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

      const uuidToSlug = new Map<string, string>();
      if (!dRes.error && dRes.data?.length) {
        for (const row of dRes.data as Array<{
          id: string;
          slug: string;
          name_en: string;
          name_te: string;
        }>) {
          uuidToSlug.set(row.id, row.slug);
        }
        const remoteDistricts: LocationDistrict[] = (
          dRes.data as Array<{
            id: string;
            slug: string;
            name_en: string;
            name_te: string;
          }>
        ).map((row) => ({
          id: row.slug,
          slug: row.slug,
          name_en: row.name_en,
          name_te: row.name_te,
        }));
        districts = mergeBySlug(fallback.districts, remoteDistricts).sort(
          (a, b) => a.name_en.localeCompare(b.name_en),
        );
      }

      if (!mRes.error && mRes.data?.length) {
        const remoteMandals: LocationMandal[] = (
          mRes.data as Array<{
            id: string;
            district_id: string;
            slug: string;
            name_en: string;
            name_te: string;
          }>
        )
          .map((row) => {
            const districtSlug =
              uuidToSlug.get(row.district_id) || row.district_id;
            return {
              id: row.id,
              district_id: districtSlug,
              slug: row.slug,
              name_en: row.name_en,
              name_te: row.name_te,
            };
          })
          .filter((row) => Boolean(row.district_id));

        mandals = mergeBySlug(
          fallback.mandals,
          remoteMandals,
          (row) => `${row.district_id}::${row.slug}`,
        ).sort((a, b) => a.name_en.localeCompare(b.name_en));
      }
    }
  } catch {
    // keep static fallback
  }

  return NextResponse.json(
    {
      districts,
      mandals,
      meta: {
        district_count: districts.length,
        mandal_count: mandals.length,
        phase: "districts+mandals",
      },
    },
    {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
