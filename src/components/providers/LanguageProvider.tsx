"use client";

import type { ReactNode } from "react";

/** Client boundary for language/mandal preference stores (Zustand persist). */
export function LanguageProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
