"use client";

import { loc, t } from "@/lib/i18n/dictionary";
import { salonSparkline, topBooths, topMetrics } from "@/lib/data/metrics";
import { useLanguageStore } from "@/lib/store/preferences";
import { Sparkline } from "@/components/charts/Sparkline";
import { WelfareDonut } from "@/components/charts/WelfareDonut";
import { BentoShell, FadeItem, Stagger } from "@/components/motion/primitives";
import {
  IllustrationArtisan,
  IllustrationCommunity,
  IllustrationSalon,
} from "@/components/home/Illustrations";
import { electricity } from "@/lib/data/metrics";

export function BentoGrid() {
  const lang = useLanguageStore((s) => s.lang);
  const population = topMetrics.find((m) => m.id === "population")!;
  const salons = topMetrics.find((m) => m.id === "salons")!;
  const voters = topMetrics.find((m) => m.id === "voters")!;

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

        <Stagger className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12">
          {/* At a Glance */}
          <FadeItem className="lg:col-span-7">
            <BentoShell className="pattern-civic relative h-full">
              <div className="relative z-[2] flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.12em] text-teal-700 ${lang === "te" ? "font-telugu normal-case tracking-normal" : ""}`}
                  >
                    {t("atAGlance", lang)}
                  </p>
                  <p
                    className={`mt-3 text-sm font-medium text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
                  >
                    {loc(population.label, lang)}
                  </p>
                  <p className="metric-tnum mt-1 text-4xl font-light tracking-tight text-gradient-primary md:text-5xl">
                    {population.value}
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600">
                    {loc(population.meta, lang)}
                  </span>
                </div>
                <IllustrationCommunity className="h-14 w-14 shrink-0 opacity-90" />
              </div>

              <div className="relative z-[2] mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p
                    className={`text-sm font-medium text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
                  >
                    {loc(salons.label, lang)}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <p className="metric-tnum text-3xl font-light text-gradient-primary">
                      {salons.value}
                    </p>
                    <Sparkline values={salonSparkline} />
                  </div>
                  <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
                    {loc(salons.meta, lang)}
                  </span>
                </div>
                <IllustrationSalon className="h-14 w-14 opacity-90" />
              </div>
            </BentoShell>
          </FadeItem>

          {/* Welfare donut */}
          <FadeItem className="lg:col-span-5">
            <BentoShell className="pattern-dots h-full" id="electricity">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3
                    className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
                  >
                    {t("welfareTitle", lang)}
                  </h3>
                  <p
                    className={`mt-1 text-xs text-slate-500 ${lang === "te" ? "font-telugu" : ""}`}
                  >
                    {t("welfareHint", lang)}
                  </p>
                </div>
                <IllustrationArtisan className="h-12 w-12 shrink-0" />
              </div>
              <div className="mt-4">
                <WelfareDonut lang={lang} />
              </div>
              <div
                className={`mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2 w-6 rounded-full bg-gradient-hero"
                    aria-hidden
                  />
                  {electricity.completePct}% {t("cleared", lang)}
                </span>
                <a
                  href="/discom-petition.txt"
                  download="nayi-discom-petition-template.txt"
                  className="tap inline-flex items-center justify-center rounded-full border border-slate-200 px-3 text-xs font-medium text-slate-900 hover:bg-slate-50"
                >
                  {t("downloadDiscom", lang)}
                </a>
              </div>
            </BentoShell>
          </FadeItem>

          {/* Voter network bars */}
          <FadeItem className="lg:col-span-12">
            <BentoShell>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3
                    className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
                  >
                    {t("voterNetwork", lang)}
                  </h3>
                  <p
                    className={`mt-1 text-xs text-slate-500 ${lang === "te" ? "font-telugu" : ""}`}
                  >
                    {t("voterNetworkSub", lang)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="metric-tnum text-3xl font-light text-gradient-primary">
                    {voters.value}
                  </p>
                  <p className="text-[11px] text-slate-500">{loc(voters.meta, lang)}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {topBooths.map((booth) => (
                  <li key={booth.id}>
                    <div
                      className={`mb-1 flex items-baseline justify-between gap-3 text-sm ${lang === "te" ? "font-telugu" : ""}`}
                    >
                      <span className="flex items-center gap-2 text-slate-800">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: booth.color }}
                          aria-hidden
                        />
                        {loc(booth.name, lang)}
                      </span>
                      <span className="metric-tnum text-xs text-slate-500">
                        {booth.coverage}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-[width] duration-500"
                        style={{
                          width: `${booth.coverage}%`,
                          background: `linear-gradient(90deg, ${booth.color}, ${booth.color}cc)`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </BentoShell>
          </FadeItem>
        </Stagger>
      </div>
    </section>
  );
}
