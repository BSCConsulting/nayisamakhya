export type Lang = "te" | "en";

export type Localized = {
  te: string;
  en: string;
};

export type MetricCard = {
  id: string;
  value: string;
  label: Localized;
  meta: Localized;
};

export type ProgressMetric = {
  completePct: number;
  pendingPct: number;
  completeCount: string;
  pendingCount: string;
};

export type DistributionSegment = {
  id: string;
  label: Localized;
  pct: number;
  color: string;
  description?: Localized;
};

export type AspirationItem = {
  id: string;
  label: Localized;
  pct: number;
  icon?: "shield" | "monitor" | "scissors" | "graduation";
  description?: Localized;
};

export type StrategicStep = {
  id: string;
  number: string;
  title: Localized;
  body: Localized;
  pattern?: "dots" | "civic";
};

export type WelfareSlice = {
  id: string;
  label: Localized;
  value: number;
  color: string;
  kind: "cleared" | "pending";
};

export type BoothBar = {
  id: string;
  name: Localized;
  coverage: number;
  color: string;
};

export type MandalSummary = {
  salons: number;
  bajantri: number;
  freePowerPct: number;
  households: number;
  surveyPct: number;
  gpCount: number;
};

export type Officer = {
  name: Localized;
  title: Localized;
  phone: string;
  status: Localized;
  initials: string;
  jurisdiction: Localized;
  portrait?: string;
};

/** Verified nodal roster card (SMO / Community Coordinator / etc.). */
export type MandalOfficer = {
  id: string;
  name: Localized;
  role: Localized;
  phone: string;
  email?: string;
  status: string;
  isVerified: boolean;
  photoUrl?: string;
};

export type GramPanchayat = {
  id: string;
  name: Localized;
  households: number;
  surveyPct: number;
};

export type MandalNotice = {
  id: string;
  title: Localized;
  date: string;
  image: string;
};

export type MandalAction = {
  id: string;
  title: Localized;
  description: Localized;
  cta: Localized;
  href: string;
  external?: boolean;
  featured?: boolean;
};

export type Mandal = {
  districtSlug: string;
  mandalSlug: string;
  path: string;
  surveyPath: string;
  state: Localized;
  district: Localized;
  mandal: Localized;
  hubTitle: Localized;
  portalHeadline: Localized;
  portalSub: Localized;
  summary: MandalSummary;
  officer: Officer;
  /** Verified nodal roster (SMO, Community Coordinator, …). */
  officers: MandalOfficer[];
  whatsappGroup: string;
  telegramChannel: string;
  cartelWhatsapp: string;
  gramPanchayats: GramPanchayat[];
  actions: MandalAction[];
  notices: MandalNotice[];
};
