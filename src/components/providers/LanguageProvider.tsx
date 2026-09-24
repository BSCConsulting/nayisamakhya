"use client";

import { useEffect, type ReactNode } from "react";
import { useLanguageStore } from "@/lib/store/preferences";

/**
 * Syncs <html lang> with Zustand language preference.
 * Renders children immediately (no hydrate gate) so hard refresh
 * never sticks on an empty skeleton.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useLanguageStore((s) => s.lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <>{children}</>;
}
