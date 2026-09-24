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
};

export type Officer = {
  name: Localized;
  title: Localized;
  phone: string;
  status: Localized;
  initials: string;
};

export type GramPanchayat = {
  id: string;
  name: Localized;
  households: number;
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
  summary: MandalSummary;
  officer: Officer;
  whatsappGroup: string;
  telegramChannel: string;
  cartelWhatsapp: string;
  gramPanchayats: GramPanchayat[];
  actions: MandalAction[];
};
