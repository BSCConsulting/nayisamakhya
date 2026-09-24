"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Lang, Mandal } from "@/lib/types";
import { loc, t } from "@/lib/i18n/dictionary";
import { surveyOptions, incomeBranch } from "@/lib/data/surveyOptions";

const TOTAL_STEPS = 6;
const GENDERS = ["M", "F", "O"] as const;

type Member = {
  id: string;
  name: string;
  gender: (typeof GENDERS)[number];
  age: string;
  role: string;
};

type FormState = {
  fullName: string;
  whatsapp: string;
  subCaste: string;
  gramPanchayat: string;
  boothLandmark: string;
  totalMembers: number;
  totalVoters: number;
  members: Member[];
  incomeSource: string;
  premiseType: string;
  powerStatus: string;
  uscNumber: string;
  engagementTypes: string[];
  pensionStatus: string;
  healthCard: string;
  loanSupport: string;
  youthGoals: string[];
  volunteerRole: string;
  grievance: string;
};

type Props = { mandal: Mandal; lang: Lang };

function emptyMember(role = "head"): Member {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `m-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return { id, name: "", gender: "M", age: "", role };
}

function initialForm(): FormState {
  return {
    fullName: "",
    whatsapp: "",
    subCaste: "",
    gramPanchayat: "",
    boothLandmark: "",
    totalMembers: 1,
    totalVoters: 1,
    members: [emptyMember()],
    incomeSource: "",
    premiseType: "",
    powerStatus: "",
    uscNumber: "",
    engagementTypes: [],
    pensionStatus: "",
    healthCard: "",
    loanSupport: "",
    youthGoals: [],
    volunteerRole: "",
    grievance: "",
  };
}

function teClass(lang: Lang) {
  return lang === "te" ? "font-telugu" : "";
}

function FieldLabel({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <label className={`mb-2 block text-sm font-medium text-[#18181B] ${teClass(lang)}`}>
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-[#EBE8E0] bg-white px-4 py-3 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#18181B]/30 focus:outline-none ${props.className ?? ""}`}
    />
  );
}

function OptionTile({
  active,
  onClick,
  lang,
  children,
}: {
  active: boolean;
  onClick: () => void;
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
        active
          ? "border-[#C2410C] bg-[#C2410C]/5 text-[#18181B] ring-1 ring-[#C2410C]/20"
          : "border-[#EBE8E0] bg-white text-[#71717A] hover:bg-[#F4F2EB]"
      } ${teClass(lang)}`}
    >
      {children}
    </button>
  );
}

function Chip({
  active,
  onClick,
  lang,
  children,
}: {
  active: boolean;
  onClick: () => void;
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-[#C2410C] bg-[#C2410C] text-white"
          : "border-[#EBE8E0] bg-white text-[#71717A] hover:bg-[#F4F2EB]"
      } ${teClass(lang)}`}
    >
      {children}
    </button>
  );
}

function NavButtons({
  lang,
  onBack,
  onNext,
  nextLabel,
  disableNext,
  showBack = true,
}: {
  lang: Lang;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  disableNext: boolean;
  showBack?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className={`rounded-full border border-[#EBE8E0] px-5 py-2.5 text-sm font-medium text-[#18181B] hover:bg-[#F4F2EB] ${teClass(lang)}`}
        >
          {lang === "te" ? "← వెనుకకు" : "← Back"}
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        disabled={disableNext}
        onClick={onNext}
        className={`rounded-full bg-[#18181B] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#27272A] disabled:pointer-events-none disabled:opacity-40 ${teClass(lang)}`}
      >
        {nextLabel}
      </button>
    </div>
  );
}

function labelOf(opts: readonly { id: string; label: { te: string; en: string } }[], id: string, lang: Lang) {
  return loc(opts.find((o) => o.id === id)?.label ?? { te: id, en: id }, lang);
}

export function SurveyWizard({ mandal: m, lang }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refId, setRefId] = useState("");
  const [gpFilter, setGpFilter] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, submitted]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const syncMembers = (count: number) => {
    const safe = Math.max(1, count);
    setForm((prev) => {
      const next = [...prev.members];
      while (next.length < safe) next.push(emptyMember(next.length === 0 ? "head" : "other"));
      while (next.length > safe) next.pop();
      return {
        ...prev,
        totalMembers: safe,
        totalVoters: Math.min(prev.totalVoters, safe),
        members: next,
      };
    });
  };

  const updateMember = (id: string, patch: Partial<Member>) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    }));
  };

  const addMember = () => {
    setForm((prev) => ({
      ...prev,
      totalMembers: prev.totalMembers + 1,
      members: [...prev.members, emptyMember("other")],
    }));
  };

  const toggleIn = (key: "youthGoals" | "engagementTypes", id: string) => {
    setForm((prev) => {
      const list = prev[key];
      return {
        ...prev,
        [key]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
      };
    });
  };

  const filteredGps = useMemo(() => {
    const q = gpFilter.trim().toLowerCase();
    if (!q) return m.gramPanchayats;
    return m.gramPanchayats.filter(
      (gp) =>
        gp.name.en.toLowerCase().includes(q) ||
        gp.name.te.includes(gpFilter.trim()) ||
        gp.id.includes(q),
    );
  }, [gpFilter, m.gramPanchayats]);

  const branch = incomeBranch(form.incomeSource);

  const canProceed = () => {
    if (step === 1) {
      return form.fullName.trim().length > 1 && /^\d{10}$/.test(form.whatsapp) && Boolean(form.subCaste);
    }
    if (step === 2) return Boolean(form.gramPanchayat) && form.boothLandmark.trim().length > 0;
    if (step === 3) {
      return form.members.length >= 1 && form.members.every((row) => row.name.trim().length > 0);
    }
    if (step === 4) {
      if (!form.incomeSource) return false;
      if (branch === "salon") return Boolean(form.premiseType && form.powerStatus);
      if (branch === "bajantri") {
        return form.engagementTypes.length > 0 && Boolean(form.pensionStatus);
      }
      return true;
    }
    if (step === 5) {
      return Boolean(form.healthCard && form.loanSupport && form.volunteerRole);
    }
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setRefId(`NS-SRV-${String(Date.now()).slice(-8)}`);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="bg-[#FBFBF9] px-4 py-10 md:py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#EBE8E0] bg-white p-6 text-center shadow-sm md:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981]/10">
            <svg className="h-7 w-7 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className={`text-2xl font-semibold text-[#18181B] ${teClass(lang)}`}>{t("surveySuccess", lang)}</h1>
          <p className={`mt-2 text-sm text-[#71717A] ${teClass(lang)}`}>
            {lang === "te" ? "మీ రిఫరెన్స్ ID" : "Your reference ID"}
          </p>
          <p className="mt-1 font-mono text-xl tracking-tight text-[#18181B]">{refId}</p>
          <Link
            href={m.path}
            className={`mt-8 inline-flex rounded-full bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#9A3412] ${teClass(lang)}`}
          >
            {lang === "te" ? "← మండల కేంద్రానికి" : "← Back to mandal hub"}
          </Link>
        </div>
      </section>
    );
  }

  const gpName = m.gramPanchayats.find((g) => g.id === form.gramPanchayat);

  return (
    <section className="bg-[#FBFBF9] px-4 py-6 pb-16 md:py-10">
      <div className="mx-auto max-w-xl">
        <div className="sticky top-20 z-40 mb-4 flex justify-center">
          <div className={`inline-flex items-center gap-3 rounded-full border border-[#EBE8E0] bg-[#FBFBF9]/90 px-4 py-2 text-xs text-[#71717A] backdrop-blur-md ${teClass(lang)}`}>
            <span>
              📍 {loc(m.district, lang)} &gt; {loc(m.mandal, lang)}
            </span>
            <span className="font-mono text-[#18181B]">
              {lang === "te" ? `దశ ${step}/${TOTAL_STEPS}` : `Step ${step} of ${TOTAL_STEPS}`}
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#EBE8E0] bg-white shadow-sm">
          <div className="h-[3px] w-full bg-[#EBE8E0]">
            <div className="h-full bg-[#C2410C] transition-all duration-300" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>

          <div className="p-6 md:p-8">
            <h1 className={`mb-1 text-xs font-medium uppercase tracking-wide text-[#C2410C] ${teClass(lang)}`}>
              {t("surveyTitle", lang)}
            </h1>

            {step === 1 && (
              <div className="space-y-5">
                <h2 className={`text-xl font-semibold text-[#18181B] ${teClass(lang)}`}>
                  {lang === "te" ? "గుర్తింపు" : "Identity"}
                </h2>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "పూర్తి పేరు" : "Full name"}</FieldLabel>
                  <TextInput value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} placeholder={lang === "te" ? "పేరు రాయండి" : "Enter full name"} />
                </div>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "WhatsApp నంబర్" : "WhatsApp number"}</FieldLabel>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-xl border border-[#EBE8E0] bg-[#F4F2EB] px-3 font-mono text-sm text-[#71717A]">+91</span>
                    <TextInput inputMode="numeric" maxLength={10} value={form.whatsapp} onChange={(e) => setField("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" className="font-mono" />
                  </div>
                </div>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "ఉపజాతి" : "Sub-caste"}</FieldLabel>
                  <div className="grid grid-cols-1 gap-2">
                    {surveyOptions.subCastes.map((opt) => (
                      <OptionTile key={opt.id} lang={lang} active={form.subCaste === opt.id} onClick={() => setField("subCaste", opt.id)}>
                        {loc(opt.label, lang)}
                      </OptionTile>
                    ))}
                  </div>
                </div>
                <NavButtons lang={lang} showBack={false} onBack={() => setStep(1)} onNext={() => setStep(2)} disableNext={!canProceed()} nextLabel={lang === "te" ? "తదుపరి →" : "Next →"} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className={`text-xl font-semibold text-[#18181B] ${teClass(lang)}`}>
                  {lang === "te" ? "స్థానం" : "Location"}
                </h2>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "గ్రామ పంచాయతీ / వార్డు" : "Gram Panchayat / Ward"}</FieldLabel>
                  <TextInput value={gpFilter} onChange={(e) => setGpFilter(e.target.value)} placeholder={lang === "te" ? "వెతకండి…" : "Search…"} className="mb-2" />
                  <div className="max-h-48 space-y-1 overflow-y-auto rounded-xl border border-[#EBE8E0] p-2">
                    {filteredGps.map((gp) => (
                      <button
                        key={gp.id}
                        type="button"
                        onClick={() => setField("gramPanchayat", gp.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${
                          form.gramPanchayat === gp.id ? "bg-[#C2410C]/10 text-[#18181B]" : "text-[#71717A] hover:bg-[#F4F2EB]"
                        } ${teClass(lang)}`}
                      >
                        <span>{loc(gp.name, lang)}</span>
                        <span className="font-mono text-[10px] text-[#A1A1AA]">{gp.surveyPct}%</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "బూత్ / ల్యాండ్‌మార్క్" : "Booth / landmark"}</FieldLabel>
                  <TextInput value={form.boothLandmark} onChange={(e) => setField("boothLandmark", e.target.value)} placeholder={lang === "te" ? "ఓటింగ్ కేంద్రం / పాఠశాల" : "Polling station / school"} />
                </div>
                <NavButtons lang={lang} onBack={() => setStep(1)} onNext={() => setStep(3)} disableNext={!canProceed()} nextLabel={lang === "te" ? "తదుపరి →" : "Next →"} />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className={`text-xl font-semibold text-[#18181B] ${teClass(lang)}`}>
                  {lang === "te" ? "కుటుంబ జాబితా" : "Household roster"}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: lang === "te" ? "మొత్తం సభ్యులు" : "Total members", value: form.totalMembers, onChange: syncMembers, min: 1 },
                    {
                      label: lang === "te" ? "మొత్తం ఓటర్లు" : "Total voters",
                      value: form.totalVoters,
                      onChange: (v: number) => setField("totalVoters", Math.min(Math.max(0, v), form.totalMembers)),
                      min: 0,
                    },
                  ].map((c) => (
                    <div key={c.label} className="rounded-xl border border-[#EBE8E0] bg-[#FBFBF9] p-4">
                      <p className={`mb-3 text-sm text-[#71717A] ${teClass(lang)}`}>{c.label}</p>
                      <div className="flex items-center gap-3">
                        <button type="button" aria-label="Decrease" onClick={() => c.onChange(Math.max(c.min, c.value - 1))} className="h-9 w-9 rounded-full border border-[#EBE8E0] bg-white text-lg text-[#18181B] hover:bg-[#F4F2EB]">−</button>
                        <span className="min-w-[2ch] text-center font-mono text-2xl font-light text-[#18181B]">{c.value}</span>
                        <button type="button" aria-label="Increase" onClick={() => c.onChange(c.value + 1)} className="h-9 w-9 rounded-full border border-[#EBE8E0] bg-white text-lg text-[#18181B] hover:bg-[#F4F2EB]">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="space-y-4">
                  {form.members.map((row, idx) => (
                    <li key={row.id} className="space-y-3 rounded-2xl border border-[#EBE8E0] p-4">
                      <p className="font-mono text-[10px] tracking-widest text-[#A1A1AA]">{String(idx + 1).padStart(2, "0")}</p>
                      <TextInput value={row.name} onChange={(e) => updateMember(row.id, { name: e.target.value })} placeholder={lang === "te" ? "పేరు" : "Name"} />
                      <div className="flex flex-wrap gap-1.5">
                        {GENDERS.map((g) => (
                          <button key={g} type="button" onClick={() => updateMember(row.id, { gender: g })} className={`rounded-full border px-3 py-1 font-mono text-xs ${row.gender === g ? "border-[#18181B] bg-[#18181B] text-white" : "border-[#EBE8E0] bg-white text-[#71717A]"}`}>
                            {g}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <TextInput inputMode="numeric" value={row.age} onChange={(e) => updateMember(row.id, { age: e.target.value.replace(/\D/g, "").slice(0, 3) })} placeholder={lang === "te" ? "వయస్సు" : "Age"} className="font-mono" />
                        <select value={row.role} onChange={(e) => updateMember(row.id, { role: e.target.value })} className={`w-full rounded-xl border border-[#EBE8E0] bg-white px-3 py-3 text-sm text-[#18181B] focus:outline-none ${teClass(lang)}`}>
                          {surveyOptions.roles.map((r) => (
                            <option key={r.id} value={r.id}>{loc(r.label, lang)}</option>
                          ))}
                        </select>
                      </div>
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={addMember} className={`w-full rounded-full border border-dashed border-[#C2410C]/40 py-2.5 text-sm font-medium text-[#C2410C] hover:bg-[#FFF7ED] ${teClass(lang)}`}>
                  {lang === "te" ? "+ సభ్యుడిని జోడించండి" : "+ Add member"}
                </button>
                <NavButtons lang={lang} onBack={() => setStep(2)} onNext={() => setStep(4)} disableNext={!canProceed()} nextLabel={lang === "te" ? "తదుపరి →" : "Next →"} />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className={`text-xl font-semibold text-[#18181B] ${teClass(lang)}`}>
                  {lang === "te" ? "జీవనోపాధి" : "Livelihood"}
                </h2>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "ఆదాయ మూలం" : "Income source"}</FieldLabel>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {surveyOptions.incomeSources.map((opt) => (
                      <OptionTile key={opt.id} lang={lang} active={form.incomeSource === opt.id} onClick={() => setField("incomeSource", opt.id)}>
                        {loc(opt.label, lang)}
                      </OptionTile>
                    ))}
                  </div>
                </div>
                {branch === "salon" && (
                  <div className="space-y-4 border-t border-[#EBE8E0] pt-4">
                    <p className="text-xs font-medium tracking-wide text-[#C2410C]">{lang === "te" ? "శాఖ — సెలూన్" : "Branch — Salon"}</p>
                    <div>
                      <FieldLabel lang={lang}>{lang === "te" ? "ప్రాంగణం" : "Premise type"}</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {surveyOptions.premiseTypes.map((opt) => (
                          <Chip key={opt.id} lang={lang} active={form.premiseType === opt.id} onClick={() => setField("premiseType", opt.id)}>{loc(opt.label, lang)}</Chip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel lang={lang}>{lang === "te" ? "విద్యుత్ స్థితి" : "Power status"}</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {surveyOptions.powerStatus.map((opt) => (
                          <Chip key={opt.id} lang={lang} active={form.powerStatus === opt.id} onClick={() => setField("powerStatus", opt.id)}>{loc(opt.label, lang)}</Chip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel lang={lang}>{lang === "te" ? "USC నంబర్ (ఐచ్ఛికం)" : "USC number (optional)"}</FieldLabel>
                      <TextInput value={form.uscNumber} onChange={(e) => setField("uscNumber", e.target.value)} placeholder="USC / SC No." className="font-mono" />
                    </div>
                  </div>
                )}
                {branch === "bajantri" && (
                  <div className="space-y-4 border-t border-[#EBE8E0] pt-4">
                    <p className="text-xs font-medium tracking-wide text-[#C2410C]">{lang === "te" ? "శాఖ — భజంత్రి" : "Branch — Bajantri"}</p>
                    <div>
                      <FieldLabel lang={lang}>{lang === "te" ? "నిమగ్నత రకాలు" : "Engagement types"}</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {surveyOptions.engagementTypes.map((opt) => (
                          <Chip key={opt.id} lang={lang} active={form.engagementTypes.includes(opt.id)} onClick={() => toggleIn("engagementTypes", opt.id)}>{loc(opt.label, lang)}</Chip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel lang={lang}>{lang === "te" ? "పెన్షన్ స్థితి" : "Pension status"}</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {surveyOptions.pensionStatus.map((opt) => (
                          <Chip key={opt.id} lang={lang} active={form.pensionStatus === opt.id} onClick={() => setField("pensionStatus", opt.id)}>{loc(opt.label, lang)}</Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {branch === "skip" && form.incomeSource && (
                  <p className={`rounded-xl border border-[#EBE8E0] bg-[#FBFBF9] px-4 py-3 text-sm text-[#71717A] ${teClass(lang)}`}>
                    {lang === "te" ? "అదనపు వివరాలు అవసరం లేదు." : "No extra fields — continue."}
                  </p>
                )}
                <NavButtons lang={lang} onBack={() => setStep(3)} onNext={() => setStep(5)} disableNext={!canProceed()} nextLabel={lang === "te" ? "తదుపరి →" : "Next →"} />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5">
                <h2 className={`text-xl font-semibold text-[#18181B] ${teClass(lang)}`}>
                  {lang === "te" ? "సంక్షేమం & యువత" : "Welfare & youth"}
                </h2>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "హెల్త్ కార్డ్" : "Health card"}</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {surveyOptions.healthCard.map((opt) => (
                      <Chip key={opt.id} lang={lang} active={form.healthCard === opt.id} onClick={() => setField("healthCard", opt.id)}>{loc(opt.label, lang)}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "రుణ మద్దతు" : "Loan support"}</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {surveyOptions.loanSupport.map((opt) => (
                      <Chip key={opt.id} lang={lang} active={form.loanSupport === opt.id} onClick={() => setField("loanSupport", opt.id)}>{loc(opt.label, lang)}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "యువత లక్ష్యాలు" : "Youth goals"}</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {surveyOptions.youthGoals.map((opt) => (
                      <Chip key={opt.id} lang={lang} active={form.youthGoals.includes(opt.id)} onClick={() => toggleIn("youthGoals", opt.id)}>{loc(opt.label, lang)}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "స్వచ్ఛంద పాత్ర" : "Volunteer role"}</FieldLabel>
                  <div className="grid grid-cols-1 gap-2">
                    {surveyOptions.volunteerRoles.map((opt) => (
                      <OptionTile key={opt.id} lang={lang} active={form.volunteerRole === opt.id} onClick={() => setField("volunteerRole", opt.id)}>
                        {loc(opt.label, lang)}
                      </OptionTile>
                    ))}
                  </div>
                </div>
                <NavButtons lang={lang} onBack={() => setStep(4)} onNext={() => setStep(6)} disableNext={!canProceed()} nextLabel={lang === "te" ? "సమీక్ష →" : "Review →"} />
              </div>
            )}

            {step === 6 && (
              <div className="space-y-5">
                <h2 className={`text-xl font-semibold text-[#18181B] ${teClass(lang)}`}>
                  {lang === "te" ? "సమీక్ష & సమర్పణ" : "Review & submit"}
                </h2>
                <dl className={`space-y-2 rounded-2xl border border-[#EBE8E0] bg-[#FBFBF9] p-4 text-sm ${teClass(lang)}`}>
                  <div className="flex justify-between gap-3"><dt className="text-[#71717A]">{lang === "te" ? "పేరు" : "Name"}</dt><dd className="font-medium text-[#18181B]">{form.fullName}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-[#71717A]">WhatsApp</dt><dd className="font-mono text-[#18181B]">+91 {form.whatsapp}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-[#71717A]">{lang === "te" ? "ఉపజాతి" : "Sub-caste"}</dt><dd className="text-[#18181B]">{labelOf(surveyOptions.subCastes, form.subCaste, lang)}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-[#71717A]">GP</dt><dd className="text-[#18181B]">{gpName ? loc(gpName.name, lang) : "—"}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-[#71717A]">{lang === "te" ? "సభ్యులు / ఓటర్లు" : "Members / voters"}</dt><dd className="font-mono text-[#18181B]">{form.totalMembers} / {form.totalVoters}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-[#71717A]">{lang === "te" ? "ఆదాయం" : "Income"}</dt><dd className="text-[#18181B]">{labelOf(surveyOptions.incomeSources, form.incomeSource, lang)}</dd></div>
                </dl>
                <div>
                  <FieldLabel lang={lang}>{lang === "te" ? "ఫిర్యాదు / అభ్యర్థన (ఐచ్ఛికం)" : "Grievance / request (optional)"}</FieldLabel>
                  <textarea
                    value={form.grievance}
                    onChange={(e) => setField("grievance", e.target.value)}
                    rows={4}
                    className={`w-full rounded-xl border border-[#EBE8E0] bg-white px-4 py-3 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#18181B]/30 focus:outline-none ${teClass(lang)}`}
                    placeholder={lang === "te" ? "మీ సమస్య లేదా అభ్యర్థన…" : "Describe any issue or request…"}
                  />
                </div>
                <div className="mt-8 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => setStep(5)} className={`rounded-full border border-[#EBE8E0] px-5 py-2.5 text-sm font-medium text-[#18181B] hover:bg-[#F4F2EB] ${teClass(lang)}`}>
                    {lang === "te" ? "← వెనుకకు" : "← Back"}
                  </button>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleSubmit}
                    className={`rounded-full bg-[#C2410C] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#9A3412] disabled:opacity-60 ${teClass(lang)}`}
                  >
                    {submitting ? (lang === "te" ? "సమర్పిస్తోంది…" : "Submitting…") : t("surveySubmit", lang)}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
