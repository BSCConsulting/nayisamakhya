"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MessageCircle, Phone, UserPlus } from "lucide-react";
import type { MandalOfficer } from "@/lib/types";
import { loc } from "@/lib/i18n/dictionary";
import { useLanguageStore } from "@/lib/store/preferences";
import { cn } from "@/lib/utils";

const HELPLINE = "919032654111";

function digitsOnly(phone: string) {
  return String(phone || "").replace(/\D/g, "") || HELPLINE;
}

type Props = {
  officers: MandalOfficer[];
  surveyPath: string;
  mandalNameTe: string;
  mandalNameEn: string;
  className?: string;
};

export function NodalOfficersRoster({
  officers,
  surveyPath,
  mandalNameTe,
  mandalNameEn,
  className,
}: Props) {
  const lang = useLanguageStore((s) => s.lang);
  const te = lang === "te";
  const verified = officers.filter(
    (o) => o.status === "active" || o.isVerified,
  );

  return (
    <section
      aria-labelledby="officer-heading"
      className={cn(className)}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C2410C]">
        {te ? "నోడల్ అధికారి డెస్క్" : "Nodal Officer Desk"}
      </p>
      <h2
        id="officer-heading"
        className={`mt-1 text-xl font-bold text-[#18181B] ${te ? "font-telugu" : ""}`}
      >
        {te ? "స్థానిక నాయకత్వం & సమన్వయం" : "Local leadership & coordination"}
      </h2>
      <p className={`mt-1 max-w-2xl text-sm text-[#71717A] ${te ? "font-telugu" : ""}`}>
        {te
          ? `${mandalNameTe} మండల సోషల్ మీడియా అధికారులు & కమ్యూనిటీ సమన్వయకర్తలు`
          : `Verified SMOs & community coordinators for ${mandalNameEn}`}
      </p>

      {verified.length === 0 ? (
        <article className="mt-4 rounded-2xl border border-dashed border-[#EBE8E0] bg-[#FBFBF9] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                className={`text-base font-semibold text-[#18181B] ${te ? "font-telugu" : ""}`}
              >
                {te
                  ? "అధికారి నామినేషన్ తెరిచి ఉంది"
                  : "Officer nomination open"}
              </p>
              <p
                className={`mt-1 text-sm text-[#71717A] ${te ? "font-telugu" : ""}`}
              >
                {te
                  ? "మండల సోషల్ మీడియా అధికారి / కమ్యూనిటీ సమన్వయకర్తగా దరఖాస్తు చేసుకోండి."
                  : "Apply to serve as Mandal Social Media Officer or Community Coordinator."}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:shrink-0">
              <Link
                href={surveyPath}
                className={`tap inline-flex items-center justify-center gap-2 rounded-full bg-[#C2410C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9A3412] ${te ? "font-telugu" : ""}`}
              >
                <UserPlus className="h-4 w-4" aria-hidden />
                {te ? "దరఖాస్తు చేసుకోండి" : "Apply now"}
              </Link>
              <a
                href={`https://wa.me/${HELPLINE}`}
                target="_blank"
                rel="noreferrer"
                className={`tap inline-flex items-center justify-center gap-2 rounded-full border border-[#EBE8E0] bg-white px-4 py-2.5 text-sm font-semibold text-[#18181B] hover:border-[#C2410C]/30 ${te ? "font-telugu" : ""}`}
              >
                <MessageCircle className="h-4 w-4 text-[#C2410C]" aria-hidden />
                {te ? "హెల్ప్‌లైన్ వాట్సాప్" : "Helpline WhatsApp"}
              </a>
            </div>
          </div>
        </article>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {verified.map((officer) => {
            const phone = digitsOnly(officer.phone);
            const waText = encodeURIComponent(
              te
                ? `నమస్కారం ${loc(officer.name, "te")} గారు, ${mandalNameTe} మండలం నుంచి.`
                : `Hello ${loc(officer.name, "en")}, contacting from ${mandalNameEn} mandal.`,
            );
            const initials =
              loc(officer.name, te ? "te" : "en").trim().charAt(0) || "N";

            return (
              <article
                key={officer.id}
                className="overflow-hidden rounded-2xl border border-[#EBE8E0] bg-white shadow-sm"
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  <div className="relative mx-auto shrink-0 sm:mx-0">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#EBE8E0] bg-[#F4F2EB]">
                      {officer.photoUrl ? (
                        <Image
                          src={officer.photoUrl}
                          alt={loc(officer.name, lang)}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-telugu text-xl font-semibold text-[#C2410C]">
                          {initials}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <p
                      className={`text-base font-bold text-[#18181B] ${te ? "font-telugu" : ""}`}
                    >
                      {loc(officer.name, "te")}
                      <span className="font-medium text-[#71717A]">
                        {" "}
                        ({loc(officer.name, "en")})
                      </span>
                    </p>
                    <span
                      className={`mt-2 inline-flex rounded-full border border-[#EBE8E0] bg-[#FFF7ED] px-2.5 py-0.5 text-[11px] font-semibold text-[#C2410C] ${te ? "font-telugu" : ""}`}
                    >
                      {loc(officer.role, lang)}
                    </span>
                    {officer.isVerified ? (
                      <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                        {te ? "ధృవీకరించబడిన అధికారి" : "Verified Official"}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2 sm:shrink-0">
                    <a
                      href={`tel:+${phone}`}
                      className={`tap inline-flex items-center justify-center gap-2 rounded-full border border-[#EBE8E0] bg-[#FBFBF9] px-4 py-2.5 text-sm font-semibold text-[#18181B] hover:border-[#C2410C]/30 ${te ? "font-telugu" : ""}`}
                    >
                      <Phone className="h-4 w-4 text-[#C2410C]" aria-hidden />
                      {te ? "అధికారికి కాల్" : "Call Officer"}
                    </a>
                    <a
                      href={`https://wa.me/${phone}?text=${waText}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`tap inline-flex items-center justify-center gap-2 rounded-full bg-[#C2410C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9A3412] ${te ? "font-telugu" : ""}`}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      {te ? "వాట్సాప్ మెసేజ్" : "WhatsApp Message"}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
