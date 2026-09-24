"use client";

import { loc, t } from "@/lib/i18n/dictionary";
import { debtSegments, youthAspirations } from "@/lib/data/metrics";
import { useLanguageStore } from "@/lib/store/preferences";

export function DistributionSection() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <section className="px-4 pb-10" aria-labelledby="distribution-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="distribution-heading"
          className={`text-2xl font-bold tracking-tight text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("distributionTitle", lang)}
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3
              className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("debtTitle", lang)}
            </h3>
            <div
              className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full"
              role="img"
              aria-label="Debt distribution"
            >
              {debtSegments.map((seg) => (
                <div
                  key={seg.id}
                  className="h-full"
                  style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
                />
              ))}
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {debtSegments.map((seg) => (
                <li
                  key={seg.id}
                  className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: seg.color }}
                    aria-hidden
                  />
                  {loc(seg.label, lang)} {seg.pct}%
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3
              className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("youthTitle", lang)}
            </h3>
            <ul className="mt-4 space-y-3.5">
              {youthAspirations.map((item) => (
                <li key={item.id}>
                  <div
                    className={`mb-1.5 flex items-baseline justify-between gap-3 text-sm ${lang === "te" ? "font-telugu" : ""}`}
                  >
                    <span className="text-slate-900">{loc(item.label, lang)}</span>
                    <span className="metric-tnum text-xs text-slate-500">
                      {item.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-sky-700"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3
              className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("bajantriTitle", lang)}
            </h3>
            <p className="metric-tnum mt-3 text-3xl font-light text-slate-900">
              1,280
            </p>
            <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
              {t("pensionActive", lang)}
            </span>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3
              className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("officersTitle", lang)}
            </h3>
            <p className="metric-tnum mt-3 text-3xl font-light text-slate-900">
              412
            </p>
            <p
              className={`mt-2 text-sm text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("officersMeta", lang)}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
