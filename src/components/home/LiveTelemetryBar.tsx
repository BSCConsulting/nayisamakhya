"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { loc, t } from "@/lib/i18n/dictionary";
import { getMandal } from "@/lib/data/mandals";
import { useLanguageStore, useMandalPrefStore } from "@/lib/store/preferences";

export function LiveTelemetryBar() {
  const lang = useLanguageStore((s) => s.lang);
  const districtSlug = useMandalPrefStore((s) => s.districtSlug);
  const mandalSlug = useMandalPrefStore((s) => s.mandalSlug);
  const mandal = getMandal(districtSlug, mandalSlug);
  const reduce = useReducedMotion();
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const tick = () => {
      setSyncing(true);
      window.setTimeout(() => {
        if (!cancelled) setSyncing(false);
      }, 1600);
    };
    tick();
    const id = window.setInterval(tick, 14000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [reduce]);

  return (
    <div
      className="sticky top-[var(--header-h)] z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md"
      style={{ minHeight: "var(--telemetry-h)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link
          href="/mandals"
          className={`tap inline-flex min-w-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 ${lang === "te" ? "font-telugu" : ""}`}
          aria-label={`${t("liveLabel", lang)}: ${mandal ? loc(mandal.mandal, lang) : "Kodad"}`}
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
            <span className="absolute inset-0 rounded-full bg-[#C2410C]/100/40 animate-live-pulse" />
            <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          <span className="shrink-0 text-[10px] font-bold tracking-[0.14em] text-brand">
            {t("liveLabel", lang)}
          </span>
          <span className="truncate font-medium">
            {mandal ? loc(mandal.mandal, lang) : "Kodad Mandal"}
          </span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
        </Link>

        <div className="flex min-w-[5.5rem] justify-end">
          <AnimatePresence mode="wait" initial={false}>
            {syncing ? (
              <motion.span
                key="sync"
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className={`text-[11px] font-medium text-brand animate-sync-blink ${lang === "te" ? "font-telugu" : ""}`}
              >
                {t("syncing", lang)}
              </motion.span>
            ) : (
              <motion.span
                key="done"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className={`text-[11px] text-slate-500 ${lang === "te" ? "font-telugu" : ""}`}
              >
                {t("synced", lang)}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
