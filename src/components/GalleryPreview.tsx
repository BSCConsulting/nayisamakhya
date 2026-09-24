"use client";

import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import { useLanguageStore } from "@/lib/store/preferences";

const gallery = [
  {
    title: "Kodad Service Camp",
    te: "కోదాడ సేవా శిబిరం",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Bajantri Heritage Meet",
    te: "భజంత్రి సమ్మేళనం",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Study Circle Launch",
    te: "స్టడీ సర్కిల్ ప్రారంభం",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Women Livelihood Fair",
    te: "మహిళా ఉపాధి మేళా",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  },
] as const;

export function GalleryPreview() {
  const lang = useLanguageStore((s) => s.lang);

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
            className={`text-2xl font-bold text-ink ${lang === "te" ? "font-telugu" : ""}`}
          >
            {lang === "te" ? "మల్టీమీడియా గ్యాలరీ" : "Multimedia gallery"}
          </h2>
        </div>
        <Link
          href="/verticals/gallery"
          className="text-sm font-semibold text-brand hover:text-brand-hover"
        >
          {lang === "te" ? "అన్నీ చూడండి →" : "View all →"}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {gallery.map((item) => (
          <Link
            key={item.title}
            href="/verticals/gallery"
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#EBE8E0] shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width:768px) 100vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-telugu text-sm font-semibold leading-snug">
                {item.te}
              </p>
              <p className="mt-0.5 text-[11px] text-white/80">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
