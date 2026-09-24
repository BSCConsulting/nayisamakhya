"use client";

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
    tone: "from-[#3f2a1d]/80 via-[#18181B]/55 to-transparent",
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
    tone: "from-[#4a1c0a]/80 via-[#18181B]/50 to-transparent",
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
    tone: "from-[#1c1917]/85 via-[#292524]/45 to-transparent",
  },
] as const;

const stalwarts = [
  { name: "Karpoori Thakur", role: { te: "సామాజిక న్యాయం", en: "Social Justice" } },
  { name: "Sant Sena Maharaj", role: { te: "ఆధ్యాత్మిక సేవ", en: "Spiritual Service" } },
  {
    name: "Dr. Sheik Chinna Moulana",
    role: { te: "నాదస్వర విద్వాంసుడు", en: "Nadaswaram Maestro" },
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
    <section className="relative overflow-hidden border-b border-line bg-[#1c1917]">
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
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] text-[#fdba74] ${lang === "te" ? "font-telugu normal-case tracking-normal" : ""}`}>
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

        <aside className="relative z-[1] border-t border-white/10 bg-black/25 px-4 py-8 backdrop-blur-sm sm:px-6 lg:border-l lg:border-t-0 lg:py-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fdba74]">
            {lang === "te" ? "స్ఫూర్తి స్థంభాలు" : "Guiding Stalwarts"}
          </p>
          <ul className="mt-5 space-y-4">
            {stalwarts.map((person) => (
              <li
                key={person.name}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C2410C]/40 bg-[#C2410C]/20 font-serif text-lg text-[#fdba74]">
                  {person.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{person.name}</span>
                  <span className={`block text-xs text-zinc-300 ${lang === "te" ? "font-telugu" : ""}`}>
                    {person.role[lang]}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
