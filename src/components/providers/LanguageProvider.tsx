"use client";

import { useEffect, type ReactNode } from "react";
import { useLanguageStore } from "@/lib/store/preferences";
import { useAccessibilityStore } from "@/lib/store/accessibility";

/**
 * Syncs <html lang>, font scale, and high-contrast class with stores.
 * Renders children immediately (no hydrate gate).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useLanguageStore((s) => s.lang);
  const fontScale = useAccessibilityStore((s) => s.fontScale);
  const highContrast = useAccessibilityStore((s) => s.highContrast);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.classList.toggle("contrast-high", highContrast);
  }, [highContrast]);

  return <>{children}</>;
}
