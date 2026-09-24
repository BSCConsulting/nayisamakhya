"use client";

import { useEffect, useId, useState } from "react";
import { Phone, X } from "lucide-react";
import { t } from "@/lib/i18n/dictionary";
import { useLanguageStore } from "@/lib/store/preferences";

export function SosButton({ className = "" }: { className?: string }) {
  const lang = useLanguageStore((s) => s.lang);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`sos-pulse tap inline-flex items-center justify-center gap-1.5 rounded-full bg-sos px-3.5 text-sm font-semibold text-white shadow-sm ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Phone className="h-4 w-4" aria-hidden />
        SOS
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-900/40 p-4 sm:items-center"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id={titleId}
                  className={`text-lg font-semibold text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {t("sosTitle", lang)}
                </h2>
                <p
                  className={`mt-2 text-sm leading-relaxed text-slate-600 ${lang === "te" ? "font-telugu" : ""}`}
                >
                  {t("sosBody", lang)}
                </p>
              </div>
              <button
                type="button"
                className="tap inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-600"
                onClick={() => setOpen(false)}
                aria-label={t("sosClose", lang)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:112"
                className={`tap inline-flex items-center justify-center rounded-full bg-sos px-5 text-sm font-semibold text-white ${lang === "te" ? "font-telugu" : ""}`}
              >
                {t("sosCall", lang)} · 112
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`tap inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 text-sm font-medium text-slate-900 ${lang === "te" ? "font-telugu" : ""}`}
              >
                {t("sosClose", lang)}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
