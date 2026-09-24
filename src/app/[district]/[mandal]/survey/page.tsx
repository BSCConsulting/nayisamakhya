"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";
import { getMandal } from "@/lib/data/mandals";
import { useLanguageStore, useMandalPrefStore } from "@/lib/store/preferences";
import { SurveyWizard } from "@/components/SurveyWizard";

export default function SurveyPage() {
  const params = useParams<{ district: string; mandal: string }>();
  const lang = useLanguageStore((s) => s.lang);
  const setMandal = useMandalPrefStore((s) => s.setMandal);
  const m = getMandal(params.district, params.mandal);

  useEffect(() => {
    if (m) setMandal(m.districtSlug, m.mandalSlug);
  }, [m, setMandal]);

  if (!m) {
    notFound();
  }

  return <SurveyWizard mandal={m} lang={lang} />;
}
