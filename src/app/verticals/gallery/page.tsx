"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, Images, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type GalleryCategory =
  | "all"
  | "meets"
  | "welfare"
  | "cultural"
  | "skills";

type GalleryItem = {
  id: string;
  category: Exclude<GalleryCategory, "all">;
  title: { te: string; en: string };
  district: { te: string; en: string };
  date: string;
  description: { te: string; en: string };
  image: string;
};

const filters: { id: GalleryCategory; te: string; en: string }[] = [
  { id: "all", te: "అన్నీ (All)", en: "All" },
  {
    id: "meets",
    te: "సభలు & సమావేశాలు",
    en: "State & District Meets",
  },
  {
    id: "welfare",
    te: "సంక్షేమ డ్రైవ్‌లు",
    en: "Welfare Drives",
  },
  {
    id: "cultural",
    te: "సాంస్కృతిక ప్రదర్శనలు",
    en: "Bajantri Festivals",
  },
  {
    id: "skills",
    te: "సెలూన్ శిక్షణ",
    en: "Skill Workshops",
  },
];

const items: GalleryItem[] = [
  {
    id: "g1",
    category: "meets",
    title: {
      te: "కోదాడ మండల సేవా సమావేశం",
      en: "Kodada Mandal Service Meet",
    },
    district: { te: "కోదాడ, సూర్యాపేట", en: "Kodada, Suryapet" },
    date: "2026-09-12",
    description: {
      te: "మండల స్థాయి నాయకులు, సెలూన్ యజమానులు, భజంత్రి కళాకారులతో సమగ్ర సర్వే సమీక్ష.",
      en: "Comprehensive survey review with mandal leaders, salon owners, and Bajantri artistes.",
    },
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "g2",
    category: "cultural",
    title: {
      te: "భజంత్రి వారసత్వ సమ్మేళనం",
      en: "Bajantri Heritage Gathering",
    },
    district: { te: "ఖమ్మం", en: "Khammam" },
    date: "2026-09-08",
    description: {
      te: "సాంప్రదాయ వాద్య కళాకారుల గౌరవ సమావేశం మరియు పెన్షన్ డాక్యుమెంటేషన్ శిబిరం.",
      en: "Honour meet for traditional musicians with pension documentation camp.",
    },
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "g3",
    category: "welfare",
    title: {
      te: "250 యూనిట్ల ఉచిత విద్యుత్ డ్రైవ్",
      en: "250-Unit Free Power Drive",
    },
    district: { te: "వైరా, ఖమ్మం", en: "Wyra, Khammam" },
    date: "2026-09-05",
    description: {
      te: "సబ్-స్టేషన్ స్థాయి వినతి దరఖాస్తు సహాయ శిబిరం.",
      en: "Sub-station petition assistance camp for pending subsidy applications.",
    },
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "g4",
    category: "skills",
    title: {
      te: "సెలూన్ నైపుణ్య వర్క్‌షాప్",
      en: "Salon Skills Workshop",
    },
    district: { te: "విజయవాడ", en: "Vijayawada" },
    date: "2026-08-28",
    description: {
      te: "యువ సెలూన్ వ్యవస్థాపకులకు ఆధునిక హెయిర్ & గ్రూమింగ్ శిక్షణ.",
      en: "Modern hair and grooming training for young salon entrepreneurs.",
    },
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "g5",
    category: "meets",
    title: {
      te: "రాష్ట్ర స్థాయి సమన్వయ సభ",
      en: "State Coordination Assembly",
    },
    district: { te: "హైదరాబాద్", en: "Hyderabad" },
    date: "2026-08-20",
    description: {
      te: "జిల్లా నోడల్ అధికారులతో వార్షిక సమన్వయ మరియు వ్యూహ చర్చ.",
      en: "Annual coordination and strategy discussion with district nodal officers.",
    },
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "g6",
    category: "welfare",
    title: {
      te: "మహిళా జీవనోపాధి మేళా",
      en: "Women Livelihood Fair",
    },
    district: { te: "మధిర, ఖమ్మం", en: "Madhira, Khammam" },
    date: "2026-08-14",
    description: {
      te: "మహిళా సెలూన్ యజమానులకు రుణ & మార్కెట్ లింకేజ్ శిబిరం.",
      en: "Credit and market-linkage camp for women salon owners.",
    },
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "g7",
    category: "cultural",
    title: {
      te: "దేవాలయ భజంత్రి గౌరవోత్సవం",
      en: "Temple Bajantri Honour Festival",
    },
    district: { te: "తల్లాడ, ఖమ్మం", en: "Tallada, Khammam" },
    date: "2026-08-02",
    description: {
      te: "స్థానిక దేవాలయాల్లో సాంప్రదాయ వాద్య కళాకారుల గౌరవ ప్రదర్శన.",
      en: "Traditional musicians honoured with performances at local temples.",
    },
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "g8",
    category: "skills",
    title: {
      te: "యువత స్టడీ సర్కిల్ ప్రారంభం",
      en: "Youth Study Circle Launch",
    },
    district: { te: "కోదాడ, సూర్యాపేట", en: "Kodada, Suryapet" },
    date: "2026-07-22",
    description: {
      te: "BC-A విద్యార్థులకు స్కాలర్‌షిప్ మార్గదర్శనం మరియు స్టడీ సర్కిల్ ప్రారంభోత్సవం.",
      en: "Scholarship guidance and study-circle inauguration for BC-A students.",
    },
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function GalleryVerticalPage() {
  const { language } = useLanguage();
  const te = language === "te";
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [filter],
  );

  return (
    <div className="bg-[#FBFBF9]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#EBE8E0] bg-white/80 px-3 py-2 text-xs text-[#71717A] backdrop-blur-md"
        >
          <Link href="/" className="inline-flex items-center gap-1 hover:text-[#18181B]">
            <Home className="h-3.5 w-3.5" aria-hidden />
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="font-telugu">గ్యాలరీ</span>
          <span className="text-[#EBE8E0]">/</span>
          <span>Gallery</span>
        </nav>

        <header className="mb-6">
          <div className="flex items-center gap-2">
            <Images className="h-5 w-5 text-[#C2410C]" aria-hidden />
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C2410C]">
              Media archive
            </p>
          </div>
          <h1
            className={`mt-2 text-2xl font-bold tracking-tight text-[#18181B] sm:text-3xl ${te ? "font-telugu leading-relaxed" : ""}`}
          >
            {te
              ? "నాయీ సమాఖ్య మీడియా ఆర్కైవ్"
              : "Nayi Samakhya Media Archive"}
          </h1>
          <p
            className={`mt-2 max-w-2xl text-sm leading-relaxed text-[#71717A] ${te ? "font-telugu" : ""}`}
          >
            {te
              ? "సభలు, సంక్షేమ డ్రైవ్‌లు, సాంస్కృతిక ప్రదర్శనలు మరియు నైపుణ్య శిక్షణల నుంచి ఎంపిక చేసిన ఫోటోలు."
              : "Curated photos from assemblies, welfare drives, cultural performances, and skill workshops."}
          </p>
        </header>

        {/* Filter pills */}
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label={te ? "గ్యాలరీ ఫిల్టర్లు" : "Gallery filters"}
        >
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`tap rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-[#C2410C] text-white shadow-sm"
                    : "border border-[#EBE8E0] bg-white text-[#71717A] hover:bg-[#F4F2EB]"
                } ${te ? "font-telugu" : ""}`}
              >
                {te ? f.te : f.en}
              </button>
            );
          })}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visible.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightbox(item)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-[#EBE8E0] bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={te ? item.title.te : item.title.en}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  aria-hidden
                />
                <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/35 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  {te ? item.district.te : item.district.en}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#18181B]">
                  {item.date}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p
                    className={`text-sm font-semibold leading-snug ${te ? "font-telugu" : ""}`}
                  >
                    {te ? item.title.te : item.title.en}
                  </p>
                  {te ? (
                    <p className="mt-0.5 text-[11px] text-white/75">{item.title.en}</p>
                  ) : (
                    <p className="mt-0.5 font-telugu text-[11px] text-white/75">
                      {item.title.te}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p
            className={`rounded-2xl border border-[#EBE8E0] bg-white p-10 text-center text-sm text-[#71717A] ${te ? "font-telugu" : ""}`}
          >
            {te ? "ఈ వర్గంలో ఫోటోలు లేవు." : "No photos in this category."}
          </p>
        ) : null}
      </div>

      {/* Lightbox */}
      {lightbox ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={te ? lightbox.title.te : lightbox.title.en}
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox(null);
          }}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-[#EBE8E0] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              aria-label={te ? "మూసివేయి" : "Close"}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[16/10] w-full bg-[#F4F2EB]">
              <Image
                src={lightbox.image}
                alt={te ? lightbox.title.te : lightbox.title.en}
                fill
                sizes="90vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#EBE8E0] bg-[#F4F2EB] px-2.5 py-0.5 text-[10px] font-semibold text-[#71717A]">
                  {te ? lightbox.district.te : lightbox.district.en}
                </span>
                <span className="text-xs text-[#A1A1AA]">{lightbox.date}</span>
              </div>
              <h2
                className={`mt-2 text-lg font-bold text-[#18181B] ${te ? "font-telugu" : ""}`}
              >
                {te ? lightbox.title.te : lightbox.title.en}
              </h2>
              <p
                className={`mt-2 text-sm leading-relaxed text-[#71717A] ${te ? "font-telugu" : ""}`}
              >
                {te ? lightbox.description.te : lightbox.description.en}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
