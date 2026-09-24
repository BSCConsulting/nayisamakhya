"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AccessibilityState = {
  fontScale: number;
  highContrast: boolean;
  setFontScale: (scale: number) => void;
  bumpFont: (delta: number) => void;
  toggleContrast: () => void;
};

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set, get) => ({
      fontScale: 1,
      highContrast: false,
      setFontScale: (scale) => set({ fontScale: Math.min(1.35, Math.max(0.85, scale)) }),
      bumpFont: (delta) => {
        const next = Math.min(1.35, Math.max(0.85, get().fontScale + delta));
        set({ fontScale: Number(next.toFixed(2)) });
      },
      toggleContrast: () => set({ highContrast: !get().highContrast }),
    }),
    { name: "nayi-a11y" },
  ),
);
