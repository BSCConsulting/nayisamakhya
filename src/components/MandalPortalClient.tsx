"use client";

import { useEffect } from "react";
import type { Mandal } from "@/lib/types";
import { useMandalPrefStore } from "@/lib/store/preferences";
import { MandalPortalView } from "@/components/MandalPortalView";

/** Client shell: syncs active mandal pref, then renders the portal view. */
export function MandalPortalClient({ mandal }: { mandal: Mandal }) {
  const setMandal = useMandalPrefStore((s) => s.setMandal);

  useEffect(() => {
    setMandal(mandal.districtSlug, mandal.mandalSlug);
  }, [mandal.districtSlug, mandal.mandalSlug, setMandal]);

  return <MandalPortalView mandal={mandal} />;
}
