"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguageStore } from "@/lib/store/preferences";

const slides = [
  {
    id: "empower",
    te: {
      kicker: "సమాజ శక్తి",
      title: "Community Empowerment",
      body: "మండల స్థాయి సేవ, సంక్షేమం, సామూహిక స్వరం — ఒకే పోర్టల్‌లో.",
    },
    en: {
      kicker: "Civic Power",
      title: "Community Empowerment",
      body: "Mandal services, welfare, and collective voice — one authoritative portal.",
    },
    tone: "from-[#3f2a1d]/70 via-[#121417]/40 to-transparent",
  },
  {
    id: "heritage",
    te: {
      kicker: "సాంప్రదాయం",
      title: "Bajantri Heritage",
      body: "కళాకారుల గౌరవం, పెన్షన్, సాంస్కృతిక రక్షణ — తరాల వారసత్వం.",
    },
    en: {
      kicker: "Heritage",
      title: "Bajantri Heritage",
      body: "Dignity, pensions, and cultural protection for artisan lineages.",
    },
    tone: "from-[#4a1c0a]/70 via-[#121417]/40 to-transparent",
  },
  {
    id: "scholars",
    te: {
      kicker: "తరం తరువాత",
      title: "Next-Gen Scholars",
      body: "బీసీ స్టడీ సర్కిల్, స్కాలర్‌షిప్‌లు, కోచింగ్ — యువతకు మార్గం.",
    },
    en: {
      kicker: "Next Generation",
      title: "Next-Gen Scholars",
      body: "BC study circles, scholarships, and coaching pathways for youth.",
    },
    tone: "from-[#1c1917]/75 via-[#121417]/35 to-transparent",
  },
] as const;

const stalwarts = [
  {
    name: "Karpoori Thakur",
    role: { te: "సామాజిక న్యాయం", en: "Social Justice" },
    portrait:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Sant Sena Maharaj",
    role: { te: "ఆధ్యాత్మిక సేవ", en: "Spiritual Service" },
    portrait:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Dr. Sheik Chinna Moulana",
    role: { te: "నాదస్వర విద్వాంసుడు", en: "Nadaswaram Maestro" },
    portrait:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
] as const;

export function HeroCarousel() {
  const lang = useLanguageStore((s) => s.lang);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5600);
    return () => window.clearInterval(id);
  }, [reduce]);

  const slide = slides[index];
  const copy = slide[lang];

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#18181B] to-[#121417]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 40%, rgb(194 65 12 / 0.18), transparent), radial-gradient(ellipse 40% 40% at 85% 20%, rgb(255 255 255 / 0.06), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid min-h-[22rem] max-w-7xl lg:min-h-[28rem] lg:grid-cols-[1.4fr_0.9fr]">
        <div className="relative px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.55 }}
              className={`absolute inset-0 bg-gradient-to-r ${slide.tone}`}
              aria-hidden
            />
          </AnimatePresence>

          <div className="relative z-[1] max-w-xl">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] text-[#fdba74] ${lang === "te" ? "font-telugu normal-case tracking-normal" : ""}`}
            >
              {copy.kicker}
            </p>
            <h1
              className={`mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl ${lang === "te" ? "font-telugu leading-snug" : ""}`}
            >
              {copy.title}
            </h1>
            <p
              className={`mt-4 max-w-lg text-sm leading-relaxed text-zinc-200 sm:text-base ${lang === "te" ? "font-telugu" : ""}`}
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
                    i === index ? "bg-brand" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="relative z-[1] border-t border-white/10 bg-white/[0.03] px-4 py-8 backdrop-blur-sm sm:px-6 lg:border-l lg:border-t-0 lg:py-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fdba74]">
            {lang === "te" ? "స్ఫూర్తి స్థంభాలు" : "Guiding Stalwarts"}
          </p>
          <ul className="mt-5 space-y-2">
            {stalwarts.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/10">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-md">
                    <Image
                      src={person.portrait}
                      alt={person.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">
                      {person.name}
                    </span>
                    <span
                      className={`block text-xs text-zinc-300 ${lang === "te" ? "font-telugu" : ""}`}
                    >
                      {person.role[lang]}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
