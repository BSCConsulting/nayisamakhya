"use client";

import { useId, useState } from "react";
import { loc, t } from "@/lib/i18n/dictionary";
import type { Lang } from "@/lib/types";
import { welfareSlices } from "@/lib/data/metrics";

export function WelfareDonut({ lang }: { lang: Lang }) {
  const gradId = useId().replace(/:/g, "");
  const [active, setActive] = useState<string | null>(null);
  const total = welfareSlices.reduce((sum, s) => sum + s.value, 0);
  const radius = 54;
  const stroke = 16;
  const c = 2 * Math.PI * radius;

  const arcs = welfareSlices.map((slice, index) => {
    const len = (slice.value / total) * c;
    const start = welfareSlices
      .slice(0, index)
      .reduce((sum, s) => sum + (s.value / total) * c, 0);
    return { ...slice, len, start };
  });

  const focused = welfareSlices.find((s) => s.id === active) ?? null;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      <div className="relative shrink-0">
        <svg viewBox="0 0 140 140" className="h-36 w-36" role="img" aria-label={t("welfareTitle", lang)}>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
          <g transform="rotate(-90 70 70)">
            {arcs.map((arc) => {
              const isActive = !active || active === arc.id;
              const strokeColor =
                arc.kind === "cleared" && arc.id === "power-cleared"
                  ? `url(#${gradId})`
                  : arc.color;
              return (
                <circle
                  key={arc.id}
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={stroke}
                  strokeDasharray={`${arc.len} ${c - arc.len}`}
                  strokeDashoffset={-arc.start}
                  strokeLinecap="butt"
                  className="cursor-pointer transition-[opacity,stroke-width] duration-200"
                  style={{
                    opacity: isActive ? 1 : 0.28,
                    strokeWidth: active === arc.id ? stroke + 3 : stroke,
                  }}
                  onClick={() => setActive((prev) => (prev === arc.id ? null : arc.id))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive((prev) => (prev === arc.id ? null : arc.id));
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={active === arc.id}
                  aria-label={`${loc(arc.label, lang)}: ${arc.value.toLocaleString("en-IN")}`}
                />
              );
            })}
          </g>
          <text
            x="70"
            y="66"
            textAnchor="middle"
            className="fill-slate-900 text-[18px] font-semibold"
          >
            {focused
              ? focused.value.toLocaleString("en-IN")
              : total.toLocaleString("en-IN")}
          </text>
          <text
            x="70"
            y="84"
            textAnchor="middle"
            className="fill-slate-500 text-[9px]"
          >
            {focused
              ? loc(focused.label, lang)
              : lang === "te"
                ? "మొత్తం"
                : "Total"}
          </text>
        </svg>
      </div>

      <ul className={`w-full space-y-2 text-sm ${lang === "te" ? "font-telugu" : ""}`}>
        {welfareSlices.map((slice) => (
          <li key={slice.id}>
            <button
              type="button"
              onClick={() => setActive((prev) => (prev === slice.id ? null : slice.id))}
              className={`tap flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition-colors ${
                active === slice.id
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-transparent bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background:
                      slice.id === "power-cleared"
                        ? "linear-gradient(90deg,#0284c7,#16a34a)"
                        : slice.color,
                  }}
                  aria-hidden
                />
                {loc(slice.label, lang)}
              </span>
              <span className="metric-tnum text-xs text-slate-600">
                {slice.value.toLocaleString("en-IN")}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
