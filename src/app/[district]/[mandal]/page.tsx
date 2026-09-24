"use client";

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { getMandal } from "@/lib/data/mandals";
import { useMandalPrefStore } from "@/lib/store/preferences";
import { MandalPortalView } from "@/components/MandalPortalView";

export default function MandalHubPage() {
  const params = useParams<{ district: string; mandal: string }>();
  const setMandal = useMandalPrefStore((s) => s.setMandal);
  const m = getMandal(params.district, params.mandal);

  useEffect(() => {
    if (m) setMandal(m.districtSlug, m.mandalSlug);
  }, [m, setMandal]);

  if (!m) {
    notFound();
  }

  return <MandalPortalView mandal={m} />;
}
