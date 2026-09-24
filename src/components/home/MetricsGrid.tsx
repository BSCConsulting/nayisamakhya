"use client";

import { loc, t } from "@/lib/i18n/dictionary";
import { electricity, topMetrics } from "@/lib/data/metrics";
import { useLanguageStore } from "@/lib/store/preferences";

export function MetricsGrid() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <section className="px-4 pb-10" aria-labelledby="metrics-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="metrics-heading"
          className={`text-2xl font-bold tracking-tight text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("metricsTitle", lang)}
        </h2>
        <p
          className={`mt-1 text-sm text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("metricsSub", lang)}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {topMetrics.map((metric) => (
            <article
              key={metric.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="metric-tnum text-4xl font-light tracking-tight text-slate-900 md:text-5xl">
                {metric.value}
              </p>
              <p
                className={`mt-2 text-sm font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
              >
                {loc(metric.label, lang)}
              </p>
              <span className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600">
                {loc(metric.meta, lang)}
              </span>
            </article>
          ))}
        </div>

        <article
          id="electricity"
          className="mt-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h3
            className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
          >
            {lang === "te" ? "ఉచిత విద్యుత్ స్థితి" : "Free Electricity Status"}
          </h3>
          <div
            className="mt-4 flex h-2 w-full overflow-hidden rounded-full"
            role="img"
            aria-label={`${electricity.completePct}% complete, ${electricity.pendingPct}% pending`}
          >
            <div
              className="h-full bg-emerald-700"
              style={{ width: `${electricity.completePct}%` }}
            />
            <div
              className="h-full bg-slate-200"
              style={{ width: `${electricity.pendingPct}%` }}
            />
          </div>
          <div
            className={`mt-3 flex flex-wrap justify-between gap-2 text-xs text-slate-600 metric-tnum ${lang === "te" ? "font-telugu" : ""}`}
          >
            <span>
              {electricity.completeCount} {t("benefited", lang)} (
              {electricity.completePct}%)
            </span>
            <span>
              {electricity.pendingCount} {t("pending", lang)} (
              {electricity.pendingPct}%)
            </span>
          </div>
          <a
            href="#"
            className={`tap mt-4 inline-flex items-center justify-center rounded-full border border-slate-200 px-4 text-xs font-medium text-slate-900 hover:bg-slate-50 ${lang === "te" ? "font-telugu" : ""}`}
          >
            {t("downloadDiscom", lang)}
          </a>
        </article>
      </div>
    </section>
  );
}
