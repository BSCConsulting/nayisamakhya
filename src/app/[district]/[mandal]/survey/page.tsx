"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";
import { loc, t } from "@/lib/i18n/dictionary";
import { getMandal } from "@/lib/data/mandals";
import { useLanguageStore, useMandalPrefStore } from "@/lib/store/preferences";

export default function SurveyPage() {
  const params = useParams<{ district: string; mandal: string }>();
  const lang = useLanguageStore((s) => s.lang);
  const setMandal = useMandalPrefStore((s) => s.setMandal);
  const m = getMandal(params.district, params.mandal);

  useEffect(() => {
    if (m) setMandal(m.districtSlug, m.mandalSlug);
  }, [m, setMandal]);

  if (!m) {
    notFound();
  }

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs text-slate-500">
          📍 {loc(m.district, "en")} &gt; {loc(m.mandal, "en")}
        </p>
        <h1
          className={`mt-3 text-2xl font-bold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("survey", lang)}
        </h1>
        <p
          className={`mt-3 text-sm leading-relaxed text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("surveySoon", lang)}
        </p>
        <Link
          href={m.path}
          className={`tap mt-6 inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("allMandals", lang).replace("← ", "")} → {loc(m.mandal, lang)}
        </Link>
      </div>
    </section>
  );
}
