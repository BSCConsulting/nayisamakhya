"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

const faqs = [
  {
    q: {
      te: "250 యూనిట్ల ఉచిత విద్యుత్‌కు ఎలా అర్హత సాధించాలి?",
      en: "How do I qualify for 250 units of free power?",
    },
    a: {
      te: "అర్హత మార్గదర్శకాలు Welfare వర్టికల్‌లో ఉన్నాయి. DISCOM వినతి టెంప్లేట్ డౌన్‌లోడ్ చేసి మండల కేంద్రం సహాయం తీసుకోండి.",
      en: "See the Welfare vertical for guidelines. Download the DISCOM petition template and seek mandal hub help.",
    },
  },
  {
    q: {
      te: "కుటుంబ సర్వే ఎక్కడ ప్రారంభించాలి?",
      en: "Where do I start the family survey?",
    },
    a: {
      te: "నావ్‌బార్‌లో మండలం ఎంచుకుని Survey / Floating Action నుంచి ప్రారంభించండి.",
      en: "Pick your mandal in the navbar, then start from Survey or the floating action widget.",
    },
  },
  {
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
    q: { te: "G.O.లు ఎక్కడ దొరుకుతాయి?", en: "Where are G.O.s available?" },
    a: {
      te: "G.O. Library వర్టికల్‌లో అధికారిక ఆర్కైవ్ ఉంది.",
      en: "Official archives live in the G.O. Library vertical.",
    },
  },
  {
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
    q: {
      te: "అత్యవసర సహాయం నంబర్ ఏమిటి?",
      en: "What is the emergency helpline?",
    },
    a: {
      te: "1800-NAYI-SEVA — యాక్సెసిబిలిటీ బార్‌లో కూడా కనిపిస్తుంది.",
      en: "1800-NAYI-SEVA — also shown in the accessibility bar.",
    },
  },
  {
    q: {
      te: "సైట్ భాష ఎలా మార్చాలి?",
      en: "How do I switch language?",
    },
    a: {
      te: "పైన Accessibility బార్‌లో తెలుగు | English ఎంచుకోండి.",
      en: "Use తెలుగు | English in the top accessibility bar.",
    },
  },
] as const;

export function FaqSection() {
  const { language: lang, t } = useLanguage();

  return (
    <section
      className="mx-auto max-w-4xl px-4 py-16"
      aria-labelledby="faq-heading"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {t("faqEyebrow")}
        </p>
        <h2
          id="faq-heading"
          className={`mt-1 text-2xl font-bold text-ink ${lang === "te" ? "font-telugu" : ""}`}
        >
          {t("faqTitle")}
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#EBE8E0] bg-white shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, i) => (
            <AccordionItem
              key={item.q.en}
              value={`faq-${i}`}
              className="px-4 data-[state=open]:bg-[#FBFBF9] sm:px-5"
            >
              <AccordionTrigger
                className={`text-[15px] leading-snug ${lang === "te" ? "font-telugu" : ""}`}
              >
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
  );
}
