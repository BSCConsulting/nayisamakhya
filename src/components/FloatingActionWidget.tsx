"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, ClipboardList, Package, Zap } from "lucide-react";
import { useLanguageStore, useMandalPrefStore } from "@/lib/store/preferences";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "power",
    icon: Zap,
    te: "250 యూనిట్ల స్థితి",
    en: "Check 250 Units Status",
    href: "/verticals/welfare#power-250",
  },
  {
    id: "survey",
    icon: ClipboardList,
    te: "కుటుంబ సర్వే",
    en: "Start Family Survey",
    href: null as string | null,
  },
  {
    id: "scholarship",
    icon: BookOpen,
    te: "BC-A స్కాలర్‌షిప్",
    en: "BC-A Scholarship Guide",
    href: "/verticals/education",
  },
  {
    id: "cartel",
    icon: Package,
    te: "కార్టెల్ బల్క్ ఆర్డర్",
    en: "Cartel Bulk Order",
    href: "/verticals/livelihood",
  },
] as const;

export function FloatingActionWidget() {
  const lang = useLanguageStore((s) => s.lang);
  const districtSlug = useMandalPrefStore((s) => s.districtSlug);
  const mandalSlug = useMandalPrefStore((s) => s.mandalSlug);
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("power");

  return (
    <div className="relative z-30 mx-auto -mt-10 max-w-5xl px-4 md:-mt-14">
      <div className="rounded-2xl border border-[#EBE8E0] bg-white p-3 shadow-xl">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const href =
              tab.id === "survey"
                ? `/${districtSlug}/${mandalSlug}/survey`
                : tab.href!;
            const isActive = active === tab.id;
            return (
              <Link
                key={tab.id}
                href={href}
                onMouseEnter={() => setActive(tab.id)}
                onFocus={() => setActive(tab.id)}
                className={cn(
                  "tap flex flex-col items-start gap-2 rounded-xl p-3.5 transition-colors sm:p-4",
                  isActive
                    ? "bg-[#C2410C] text-white shadow-sm"
                    : "text-[#18181B] hover:bg-[#F4F2EB]",
                  lang === "te" ? "font-telugu" : "",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-xl border",
                    isActive
                      ? "border-white/25 bg-white/15 text-white"
                      : "border-[#EBE8E0] bg-[#F4F2EB] text-[#C2410C]",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-sm font-semibold leading-snug">
                  {lang === "te" ? tab.te : tab.en}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
