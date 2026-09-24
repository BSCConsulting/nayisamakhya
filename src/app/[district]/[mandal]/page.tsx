"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { loc, t } from "@/lib/i18n/dictionary";
import { getMandal } from "@/lib/data/mandals";
import { useLanguageStore, useMandalPrefStore } from "@/lib/store/preferences";

export default function MandalHubPage() {
  const params = useParams<{ district: string; mandal: string }>();
  const lang = useLanguageStore((s) => s.lang);
  const setMandal = useMandalPrefStore((s) => s.setMandal);
  const [gpQuery, setGpQuery] = useState("");
  const m = getMandal(params.district, params.mandal);

  useEffect(() => {
    if (m) setMandal(m.districtSlug, m.mandalSlug);
  }, [m, setMandal]);

  const whatsappHref = useMemo(() => {
    if (!m) return "#";
    const text = encodeURIComponent(
      lang === "te"
        ? `నమస్కారం ${loc(m.officer.name, "te")} గారు, ${loc(m.hubTitle, "te")} నుంచి.`
        : `Hello ${loc(m.officer.name, "en")}, contacting from ${loc(m.hubTitle, "en")}.`,
    );
    return `https://wa.me/${m.officer.phone}?text=${text}`;
  }, [lang, m]);

  if (!m) notFound();

  const filtered = m.gramPanchayats.filter((gp) => {
    const q = gpQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      gp.name.en.toLowerCase().includes(q) ||
      gp.name.te.includes(gpQuery.trim()) ||
      gp.id.includes(q)
    );
  });

  return (
    <section className="px-4 pb-10 pt-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/mandals"
          className={`text-xs text-slate-500 hover:text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("allMandals", lang)}
        </Link>

        <p
          className={`mt-4 inline-flex rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
        >
          {loc(m.state, lang)} • {loc(m.district, lang)} • {loc(m.mandal, lang)}
        </p>
        <h1
          className={`mt-3 text-3xl font-bold tracking-tight text-slate-900 ${lang === "te" ? "font-telugu leading-relaxed" : ""}`}
        >
          {loc(m.hubTitle, lang)}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="metric-tnum rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
            {t("salons", lang)} {m.summary.salons}
          </span>
          <span className="metric-tnum rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
            {t("bajantri", lang)} {m.summary.bajantri}
          </span>
          <span className="metric-tnum rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
            {t("power", lang)} {m.summary.freePowerPct}%
          </span>
        </div>

        <article className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-emerald-50 text-lg font-semibold text-emerald-800 font-telugu">
                {m.officer.initials}
              </div>
              <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
              >
                {loc(m.officer.name, lang)}
                <span className="font-normal text-slate-500">
                  {" "}
                  — {loc(m.officer.title, lang)}
                </span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {loc(m.officer.status, lang)}
              </p>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={`tap inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("chatWhatsapp", lang)}
            </a>
          </div>
        </article>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {m.actions.map((action) => {
            const className = `tap block h-full rounded-3xl border bg-white p-5 shadow-sm transition-colors hover:bg-slate-50 ${
              action.featured
                ? "border-emerald-700/30 ring-1 ring-emerald-700/10"
                : "border-slate-200"
            }`;
            const body = (
              <>
                <h3
                  className={`text-base font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {loc(action.title, lang)}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {loc(action.description, lang)}
                </p>
                <span
                  className={`mt-4 inline-flex text-sm font-semibold ${
                    action.featured ? "text-emerald-700" : "text-slate-900"
                  } ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {loc(action.cta, lang)}
                </span>
              </>
            );
            return action.external ? (
              <a
                key={action.id}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {body}
              </a>
            ) : (
              <Link key={action.id} href={action.href} className={className}>
                {body}
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              className={`text-xl font-bold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
            >
              {t("gps", lang)}
            </h2>
            <input
              type="search"
              value={gpQuery}
              onChange={(e) => setGpQuery(e.target.value)}
              placeholder={t("searchGp", lang)}
              className="tap w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-700/40 focus:outline-none sm:w-64"
            />
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((gp) => (
              <li
                key={gp.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <span
                  className={`text-sm font-medium text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {loc(gp.name, lang)}
                </span>
                <span className="metric-tnum shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600">
                  {gp.households}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
