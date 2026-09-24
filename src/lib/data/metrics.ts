import type {
  AspirationItem,
  DistributionSegment,
  MetricCard,
  ProgressMetric,
  StrategicStep,
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

export const electricity: ProgressMetric = {
  completePct: 64,
  pendingPct: 36,
  completeCount: "5,389",
  pendingCount: "3,031",
};

export const debtSegments: DistributionSegment[] = [
  {
    id: "moneylender",
    label: { te: "వడ్డీ వ్యాపారి", en: "Moneylender" },
    pct: 42,
    color: "#c2410c",
  },
  {
    id: "bank",
    label: { te: "వాణిజ్య బ్యాంకు", en: "Commercial Bank" },
    pct: 38,
    color: "#0f172a",
  },
  {
    id: "free",
    label: { te: "రుణ రహితం", en: "Debt-Free" },
    pct: 20,
    color: "#047857",
  },
];

export const youthAspirations: AspirationItem[] = [
  {
    id: "govt",
    label: { te: "ప్రభుత్వ / పోలీస్ పరీక్షలు", en: "Govt/Police Exams" },
    pct: 45,
  },
  {
    id: "it",
    label: { te: "ఐటి / కార్పొరేట్", en: "IT/Corporate" },
    pct: 30,
  },
  {
    id: "salon",
    label: { te: "ఆధునిక సెలూన్ వ్యాపారం", en: "Modern Salon Business" },
    pct: 18,
  },
  {
    id: "study",
    label: { te: "ఉన్నత విద్య", en: "Higher Ed" },
    pct: 7,
  },
];

export const strategicSteps: StrategicStep[] = [
  {
    id: "01",
    number: "01",
    title: { te: "సమాచార సేకరణ", en: "Information Gathering" },
    body: { te: "బూత్ స్థాయి గణన, సెలూన్ మ్యాపింగ్", en: "Booth mapping & salon enumeration" },
  },
  {
    id: "02",
    number: "02",
    title: { te: "విశ్లేషణ", en: "Data Analysis" },
    body: { te: "అర్హత, రుణం, సేవా అంతరాలు", en: "Gap assessment across welfare & debt" },
  },
  {
    id: "03",
    number: "03",
    title: { te: "మండల ప్రణాళిక", en: "Mandal Planning" },
    body: { te: "మండల ప్రాధాన్యతలు & లక్ష్యాలు", en: "Goal setting with local priorities" },
  },
  {
    id: "04",
    number: "04",
    title: { te: "క్షేత్ర అమలు", en: "Grassroots Execution" },
    body: { te: "సేవా శిబిరాలు, వినతులు, సాయం", en: "Camps, petitions & cadre aid" },
  },
  {
    id: "05",
    number: "05",
    title: { te: "నిరంతర మూల్యాంకనం", en: "Continuous Evaluation" },
    body: { te: "ఫలితాలు తిరిగి చక్రంలోకి", en: "Loop outcomes back into the cycle" },
  },
];
