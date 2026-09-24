import type { Localized } from "@/lib/types";

export type SurveyOpt = { id: string; label: Localized; branch?: "salon" | "bajantri" | "skip" };

export const surveyOptions = {
  subCastes: [
    { id: "nayi", label: { te: "నాయీ / మంగలి", en: "Nayi / Mangali" } },
    { id: "bajantri", label: { te: "భజంత్రి సంగీతకారుడు", en: "Bajantri Musician" } },
    { id: "allied", label: { te: "అనుబంధ కళాకారుడు", en: "Allied Artisan" } },
  ] satisfies SurveyOpt[],
  roles: [
    { id: "head", label: { te: "కుటుంబ పెద్ద", en: "Household Head" } },
    { id: "spouse", label: { te: "జీవిత భాగస్వామి", en: "Spouse" } },
    { id: "child", label: { te: "పిల్లవాడు / విద్యార్థి", en: "Child / Student" } },
    { id: "elder", label: { te: "వృద్ధుడు", en: "Elder" } },
    { id: "other", label: { te: "ఇతరం", en: "Other" } },
  ] satisfies SurveyOpt[],
  incomeSources: [
    { id: "salon-owner", label: { te: "సెలూన్ యజమాని", en: "Salon Owner" }, branch: "salon" },
    { id: "salon-worker", label: { te: "సెలూన్ కార్మికుడు", en: "Salon Worker" }, branch: "salon" },
    { id: "bajantri", label: { te: "భజంత్రి సంగీతకారుడు", en: "Bajantri Musician" }, branch: "bajantri" },
    { id: "student", label: { te: "విద్యార్థి", en: "Student" }, branch: "skip" },
    { id: "private", label: { te: "ప్రైవేట్ ఉద్యోగం", en: "Private Job" }, branch: "skip" },
    { id: "unemployed", label: { te: "నిరుద్యోగి", en: "Unemployed" }, branch: "skip" },
    { id: "agriculture", label: { te: "వ్యవసాయం", en: "Agriculture" }, branch: "skip" },
  ] satisfies SurveyOpt[],
  premiseTypes: [
    { id: "rented", label: { te: "అద్దె", en: "Rented" } },
    { id: "owned", label: { te: "స్వంతం", en: "Owned" } },
    { id: "kiosk", label: { te: "కియోస్క్", en: "Kiosk" } },
  ] satisfies SurveyOpt[],
  powerStatus: [
    { id: "active", label: { te: "క్రియాశీలం", en: "Active" } },
    { id: "pending", label: { te: "పెండింగ్", en: "Pending" } },
    { id: "none", label: { te: "దరఖాస్తు చేయలేదు", en: "Not Applied" } },
    { id: "meter", label: { te: "మీటర్ సమస్య", en: "Meter Issue" } },
  ] satisfies SurveyOpt[],
  engagementTypes: [
    { id: "temple", label: { te: "దేవాలయ ఒప్పందం", en: "Temple Contract" } },
    { id: "weddings", label: { te: "పెళ్లిళ్లు", en: "Weddings" } },
    { id: "seasonal", label: { te: "కాలానుగుణ ఒత్తిడి", en: "Seasonal strain" } },
  ] satisfies SurveyOpt[],
  pensionStatus: [
    { id: "active", label: { te: "క్రియాశీలం", en: "Active" } },
    { id: "applied", label: { te: "దరఖాస్తు చేశారు", en: "Applied" } },
    { id: "none", label: { te: "లేదు", en: "None" } },
  ] satisfies SurveyOpt[],
  healthCard: [
    { id: "active", label: { te: "క్రియాశీలం", en: "Active" } },
    { id: "pending", label: { te: "పెండింగ్", en: "Pending" } },
    { id: "none", label: { te: "లేదు", en: "None" } },
  ] satisfies SurveyOpt[],
  loanSupport: [
    { id: "bc", label: { te: "BC కార్పొరేషన్", en: "BC Corporation" } },
    { id: "vishwakarma", label: { te: "PM విశ్వకర్మ", en: "PM Vishwakarma" } },
    { id: "both", label: { te: "రెండూ", en: "Both" } },
    { id: "none", label: { te: "లేదు", en: "None" } },
  ] satisfies SurveyOpt[],
  youthGoals: [
    { id: "govt", label: { te: "ప్రభుత్వ / పోలీస్ పరీక్షలు", en: "Govt/Police Exams" } },
    { id: "salon-academy", label: { te: "ఆధునిక సెలూన్ అకాడమీ", en: "Modern Salon Academy" } },
    { id: "it", label: { te: "ఐటి / సాఫ్ట్‌వేర్", en: "IT/Software" } },
    { id: "hostel", label: { te: "కాలేజీ హాస్టల్", en: "College Hostel" } },
    { id: "startup", label: { te: "కొత్త వ్యాపారం / స్టార్టప్", en: "New Business/Startup" } },
  ] satisfies SurveyOpt[],
  volunteerRoles: [
    {
      id: "smo",
      label: {
        te: "🌟 మండల సోషల్ మీడియా ఆఫీసర్‌గా బాధ్యత తీసుకుంటాను",
        en: "🌟 I will serve as Mandal Social Media Officer",
      },
    },
    {
      id: "gp",
      label: {
        te: "🤝 గ్రామ పంచాయతీ సమన్వయకర్తగా పనిచేస్తాను",
        en: "🤝 I will work as Gram Panchayat coordinator",
      },
    },
    {
      id: "member",
      label: {
        te: "📱 సాధారణ సభ్యునిగా సమాచారం కోరుకుంటున్నాను",
        en: "📱 I want updates as a general member",
      },
    },
  ] satisfies SurveyOpt[],
} as const;

export function incomeBranch(sourceId: string): "salon" | "bajantri" | "skip" {
  const src = surveyOptions.incomeSources.find((s) => s.id === sourceId);
  return src?.branch ?? "skip";
}
