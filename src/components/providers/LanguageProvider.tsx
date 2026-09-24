"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLanguageStore } from "@/lib/store/preferences";

/**
 * Gates client UI until Zustand persist rehydrates to avoid
 * SSR/client language mismatches, and syncs <html lang>.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useLanguageStore((s) => s.lang);
  const [ready, setReady] = useState(() =>
    typeof window === "undefined" ? false : useLanguageStore.persist.hasHydrated(),
  );

  useEffect(() => {
    if (useLanguageStore.persist.hasHydrated()) {
      queueMicrotask(() => setReady(true));
      return;
    }
    const unsub = useLanguageStore.persist.onFinishHydration(() => {
      setReady(true);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = lang;
  }, [lang, ready]);

  if (!ready) {
    return (
      <div className="min-h-dvh bg-canvas" aria-busy="true" aria-live="polite">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="h-10 w-40 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-6 h-8 w-3/4 max-w-md animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-3 h-4 w-full max-w-lg animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
