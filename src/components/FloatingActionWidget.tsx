"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, ClipboardList, Package, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useMandalPrefStore } from "@/lib/store/preferences";
import { MandalSelector } from "@/components/MandalSelector";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "power",
    icon: Zap,
    key: "actionPower" as const,
    href: "/verticals/welfare#power-250",
  },
  {
    id: "survey",
    icon: ClipboardList,
    key: "actionSurvey" as const,
    href: null as string | null,
  },
  {
    id: "scholarship",
    icon: BookOpen,
    key: "actionScholarship" as const,
    href: "/verticals/education",
  },
  {
    id: "cartel",
    icon: Package,
    key: "actionCartel" as const,
    href: "/verticals/livelihood",
  },
] as const;

export function FloatingActionWidget() {
  const { language, t } = useLanguage();
  const districtSlug = useMandalPrefStore((s) => s.districtSlug);
  const mandalSlug = useMandalPrefStore((s) => s.mandalSlug);
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("power");

  return (
    <div className="relative z-30 mx-auto -mt-10 max-w-5xl px-4 md:-mt-14">
      <div className="rounded-2xl border border-[#EBE8E0] bg-white p-3 shadow-xl">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            const commonClass = cn(
              "tap flex flex-col items-start gap-2 rounded-xl p-3.5 transition-colors sm:p-4",
              isActive
                ? "bg-[#C2410C] text-white shadow-sm"
                : "text-[#18181B] hover:bg-[#F4F2EB]",
              language === "te" ? "font-telugu" : "",
            );
            const iconWrap = (
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
            );

            if (tab.id === "survey") {
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive("survey")}
                  onMouseEnter={() => setActive("survey")}
                  onFocus={() => setActive("survey")}
                  className={cn(commonClass, "text-left")}
                >
                  {iconWrap}
                  <span className="text-sm font-semibold leading-snug">
                    {t(tab.key)}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={tab.id}
                href={tab.href!}
                onMouseEnter={() => setActive(tab.id)}
                onFocus={() => setActive(tab.id)}
                className={commonClass}
              >
                {iconWrap}
                <span className="text-sm font-semibold leading-snug">
                  {t(tab.key)}
                </span>
              </Link>
            );
          })}
        </div>

        {active === "survey" ? (
          <div className="mt-3 border-t border-[#EBE8E0] pt-3">
            <MandalSelector variant="hero" target="survey" />
            <p className="mt-2 text-center text-[11px] text-[#A1A1AA]">
              {language === "te"
                ? `ప్రస్తుతం: ${districtSlug} / ${mandalSlug}`
                : `Current: ${districtSlug} / ${mandalSlug}`}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
