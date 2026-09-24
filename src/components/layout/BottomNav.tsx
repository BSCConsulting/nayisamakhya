"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPinned, ClipboardList, ShieldAlert } from "lucide-react";
import { t } from "@/lib/i18n/dictionary";
import { useLanguageStore, useMandalPrefStore } from "@/lib/store/preferences";

const tabs = [
  { id: "home", href: "/", icon: Home, labelKey: "home" as const },
  { id: "mandal", href: "/mandals", icon: MapPinned, labelKey: "mandal" as const },
  { id: "survey", href: "survey", icon: ClipboardList, labelKey: "survey" as const },
  { id: "sos", href: "/#sos", icon: ShieldAlert, labelKey: "legalSos" as const },
];

export function BottomNav() {
  const pathname = usePathname();
  const lang = useLanguageStore((s) => s.lang);
  const districtSlug = useMandalPrefStore((s) => s.districtSlug);
  const mandalSlug = useMandalPrefStore((s) => s.mandalSlug);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const href =
            tab.id === "survey"
              ? `/${districtSlug}/${mandalSlug}/survey`
              : tab.href;
          const active =
            tab.id === "home"
              ? pathname === "/"
              : tab.id === "mandal"
                ? pathname.startsWith("/mandals") ||
                  (pathname.split("/").length >= 3 &&
                    !pathname.endsWith("/survey") &&
                    pathname !== "/")
                : tab.id === "survey"
                  ? pathname.endsWith("/survey")
                  : false;
          const Icon = tab.icon;
          return (
            <li key={tab.id}>
              <Link
                href={href}
                className={`tap flex flex-col items-center justify-center gap-0.5 px-1 py-2 text-[11px] ${
                  active ? "text-emerald-700" : "text-slate-500"
                } ${lang === "te" ? "font-telugu" : ""}`}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span>{t(tab.labelKey, lang)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
