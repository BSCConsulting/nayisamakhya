import type { Mandal } from "@/lib/types";

const telegram = "https://t.me/nayi_samakhya_demo";

function hub(
  m: Omit<Mandal, "path" | "surveyPath" | "actions" | "telegramChannel"> & {
    cartelWhatsapp: string;
  },
): Mandal {
  const path = `/${m.districtSlug}/${m.mandalSlug}`;
  const surveyPath = `${path}/survey`;
  return {
    ...m,
    path,
    surveyPath,
    telegramChannel: telegram,
    actions: [
      {
        id: "cartel",
        title: {
          te: `${m.mandal.te.replace(" మండలం", "")} సెలూన్ హోల్‌సేల్ గ్రూప్`,
          en: `${m.mandal.en} Salon Wholesale Group`,
        },
        description: {
          te: "కత్తెరలు, క్లిప్పర్లు, క్రీములు — డిస్ట్రిబ్యూటర్ రేట్లకు సమూహ కొనుగోలు.",
          en: "Bulk orders for scissors, clippers, and creams at distributor rates.",
        },
        cta: { te: "కార్టెల్ వాట్సాప్‌లో చేరండి →", en: "Join cartel WhatsApp →" },
        href: m.cartelWhatsapp,
        external: true,
      },
      {
        id: "power",
        title: {
          te: "250 యూనిట్ల ఉచిత విద్యుత్ సహాయం",
          en: "Free Power Grievance Desk",
        },
        description: {
          te: "సబ్-స్టేషన్ / MRO వద్ద పెండింగ్ దరఖాస్తులు క్లియర్ చేయడానికి సహాయం.",
          en: "Local help clearing pending applications at Sub-Station / MRO.",
        },
        cta: { te: "వినతి ఫైల్ చేయండి →", en: "File petition →" },
        href: surveyPath,
      },
      {
        id: "census",
        title: { te: "మండల సమగ్ర సర్వే", en: "Local Census Survey" },
        description: {
          te: "కుటుంబం, సెలూన్, భజంత్రి — 6 దశల మొబైల్ సర్వే.",
          en: "Household, salon, and artiste — 6-step mobile survey.",
        },
        cta: { te: "సర్వే ప్రారంభించండి →", en: "Start survey →" },
        href: surveyPath,
        featured: true,
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
    summary: { salons: 42, bajantri: 14, freePowerPct: 78 },
    officer: {
      name: { te: "ఆర్. సురేష్ కుమార్", en: "R. Suresh Kumar" },
      title: {
        te: "మండల సోషల్ మీడియా ఆఫీసర్",
        en: "Mandal Social Media Officer",
      },
      phone: "919876543210",
      status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
      initials: "సు",
    },
    whatsappGroup: "https://chat.whatsapp.com/invite/kodada-nayi-demo",
    cartelWhatsapp: "https://chat.whatsapp.com/invite/kodada-salon-cartel",
    gramPanchayats: [
      { id: "komarabanda", name: { te: "కొమరబండ", en: "Komarabanda" }, households: 312 },
      { id: "gudibanda", name: { te: "గుడిబండ", en: "Gudibanda" }, households: 268 },
      { id: "thummalapenta", name: { te: "తుమ్మలపెంట", en: "Thummalapenta" }, households: 241 },
      { id: "kodad-town", name: { te: "కోదాడ పట్టణం", en: "Kodad Town" }, households: 520 },
      { id: "ananthagiri", name: { te: "అనంతగిరి", en: "Ananthagiri" }, households: 198 },
      { id: "duddeda", name: { te: "దుద్దేడ", en: "Duddeda" }, households: 143 },
    ],
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
    summary: { salons: 36, bajantri: 11, freePowerPct: 71 },
    officer: {
      name: { te: "కె. వెంకటేష్", en: "K. Venkatesh" },
      title: {
        te: "మండల సోషల్ మీడియా ఆఫీసర్",
        en: "Mandal Social Media Officer",
      },
      phone: "919876543211",
      status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
      initials: "వె",
    },
    whatsappGroup: "https://chat.whatsapp.com/invite/madhira-nayi-demo",
    cartelWhatsapp: "https://chat.whatsapp.com/invite/madhira-salon-cartel",
    gramPanchayats: [
      { id: "madhira-town", name: { te: "మధిర పట్టణం", en: "Madhira Town" }, households: 480 },
      { id: "dendukuru", name: { te: "దెందుకూరు", en: "Dendukuru" }, households: 265 },
      { id: "yerrupalem", name: { te: "ఎర్రుపాలెం", en: "Yerrupalem" }, households: 238 },
      { id: "chidukur", name: { te: "చిడుకూరు", en: "Chidukur" }, households: 192 },
      { id: "siripuram", name: { te: "సిరిపురం", en: "Siripuram" }, households: 156 },
      { id: "ammapalem", name: { te: "అమ్మపాలెం", en: "Ammapalem" }, households: 141 },
    ],
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
    summary: { salons: 28, bajantri: 9, freePowerPct: 69 },
    officer: {
      name: { te: "ఎం. రాజేష్", en: "M. Rajesh" },
      title: {
        te: "మండల సోషల్ మీడియా ఆఫీసర్",
        en: "Mandal Social Media Officer",
      },
      phone: "919876543212",
      status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
      initials: "రా",
    },
    whatsappGroup: "https://chat.whatsapp.com/invite/wyra-nayi-demo",
    cartelWhatsapp: "https://chat.whatsapp.com/invite/wyra-salon-cartel",
    gramPanchayats: [
      { id: "wyra-town", name: { te: "వైరా పట్టణం", en: "Wyra Town" }, households: 410 },
      { id: "singareni", name: { te: "సింగరేణి", en: "Singareni" }, households: 255 },
      { id: "gollapudi", name: { te: "గొల్లపూడి", en: "Gollapudi" }, households: 198 },
      { id: "konijerla", name: { te: "కొనిజెర్ల", en: "Konijerla" }, households: 186 },
      { id: "lakshmipuram", name: { te: "లక్ష్మీపురం", en: "Lakshmipuram" }, households: 162 },
      { id: "gattumalla", name: { te: "గట్టుమల్ల", en: "Gattumalla" }, households: 121 },
    ],
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
    summary: { salons: 31, bajantri: 10, freePowerPct: 74 },
    officer: {
      name: { te: "పి. సునీత", en: "P. Sunitha" },
      title: {
        te: "మండల సోషల్ మీడియా ఆఫీసర్",
        en: "Mandal Social Media Officer",
      },
      phone: "919876543213",
      status: { te: "ఆన్‌లైన్ / క్రియాశీలం", en: "Online / Active" },
      initials: "సు",
    },
    whatsappGroup: "https://chat.whatsapp.com/invite/tallada-nayi-demo",
    cartelWhatsapp: "https://chat.whatsapp.com/invite/tallada-salon-cartel",
    gramPanchayats: [
      { id: "tallada-town", name: { te: "తల్లాడ పట్టణం", en: "Tallada Town" }, households: 395 },
      { id: "pinapaka", name: { te: "పినపాక", en: "Pinapaka" }, households: 248 },
      { id: "tekulapalli", name: { te: "తెకులపల్లి", en: "Tekulapalli" }, households: 221 },
      { id: "chandrugonda", name: { te: "చంద్రుగొండ", en: "Chandrugonda" }, households: 187 },
      { id: "mulkalapalli", name: { te: "ముల్కలపల్లి", en: "Mulkalapalli" }, households: 169 },
      { id: "dammapeta", name: { te: "దమ్మపేట", en: "Dammapeta" }, households: 144 },
    ],
  }),
];

export function getMandal(district: string, mandal: string): Mandal | undefined {
  return mandals.find((m) => m.districtSlug === district && m.mandalSlug === mandal);
}

export function listMandals(): Mandal[] {
  return mandals;
}
