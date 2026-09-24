"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Minus, Plus, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useMandalPrefStore } from "@/lib/store/preferences";
import { cn } from "@/lib/utils";

type Category = "all" | "power" | "survey" | "education" | "go";

type FaqItem = {
  id: string;
  category: Exclude<Category, "all">;
  keywords: string;
  q: { te: string; en: string };
  a: { te: string; en: string };
  tag: { te: string; en: string };
  action?: "petition" | "survey" | "go";
};

const faqs: FaqItem[] = [
  {
    id: "power-250",
    category: "power",
    keywords: "250 units free power electricity discom ఉచిత విద్యుత్",
    tag: { te: "⚡ ఉచిత విద్యుత్", en: "⚡ Free Power" },
    q: {
      te: "250 యూనిట్ల ఉచిత విద్యుత్‌కు ఎలా అర్హత సాధించాలి?",
      en: "How do I qualify for 250 units of free power?",
    },
    a: {
      te: "అర్హత మార్గదర్శకాలు Welfare వర్టికల్‌లో ఉన్నాయి. DISCOM వినతి టెంప్లేట్ డౌన్‌లోడ్ చేసి మండల కేంద్రం సహాయం తీసుకోండి.",
      en: "See the Welfare vertical for guidelines. Download the DISCOM petition template and seek mandal hub help.",
    },
    action: "petition",
  },
  {
    id: "salon-cartel",
    category: "power",
    keywords: "salon cartel bulk scissors సెలూన్ కార్టెల్",
    tag: { te: "💇 సెలూన్లు", en: "💇 Salons" },
    q: {
      te: "సెలూన్ కార్టెల్ బల్క్ ఆర్డర్ ఎలా?",
      en: "How do cartel bulk orders work?",
    },
    a: {
      te: "Livelihood వర్టికల్ లేదా మండల హబ్ WhatsApp గ్రూప్ ద్వారా చేరండి.",
      en: "Join via the Livelihood vertical or your mandal hub WhatsApp group.",
    },
  },
  {
    id: "survey-start",
    category: "survey",
    keywords: "family survey booth census కుటుంబ సర్వే",
    tag: { te: "📋 కుటుంబ సర్వే", en: "📋 Survey" },
    q: {
      te: "కుటుంబ సర్వే ఎక్కడ ప్రారంభించాలి?",
      en: "Where do I start the family survey?",
    },
    a: {
      te: "నావ్‌బార్‌లో మండలం ఎంచుకుని Floating Action / Survey నుంచి ప్రారంభించండి.",
      en: "Pick your mandal in the navbar, then start from Survey or the floating action widget.",
    },
    action: "survey",
  },
  {
    id: "officer",
    category: "survey",
    keywords: "mandal officer phone whatsapp అధికారి",
    tag: { te: "📋 సర్వే / హబ్", en: "📋 Hub" },
    q: {
      te: "మండల అధికారిని ఎలా సంప్రదించాలి?",
      en: "How do I contact my mandal officer?",
    },
    a: {
      te: "మండల హబ్ పేజీలో ఫోన్ & WhatsApp వివరాలు ఉన్నాయి.",
      en: "Phone and WhatsApp details are on each mandal hub page.",
    },
  },
  {
    id: "bca",
    category: "education",
    keywords: "bc-a scholarship hostel study circle స్కాలర్‌షిప్ విద్య",
    tag: { te: "🎓 విద్య", en: "🎓 Education" },
    q: {
      te: "BC-A స్కాలర్‌షిప్ దరఖాస్తు ఎలా?",
      en: "How do I apply for BC-A scholarships?",
    },
    a: {
      te: "Education వర్టికల్‌లో గైడ్ చూడండి — అవసరమైన సర్టిఫికేట్లు జాబితా ఉంది.",
      en: "Open the Education vertical guide — required certificates are listed there.",
    },
  },
  {
    id: "language",
    category: "education",
    keywords: "language telugu english భాష",
    tag: { te: "🎓 పోర్టల్", en: "🎓 Portal" },
    q: {
      te: "సైట్ భాష ఎలా మార్చాలి?",
      en: "How do I switch language?",
    },
    a: {
      te: "పైన Accessibility బార్‌లో తెలుగు | English ఎంచుకోండి.",
      en: "Use తెలుగు | English in the top accessibility bar.",
    },
  },
  {
    id: "go-library",
    category: "go",
    keywords: "g.o circular government order జీవో",
    tag: { te: "📜 జీవోలు", en: "📜 G.O.s" },
    q: { te: "G.O.లు ఎక్కడ దొరుకుతాయి?", en: "Where are G.O.s available?" },
    a: {
      te: "G.O. Library వర్టికల్‌లో అధికారిక ఆర్కైవ్ ఉంది.",
      en: "Official archives live in the G.O. Library vertical.",
    },
    action: "go",
  },
  {
    id: "bajantri",
    category: "go",
    keywords: "bajantri pension artiste భజంత్రి",
    tag: { te: "🎵 కళాకారులు", en: "🎵 Artistes" },
    q: {
      te: "భజంత్రి పెన్షన్ స్థితి ఎలా తెలుసుకోవాలి?",
      en: "How can I check Bajantri pension status?",
    },
    a: {
      te: "Bajantri వర్టికల్ & మండల వెరిఫికేషన్ శిబిరాలు చూడండి.",
      en: "See the Bajantri vertical and mandal verification camps.",
    },
  },
  {
    id: "telegram",
    category: "go",
    keywords: "telegram alerts టెలిగ్రామ్",
    tag: { te: "📜 అలర్ట్స్", en: "📜 Alerts" },
    q: {
      te: "టెలిగ్రామ్ అలర్ట్స్ ఎలా పొందాలి?",
      en: "How do I get Telegram alerts?",
    },
    a: {
      te: "ఫుటర్‌లో QR స్కాన్ చేయండి లేదా t.me/nayi_samakhya చేరండి.",
      en: "Scan the footer QR or join t.me/nayi_samakhya.",
    },
  },
  {
    id: "helpline",
    category: "survey",
    keywords: "helpline emergency 1800 నాయి సేవ",
    tag: { te: "📋 హెల్ప్‌లైన్", en: "📋 Helpline" },
    q: {
      te: "అత్యవసర సహాయం నంబర్ ఏమిటి?",
      en: "What is the emergency helpline?",
    },
    a: {
      te: "1800-NAYI-SEVA — యాక్సెసిబిలిటీ బార్‌లో కూడా కనిపిస్తుంది.",
      en: "1800-NAYI-SEVA — also shown in the accessibility bar.",
    },
  },
];

const categories: { id: Category; te: string; en: string }[] = [
  { id: "all", te: "అన్నీ (All)", en: "All" },
  {
    id: "power",
    te: "⚡ ఉచిత విద్యుత్ & సెలూన్లు",
    en: "⚡ Power & Salons",
  },
  { id: "survey", te: "📋 కుటుంబ సర్వే", en: "📋 Survey" },
  {
    id: "education",
    te: "🎓 విద్య & స్కాలర్‌షిప్‌లు",
    en: "🎓 Education",
  },
  {
    id: "go",
    te: "📜 జీవోలు & కళాకారులు",
    en: "📜 G.O.s & Artistes",
  },
];

export function FaqSection() {
  const { language: lang } = useLanguage();
  const districtSlug = useMandalPrefStore((s) => s.districtSlug);
  const mandalSlug = useMandalPrefStore((s) => s.mandalSlug);
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      const hay = `${item.q.te} ${item.q.en} ${item.a.te} ${item.a.en} ${item.keywords}`.toLowerCase();
      return hay.includes(q);
    });
  }, [category, query]);

  function actionFor(item: FaqItem) {
    if (item.action === "petition") {
      return {
        href: "/discom-petition.txt",
        label:
          lang === "te" ? "📄 వినతి పత్రం డౌన్‌లోడ్" : "📄 Download petition",
        download: true,
      };
    }
    if (item.action === "survey") {
      return {
        href: `/${districtSlug}/${mandalSlug}/survey`,
        label:
          lang === "te" ? "🚀 సర్వే ప్రారంభించండి →" : "🚀 Start survey →",
      };
    }
    if (item.action === "go") {
      return {
        href: "/verticals/go-library",
        label:
          lang === "te" ? "📜 జీవో లైబ్రరీ చూడండి →" : "📜 Open G.O. Library →",
      };
    }
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="faq-heading">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <p className="inline-flex rounded-full border border-[#EBE8E0] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C2410C]">
          ✦ సహాయ కేంద్రం • FAQ
        </p>
        <h2
          id="faq-heading"
          className={`mt-3 text-2xl font-bold text-[#18181B] md:text-3xl ${lang === "te" ? "font-telugu" : ""}`}
        >
          {lang === "te"
            ? "తరచుగా అడిగే ప్రశ్నలు (Frequently Asked Questions)"
            : "Frequently Asked Questions (తరచుగా అడిగే ప్రశ్నలు)"}
        </h2>

        <div className="relative mx-auto mb-2 mt-6 max-w-md">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ప్రశ్నను ఇక్కడ వెతకండి / Type a keyword (e.g., 250 units, Survey, G.O.)..."
            className="w-full rounded-full border border-[#EBE8E0] bg-white py-2.5 pl-11 pr-4 text-sm text-[#18181B] shadow-sm placeholder:text-slate-400 focus:border-[#C2410C] focus:outline-none"
            aria-label="Search FAQ"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const active = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                "rounded-full px-3.5 py-2 text-xs font-semibold transition-colors",
                active
                  ? "bg-[#C2410C] text-white shadow-sm"
                  : "border border-[#EBE8E0] bg-white text-[#71717A] hover:bg-[#F4F2EB]",
                lang === "te" ? "font-telugu" : "",
              )}
            >
              {lang === "te" ? cat.te : cat.en}
            </button>
          );
        })}
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.length === 0 ? (
          <p
            className={`col-span-full rounded-2xl border border-[#EBE8E0] bg-white p-8 text-center text-sm text-[#71717A] ${lang === "te" ? "font-telugu" : ""}`}
          >
            {lang === "te"
              ? "మీ వెతుకులకు సరిపోయే ప్రశ్నలు లేవు."
              : "No matching questions found."}
          </p>
        ) : (
          filtered.map((item) => {
            const open = openId === item.id;
            const action = actionFor(item);
            return (
              <article
                key={item.id}
                className={cn(
                  "cursor-pointer rounded-2xl border border-[#EBE8E0] bg-white p-5 shadow-sm transition-all hover:border-[#C2410C]/40",
                  open && "border-[#C2410C]/30",
                )}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span
                    className={`inline-flex rounded-full bg-[#F4F2EB] px-2.5 py-0.5 text-[10px] font-semibold text-[#71717A] ${lang === "te" ? "font-telugu" : ""}`}
                  >
                    {item.tag[lang]}
                  </span>
                  <span className="mt-3 flex items-start justify-between gap-3">
                    <span
                      className={`text-sm font-semibold leading-snug text-[#18181B] md:text-base ${lang === "te" ? "font-telugu" : ""}`}
                    >
                      {item.q[lang]}
                    </span>
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#EBE8E0] text-[#C2410C]">
                      {open ? (
                        <Minus className="h-3.5 w-3.5" aria-hidden />
                      ) : (
                        <Plus className="h-3.5 w-3.5" aria-hidden />
                      )}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="answer"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`mt-2 rounded-xl border-t border-[#F4F2EB] bg-[#FAF8F2]/50 p-3 pt-3 text-xs leading-relaxed text-[#52525B] md:text-sm ${lang === "te" ? "font-telugu" : ""}`}
                      >
                        {item.a[lang]}
                        {action ? (
                          <Link
                            href={action.href}
                            {...(action.download
                              ? {
                                  download: "nayi-discom-petition-template.txt",
                                }
                              : {})}
                            className="mt-3 inline-flex rounded-full bg-[#C2410C] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#9A3412]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {action.label}
                          </Link>
                        ) : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })
        )}
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-[#EBE8E0] bg-gradient-to-r from-[#FFF7ED] to-white p-6 shadow-sm md:flex md:items-center md:justify-between md:gap-6">
        <p
          className={`text-sm leading-relaxed text-[#18181B] ${lang === "te" ? "font-telugu" : ""}`}
        >
          {lang === "te"
            ? "మీ ప్రశ్నకు సమాధానం దొరకలేదా? మా వాట్సాప్ హెల్ప్‌డెస్క్ లేదా సమాఖ్య మిత్ర చాట్‌బాట్‌ను సంప్రదించండి."
            : "Didn't find your answer? Reach our WhatsApp helpdesk or Samakhya Mitra chatbot."}
        </p>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1ebe5d] md:mt-0"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          {lang === "te" ? "💬 వాట్సాప్ సహాయం పొందండి" : "💬 Get WhatsApp help"}
        </a>
      </div>
    </section>
  );
}
