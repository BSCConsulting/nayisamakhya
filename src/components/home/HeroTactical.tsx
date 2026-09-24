"use client";

import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { SosButton } from "@/components/layout/SosButton";
import { loc, t } from "@/lib/i18n/dictionary";
import { getMandal } from "@/lib/data/mandals";
import { useLanguageStore, useMandalPrefStore } from "@/lib/store/preferences";

export function HeroTactical() {
  const lang = useLanguageStore((s) => s.lang);
  const districtSlug = useMandalPrefStore((s) => s.districtSlug);
  const mandalSlug = useMandalPrefStore((s) => s.mandalSlug);
  const mandal = getMandal(districtSlug, mandalSlug);

  return (
    <section className="px-4 pb-8 pt-6" id="home">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/mandals"
          className="tap inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 text-sm text-slate-700 shadow-sm"
        >
          <MapPin className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden />
          <span className={`truncate ${lang === "te" ? "font-telugu" : ""}`}>
            📍 {mandal ? loc(mandal.mandal, lang) : "Kodad Mandal"}
          </span>
          <span className="text-slate-400">[</span>
          <span className={`text-accent ${lang === "te" ? "font-telugu" : ""}`}>
            {t("change", lang)}
          </span>
          <span className="text-slate-400">]</span>
          <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden />
        </Link>

        <div className="mt-5">
          <p
            className={`text-xs font-medium tracking-wide text-slate-500 ${lang === "te" ? "font-telugu" : ""}`}
          >
            {t("heroEyebrow", lang)}
          </p>
          <h1
            className={`mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl ${lang === "te" ? "font-telugu leading-relaxed" : ""}`}
          >
            {t("heroTitle", lang)}
          </h1>
          <p
            className={`mt-3 max-w-2xl text-base text-slate-600 ${lang === "te" ? "font-telugu leading-relaxed" : "leading-relaxed"}`}
          >
            {t("heroBody", lang)}
          </p>
        </div>

        <div
          id="sos"
          className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-3"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              className={`text-sm font-semibold text-red-700 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("incidentSos", lang)}
            </p>
            <SosButton className="w-full sm:w-auto" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href={mandal?.surveyPath ?? "/suryapet/kodad/survey"}
            className={`tap inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 ${lang === "te" ? "font-telugu" : ""}`}
          >
            {t("startSurvey", lang)}
          </Link>
          <a
            href="#electricity"
            className={`tap inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-slate-100 px-5 text-sm font-semibold text-slate-900 hover:bg-slate-200 ${lang === "te" ? "font-telugu" : ""}`}
          >
            {t("discomForm", lang)}
          </a>
        </div>
      </div>
    </section>
  );
}
