import type { Lang, Localized } from "@/lib/types";

export const dictionary = {
  brand: { te: "నయి సమాఖ్య", en: "Nayi Samakhya" },
  brandSub: { te: "ప్రజా సమాఖ్య", en: "Praja Samakhya" },
  home: { te: "హోమ్", en: "Home" },
  mandal: { te: "మండలం", en: "Mandal" },
  survey: { te: "సర్వే", en: "Survey" },
  legalSos: { te: "లీగల్ SOS", en: "Legal SOS" },
  change: { te: "మార్చండి", en: "Change" },
  incidentSos: { te: "అత్యవసర రక్షణ / Incident SOS", en: "Incident SOS / Emergency Shield" },
  startSurvey: { te: "బూత్ సర్వే ప్రారంభించండి", en: "Start Booth Survey" },
  discomForm: { te: "DISCOM ఉచిత విద్యుత్ ఫారం", en: "DISCOM Free Electricity Form" },
  metricsTitle: { te: "కమ్యూనిటీ స్థితి", en: "Community Status" },
  metricsSub: {
    te: "జనాభా, సంక్షేమం, నెట్‌వర్క్ — ఒక చూపులో",
    en: "Population, welfare, and network at a glance",
  },
  distributionTitle: { te: "సమాజ పంపిణీ సూచికలు", en: "Community Distribution" },
  debtTitle: { te: "రుణ ప్రొఫైల్", en: "Indebtedness Ratio" },
  youthTitle: { te: "యువత ఆకాంక్షలు", en: "Youth Career Aspirations" },
  bajantriTitle: { te: "భజంత్రి కళాకారులు", en: "Bhajantri Artists" },
  officersTitle: { te: "క్షేత్రస్థాయి అధికారులు", en: "Field Officers" },
  strategyTitle: { te: "వ్యూహాత్మక చక్రం", en: "Strategic Wheel" },
  strategySub: {
    te: "సమాచారం నుంచి చర్య వరకు — ఐదు దశల నిరంతర ప్రవాహం",
    en: "From insight to action — five continuous stages",
  },
  strategyFooter: {
    te: "✦ నిరంతర అభివృద్ధి చక్రం — పరస్పర బలోపేతం",
    en: "✦ Continuous reinforcing cycle",
  },
  mandalsTitle: { te: "మండల కేంద్రాలు", en: "Mandal Hubs" },
  mandalsSub: {
    te: "ప్రతి మండలానికి స్థానిక అధికారి, సేవలు, GP జాబితా మరియు సర్వే.",
    en: "Each mandal has a local officer, services, GP list, and survey.",
  },
  openHub: { te: "కేంద్రం తెరవండి →", en: "Open hub →" },
  allMandals: { te: "← అన్ని మండలాలు", en: "← All mandals" },
  salons: { te: "సెలూన్లు", en: "Salons" },
  bajantri: { te: "భజంత్రి", en: "Bajantri" },
  power: { te: "విద్యుత్", en: "Power" },
  gps: { te: "గ్రామ పంచాయతీలు & వార్డులు", en: "Gram Panchayats & Wards" },
  searchGp: { te: "GP / వార్డు వెతకండి…", en: "Search GP / ward…" },
  chatWhatsapp: { te: "💬 WhatsApp లో మాట్లాడండి", en: "💬 Chat on WhatsApp" },
  downloadDiscom: {
    te: "📄 DISCOM వినతి పత్రం డౌన్‌లోడ్",
    en: "📄 Download DISCOM petition",
  },
  benefited: { te: "లబ్ధిదారులు", en: "Benefited" },
  pending: { te: "పెండింగ్", en: "Pending" },
  pensionActive: { te: "62% పెన్షన్ క్రియాశీలం", en: "62% Pension Active" },
  officersMeta: { te: "412 మండల అధికారులు నియమితులు", en: "412 Mandal Officers appointed" },
  heroEyebrow: {
    te: "✦ తెలంగాణ • ఆంధ్రప్రదేశ్ | ప్రజా సమాఖ్య",
    en: "✦ Telangana • Andhra Pradesh | Praja Samakhya",
  },
  heroTitle: {
    te: "డిజిటల్ హోమ్ • సేవా కేంద్రం • సామూహిక స్వరం",
    en: "Digital Home • Service Hub • Collective Voice",
  },
  heroBody: {
    te: "ప్రజల కోసం, ప్రజలతో — సేవ, సమాచారం, సంఘటన ఒకే చోట.",
    en: "For the people, with the people — services, information, and action in one place.",
  },
  sosTitle: { te: "అత్యవసర రక్షణ", en: "Emergency Protection" },
  sosBody: {
    te: "స్థానిక మండల అధికారి లేదా రాష్ట్ర హెల్ప్‌లైన్‌ను వెంటనే సంప్రదించండి.",
    en: "Contact your mandal officer or the state helpline immediately.",
  },
  sosCall: { te: "కాల్ చేయండి", en: "Call now" },
  sosClose: { te: "మూసివేయి", en: "Close" },
  surveySoon: {
    te: "సర్వే విజార్డ్ త్వరలో పూర్తి మొబైల్ PWAగా అందుబాటులో ఉంటుంది. మండల కేంద్రం నుంచి ప్రారంభించండి.",
    en: "The full mobile survey wizard is available from each mandal hub.",
  },
} as const satisfies Record<string, Localized>;

export type DictionaryKey = keyof typeof dictionary;

export function t(key: DictionaryKey, lang: Lang): string {
  const entry: Localized = dictionary[key];
  return entry[lang];
}

export function loc(value: Localized, lang: Lang): string {
  return value[lang];
}
