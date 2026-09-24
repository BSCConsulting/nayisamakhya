"use client";

const TICKER =
  "🔴 బ్రేకింగ్ అప్‌డేట్స్: 250 యూనిట్ల ఉచిత విద్యుత్ అర్హత మార్గదర్శకాలు విడుదల • బీసీ స్టడీ సర్కిల్ ఉచిత కోచింగ్ దరఖాస్తులు ప్రారంభం • భజంత్రి పెన్షన్ వెరిఫికేషన్ శిబిరాలు — కోదాడ, మధిర, వైరా • మాతృమూర్తి మ్యాట్రిమోనియల్ డ్రైవ్ ఈ నెల 28న • ";

export function NewsMarquee() {
  return (
    <div
      className="overflow-hidden border-b border-[#EBE8E0] bg-[#C2410C]/10 text-[#C2410C]"
      role="region"
      aria-label="Breaking updates"
    >
      <div className="marquee-track flex w-max whitespace-nowrap py-2 font-telugu text-sm font-medium">
        <span className="px-4">{TICKER}</span>
        <span className="px-4" aria-hidden>
          {TICKER}
        </span>
      </div>
    </div>
  );
}
