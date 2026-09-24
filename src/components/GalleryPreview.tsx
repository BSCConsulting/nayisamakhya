"use client";

import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const gallery = [
  {
    key: "galleryKodad" as const,
    titleEn: "Kodad Service Camp",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=600",
  },
  {
    key: "galleryBajantri" as const,
    titleEn: "Bajantri Heritage Meet",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600",
  },
  {
    key: "galleryStudy" as const,
    titleEn: "Study Circle Launch",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
  },
  {
    key: "galleryWomen" as const,
    titleEn: "Women Livelihood Fair",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  },
] as const;

export function GalleryPreview() {
  const { language, t } = useLanguage();

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16"
      aria-labelledby="gallery-heading"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Images className="h-5 w-5 text-brand" aria-hidden />
          <h2
            id="gallery-heading"
            className={`text-2xl font-bold text-ink ${language === "te" ? "font-telugu" : ""}`}
          >
            {t("galleryTitle")}
          </h2>
        </div>
        <Link
          href="/verticals/gallery"
          className="text-sm font-semibold text-brand hover:text-brand-hover"
        >
          {t("viewAll")}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {gallery.map((item) => (
          <Link
            key={item.key}
            href="/verticals/gallery"
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#EBE8E0] shadow-sm"
          >
            <Image
              src={item.image}
              alt={t(item.key)}
              fill
              sizes="(max-width:768px) 100vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p
                className={`text-sm font-semibold leading-snug ${language === "te" ? "font-telugu" : ""}`}
              >
                {t(item.key)}
              </p>
              {language === "te" ? (
                <p className="mt-0.5 text-[11px] text-white/80">{item.titleEn}</p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
