import type { Localized } from "@/lib/types";

/**
 * Verticals + directory resources.
 * Shape mirrors the intended Supabase tables (`verticals`, `directory_resources`).
 * Do not change fetch signatures when wiring a real Supabase client later.
 */
export type Vertical = {
  id: string;
  slug: string;
  title: Localized;
  summary: Localized;
  heroNote: Localized;
};

export type DirectoryResource = {
  id: string;
  vertical_slug: string;
  category: Localized;
  title: Localized;
  description: Localized;
  district: Localized;
  updated_at: string;
  href: string;
};

export const verticals: Vertical[] = [
  {
    id: "1",
    slug: "welfare",
    title: { te: "సంక్షేమం", en: "Welfare" },
    summary: {
      te: "ఉచిత విద్యుత్, పెన్షన్, సబ్సిడీ మార్గదర్శకాలు.",
      en: "Free power, pensions, and subsidy guidance.",
    },
    heroNote: {
      te: "250 యూనిట్ల ఉచిత విద్యుత్ & సంక్షేమ హక్కులు",
      en: "250-unit free power & welfare entitlements",
    },
  },
  {
    id: "2",
    slug: "education",
    title: { te: "విద్య", en: "Education" },
    summary: {
      te: "స్కాలర్‌షిప్‌లు, స్టడీ సర్కిల్, కోచింగ్.",
      en: "Scholarships, study circles, and coaching.",
    },
    heroNote: {
      te: "BC-A స్కాలర్‌షిప్ & స్టడీ సర్కిల్ మార్గదర్శి",
      en: "BC-A scholarship & study-circle guide",
    },
  },
  {
    id: "3",
    slug: "livelihood",
    title: { te: "జీవనోపాధి", en: "Livelihood" },
    summary: {
      te: "సెలూన్ కార్టెల్, నైపుణ్యం, ఉపాధి లింకులు.",
      en: "Salon cartel, skills, and livelihood links.",
    },
    heroNote: {
      te: "కార్టెల్ బల్క్ ఆర్డర్ & నైపుణ్య కార్యక్రమాలు",
      en: "Cartel bulk orders & skills programmes",
    },
  },
  {
    id: "4",
    slug: "bajantri",
    title: { te: "భజంత్రి", en: "Bajantri" },
    summary: {
      te: "కళాకారుల పెన్షన్, సాంస్కృతిక రక్షణ.",
      en: "Artisan pensions and cultural protection.",
    },
    heroNote: {
      te: "భజంత్రి వారసత్వం & పెన్షన్ సహాయం",
      en: "Bajantri heritage & pension support",
    },
  },
  {
    id: "5",
    slug: "matrimonial",
    title: { te: "వివాహ సేవ", en: "Matrimonial" },
    summary: {
      te: "సమాజ ఆధారిత వివాహ సేవా సమాచారం.",
      en: "Community-led matrimonial service info.",
    },
    heroNote: {
      te: "గౌరవప్రదమైన వివాహ సేవా డ్రైవ్‌లు",
      en: "Dignity-first matrimonial drives",
    },
  },
  {
    id: "6",
    slug: "gallery",
    title: { te: "గ్యాలరీ", en: "Gallery" },
    summary: {
      te: "కార్యక్రమాలు, ఫోటోలు, వీడియోలు.",
      en: "Events, photos, and videos.",
    },
    heroNote: {
      te: "మల్టీమీడియా ఈవెంట్ గ్యాలరీ",
      en: "Multimedia event gallery",
    },
  },
  {
    id: "7",
    slug: "go-library",
    title: { te: "G.O. లైబ్రరీ", en: "G.O. Library" },
    summary: {
      te: "ప్రభుత్వ ఆదేశాలు, సర్క్యులర్లు, పథకాలు.",
      en: "Government orders, circulars, and schemes.",
    },
    heroNote: {
      te: "అధికారిక G.O.లు & సర్క్యులర్ ఆర్కైవ్",
      en: "Official G.O. & circular archive",
    },
  },
];

export const directoryResources: DirectoryResource[] = [
  {
    id: "r1",
    vertical_slug: "welfare",
    category: { te: "విద్యుత్", en: "Power" },
    title: { te: "250 యూనిట్ల ఉచిత విద్యుత్ మార్గదర్శకాలు", en: "250-unit free power guidelines" },
    description: {
      te: "అర్హత, దరఖాస్తు, DISCOM వినతి టెంప్లేట్.",
      en: "Eligibility, application, DISCOM petition template.",
    },
    district: { te: "అన్ని జిల్లాలు", en: "All districts" },
    updated_at: "2026-09-20",
    href: "/discom-petition.txt",
  },
  {
    id: "r2",
    vertical_slug: "welfare",
    category: { te: "పెన్షన్", en: "Pension" },
    title: { te: "భజంత్రి పెన్షన్ వెరిఫికేషన్", en: "Bajantri pension verification" },
    description: {
      te: "మండల శిబిరాలు & డాక్యుమెంట్ చెక్‌లిస్ట్.",
      en: "Mandal camps and document checklist.",
    },
    district: { te: "సూర్యాపేట", en: "Suryapet" },
    updated_at: "2026-09-18",
    href: "/verticals/bajantri",
  },
  {
    id: "r3",
    vertical_slug: "education",
    category: { te: "స్కాలర్‌షిప్", en: "Scholarship" },
    title: { te: "BC-A పోస్ట్-మెట్రిక్ గైడ్", en: "BC-A post-matric guide" },
    description: {
      te: "ఆన్‌లైన్ దరఖాస్తు దశలు & అవసరమైన సర్టిఫికేట్లు.",
      en: "Online application steps and certificates needed.",
    },
    district: { te: "ఖమ్మం", en: "Khammam" },
    updated_at: "2026-09-22",
    href: "/verticals/education",
  },
  {
    id: "r4",
    vertical_slug: "education",
    category: { te: "కోచింగ్", en: "Coaching" },
    title: { te: "బీసీ స్టడీ సర్కిల్ దరఖాస్తు", en: "BC study circle applications" },
    description: {
      te: "ఉచిత కోచింగ్ సీట్లు — మండల కోటా.",
      en: "Free coaching seats — mandal quota.",
    },
    district: { te: "అన్ని జిల్లాలు", en: "All districts" },
    updated_at: "2026-09-21",
    href: "/verticals/education",
  },
  {
    id: "r5",
    vertical_slug: "livelihood",
    category: { te: "కార్టెల్", en: "Cartel" },
    title: { te: "సెలూన్ హోల్‌సేల్ బల్క్ ఆర్డర్", en: "Salon wholesale bulk order" },
    description: {
      te: "కత్తెరలు, క్లిప్పర్లు — డిస్ట్రిబ్యూటర్ రేటు.",
      en: "Scissors and clippers at distributor rates.",
    },
    district: { te: "కోదాడ", en: "Kodad" },
    updated_at: "2026-09-19",
    href: "/suryapet/kodad",
  },
  {
    id: "r6",
    vertical_slug: "bajantri",
    category: { te: "సంస్కృతి", en: "Culture" },
    title: { te: "నాదస్వర కళాకారుల నమోదు", en: "Nadaswaram artiste registry" },
    description: {
      te: "వారసత్వ నమోదు & సాంస్కృతిక సహాయం.",
      en: "Heritage registry and cultural aid.",
    },
    district: { te: "అన్ని జిల్లాలు", en: "All districts" },
    updated_at: "2026-09-15",
    href: "/verticals/bajantri",
  },
  {
    id: "r7",
    vertical_slug: "go-library",
    category: { te: "G.O.", en: "G.O." },
    title: { te: "ఉచిత విద్యుత్ G.O. కాపీ", en: "Free power G.O. copy" },
    description: {
      te: "అధికారిక ప్రభుత్వ ఆదేశం PDF.",
      en: "Official government order PDF.",
    },
    district: { te: "రాష్ట్ర స్థాయి", en: "Statewide" },
    updated_at: "2026-09-10",
    href: "/verticals/go-library",
  },
  {
    id: "r8",
    vertical_slug: "gallery",
    category: { te: "ఈవెంట్", en: "Event" },
    title: { te: "కోదాడ సేవా శిబిరం ఫోటోలు", en: "Kodad service camp photos" },
    description: {
      te: "సెప్టెంబర్ మండల క్యాంప్ గ్యాలరీ.",
      en: "September mandal camp gallery.",
    },
    district: { te: "సూర్యాపేట", en: "Suryapet" },
    updated_at: "2026-09-12",
    href: "/verticals/gallery",
  },
  {
    id: "r9",
    vertical_slug: "matrimonial",
    category: { te: "డ్రైవ్", en: "Drive" },
    title: { te: "మాతృమూర్తి వివాహ డ్రైవ్", en: "Matrumurthi matrimonial drive" },
    description: {
      te: "నమోదు & షెడ్యూల్ వివరాలు.",
      en: "Registration and schedule details.",
    },
    district: { te: "ఖమ్మం", en: "Khammam" },
    updated_at: "2026-09-14",
    href: "/verticals/matrimonial",
  },
];

/** Supabase-compatible fetchers — keep signatures stable. */
export async function fetchVerticalBySlug(slug: string): Promise<Vertical | null> {
  return verticals.find((v) => v.slug === slug) ?? null;
}

export async function fetchDirectoryResources(
  verticalSlug: string,
): Promise<DirectoryResource[]> {
  return directoryResources.filter((r) => r.vertical_slug === verticalSlug);
}

export async function fetchAllVerticals(): Promise<Vertical[]> {
  return verticals;
}
