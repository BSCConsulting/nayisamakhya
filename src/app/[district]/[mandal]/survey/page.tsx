import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSupabase } from "@/lib/supabase/client";
import { getMandal } from "@/lib/data/mandals";
import { SurveyWizard } from "@/components/SurveyWizard";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ district: string; mandal: string }>;
};

type GpOption = { id: string; nameTe: string; nameEn: string };

type SurveyContext = {
  districtSlug: string;
  mandalSlug: string;
  districtNameTe: string;
  districtNameEn: string;
  mandalNameTe: string;
  mandalNameEn: string;
  gramPanchayats: GpOption[];
};

function fromStatic(district: string, mandal: string): SurveyContext | null {
  const staticMandal = getMandal(district, mandal);
  if (!staticMandal) return null;
  return {
    districtSlug: staticMandal.districtSlug,
    mandalSlug: staticMandal.mandalSlug,
    districtNameTe: staticMandal.district.te,
    districtNameEn: staticMandal.district.en,
    mandalNameTe: staticMandal.mandal.te,
    mandalNameEn: staticMandal.mandal.en,
    gramPanchayats: staticMandal.gramPanchayats.map((gp) => ({
      id: gp.id,
      nameTe: gp.name.te,
      nameEn: gp.name.en,
    })),
  };
}

async function resolveSurveyContext(
  district: string,
  mandal: string,
): Promise<SurveyContext | null> {
  const fallback = fromStatic(district, mandal);
  const supabase = getSupabase();
  if (!supabase) return fallback;

  try {
    const { data: row, error } = await supabase
      .from("mandals")
      .select(
        `
        id,
        slug,
        name_en,
        name_te,
        districts!inner(slug, name_en, name_te)
      `,
      )
      .eq("slug", mandal)
      .eq("districts.slug", district)
      .maybeSingle();

    if (error || !row) return fallback;

    const d = row.districts as
      | { slug: string; name_en: string; name_te: string }
      | { slug: string; name_en: string; name_te: string }[]
      | null;
    const districtRow = Array.isArray(d) ? d[0] : d;

    let gps: GpOption[] = fallback?.gramPanchayats ?? [];
    if (row.id) {
      const { data: gpRows } = await supabase
        .from("gram_panchayats")
        .select("id, name_en, name_te")
        .eq("mandal_id", row.id)
        .order("name_en", { ascending: true });
      if (gpRows?.length) {
        gps = gpRows.map((g) => ({
          id: String(g.id),
          nameTe: String(g.name_te || g.name_en || "GP"),
          nameEn: String(g.name_en || g.name_te || "GP"),
        }));
      }
    }

    return {
      districtSlug: districtRow?.slug || district,
      mandalSlug: String(row.slug || mandal),
      districtNameTe: districtRow?.name_te || district,
      districtNameEn: districtRow?.name_en || district,
      mandalNameTe: String(row.name_te || mandal),
      mandalNameEn: String(row.name_en || mandal),
      gramPanchayats: gps,
    };
  } catch {
    return fallback;
  }
}

export default async function SurveyPage({ params }: Props) {
  const { district, mandal } = await params;

  let ctx: SurveyContext | null = null;
  try {
    ctx = await resolveSurveyContext(district, mandal);
  } catch {
    ctx = fromStatic(district, mandal);
  }
  if (!ctx) notFound();

  const portalHref = `/${ctx.districtSlug}/${ctx.mandalSlug}`;

  return (
    <div className="min-h-screen bg-[#FBFBF9]">
      <header className="sticky top-0 z-40 border-b border-[#EBE8E0] bg-[#FBFBF9]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
          <Link
            href={portalHref}
            className="tap inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#EBE8E0] bg-white text-[#18181B] hover:bg-[#F4F2EB]"
            aria-label="Back to mandal portal"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C2410C]">
              Nayi Samakhya · Survey
            </p>
            <h1 className="truncate font-telugu text-base font-bold leading-snug text-[#18181B]">
              సమగ్ర కుటుంబ సర్వే
            </h1>
            <p className="truncate text-xs text-[#71717A]">
              Comprehensive Census · {ctx.mandalNameEn}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 py-5 pb-24">
        <SurveyWizard
          districtSlug={ctx.districtSlug}
          mandalSlug={ctx.mandalSlug}
          districtNameTe={ctx.districtNameTe}
          mandalNameTe={ctx.mandalNameTe}
          districtNameEn={ctx.districtNameEn}
          mandalNameEn={ctx.mandalNameEn}
          gramPanchayats={ctx.gramPanchayats}
        />
      </div>
    </div>
  );
}
