/**
 * Phase 1: all 33 Telangana districts (official English names + Telugu).
 * Mandals are seeded separately in a later phase.
 */

export type DistrictSeed = {
  slug: string;
  name_en: string;
  name_te: string;
  zone: string;
};

/** Canonical list — keep in sync with `supabase/seed_phase1_districts.sql`. */
export const TELANGANA_DISTRICTS: DistrictSeed[] = [
  { slug: "adilabad", name_en: "Adilabad", name_te: "ఆదిలాబాద్ జిల్లా", zone: "telangana" },
  { slug: "bhadradri-kothagudem", name_en: "Bhadradri Kothagudem", name_te: "భద్రాద్రి కొత్తగూడెం జిల్లా", zone: "telangana" },
  { slug: "hanumakonda", name_en: "Hanumakonda", name_te: "హనుమకొండ జిల్లా", zone: "telangana" },
  { slug: "hyderabad", name_en: "Hyderabad", name_te: "హైదరాబాద్ జిల్లా", zone: "telangana" },
  { slug: "jagtial", name_en: "Jagtial", name_te: "జగిత్యాల జిల్లా", zone: "telangana" },
  { slug: "jangaon", name_en: "Jangaon", name_te: "జనగాం జిల్లా", zone: "telangana" },
  { slug: "jayashankar-bhupalpally", name_en: "Jayashankar Bhupalpally", name_te: "జయశంకర్ భూపాలపల్లి జిల్లా", zone: "telangana" },
  { slug: "jogulamba-gadwal", name_en: "Jogulamba Gadwal", name_te: "జోగులాంబ గద్వాల్ జిల్లా", zone: "telangana" },
  { slug: "kamareddy", name_en: "Kamareddy", name_te: "కామారెడ్డి జిల్లా", zone: "telangana" },
  { slug: "karimnagar", name_en: "Karimnagar", name_te: "కరీంనగర్ జిల్లా", zone: "telangana" },
  { slug: "khammam", name_en: "Khammam", name_te: "ఖమ్మం జిల్లా", zone: "telangana" },
  { slug: "kumuram-bheem-asifabad", name_en: "Kumuram Bheem Asifabad", name_te: "కొమరం భీమ్ ఆసిఫాబాద్ జిల్లా", zone: "telangana" },
  { slug: "mahabubabad", name_en: "Mahabubabad", name_te: "మహబూబాబాద్ జిల్లా", zone: "telangana" },
  { slug: "mahabubnagar", name_en: "Mahabubnagar", name_te: "మహబూబ్‌నగర్ జిల్లా", zone: "telangana" },
  { slug: "mancherial", name_en: "Mancherial", name_te: "మంచిర్యాల జిల్లా", zone: "telangana" },
  { slug: "medak", name_en: "Medak", name_te: "మెదక్ జిల్లా", zone: "telangana" },
  { slug: "medchal-malkajgiri", name_en: "Medchal-Malkajgiri", name_te: "మెడ్చల్-మల్కాజ్‌గిరి జిల్లా", zone: "telangana" },
  { slug: "mulugu", name_en: "Mulugu", name_te: "ములుగు జిల్లా", zone: "telangana" },
  { slug: "nagarkurnool", name_en: "Nagarkurnool", name_te: "నాగర్‌కర్నూల్ జిల్లా", zone: "telangana" },
  { slug: "nalgonda", name_en: "Nalgonda", name_te: "నల్గొండ జిల్లా", zone: "telangana" },
  { slug: "narayanpet", name_en: "Narayanpet", name_te: "నారాయణపేట జిల్లా", zone: "telangana" },
  { slug: "nirmal", name_en: "Nirmal", name_te: "నిర్మల్ జిల్లా", zone: "telangana" },
  { slug: "nizamabad", name_en: "Nizamabad", name_te: "నిజామాబాద్ జిల్లా", zone: "telangana" },
  { slug: "peddapalli", name_en: "Peddapalli", name_te: "పెద్దపల్లి జిల్లా", zone: "telangana" },
  { slug: "rajanna-sircilla", name_en: "Rajanna Sircilla", name_te: "రాజన్న సిరిసిల్ల జిల్లా", zone: "telangana" },
  { slug: "rangareddy", name_en: "Rangareddy", name_te: "రంగారెడ్డి జిల్లా", zone: "telangana" },
  { slug: "sangareddy", name_en: "Sangareddy", name_te: "సంగారెడ్డి జిల్లా", zone: "telangana" },
  { slug: "siddipet", name_en: "Siddipet", name_te: "సిద్ధిపేట జిల్లా", zone: "telangana" },
  { slug: "suryapet", name_en: "Suryapet", name_te: "సూర్యాపేట జిల్లా", zone: "telangana" },
  { slug: "vikarabad", name_en: "Vikarabad", name_te: "వికారాబాద్ జిల్లా", zone: "telangana" },
  { slug: "wanaparthy", name_en: "Wanaparthy", name_te: "వనపర్తి జిల్లా", zone: "telangana" },
  { slug: "warangal", name_en: "Warangal", name_te: "వరంగల్ జిల్లా", zone: "telangana" },
  { slug: "yadadri-bhuvanagiri", name_en: "Yadadri Bhuvanagiri", name_te: "యాదాద్రి భువనగిరి జిల్లా", zone: "telangana" },
];

if (TELANGANA_DISTRICTS.length !== 33) {
  throw new Error(
    `Expected 33 Telangana districts, got ${TELANGANA_DISTRICTS.length}`,
  );
}

export function listDistricts(): DistrictSeed[] {
  return TELANGANA_DISTRICTS;
}
