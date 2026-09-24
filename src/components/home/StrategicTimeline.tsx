"use client";

import { loc, t } from "@/lib/i18n/dictionary";
import { strategicSteps } from "@/lib/data/metrics";
import { useLanguageStore } from "@/lib/store/preferences";

export function StrategicTimeline() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <section className="px-4 pb-28 md:pb-16" aria-labelledby="strategy-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="strategy-heading"
          className={`text-2xl font-bold tracking-tight text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("strategyTitle", lang)}
        </h2>
        <p
          className={`mt-1 text-sm text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("strategySub", lang)}
        </p>

        <ol className="mt-5 space-y-3 md:grid md:grid-cols-5 md:gap-3 md:space-y-0">
          {strategicSteps.map((step, index) => (
            <li key={step.id} className="relative">
              <article className="h-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="font-mono text-[10px] tracking-widest text-slate-400">
                  {step.number}
                </p>
                <h3
                  className={`mt-2 text-sm font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {loc(step.title, lang)}
                </h3>
                <p
                  className={`mt-1.5 text-xs leading-relaxed text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {loc(step.body, lang)}
                </p>
              </article>
              {index < strategicSteps.length - 1 ? (
                <span
                  className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-xs text-slate-400 md:block"
                  aria-hidden
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <p
          className={`mt-6 text-center text-xs tracking-wide text-slate-500 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("strategyFooter", lang)}
        </p>
      </div>
    </section>
  );
}
