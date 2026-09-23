/** Community status + strategic loop mock data for Phase 2 dashboard */

export const strategicLoopSteps = [
  {
    id: '01',
    icon: 'collect',
    titleTe: 'సమాచార సేకరణ',
    titleEn: 'Field Collection',
    descTe: 'బూత్ స్థాయి గణన, సెలూన్ మ్యాపింగ్',
    descEn: 'Booth enumeration & salon mapping',
  },
  {
    id: '02',
    icon: 'analyze',
    titleTe: 'విశ్లేషణ',
    titleEn: 'Insight Analysis',
    descTe: 'అర్హత, రుణం, సేవా అంతరాలు',
    descEn: 'Eligibility, debt & service gaps',
  },
  {
    id: '03',
    icon: 'plan',
    titleTe: 'ప్రణాళిక',
    titleEn: 'Action Planning',
    descTe: 'మండల ప్రాధాన్యతలు & లక్ష్యాలు',
    descEn: 'Mandal priorities & targets',
  },
  {
    id: '04',
    icon: 'act',
    titleTe: 'అమలు',
    titleEn: 'Field Execution',
    descTe: 'సేవా శిబిరాలు, వినతులు, సాయం',
    descEn: 'Camps, petitions & cadre support',
  },
  {
    id: '05',
    icon: 'review',
    titleTe: 'మూల్యాంకనం',
    titleEn: 'Review & Reinforce',
    descTe: 'ఫలితాలు తిరిగి చక్రంలోకి',
    descEn: 'Outcomes feed the next cycle',
  },
]

export const topMetrics = [
  {
    id: 'population',
    value: '1,42,850',
    labelTe: 'మొత్తం లెక్కింపు జనాభా',
    labelEn: 'Total Population',
    chip: '100% Enlisted',
  },
  {
    id: 'salons',
    value: '8,420',
    labelTe: 'క్రియాశీల సెలూన్ నెట్‌వర్క్',
    labelEn: 'Active Salons',
    chip: 'Across 33 Districts',
  },
  {
    id: 'voters',
    value: '98,210',
    labelTe: 'నమోదైన ఓటర్లు',
    labelEn: 'Eligible Voters',
    chip: 'Mapped across 1,240 Booths',
  },
]

export const electricitySaturation = {
  titleTe: 'ఉచిత విద్యుత్ స్థితి',
  titleEn: '250 Units Free Electricity Saturation',
  benefitedPct: 64,
  pendingPct: 36,
  benefitedCount: '5,389',
  pendingCount: '3,031',
  benefitedLabelTe: 'లబ్ధిదారులు',
  benefitedLabelEn: 'Benefited',
  pendingLabelTe: 'పెండింగ్',
  pendingLabelEn: 'Pending',
  downloadLabelTe: '📄 DISCOM వినతి పత్రం డౌన్‌లోడ్',
  downloadLabelEn: '📄 Download DISCOM petition',
}

export const debtProfile = {
  titleTe: 'రుణ ప్రొఫైల్',
  titleEn: 'Debt & Credit Exposure',
  segments: [
    { id: 'moneylender', labelTe: 'వడ్డీ వ్యాపారి', labelEn: 'Moneylender', pct: 42, color: '#C2410C' },
    { id: 'bank', labelTe: 'వాణిజ్య బ్యాంకు', labelEn: 'Commercial Bank', pct: 38, color: '#18181B' },
    { id: 'free', labelTe: 'రుణ రహితం', labelEn: 'Debt-Free', pct: 20, color: '#10B981' },
  ],
}

export const educationRetention = {
  titleTe: 'విద్యా ప్రగతి',
  titleEn: 'School-to-College Retention',
  steps: [
    { id: 'secondary', labelTe: 'సెకండరీ స్కూల్', labelEn: 'Secondary School', pct: 91 },
    { id: 'intermediate', labelTe: 'ఇంటర్మీడియట్', labelEn: 'Intermediate', pct: 72 },
    { id: 'degree', labelTe: 'డిగ్రీ / ప్రొఫెషనల్', labelEn: 'Degree/Professional', pct: 38 },
  ],
}

export const youthAspirations = {
  titleTe: 'యువత ఆకాంక్షలు',
  titleEn: 'Youth Goals Ages 16–28',
  items: [
    { id: 'govt', labelTe: 'ప్రభుత్వ / పోలీస్ పరీక్షలు', labelEn: 'Govt/Police Exams', pct: 45 },
    { id: 'it', labelTe: 'ఐటి / కార్పొరేట్', labelEn: 'IT/Corporate', pct: 30 },
    { id: 'salon', labelTe: 'ఆధునిక సెలూన్ వ్యాపారం', labelEn: 'Modern Salon Business', pct: 18 },
    { id: 'study', labelTe: 'ఉన్నత / విదేశీ విద్య', labelEn: 'Higher/Overseas Study', pct: 7 },
  ],
}

export const dignityPanels = [
  {
    id: 'bajantri',
    titleTe: 'భజంత్రి కళాకారులు',
    titleEn: 'Bajantri Artist Registry',
    bodyTe: '1,280 నమోదు • 62% పెన్షన్ క్రియాశీలం',
    bodyEn: '1,280 registered • 62% Pension Active',
  },
  {
    id: 'legal',
    titleTe: 'చట్టపరమైన రక్షణ',
    titleEn: 'Legal Dignity Shield',
    bodyTe: '100% జి.ఓ. ప్రసారం • Incident SOS లింక్',
    bodyEn: '100% G.O. circulation • Incident SOS link',
    sosHref: '#voice',
  },
  {
    id: 'cadre',
    titleTe: 'క్షేత్రస్థాయి బలం',
    titleEn: 'Social Media Cadre Footprint',
    bodyTe: '412 మండల అధికారులు నియమితులు',
    bodyEn: '412 Mandal Officers appointed',
  },
]
