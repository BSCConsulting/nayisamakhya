"use client";

import { useState, type ComponentType } from "react";
import {
  GraduationCap,
  Monitor,
  Scissors,
  Shield,
} from "lucide-react";
import { loc, t } from "@/lib/i18n/dictionary";
import { debtSegments, youthAspirations } from "@/lib/data/metrics";
import { useLanguageStore } from "@/lib/store/preferences";
import { BentoShell, FadeItem, Stagger } from "@/components/motion/primitives";

const aspirationIcons: Record<
  NonNullable<(typeof youthAspirations)[number]["icon"]>,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  shield: Shield,
  monitor: Monitor,
  scissors: Scissors,
  graduation: GraduationCap,
};

export function SocialInsights() {
  const lang = useLanguageStore((s) => s.lang);
  const [debtActive, setDebtActive] = useState<string | null>(null);
  const [youthActive, setYouthActive] = useState<string | null>("govt");

  const debtFocus = debtSegments.find((s) => s.id === debtActive);
  const youthFocus = youthAspirations.find((s) => s.id === youthActive);

  return (
    <section className="px-4 pb-10" aria-labelledby="social-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="social-heading"
          className={`text-2xl font-bold tracking-tight text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("socialInsights", lang)}
        </h2>
        <p
          className={`mt-1 text-sm text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("socialInsightsSub", lang)}
        </p>

        <Stagger className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <FadeItem>
            <BentoShell className="h-full">
              <h3
                className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
              >
                {t("debtTitle", lang)}
              </h3>

              <div
                className="mt-4 flex h-3 w-full overflow-hidden rounded-full"
                role="group"
                aria-label={t("debtTitle", lang)}
              >
                {debtSegments.map((seg) => {
                  const on = !debtActive || debtActive === seg.id;
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      aria-pressed={debtActive === seg.id}
                      title={loc(seg.label, lang)}
                      className="h-full transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      style={{
                        width: `${seg.pct}%`,
                        background:
                          debtActive === seg.id
                            ? "linear-gradient(90deg,#C2410C,#9A3412)"
                            : seg.color,
                        opacity: on ? 1 : 0.35,
                      }}
                      onClick={() =>
                        setDebtActive((prev) => (prev === seg.id ? null : seg.id))
                      }
                    />
                  );
                })}
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {debtSegments.map((seg) => (
                  <li key={seg.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setDebtActive((prev) => (prev === seg.id ? null : seg.id))
                      }
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-colors ${
                        debtActive === seg.id
                          ? "bg-brand text-white"
                          : "bg-slate-100 text-slate-600"
                      } ${lang === "te" ? "font-telugu" : ""}`}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-current"
                        aria-hidden
                      />
                      {loc(seg.label, lang)} {seg.pct}%
                    </button>
                  </li>
                ))}
              </ul>

              {debtFocus?.description ? (
                <p
                  className={`mt-4 rounded-2xl border border-line bg-[#C2410C]/10/70 px-3 py-2 text-xs leading-relaxed text-ink ${lang === "te" ? "font-telugu" : ""}`}
                  role="status"
                >
                  {loc(debtFocus.description, lang)}
                </p>
              ) : null}
            </BentoShell>
          </FadeItem>

          <FadeItem>
            <BentoShell className="h-full">
              <h3
                className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
              >
                {t("youthTitle", lang)}
              </h3>
              <ul className="mt-4 space-y-3">
                {youthAspirations.map((item) => {
                  const Icon = aspirationIcons[item.icon ?? "graduation"];
                  const active = youthActive === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setYouthActive(item.id)}
                        className={`tap w-full rounded-2xl border px-3 py-2.5 text-left transition-colors ${
                          active
                            ? "border-brand/40 bg-[#C2410C]/10/80"
                            : "border-slate-100 bg-slate-50/60 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`mb-1.5 flex items-center justify-between gap-3 text-sm ${lang === "te" ? "font-telugu" : ""}`}
                        >
                          <span className="flex items-center gap-2 font-medium text-slate-900">
                            <Icon className="h-4 w-4 text-brand" aria-hidden />
                            {loc(item.label, lang)}
                          </span>
                          <span className="metric-tnum text-xs text-slate-500">
                            {item.pct}%
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white">
                          <div
                            className={`h-full rounded-full ${
                              active ? "bg-brand" : "bg-sky-700"
                            }`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {youthFocus?.description ? (
                <p
                  className={`mt-4 rounded-2xl border border-sky-100 bg-sky-50/70 px-3 py-2 text-xs leading-relaxed text-slate-800 ${lang === "te" ? "font-telugu" : ""}`}
                  role="status"
                >
                  {loc(youthFocus.description, lang)}
                </p>
              ) : null}
            </BentoShell>
          </FadeItem>
        </Stagger>
      </div>
    </section>
  );
}
