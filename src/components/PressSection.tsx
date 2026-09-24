"use client";

import Link from "next/link";
import { Newspaper } from "lucide-react";
import { useLanguageStore } from "@/lib/store/preferences";

const press = [
  {
    date: "22 Sep 2026",
    te: "250 యూనిట్ల ఉచిత విద్యుత్ మార్గదర్శకాలు విడుదల",
    en: "250-unit free power guidelines released",
    href: "/verticals/welfare#power-250",
  },
  {
    date: "20 Sep 2026",
    te: "బీసీ స్టడీ సర్కిల్ దరఖాస్తులు ప్రారంభం",
    en: "BC study circle applications open",
    href: "/verticals/education",
  },
  {
    date: "18 Sep 2026",
    te: "భజంత్రి పెన్షన్ వెరిఫికేషన్ శిబిరాలు ప్రకటన",
    en: "Bajantri pension verification camps announced",
    href: "/verticals/bajantri",
  },
] as const;

export function PressSection() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-16"
      aria-labelledby="press-heading"
    >
      <div className="mb-6 flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-brand" aria-hidden />
        <h2
          id="press-heading"
          className={`text-2xl font-bold text-ink ${lang === "te" ? "font-telugu" : ""}`}
        >
          {lang === "te" ? "ప్రెస్ విడుదలలు" : "Press releases"}
        </h2>
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {press.map((item) => (
          <li key={item.date}>
            <article className="flex h-full flex-col justify-between rounded-2xl border border-[#EBE8E0] bg-white p-5 transition-shadow hover:shadow-md">
              <div>
                <span className="inline-flex rounded-full border border-[#EBE8E0] bg-[#F4F2EB] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#71717A]">
                  ప్రెస్ నోట్ | Press Release
                </span>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-brand">
                  {item.date}
                </p>
                <p
                  className={`mt-2 text-sm font-semibold leading-snug text-ink ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {item[lang]}
                </p>
              </div>
              <Link
                href={item.href}
                className={`mt-5 inline-flex text-xs font-semibold text-brand hover:text-brand-hover ${lang === "te" ? "font-telugu" : ""}`}
              >
                పూర్తి వివరాలు / PDF డౌన్‌లోడ్ →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
