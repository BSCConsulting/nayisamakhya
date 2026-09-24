"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "@/lib/types";

type LanguageState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "te",
      setLang: (lang) => set({ lang }),
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "nayi-lang",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

type MandalPrefState = {
  districtSlug: string;
  mandalSlug: string;
  setMandal: (districtSlug: string, mandalSlug: string) => void;
};

export const useMandalPrefStore = create<MandalPrefState>()(
  persist(
    (set) => ({
      districtSlug: "suryapet",
      mandalSlug: "kodad",
      setMandal: (districtSlug, mandalSlug) => set({ districtSlug, mandalSlug }),
    }),
    { name: "nayi-active-mandal" },
  ),
);
