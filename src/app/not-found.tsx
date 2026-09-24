"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { language } = useLanguage();
  const te = language === "te";

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-lg rounded-3xl border border-[#EBE8E0] bg-white p-8 text-center shadow-sm">
        <p className="font-mono text-sm tracking-widest text-[#A1A1AA]">404</p>
        <h1
          className={`mt-3 text-2xl font-bold text-[#18181B] ${te ? "font-telugu" : ""}`}
        >
          {te ? "పేజీ కనబడలేదు" : "Page not found"}
        </h1>
        <p className={`mt-2 text-sm text-[#71717A] ${te ? "font-telugu" : ""}`}>
          {te
            ? "ఈ మండలం లేదా పేజీ కనుగొనబడలేదు."
            : "This mandal or page could not be found."}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="tap inline-flex items-center justify-center rounded-full bg-[#C2410C] px-5 text-sm font-semibold text-white hover:bg-[#9A3412]"
          >
            {te ? "హోమ్" : "Home"}
          </Link>
          <Link
            href="/mandals"
            className={`tap inline-flex items-center justify-center rounded-full border border-[#EBE8E0] bg-[#FBFBF9] px-5 text-sm font-semibold text-[#18181B] ${te ? "font-telugu" : ""}`}
          >
            {te ? "మండలాలు" : "Mandals"}
          </Link>
        </div>
      </div>
    </section>
  );
}
