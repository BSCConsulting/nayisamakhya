"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const slides = [
  {
    id: "salon",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1920",
    te: {
      kicker: "సమాజ శక్తి",
      title: "సమాజ బలోపేతం",
      body: "మండల స్థాయి సేవ, సంక్షేమం, సామూహిక స్వరం — ఒకే పోర్టల్‌లో.",
    },
    en: {
      kicker: "Civic Power",
      title: "Community Empowerment",
      body: "Mandal services, welfare, and collective voice — one authoritative portal.",
    },
  },
  {
    id: "heritage",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1600",
    te: {
      kicker: "సాంప్రదాయం",
      title: "భజంత్రి వారసత్వం",
      body: "కళాకారుల గౌరవం, పెన్షన్, సాంస్కృతిక రక్షణ — తరాల వారసత్వం.",
    },
    en: {
      kicker: "Heritage",
      title: "Bajantri Heritage",
      body: "Dignity, pensions, and cultural protection for artisan lineages.",
    },
  },
  {
    id: "scholars",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
    te: {
      kicker: "తరం తరువాత",
      title: "తరం తరువాత విద్యార్థులు",
      body: "బీసీ స్టడీ సర్కిల్, స్కాలర్‌షిప్‌లు, కోచింగ్ — యువతకు మార్గం.",
    },
    en: {
      kicker: "Next Generation",
      title: "Next-Gen Scholars",
      body: "BC study circles, scholarships, and coaching pathways for youth.",
    },
  },
] as const;

const AMBEDKAR =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Dr._B._R._Ambedkar_ca._1950.jpg/440px-Dr._B._R._Ambedkar_ca._1950.jpg";

export function HeroCarousel() {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const slide = slides[index];
  const copy = slide[language];

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#121417]">
      <div className="absolute inset-0">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#121417]/90 via-[#121417]/65 to-black/30"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto grid min-h-[24rem] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:min-h-[30rem] lg:grid-cols-[1.35fr_0.85fr] lg:py-16">
        <div className="relative z-[1] max-w-xl">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.18em] text-[#fdba74] ${language === "te" ? "font-telugu normal-case tracking-normal" : ""}`}
          >
            {copy.kicker}
          </p>
          <h1
            className={`mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl ${language === "te" ? "font-telugu leading-snug" : ""}`}
          >
            {copy.title}
          </h1>
          <p
            className={`mt-4 max-w-lg text-sm leading-relaxed text-zinc-200 sm:text-base ${language === "te" ? "font-telugu" : ""}`}
          >
            {copy.body}
          </p>
          <div className="mt-6 flex gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-8 rounded-full transition-colors ${
                  i === index ? "bg-[#F5A623]" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <aside className="relative z-[1] flex flex-col items-center justify-center lg:items-end">
          <div className="relative w-full max-w-[280px]">
            <div
              className="relative mx-auto aspect-[3/4] w-[220px] overflow-hidden sm:w-[240px]"
              style={{
                maskImage: "radial-gradient(circle, black 65%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(circle, black 65%, transparent 100%)",
              }}
            >
              <Image
                src={AMBEDKAR}
                alt={t("ambedkarTitle")}
                fill
                sizes="240px"
                className="object-cover object-top"
              />
            </div>
            <div className="mx-auto mt-3 max-w-[260px] rounded-xl border border-[#F5A623]/40 bg-[#121417]/75 px-4 py-3 text-center shadow-lg backdrop-blur-sm">
              <p className="font-telugu text-sm font-bold leading-snug text-[#F5A623]">
                {t("ambedkarTitle")}
              </p>
              <p
                className={`mt-1 text-[11px] leading-relaxed text-zinc-200 ${language === "te" ? "font-telugu" : ""}`}
              >
                {t("ambedkarSub")}
              </p>
              <p className="mt-2 text-[10px] font-medium tracking-wide text-[#fdba74]/90">
                {t("ambedkarRole")}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
