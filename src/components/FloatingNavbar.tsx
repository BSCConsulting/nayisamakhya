"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Menu, X, Landmark } from "lucide-react";
import { mandals } from "@/lib/data/mandals";
import { useLanguageStore, useMandalPrefStore } from "@/lib/store/preferences";
import { loc } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/verticals/welfare", te: "సంక్షేమం", en: "Welfare" },
  { href: "/verticals/education", te: "విద్య", en: "Education" },
  { href: "/verticals/livelihood", te: "జీవనోపాధి", en: "Livelihood" },
  { href: "/verticals/bajantri", te: "భజంత్రి", en: "Bajantri" },
  { href: "/verticals/matrimonial", te: "వివాహ సేవ", en: "Matrimonial" },
  { href: "/verticals/gallery", te: "గ్యాలరీ", en: "Gallery" },
  { href: "/verticals/go-library", te: "G.O. లైబ్రరీ", en: "G.O. Library" },
] as const;

export function FloatingNavbar() {
  const lang = useLanguageStore((s) => s.lang);
  const setMandal = useMandalPrefStore((s) => s.setMandal);
  const [open, setOpen] = useState(false);
  const [district, setDistrict] = useState("suryapet");
  const [mandalSlug, setMandalSlug] = useState("kodad");

  const districts = useMemo(() => {
    const map = new Map<string, { te: string; en: string }>();
    for (const m of mandals) {
      if (!map.has(m.districtSlug)) map.set(m.districtSlug, m.district);
    }
    return [...map.entries()].map(([slug, label]) => ({ slug, label }));
  }, []);

  const mandalOptions = useMemo(
    () => mandals.filter((m) => m.districtSlug === district),
    [district],
  );

  function goMandal() {
    const hit = mandals.find(
      (m) => m.districtSlug === district && m.mandalSlug === mandalSlug,
    );
    if (!hit) return;
    setMandal(hit.districtSlug, hit.mandalSlug);
    window.location.href = hit.path;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#EBE8E0] bg-[#FBFBF9]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
        <Link href="/" className="tap flex min-w-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-warm text-brand">
            <Landmark className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-telugu text-sm font-bold tracking-tight text-ink sm:text-base">
              నాయీ సమాఖ్య
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.14em] text-muted sm:block">
              Nayi Samakhya
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-2.5 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-[#F4F2EB]",
                lang === "te" ? "font-telugu" : "",
              )}
            >
              {lang === "te" ? link.te : link.en}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 md:flex">
            <label className="sr-only" htmlFor="nav-district">
              District
            </label>
            <select
              id="nav-district"
              value={district}
              onChange={(e) => {
                const next = e.target.value;
                setDistrict(next);
                const first = mandals.find((m) => m.districtSlug === next);
                if (first) setMandalSlug(first.mandalSlug);
              }}
              className="h-9 max-w-[7.5rem] rounded-lg border border-line bg-white px-2 text-[11px] text-ink"
            >
              {districts.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {loc(d.label, lang)}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="nav-mandal">
              Mandal
            </label>
            <select
              id="nav-mandal"
              value={mandalSlug}
              onChange={(e) => setMandalSlug(e.target.value)}
              className="h-9 max-w-[8rem] rounded-lg border border-line bg-white px-2 text-[11px] text-ink"
            >
              {mandalOptions.map((m) => (
                <option key={m.mandalSlug} value={m.mandalSlug}>
                  {loc(m.mandal, lang)}
                </option>
              ))}
            </select>
            <button type="button" onClick={goMandal} className="btn-brand h-9 px-3 text-[11px]">
              Go
            </button>
          </div>

          <button
            type="button"
            className="tap inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink hover:bg-warm lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-white/95 px-3 py-3 backdrop-blur-md lg:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "tap flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-warm",
                    lang === "te" ? "font-telugu" : "",
                  )}
                >
                  {lang === "te" ? link.te : link.en}
                  <ChevronDown className="h-4 w-4 -rotate-90 text-muted" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <select
              value={district}
              onChange={(e) => {
                const next = e.target.value;
                setDistrict(next);
                const first = mandals.find((m) => m.districtSlug === next);
                if (first) setMandalSlug(first.mandalSlug);
              }}
              className="h-11 rounded-xl border border-line bg-white px-2 text-sm"
            >
              {districts.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {loc(d.label, lang)}
                </option>
              ))}
            </select>
            <select
              value={mandalSlug}
              onChange={(e) => setMandalSlug(e.target.value)}
              className="h-11 rounded-xl border border-line bg-white px-2 text-sm"
            >
              {mandalOptions.map((m) => (
                <option key={m.mandalSlug} value={m.mandalSlug}>
                  {loc(m.mandal, lang)}
                </option>
              ))}
            </select>
            <button type="button" onClick={goMandal} className="btn-brand col-span-2">
              {lang === "te" ? "మండలానికి వెళ్ళండి" : "Go to mandal"}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
