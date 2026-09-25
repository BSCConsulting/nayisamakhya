import type {
  GramPanchayat,
  Mandal,
  MandalAction,
  MandalNotice,
  Officer,
} from "@/lib/types";
import { getMandal, listMandals } from "@/lib/data/mandals";
import { getSupabase } from "@/lib/supabase/client";

type DistrictRow = {
  slug: string;
  name_en: string;
  name_te: string;
};

type MandalRow = {
  id: string;
  slug: string;
  name_en: string;
  name_te: string;
  total_households: number;
  salons_count: number;
  artistes_count: number;
  free_power_pct: number | null;
  survey_completion_pct: number;
  portal_headline_te: string | null;
  portal_headline_en: string | null;
  portal_sub_te: string | null;
  portal_sub_en: string | null;
  whatsapp_group: string | null;
  cartel_whatsapp: string | null;
  districts: DistrictRow | DistrictRow[] | null;
};

type OfficerRow = {
  name_en: string;
  name_te: string;
  role_title_en: string;
  role_title_te: string;
  phone_number: string;
  whatsapp_link: string | null;
  photo_url: string | null;
  jurisdiction_en: string | null;
  jurisdiction_te: string | null;
};

type GpRow = {
  id: string;
  name_en: string;
  name_te: string;
  households_count: number;
  survey_pct: number;
};

type UpdateRow = {
  id: string;
  caption_te: string | null;
  caption_en: string | null;
  image_urls: string[];
  published_at: string | null;
  category: string;
};

function districtOf(row: MandalRow): DistrictRow | null {
  const d = row.districts;
  if (!d) return null;
  return Array.isArray(d) ? d[0] ?? null : d;
}

function buildActions(
  shortTe: string,
  mandalEn: string,
  districtTe: string,
  districtEn: string,
  cartelHref: string,
): MandalAction[] {
  return [
    {
      id: "cartel",
      title: {
        te: `${shortTe} సెలూన్ కొనుగోలు కార్టెల్`,
        en: `${mandalEn} Salon Wholesale Cartel`,
      },
      description: {
        te: `కత్తెరలు, క్లిప్పర్లు, సెలూన్ కుర్చీలు, కాస్మెటిక్ కిట్లు — ఫ్యాక్టరీ ధరలకు. మధ్యవర్తులు లేకుండా ${districtTe}లో సమూహ కొనుగోలు.`,
        en: `Scissors, clippers, salon chairs, and cosmetic kits at factory prices — eliminating middleman margins across ${districtEn} district.`,
      },
      cta: { te: "కార్టెల్ బల్క్ ఆర్డర్ నమోదు", en: "Register cartel bulk order" },
      href: cartelHref,
      external: true,
    },
    {
      id: "power",
      title: {
        te: "250 యూనిట్ల ఉచిత విద్యుత్ గ్రీవెన్స్ సెల్",
        en: "250-Unit Free Power Grievance Cell",
      },
      description: {
        te: "పట్టణ & గ్రామీణ సబ్-స్టేషన్ల వద్ద పెండింగ్ సబ్సిడీ దరఖాస్తులు క్లియర్ చేయడానికి స్థానిక మార్గదర్శకం.",
        en: "Local guidance to resolve pending power subsidy applications at town and rural sub-stations.",
      },
      cta: { te: "వినతి పత్రం కాపీ డౌన్‌లోడ్", en: "Download petition copy" },
      href: "/discom-petition.txt",
    },
    {
      id: "artisans",
      title: {
        te: "స్థానిక భజంత్రి & కళాకారుల రక్షణ విభాగం",
        en: "Local Bajantri & Artisans Wing",
      },
      description: {
        te: "దేవాలయ గౌరవాలు, సాంస్కృతిక శాఖ పెన్షన్ డాక్యుమెంటేషన్, పండుగ నమోదు.",
        en: "Temple honors advocacy, cultural department pension documentation, and festival engagement registry.",
      },
      cta: { te: "కళాకారుల జాబితా చూడండి", en: "View artiste registry" },
      href: "/verticals/bajantri",
    },
  ];
}

function mapOfficer(row: OfficerRow | null, mandalTe: string, mandalEn: string): Officer {
  if (!row) {
    return {
      name: { te: "నియామకం పెండింగ్", en: "Appointment pending" },
      title: {
        te: "మండల నోడల్ అధికారి",
        en: "Mandal Nodal Officer",
      },
      phone: "919876543210",
      status: { te: "నియామకం పెండింగ్", en: "Pending appointment" },
      initials: "—",
      jurisdiction: {
        te: `${mandalTe} & అనుబంధ గ్రామాలు`,
        en: `${mandalEn} & affiliated villages`,
      },
    };
  }
  const initials =
    row.name_te.trim().charAt(0) || row.name_en.trim().charAt(0) || "O";
  return {
    name: { te: row.name_te, en: row.name_en },
    title: { te: row.role_title_te, en: row.role_title_en },
    phone: row.phone_number.replace(/^\+/, ""),
    status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
    initials,
    jurisdiction: {
      te: row.jurisdiction_te || `${mandalTe} & అనుబంధ గ్రామాలు`,
      en: row.jurisdiction_en || `${mandalEn} & affiliated villages`,
    },
    portrait: row.photo_url || undefined,
  };
}

function mapGps(rows: GpRow[]): GramPanchayat[] {
  return rows.map((gp) => ({
    id: gp.id,
    name: { te: gp.name_te, en: gp.name_en },
    households: gp.households_count,
    surveyPct: gp.survey_pct,
  }));
}

function mapNotices(rows: UpdateRow[]): MandalNotice[] {
  return rows.map((u) => ({
    id: u.id,
    title: {
      te: u.caption_te || u.category,
      en: u.caption_en || u.category,
    },
    date: (u.published_at || new Date().toISOString()).slice(0, 10),
    image:
      u.image_urls?.[0] ||
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800",
  }));
}

function mapRowToMandal(
  row: MandalRow,
  officer: OfficerRow | null,
  gps: GpRow[],
  updates: UpdateRow[],
): Mandal {
  const district = districtOf(row);
  const districtSlug = district?.slug ?? "unknown";
  const path = `/${districtSlug}/${row.slug}`;
  const shortTe = row.name_te.replace(/ మండలం$/, "");
  const districtTe = district?.name_te ?? districtSlug;
  const districtEn = district?.name_en ?? districtSlug;
  const cartel =
    row.cartel_whatsapp ||
    "https://chat.whatsapp.com/invite/salon-cartel-demo";

  return {
    districtSlug,
    mandalSlug: row.slug,
    path,
    surveyPath: `${path}/survey`,
    state: { te: "తెలంగాణ", en: "Telangana" },
    district: { te: districtTe, en: districtEn },
    mandal: { te: row.name_te, en: row.name_en },
    hubTitle: {
      te: `${shortTe} మండల సమాఖ్య కేంద్రం`,
      en: `${row.name_en} Mandal Samakhya Hub`,
    },
    portalHeadline: {
      te:
        row.portal_headline_te ||
        `${shortTe} మండల నాయీ - భజంత్రి సమాఖ్య అధికారిక వేదిక`,
      en:
        row.portal_headline_en ||
        `Official ${row.name_en} Mandal Nayi–Bajantri Samakhya Portal`,
    },
    portalSub: {
      te:
        row.portal_sub_te ||
        "మండల స్థాయి సంక్షేమం, సెలూన్ వ్యాపార బలోపేతం, సాంప్రదాయ కళాకారుల రక్షణ మరియు సమగ్ర కుటుంబ సేవలు.",
      en:
        row.portal_sub_en ||
        "Mandal welfare, salon enterprise support, traditional artiste protection, and comprehensive family services.",
    },
    summary: {
      households: row.total_households,
      salons: row.salons_count,
      bajantri: row.artistes_count,
      freePowerPct: row.free_power_pct ?? 0,
      surveyPct: row.survey_completion_pct,
      gpCount: gps.length,
    },
    officer: mapOfficer(officer, row.name_te, row.name_en),
    whatsappGroup:
      row.whatsapp_group ||
      officer?.whatsapp_link ||
      "https://chat.whatsapp.com/invite/nayi-demo",
    telegramChannel: "https://t.me/nayi_samakhya_demo",
    cartelWhatsapp: cartel,
    gramPanchayats: mapGps(gps),
    actions: buildActions(shortTe, row.name_en, districtTe, districtEn, cartel),
    notices: mapNotices(updates),
  };
}

/**
 * Resolve a mandal portal payload.
 * Prefers Supabase when env is configured; falls back to static `mandals.ts`.
 */
export async function fetchMandalPortal(
  districtSlug: string,
  mandalSlug: string,
): Promise<Mandal | undefined> {
  const supabase = getSupabase();

  if (!supabase) {
    return getMandal(districtSlug, mandalSlug);
  }

  try {
    const { data: mandalData, error } = await supabase
      .from("mandals")
      .select(
        `
        *,
        districts!inner(slug, name_en, name_te)
      `,
      )
      .eq("slug", mandalSlug)
      .eq("districts.slug", districtSlug)
      .maybeSingle();

    if (error || !mandalData) {
      return getMandal(districtSlug, mandalSlug);
    }

    const row = mandalData as MandalRow;

    const [officerRes, gpsRes, updatesRes] = await Promise.all([
      supabase
        .from("officers")
        .select("*")
        .eq("mandal_id", row.id)
        .eq("is_active", true)
        .maybeSingle(),
      supabase
        .from("gram_panchayats")
        .select("*")
        .eq("mandal_id", row.id)
        .order("name_en", { ascending: true }),
      supabase
        .from("local_updates")
        .select("*")
        .eq("mandal_slug", mandalSlug)
        .eq("district_slug", districtSlug)
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(6),
    ]);

    return mapRowToMandal(
      row,
      (officerRes.data as OfficerRow | null) ?? null,
      (gpsRes.data as GpRow[] | null) ?? [],
      (updatesRes.data as UpdateRow[] | null) ?? [],
    );
  } catch {
    return getMandal(districtSlug, mandalSlug);
  }
}

export async function listMandalPortalParams(): Promise<
  { district: string; mandal: string }[]
> {
  const supabase = getSupabase();
  if (!supabase) {
    return listMandals().map((m) => ({
      district: m.districtSlug,
      mandal: m.mandalSlug,
    }));
  }

  try {
    const { data } = await supabase.from("mandals").select(`
      slug,
      districts!inner(slug)
    `);
    if (!data?.length) {
      return listMandals().map((m) => ({
        district: m.districtSlug,
        mandal: m.mandalSlug,
      }));
    }
    return data.map((row) => {
      const d = row.districts as DistrictRow | DistrictRow[] | null;
      const district = Array.isArray(d) ? d[0]?.slug : d?.slug;
      return {
        district: district || "unknown",
        mandal: row.slug as string,
      };
    });
  } catch {
    return listMandals().map((m) => ({
      district: m.districtSlug,
      mandal: m.mandalSlug,
    }));
  }
}
