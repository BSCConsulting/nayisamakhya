"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLanguageStore } from "@/lib/store/preferences";

/**
 * Syncs <html lang> with Zustand language preference.
 * Does not block first paint (avoids infinite skeleton if persist
 * hydration callbacks are missed after a hard refresh).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useLanguageStore((s) => s.lang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
  }, [lang, mounted]);

  return <>{children}</>;
}
