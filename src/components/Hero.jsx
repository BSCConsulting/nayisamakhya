import { Link } from 'react-router-dom'

export default function Hero({ lang = 'te' }) {
  const isTelugu = lang === 'te'

  const eyebrow = '✦ తెలంగాణ • ఆంధ్రప్రదేశ్ | ప్రజా సమాఖ్య'
  const headline = isTelugu
    ? 'డిజిటల్ హోమ్ • సేవా కేంద్రం • సామూహిక స్వరం'
    : 'Digital Home • Service Hub • Collective Voice'
  const support = isTelugu
    ? 'ప్రజల కోసం, ప్రజలతో — సేవ, సమాచారం, సంఘటన ఒకే చోట.'
    : 'For the people, with the people — services, information, and collective action in one place.'
  const primaryCta = isTelugu ? 'కోదాడ మండలం చూడండి' : 'Open Kodada mandal'
  const secondaryCta = isTelugu ? 'సర్వే ప్రారంభించండి' : 'Start survey'

  return (
    <section id="home" className="py-20 text-center px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <span className="inline-flex items-center rounded-full border border-[#EBE8E0] bg-white px-4 py-1.5 text-xs font-medium text-[#71717A] font-telugu tracking-wide">
          {eyebrow}
        </span>

        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#18181B] leading-tight ${
            isTelugu ? 'font-telugu' : 'font-ui'
          }`}
        >
          {headline}
        </h1>

        <p
          className={`max-w-xl text-base text-[#71717A] leading-relaxed ${
            isTelugu ? 'font-telugu' : 'font-ui'
          }`}
        >
          {support}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/suryapet/kodad"
            className={`bg-[#18181B] text-white hover:bg-[#27272A] rounded-full px-7 py-3 text-sm font-medium transition-all ${
              isTelugu ? 'font-telugu' : 'font-ui'
            }`}
          >
            {primaryCta}
          </Link>
          <Link
            to="/suryapet/kodad/survey"
            className={`bg-white border border-[#EBE8E0] text-[#18181B] hover:bg-[#F4F2EB] rounded-full px-7 py-3 text-sm font-medium transition-all ${
              isTelugu ? 'font-telugu' : 'font-ui'
            }`}
          >
            {secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  )
}
