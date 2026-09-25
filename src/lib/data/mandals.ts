import type { Mandal, MandalNotice } from "@/lib/types";

const telegram = "https://t.me/nayi_samakhya_demo";

const defaultNotices = (placeTe: string, placeEn: string): MandalNotice[] => [
  {
    id: "n1",
    title: {
      te: `${placeTe} సేవా శిబిరం & సంక్షేమ సమావేశం`,
      en: `${placeEn} service camp & welfare meet`,
    },
    date: "2026-09-18",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "n2",
    title: {
      te: "సెలూన్ నైపుణ్య శిక్షణ వర్క్‌షాప్",
      en: "Salon skills workshop",
    },
    date: "2026-09-12",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "n3",
    title: {
      te: "భజంత్రి సాంస్కృతిక సమ్మేళనం",
      en: "Bajantri cultural gathering",
    },
    date: "2026-09-08",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
  },
];

function hub(
  m: Omit<Mandal, "path" | "surveyPath" | "actions" | "telegramChannel" | "officers"> & {
    cartelWhatsapp: string;
  },
): Mandal {
  const path = `/${m.districtSlug}/${m.mandalSlug}`;
  const surveyPath = `${path}/survey`;
  const shortTe = m.mandal.te.replace(" మండలం", "");
  const phone = String(m.officer.phone || "").replace(/\D/g, "") || "919032654111";
  const officers = [
    {
      id: `${m.districtSlug}-${m.mandalSlug}-smo`,
      name: m.officer.name,
      role: {
        te: "మండల సోషల్ మీడియా అధికారి",
        en: "Mandal Social Media Officer",
      },
      phone,
      status: "active",
      isVerified: true,
      photoUrl: m.officer.portrait,
    },
    {
      id: `${m.districtSlug}-${m.mandalSlug}-cc`,
      name: {
        te: `${shortTe} కమ్యూనిటీ డెస్క్`,
        en: `${m.mandal.en} Community Desk`,
      },
      role: {
        te: "కమ్యూనిటీ సమన్వయకర్త",
        en: "Community Coordinator",
      },
      phone: "919032654111",
      status: "active",
      isVerified: true,
    },
  ];
  return {
    ...m,
    officer: { ...m.officer, phone },
    officers,
    path,
    surveyPath,
    telegramChannel: telegram,
    actions: [
      {
        id: "cartel",
        title: {
          te: `${shortTe} సెలూన్ కొనుగోలు కార్టెల్`,
          en: `${m.mandal.en} Salon Wholesale Cartel`,
        },
        description: {
          te: `కత్తెరలు, క్లిప్పర్లు, సెలూన్ కుర్చీలు, కాస్మెటిక్ కిట్లు — ఫ్యాక్టరీ ధరలకు. మధ్యవర్తులు లేకుండా ${m.district.te}లో సమూహ కొనుగోలు.`,
          en: `Scissors, clippers, salon chairs, and cosmetic kits at factory prices — eliminating middleman margins across ${m.district.en} district.`,
        },
        cta: { te: "కార్టెల్ బల్క్ ఆర్డర్ నమోదు", en: "Register cartel bulk order" },
        href: m.cartelWhatsapp,
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
    ],
  };
}

export const mandals: Mandal[] = [
  hub({
    districtSlug: "suryapet",
    mandalSlug: "kodad",
    state: { te: "తెలంగాణ", en: "Telangana" },
    district: { te: "సూర్యాపేట జిల్లా", en: "Suryapet" },
    mandal: { te: "కోదాడ మండలం", en: "Kodada" },
    hubTitle: {
      te: "కోదాడ మండల సమాఖ్య కేంద్రం",
      en: "Kodada Mandal Samakhya Hub",
    },
    portalHeadline: {
      te: "కోదాడ మండల నాయీ - భజంత్రి సమాఖ్య అధికారిక వేదిక",
      en: "Official Kodada Mandal Nayi–Bajantri Samakhya Portal",
    },
    portalSub: {
      te: "మండల స్థాయి సంక్షేమం, సెలూన్ వ్యాపార బలోపేతం, సాంప్రదాయ కళాకారుల రక్షణ మరియు సమగ్ర కుటుంబ సేవలు.",
      en: "Mandal welfare, salon enterprise support, traditional artiste protection, and comprehensive family services.",
    },
    summary: {
      salons: 42,
      bajantri: 14,
      freePowerPct: 78,
      households: 648,
      surveyPct: 62,
      gpCount: 16,
    },
    officer: {
      name: { te: "ఆర్. సురేష్ కుమార్", en: "R. Suresh Kumar" },
      title: {
        te: "మండల సోషల్ మీడియా & సమన్వయ అధికారి",
        en: "Mandal Social Media & Coordination Officer",
      },
      phone: "919032654111",
      status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
      initials: "సు",
      jurisdiction: {
        te: "కోదాడ పట్టణం + 16 గ్రామ పంచాయతీలు",
        en: "Kodada town + 16 Gram Panchayats",
      },
      portrait:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
    whatsappGroup: "https://chat.whatsapp.com/invite/kodada-nayi-demo",
    cartelWhatsapp: "https://chat.whatsapp.com/invite/kodada-salon-cartel",
    gramPanchayats: [
      { id: "komarabanda", name: { te: "కొమరబండ", en: "Komarabanda" }, households: 312, surveyPct: 85 },
      { id: "gudibanda", name: { te: "గుడిబండ", en: "Gudibanda" }, households: 268, surveyPct: 64 },
      { id: "thummalapenta", name: { te: "తుమ్మలపెంట", en: "Thummalapenta" }, households: 194, surveyPct: 58 },
      { id: "kapugallu", name: { te: "కాపుగల్లు", en: "Kapugallu" }, households: 220, surveyPct: 70 },
      { id: "dorakunta", name: { te: "దొరకుంట", en: "Dorakunta" }, households: 176, surveyPct: 61 },
      { id: "reddikunta", name: { te: "రెడ్డికుంట", en: "Reddikunta" }, households: 158, surveyPct: 55 },
      { id: "kodad-town", name: { te: "కోదాడ పట్టణం", en: "Kodad Town" }, households: 520, surveyPct: 72 },
      { id: "ananthagiri", name: { te: "అనంతగిరి", en: "Ananthagiri" }, households: 198, surveyPct: 66 },
    ],
    notices: defaultNotices("కోదాడ", "Kodada"),
  }),
  hub({
    districtSlug: "khammam",
    mandalSlug: "madhira",
    state: { te: "తెలంగాణ", en: "Telangana" },
    district: { te: "ఖమ్మం జిల్లా", en: "Khammam" },
    mandal: { te: "మధిర మండలం", en: "Madhira" },
    hubTitle: {
      te: "మధిర మండల సమాఖ్య కేంద్రం",
      en: "Madhira Mandal Samakhya Hub",
    },
    portalHeadline: {
      te: "మధిర మండల నాయీ - భజంత్రి సమాఖ్య అధికారిక వేదిక",
      en: "Official Madhira Mandal Nayi–Bajantri Samakhya Portal",
    },
    portalSub: {
      te: "మండల స్థాయి సంక్షేమం, సెలూన్ వ్యాపార బలోపేతం, సాంప్రదాయ కళాకారుల రక్షణ మరియు సమగ్ర కుటుంబ సేవలు.",
      en: "Mandal welfare, salon enterprise support, traditional artiste protection, and comprehensive family services.",
    },
    summary: {
      salons: 36,
      bajantri: 11,
      freePowerPct: 71,
      households: 572,
      surveyPct: 58,
      gpCount: 14,
    },
    officer: {
      name: { te: "కె. వెంకటేష్", en: "K. Venkatesh" },
      title: {
        te: "మండల సోషల్ మీడియా & సమన్వయ అధికారి",
        en: "Mandal Social Media & Coordination Officer",
      },
      phone: "919032654111",
      status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
      initials: "వె",
      jurisdiction: {
        te: "మధిర పట్టణం + 14 గ్రామ పంచాయతీలు",
        en: "Madhira town + 14 Gram Panchayats",
      },
      portrait:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    },
    whatsappGroup: "https://chat.whatsapp.com/invite/madhira-nayi-demo",
    cartelWhatsapp: "https://chat.whatsapp.com/invite/madhira-salon-cartel",
    gramPanchayats: [
      { id: "madhira-town", name: { te: "మధిర పట్టణం", en: "Madhira Town" }, households: 480, surveyPct: 68 },
      { id: "dendukuru", name: { te: "దెందుకూరు", en: "Dendukuru" }, households: 265, surveyPct: 54 },
      { id: "yerrupalem", name: { te: "ఎర్రుపాలెం", en: "Yerrupalem" }, households: 238, surveyPct: 61 },
      { id: "chidukur", name: { te: "చిడుకూరు", en: "Chidukur" }, households: 192, surveyPct: 49 },
      { id: "siripuram", name: { te: "సిరిపురం", en: "Siripuram" }, households: 156, surveyPct: 57 },
      { id: "ammapalem", name: { te: "అమ్మపాలెం", en: "Ammapalem" }, households: 141, surveyPct: 52 },
    ],
    notices: defaultNotices("మధిర", "Madhira"),
  }),
  hub({
    districtSlug: "khammam",
    mandalSlug: "wyra",
    state: { te: "తెలంగాణ", en: "Telangana" },
    district: { te: "ఖమ్మం జిల్లా", en: "Khammam" },
    mandal: { te: "వైరా మండలం", en: "Wyra" },
    hubTitle: {
      te: "వైరా మండల సమాఖ్య కేంద్రం",
      en: "Wyra Mandal Samakhya Hub",
    },
    portalHeadline: {
      te: "వైరా మండల నాయీ - భజంత్రి సమాఖ్య అధికారిక వేదిక",
      en: "Official Wyra Mandal Nayi–Bajantri Samakhya Portal",
    },
    portalSub: {
      te: "మండల స్థాయి సంక్షేమం, సెలూన్ వ్యాపార బలోపేతం, సాంప్రదాయ కళాకారుల రక్షణ మరియు సమగ్ర కుటుంబ సేవలు.",
      en: "Mandal welfare, salon enterprise support, traditional artiste protection, and comprehensive family services.",
    },
    summary: {
      salons: 28,
      bajantri: 9,
      freePowerPct: 69,
      households: 510,
      surveyPct: 55,
      gpCount: 12,
    },
    officer: {
      name: { te: "ఎం. రాజేష్", en: "M. Rajesh" },
      title: {
        te: "మండల సోషల్ మీడియా & సమన్వయ అధికారి",
        en: "Mandal Social Media & Coordination Officer",
      },
      phone: "919032654111",
      status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
      initials: "రా",
      jurisdiction: {
        te: "వైరా పట్టణం + 12 గ్రామ పంచాయతీలు",
        en: "Wyra town + 12 Gram Panchayats",
      },
      portrait:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    },
    whatsappGroup: "https://chat.whatsapp.com/invite/wyra-nayi-demo",
    cartelWhatsapp: "https://chat.whatsapp.com/invite/wyra-salon-cartel",
    gramPanchayats: [
      { id: "wyra-town", name: { te: "వైరా పట్టణం", en: "Wyra Town" }, households: 410, surveyPct: 63 },
      { id: "singareni", name: { te: "సింగరేణి", en: "Singareni" }, households: 255, surveyPct: 51 },
      { id: "gollapudi", name: { te: "గొల్లపూడి", en: "Gollapudi" }, households: 198, surveyPct: 48 },
      { id: "konijerla", name: { te: "కొనిజెర్ల", en: "Konijerla" }, households: 186, surveyPct: 59 },
      { id: "lakshmipuram", name: { te: "లక్ష్మీపురం", en: "Lakshmipuram" }, households: 162, surveyPct: 56 },
      { id: "gattumalla", name: { te: "గట్టుమల్ల", en: "Gattumalla" }, households: 121, surveyPct: 44 },
    ],
    notices: defaultNotices("వైరా", "Wyra"),
  }),
  hub({
    districtSlug: "khammam",
    mandalSlug: "tallada",
    state: { te: "తెలంగాణ", en: "Telangana" },
    district: { te: "ఖమ్మం జిల్లా", en: "Khammam" },
    mandal: { te: "తల్లాడ మండలం", en: "Tallada" },
    hubTitle: {
      te: "తల్లాడ మండల సమాఖ్య కేంద్రం",
      en: "Tallada Mandal Samakhya Hub",
    },
    portalHeadline: {
      te: "తల్లాడ మండల నాయీ - భజంత్రి సమాఖ్య అధికారిక వేదిక",
      en: "Official Tallada Mandal Nayi–Bajantri Samakhya Portal",
    },
    portalSub: {
      te: "మండల స్థాయి సంక్షేమం, సెలూన్ వ్యాపార బలోపేతం, సాంప్రదాయ కళాకారుల రక్షణ మరియు సమగ్ర కుటుంబ సేవలు.",
      en: "Mandal welfare, salon enterprise support, traditional artiste protection, and comprehensive family services.",
    },
    summary: {
      salons: 31,
      bajantri: 10,
      freePowerPct: 74,
      households: 534,
      surveyPct: 60,
      gpCount: 13,
    },
    officer: {
      name: { te: "పి. సునీత", en: "P. Sunitha" },
      title: {
        te: "మండల సోషల్ మీడియా & సమన్వయ అధికారి",
        en: "Mandal Social Media & Coordination Officer",
      },
      phone: "919032654111",
      status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
      initials: "సు",
      jurisdiction: {
        te: "తల్లాడ పట్టణం + 13 గ్రామ పంచాయతీలు",
        en: "Tallada town + 13 Gram Panchayats",
      },
      portrait:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    },
    whatsappGroup: "https://chat.whatsapp.com/invite/tallada-nayi-demo",
    cartelWhatsapp: "https://chat.whatsapp.com/invite/tallada-salon-cartel",
    gramPanchayats: [
      { id: "tallada-town", name: { te: "తల్లాడ పట్టణం", en: "Tallada Town" }, households: 395, surveyPct: 67 },
      { id: "pinapaka", name: { te: "పినపాక", en: "Pinapaka" }, households: 248, surveyPct: 53 },
      { id: "tekulapalli", name: { te: "తెకులపల్లి", en: "Tekulapalli" }, households: 221, surveyPct: 58 },
      { id: "chandrugonda", name: { te: "చంద్రుగొండ", en: "Chandrugonda" }, households: 187, surveyPct: 50 },
      { id: "mulkalapalli", name: { te: "ముల్కలపల్లి", en: "Mulkalapalli" }, households: 169, surveyPct: 62 },
      { id: "dammapeta", name: { te: "దమ్మపేట", en: "Dammapeta" }, households: 144, surveyPct: 47 },
    ],
    notices: defaultNotices("తల్లాడ", "Tallada"),
  }),
  hub({
    districtSlug: "adilabad",
    mandalSlug: "ichoda",
    state: { te: "తెలంగాణ", en: "Telangana" },
    district: { te: "ఆదిలాబాద్ జిల్లా", en: "Adilabad" },
    mandal: { te: "ఇచ్చోడ మండలం", en: "Ichoda" },
    hubTitle: {
      te: "ఇచ్చోడ మండల సమాఖ్య కేంద్రం",
      en: "Ichoda Mandal Samakhya Hub",
    },
    portalHeadline: {
      te: "ఇచ్చోడ మండల నాయీ - భజంత్రి సమాఖ్య అధికారిక వేదిక",
      en: "Official Ichoda Mandal Nayi–Bajantri Samakhya Portal",
    },
    portalSub: {
      te: "మండల స్థాయి సంక్షేమం, సెలూన్ వ్యాపార బలోపేతం, సాంప్రదాయ కళాకారుల రక్షణ మరియు సమగ్ర కుటుంబ సేవలు.",
      en: "Mandal welfare, salon enterprise support, traditional artiste protection, and comprehensive family services.",
    },
    summary: {
      salons: 24,
      bajantri: 8,
      freePowerPct: 66,
      households: 418,
      surveyPct: 49,
      gpCount: 11,
    },
    officer: {
      name: { te: "బి. రవీందర్", en: "B. Ravinder" },
      title: {
        te: "మండల సోషల్ మీడియా & సమన్వయ అధికారి",
        en: "Mandal Social Media & Coordination Officer",
      },
      phone: "919032654111",
      status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
      initials: "ర",
      jurisdiction: {
        te: "ఇచ్చోడ పట్టణం + 11 గ్రామ పంచాయతీలు",
        en: "Ichoda town + 11 Gram Panchayats",
      },
      portrait:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    },
    whatsappGroup: "https://chat.whatsapp.com/invite/ichoda-nayi-demo",
    cartelWhatsapp: "https://chat.whatsapp.com/invite/ichoda-salon-cartel",
    gramPanchayats: [
      { id: "ichoda-town", name: { te: "ఇచ్చోడ పట్టణం", en: "Ichoda Town" }, households: 340, surveyPct: 55 },
      { id: "bheempur", name: { te: "భీంపూర్", en: "Bheempur" }, households: 198, surveyPct: 46 },
      { id: "gudihathnoor", name: { te: "గుడిహత్నూర్", en: "Gudihathnoor" }, households: 176, surveyPct: 51 },
      { id: "naregaon", name: { te: "నారేగావ్", en: "Naregaon" }, households: 152, surveyPct: 43 },
      { id: "sonala", name: { te: "సోనాల", en: "Sonala" }, households: 134, surveyPct: 48 },
    ],
    notices: defaultNotices("ఇచ్చోడ", "Ichoda"),
  }),
];

export function getMandal(district: string, mandal: string): Mandal | undefined {
  return mandals.find((m) => m.districtSlug === district && m.mandalSlug === mandal);
}

export function listMandals(): Mandal[] {
  return mandals;
}
