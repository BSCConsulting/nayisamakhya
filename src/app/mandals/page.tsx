"use client";

import Link from "next/link";
import { loc, t } from "@/lib/i18n/dictionary";
import { listMandals } from "@/lib/data/mandals";
import { useLanguageStore, useMandalPrefStore } from "@/lib/store/preferences";

export default function MandalsPage() {
  const lang = useLanguageStore((s) => s.lang);
  const setMandal = useMandalPrefStore((s) => s.setMandal);
  const mandals = listMandals();

  return (
    <section className="px-4 pb-10 pt-6">
      <div className="mx-auto max-w-6xl">
        <h1
          className={`text-3xl font-bold tracking-tight text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("mandalsTitle", lang)}
        </h1>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-600 ${lang === "te" ? "font-telugu leading-relaxed" : ""}`}
        >
          {t("mandalsSub", lang)}
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {mandals.map((m) => (
            <li key={m.path}>
              <Link
                href={m.path}
                onClick={() => setMandal(m.districtSlug, m.mandalSlug)}
                className="tap block h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-700/30 hover:bg-emerald-50/40"
              >
                <p className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                  /{m.districtSlug}/{m.mandalSlug}
                </p>
                <h2
                  className={`mt-2 text-lg font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {loc(m.hubTitle, lang)}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {loc(m.district, lang)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-600">
                  <span className="metric-tnum rounded-full bg-slate-100 px-2.5 py-1">
                    {m.summary.salons} {t("salons", lang)}
                  </span>
                  <span className="metric-tnum rounded-full bg-slate-100 px-2.5 py-1">
                    {m.summary.bajantri} {t("bajantri", lang)}
                  </span>
                  <span className="metric-tnum rounded-full bg-slate-100 px-2.5 py-1">
                    {m.summary.freePowerPct}% {t("power", lang)}
                  </span>
                </div>
                <span
                  className={`mt-5 inline-flex text-sm font-semibold text-emerald-700 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {t("openHub", lang)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
