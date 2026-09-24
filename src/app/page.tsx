"use client";

import Link from "next/link";
import { Newspaper, Images } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FloatingActionWidget } from "@/components/FloatingActionWidget";
import { HeroCarousel } from "@/components/HeroCarousel";
import { useLanguageStore } from "@/lib/store/preferences";

const faqs = [
  {
    q: { te: "250 యూనిట్ల ఉచిత విద్యుత్‌కు ఎలా అర్హత సాధించాలి?", en: "How do I qualify for 250 units of free power?" },
    a: { te: "అర్హత మార్గదర్శకాలు Welfare వర్టికల్‌లో ఉన్నాయి. DISCOM వినతి టెంప్లేట్ డౌన్‌లోడ్ చేసి మండల కేంద్రం సహాయం తీసుకోండి.", en: "See the Welfare vertical for guidelines. Download the DISCOM petition template and seek mandal hub help." },
  },
  {
    q: { te: "కుటుంబ సర్వే ఎక్కడ ప్రారంభించాలి?", en: "Where do I start the family survey?" },
    a: { te: "నావ్‌బార్‌లో మండలం ఎంచుకుని Survey / Floating Action నుంచి ప్రారంభించండి.", en: "Pick your mandal in the navbar, then start from Survey or the floating action widget." },
  },
  {
    q: { te: "BC-A స్కాలర్‌షిప్ దరఖాస్తు ఎలా?", en: "How do I apply for BC-A scholarships?" },
    a: { te: "Education వర్టికల్‌లో గైడ్ చూడండి — అవసరమైన సర్టిఫికేట్లు జాబితా ఉంది.", en: "Open the Education vertical guide — required certificates are listed there." },
  },
  {
    q: { te: "భజంత్రి పెన్షన్ స్థితి ఎలా తెలుసుకోవాలి?", en: "How can I check Bajantri pension status?" },
    a: { te: "Bajantri వర్టికల్ & మండల వెరిఫికేషన్ శిబిరాలు చూడండి.", en: "See the Bajantri vertical and mandal verification camps." },
  },
  {
    q: { te: "సెలూన్ కార్టెల్ బల్క్ ఆర్డర్ ఎలా?", en: "How do cartel bulk orders work?" },
    a: { te: "Livelihood వర్టికల్ లేదా మండల హబ్ WhatsApp గ్రూప్ ద్వారా చేరండి.", en: "Join via the Livelihood vertical or your mandal hub WhatsApp group." },
  },
  {
    q: { te: "G.O.లు ఎక్కడ దొరుకుతాయి?", en: "Where are G.O.s available?" },
    a: { te: "G.O. Library వర్టికల్‌లో అధికారిక ఆర్కైవ్ ఉంది.", en: "Official archives live in the G.O. Library vertical." },
  },
  {
    q: { te: "మండల అధికారిని ఎలా సంప్రదించాలి?", en: "How do I contact my mandal officer?" },
    a: { te: "మండల హబ్ పేజీలో ఫోన్ & WhatsApp వివరాలు ఉన్నాయి.", en: "Phone and WhatsApp details are on each mandal hub page." },
  },
  {
    q: { te: "టెలిగ్రామ్ అలర్ట్స్ ఎలా పొందాలి?", en: "How do I get Telegram alerts?" },
    a: { te: "ఫుటర్‌లో QR స్కాన్ చేయండి లేదా t.me/nayi_samakhya చేరండి.", en: "Scan the footer QR or join t.me/nayi_samakhya." },
  },
  {
    q: { te: "అత్యవసర సహాయం నంబర్ ఏమిటి?", en: "What is the emergency helpline?" },
    a: { te: "1800-NAYI-SEVA — యాక్సెసిబిలిటీ బార్‌లో కూడా కనిపిస్తుంది.", en: "1800-NAYI-SEVA — also shown in the accessibility bar." },
  },
  {
    q: { te: "సైట్ భాష ఎలా మార్చాలి?", en: "How do I switch language?" },
    a: { te: "పైన Accessibility బార్‌లో తెలుగు | English ఎంచుకోండి.", en: "Use తెలుగు | English in the top accessibility bar." },
  },
] as const;

const gallery = [
  { title: "Kodad Service Camp", te: "కోదాడ సేవా శిబిరం", tone: "bg-[#F4F2EB]" },
  { title: "Bajantri Heritage Meet", te: "భజంత్రి సమ్మేళనం", tone: "bg-[#EBE8E0]" },
  { title: "Study Circle Launch", te: "స్టడీ సర్కిల్ ప్రారంభం", tone: "bg-[#F4F2EB]" },
  { title: "Women Livelihood Fair", te: "మహిళా ఉపాధి మేళా", tone: "bg-[#EBE8E0]" },
] as const;

const press = [
  {
    date: "22 Sep 2026",
    te: "250 యూనిట్ల ఉచిత విద్యుత్ మార్గదర్శకాలు విడుదల",
    en: "250-unit free power guidelines released",
  },
  {
    date: "20 Sep 2026",
    te: "బీసీ స్టడీ సర్కిల్ దరఖాస్తులు ప్రారంభం",
    en: "BC study circle applications open",
  },
  {
    date: "18 Sep 2026",
    te: "భజంత్రి పెన్షన్ వెరిఫికేషన్ శిబిరాలు ప్రకటన",
    en: "Bajantri pension verification camps announced",
  },
] as const;

export default function HomePage() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <>
      <HeroCarousel />
      <FloatingActionWidget />

      <section className="mx-auto mt-14 max-w-7xl px-3 sm:px-4" aria-labelledby="faq-heading">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">FAQ</p>
            <h2
              id="faq-heading"
              className={`mt-1 text-2xl font-bold text-ink ${lang === "te" ? "font-telugu" : ""}`}
            >
              {lang === "te" ? "తరచుగా అడిగే ప్రశ్నలు" : "Frequently asked questions"}
            </h2>
          </div>
        </div>
        <div className="surface-card bg-white px-4 sm:px-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={item.q.en} value={`faq-${i}`}>
                <AccordionTrigger className={lang === "te" ? "font-telugu" : ""}>
                  {item.q[lang]}
                </AccordionTrigger>
                <AccordionContent className={lang === "te" ? "font-telugu" : ""}>
                  {item.a[lang]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-3 sm:px-4" aria-labelledby="gallery-heading">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Images className="h-5 w-5 text-brand" aria-hidden />
            <h2
              id="gallery-heading"
              className={`text-2xl font-bold text-ink ${lang === "te" ? "font-telugu" : ""}`}
            >
              {lang === "te" ? "మల్టీమీడియా గ్యాలరీ" : "Multimedia gallery"}
            </h2>
          </div>
          <Link href="/verticals/gallery" className="text-sm font-semibold text-brand hover:text-brand-hover">
            {lang === "te" ? "అన్నీ చూడండి →" : "View all →"}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((item) => (
            <article key={item.title} className={`surface-card overflow-hidden ${item.tone}`}>
              <div className="flex aspect-[4/3] items-end p-3">
                <div>
                  <p className="font-telugu text-sm font-semibold text-ink">{item.te}</p>
                  <p className="text-[11px] text-muted">{item.title}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-3 pb-8 sm:px-4" aria-labelledby="press-heading">
        <div className="mb-5 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-brand" aria-hidden />
          <h2
            id="press-heading"
            className={`text-2xl font-bold text-ink ${lang === "te" ? "font-telugu" : ""}`}
          >
            {lang === "te" ? "ప్రెస్ విడుదలలు" : "Press releases"}
          </h2>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {press.map((item) => (
            <li key={item.date} className="surface-card bg-white p-5 hover:bg-[#F4F2EB]/40">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">
                {item.date}
              </p>
              <p className={`mt-2 text-sm font-semibold text-ink ${lang === "te" ? "font-telugu" : ""}`}>
                {item[lang === "te" ? "te" : "en"]}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
