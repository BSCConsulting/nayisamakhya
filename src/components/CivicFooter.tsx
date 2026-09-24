"use client";

import Link from "next/link";
import { Landmark, QrCode } from "lucide-react";
import { mandals } from "@/lib/data/mandals";
import { useLanguageStore } from "@/lib/store/preferences";
import { loc } from "@/lib/i18n/dictionary";

const quickLinks = [
  { href: "/verticals/welfare", te: "సంక్షేమ పథకాలు", en: "Welfare schemes" },
  { href: "/verticals/education", te: "విద్యా వనరులు", en: "Education resources" },
  { href: "/mandals", te: "మండల కేంద్రాలు", en: "Mandal hubs" },
  { href: "/verticals/go-library", te: "G.O. లైబ్రరీ", en: "G.O. Library" },
] as const;

export function CivicFooter() {
  const lang = useLanguageStore((s) => s.lang);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-[#18181B] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white">
            <Landmark className="h-5 w-5 text-brand" aria-hidden />
            <span className="font-telugu text-lg font-bold">నాయీ సమాఖ్య</span>
          </div>
          <p className={`mt-3 text-sm leading-relaxed text-slate-400 ${lang === "te" ? "font-telugu" : ""}`}>
            {lang === "te"
              ? "ప్రజల కోసం, ప్రజలతో — సంక్షేమం, విద్య, జీవనోపాధి, సంస్కృతి ఒకే అధికార పోర్టల్."
              : "For the people, with the people — welfare, education, livelihood, and culture in one civic portal."}
          </p>
          <div className="mt-4 flex gap-2">
            {["TG", "AP", "BC"].map((seal) => (
              <span
                key={seal}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-[10px] font-bold tracking-wide text-slate-200"
              >
                {seal}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-sm font-semibold text-white ${lang === "te" ? "font-telugu" : ""}`}>
            {lang === "te" ? "త్వరిత లింకులు" : "Quick Links"}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`hover:text-white ${lang === "te" ? "font-telugu" : ""}`}>
                  {lang === "te" ? link.te : link.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={`text-sm font-semibold text-white ${lang === "te" ? "font-telugu" : ""}`}>
            {lang === "te" ? "ప్రాంతీయ కేంద్రాలు" : "Regional Hubs"}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {mandals.map((m) => (
              <li key={m.path}>
                <Link href={m.path} className={`hover:text-white ${lang === "te" ? "font-telugu" : ""}`}>
                  {loc(m.mandal, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={`text-sm font-semibold text-white ${lang === "te" ? "font-telugu" : ""}`}>
            {lang === "te" ? "టెలిగ్రామ్ బోట్" : "Telegram Bot"}
          </h3>
          <div className="mt-3 rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-950">
              <QrCode className="h-14 w-14 text-slate-400" aria-hidden />
            </div>
            <p className="mt-3 text-center font-telugu text-xs leading-relaxed text-slate-400">
              స్కాన్ చేసి మా టెలిగ్రామ్ బోట్ లో చేరండి
            </p>
            <a
              href="https://t.me/nayi_samakhya_demo"
              target="_blank"
              rel="noreferrer"
              className="btn-brand mt-3 w-full text-xs"
            >
              t.me/nayi_samakhya
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Nayi Samakhya / నాయీ సమాఖ్య. All rights reserved.</p>
          <p className="font-telugu">
            #NayiSamakhya #PrajaSamakhya #BCWelfare #Telangana #AndhraPradesh
          </p>
          <p className="metric-tnum" aria-label="Visitor counter">
            {lang === "te" ? "సందర్శకులు" : "Visitors"}: 1,28,450
          </p>
        </div>
      </div>
    </footer>
  );
}
