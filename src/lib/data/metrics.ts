import type {
  AspirationItem,
  BoothBar,
  DistributionSegment,
  MetricCard,
  ProgressMetric,
  StrategicStep,
  WelfareSlice,
} from "@/lib/types";

export const topMetrics: MetricCard[] = [
  {
    id: "population",
    value: "1,42,850",
    label: { te: "మొత్తం లెక్కింపు జనాభా", en: "Total Enlisted Population" },
    meta: { te: "100% Enlisted • 33 జిల్లాలు", en: "100% Enlisted across 33 Districts" },
  },
  {
    id: "salons",
    value: "8,420",
    label: { te: "క్రియాశీల సెలూన్ నెట్‌వర్క్", en: "Active Salon Network" },
    meta: { te: "33 జిల్లాల్లో", en: "Across 33 Districts" },
  },
  {
    id: "voters",
    value: "98,210",
    label: { te: "నమోదైన ఓటర్లు", en: "Registered Voters" },
    meta: { te: "1,240 బూత్‌లు", en: "Mapped across 1,240 Booths" },
  },
];

/** Sparkline sample (salon growth index, last 8 weeks). */
export const salonSparkline = [42, 48, 45, 55, 58, 62, 70, 76];

export const electricity: ProgressMetric = {
  completePct: 64,
  pendingPct: 36,
  completeCount: "5,389",
  pendingCount: "3,031",
};

export const welfareSlices: WelfareSlice[] = [
  {
    id: "power-cleared",
    label: { te: "విద్యుత్ క్లియర్", en: "Power cleared" },
    value: 5389,
    color: "url(#welfareSuccess)",
    kind: "cleared",
  },
  {
    id: "power-pending",
    label: { te: "విద్యుత్ పెండింగ్", en: "Power pending" },
    value: 3031,
    color: "#cbd5e1",
    kind: "pending",
  },
  {
    id: "pension-active",
    label: { te: "భజంత్రి పెన్షన్", en: "Bhajantri pension" },
    value: 1280,
    color: "#9A3412",
    kind: "cleared",
  },
];

export const topBooths: BoothBar[] = [
  {
    id: "b12",
    name: { te: "బూత్ 12 — కోదాడ్", en: "Booth 12 — Kodad" },
    coverage: 94,
    color: "#C2410C",
  },
  {
    id: "b07",
    name: { te: "బూత్ 07 — తిమ్మాపురం", en: "Booth 07 — Thimmapuram" },
    coverage: 88,
    color: "#9A3412",
  },
  {
    id: "b21",
    name: { te: "బూత్ 21 — నడిగూడెం", en: "Booth 21 — Nadigudem" },
    coverage: 81,
    color: "#C2410C",
  },
  {
    id: "b03",
    name: { te: "బూత్ 03 — మునగాల", en: "Booth 03 — Munagala" },
    coverage: 74,
    color: "#0369a1",
  },
  {
    id: "b18",
    name: { te: "బూత్ 18 — చివ్వేం", en: "Booth 18 — Chivvem" },
    coverage: 67,
    color: "#64748b",
  },
];

export const debtSegments: DistributionSegment[] = [
  {
    id: "moneylender",
    label: { te: "వడ్డీ వ్యాపారి", en: "Moneylender" },
    pct: 42,
    color: "#c2410c",
    description: {
      te: "అధిక వడ్డీతో అనధికార రుణాలు — ప్రాధాన్యతా జోక్యం.",
      en: "Informal high-interest credit — priority outreach.",
    },
  },
  {
    id: "bank",
    label: { te: "వాణిజ్య బ్యాంకు", en: "Commercial Bank" },
    pct: 38,
    color: "#0f172a",
    description: {
      te: "బ్యాంకు రుణాలు — రీషెడ్యూల్ / సబ్సిడీ సహాయం.",
      en: "Formal bank debt — reschedule and subsidy support.",
    },
  },
  {
    id: "free",
    label: { te: "రుణ రహితం", en: "Debt-Free" },
    pct: 20,
    color: "#C2410C",
    description: {
      te: "రుణ రహిత కుటుంబాలు — స్థిరత్వ సూచిక.",
      en: "Debt-free households — resilience indicator.",
    },
  },
];

export const youthAspirations: AspirationItem[] = [
  {
    id: "govt",
    label: { te: "ప్రభుత్వ / పోలీస్ పరీక్షలు", en: "Govt/Police Exams" },
    pct: 45,
    icon: "shield",
    description: {
      te: "ప్రభుత్వ ఉద్యోగాల కోసం కోచింగ్ & ఫారం సహాయం.",
      en: "Coaching and form support for public-service exams.",
    },
  },
  {
    id: "it",
    label: { te: "ఐటి / కార్పొరేట్", en: "IT/Corporate" },
    pct: 30,
    icon: "monitor",
    description: {
      te: "డిజిటల్ నైపుణ్యం & ఇంటర్న్‌షిప్ మార్గాలు.",
      en: "Digital skills and internship pathways.",
    },
  },
  {
    id: "salon",
    label: { te: "ఆధునిక సెలూన్ వ్యాపారం", en: "Modern Salon Business" },
    pct: 18,
    icon: "scissors",
    description: {
      te: "సెలూన్ యూనిట్‌లకు పరికరాలు & మార్కెట్ లింకులు.",
      en: "Equipment and market links for salon units.",
    },
  },
  {
    id: "study",
    label: { te: "ఉన్నత విద్య", en: "Higher Ed" },
    pct: 7,
    icon: "graduation",
    description: {
      te: "స్కాలర్‌షిప్ & కళాశాల ప్రవేశ మార్గదర్శకం.",
      en: "Scholarship and college admission guidance.",
    },
  },
];

export const strategicSteps: StrategicStep[] = [
  {
    id: "01",
    number: "01",
    title: { te: "సమాచార సేకరణ", en: "Information Gathering" },
    body: { te: "బూత్ స్థాయి గణన, సెలూన్ మ్యాపింగ్", en: "Booth mapping & salon enumeration" },
    pattern: "dots",
  },
  {
    id: "02",
    number: "02",
    title: { te: "విశ్లేషణ", en: "Data Analysis" },
    body: { te: "అర్హత, రుణం, సేవా అంతరాలు", en: "Gap assessment across welfare & debt" },
    pattern: "civic",
  },
  {
    id: "03",
    number: "03",
    title: { te: "మండల ప్రణాళిక", en: "Mandal Planning" },
    body: { te: "మండల ప్రాధాన్యతలు & లక్ష్యాలు", en: "Goal setting with local priorities" },
    pattern: "dots",
  },
  {
    id: "04",
    number: "04",
    title: { te: "క్షేత్ర అమలు", en: "Grassroots Execution" },
    body: { te: "సేవా శిబిరాలు, వినతులు, సాయం", en: "Camps, petitions & cadre aid" },
    pattern: "civic",
  },
  {
    id: "05",
    number: "05",
    title: { te: "నిరంతర మూల్యాంకనం", en: "Continuous Evaluation" },
    body: { te: "ఫలితాలు తిరిగి చక్రంలోకి", en: "Loop outcomes back into the cycle" },
    pattern: "dots",
  },
];
