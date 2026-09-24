"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useLanguageStore } from "@/lib/store/preferences";
import type { Lang } from "@/lib/types";
import { tr, type TranslationKey } from "@/data/translations";

export type Language = Lang;

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageContextProvider({ children }: { children: ReactNode }) {
  const language = useLanguageStore((s) => s.lang);
  const setLanguage = useLanguageStore((s) => s.setLang);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "te" ? "en" : "te"),
      t: (key, vars) => tr(key, language, vars),
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageContextProvider");
  }
  return ctx;
}
