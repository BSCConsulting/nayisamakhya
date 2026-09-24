import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getMandal } from '../data/mandalData.js'

function SummaryChip({ label, value, mono }) {
  return (
    <div className="bg-white border border-[#EBE8E0] rounded-full px-4 py-2 flex items-center gap-2">
      <span className="text-xs text-[#71717A]">{label}</span>
      <span
        className={`text-sm font-medium text-[#18181B] ${mono ? 'font-mono metric-tnum' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}

export default function MandalView({ lang = 'te' }) {
  const { district, mandal } = useParams()
  const m = getMandal(district, mandal)
  const isTelugu = lang === 'te'
  const [gpQuery, setGpQuery] = useState('')

  const whatsappHref = useMemo(() => {
    if (!m) return '#'
    const hub = isTelugu ? m.hubTitleTe : m.hubTitleEn
    const text = encodeURIComponent(
      isTelugu
        ? `నమస్కారం ${m.officer.nameTe} గారు, ${hub} నుంచి సంప్రదిస్తున్నాను.`
        : `Hello ${m.officer.nameEn}, contacting you from the ${hub}.`,
    )
    return `https://wa.me/${m.officer.phone}?text=${text}`
  }, [isTelugu, m])

  if (!m) return <Navigate to="/mandals" replace />

  const breadcrumb = isTelugu
    ? `${m.stateTe} • ${m.districtTe} • ${m.mandalTe}`
    : `${m.stateEn} • ${m.districtEn} • ${m.mandalEn}`

  const filteredGps = m.gramPanchayats.filter((gp) => {
    const q = gpQuery.trim().toLowerCase()
    if (!q) return true
    return (
      gp.nameEn.toLowerCase().includes(q) ||
      gp.nameTe.includes(gpQuery.trim()) ||
      gp.id.includes(q)
    )
  })

  return (
    <section className="px-4 pb-20 pt-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              to="/mandals"
              className="text-xs text-[#71717A] hover:text-[#18181B] underline-offset-2 hover:underline"
            >
              {isTelugu ? '← అన్ని మండలాలు' : '← All mandals'}
            </Link>
          </div>
          <span className="inline-flex items-center rounded-full border border-[#EBE8E0] bg-white px-4 py-1.5 text-xs font-medium text-[#71717A] font-telugu tracking-wide">
            {breadcrumb}
          </span>
          <h1
            className={`mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-[#18181B] ${
              isTelugu ? 'font-telugu' : 'font-ui'
            }`}
          >
            {isTelugu ? m.hubTitleTe : m.hubTitleEn}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            <SummaryChip
              label={isTelugu ? 'సెలూన్లు' : 'Active Salons'}
              value={m.summary.salons}
              mono
            />
            <SummaryChip
              label={isTelugu ? 'భజంత్రి కళాకారులు' : 'Bajantri Artistes'}
              value={m.summary.bajantri}
              mono
            />
            <SummaryChip
              label={isTelugu ? 'ఉచిత విద్యుత్' : 'Free Power'}
              value={`${m.summary.freePowerPct}%`}
              mono
            />
          </div>
        </div>

        <article className="border border-[#EBE8E0] rounded-2xl p-6 bg-white mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full bg-[#F4F2EB] border border-[#EBE8E0] flex items-center justify-center text-lg font-medium text-[#18181B] font-telugu">
                {m.officer.initials}
              </div>
              <span
                className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white"
                title={isTelugu ? m.officer.statusTe : m.officer.statusEn}
                aria-label={isTelugu ? m.officer.statusTe : m.officer.statusEn}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-base font-medium text-[#18181B] ${
                  isTelugu ? 'font-telugu' : 'font-ui'
                }`}
              >
                {isTelugu ? m.officer.nameTe : m.officer.nameEn}
                <span className="text-[#71717A] font-normal">
                  {' '}
                  — {isTelugu ? m.officer.titleTe : m.officer.titleEn}
                </span>
              </p>
              <p className="mt-1 text-xs text-[#71717A] font-telugu">
                {isTelugu ? m.officer.statusTe : m.officer.statusEn}
              </p>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center bg-[#18181B] text-white hover:bg-[#27272A] rounded-full px-5 py-2.5 text-sm font-medium transition-all shrink-0 ${
                isTelugu ? 'font-telugu' : 'font-ui'
              }`}
            >
              {isTelugu ? '💬 WhatsApp లో మాట్లాడండి' : '💬 Chat on WhatsApp'}
            </a>
          </div>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {m.actions.map((action) => {
            const className = `group block h-full bg-white border rounded-2xl p-6 transition-all hover:bg-[#F4F2EB] ${
              action.featured
                ? 'border-[#C2410C]/40 ring-1 ring-[#C2410C]/10'
                : 'border-[#EBE8E0] hover:border-[#18181B]/20'
            }`
            const body = (
              <>
                <h3
                  className={`text-base font-medium text-[#18181B] leading-snug ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? action.titleTe : action.titleEn}
                </h3>
                <p
                  className={`mt-2 text-sm text-[#71717A] leading-relaxed ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? action.descTe : action.descEn}
                </p>
                <span
                  className={`mt-5 inline-flex text-sm font-medium ${
                    action.featured ? 'text-[#C2410C]' : 'text-[#18181B]'
                  } ${isTelugu ? 'font-telugu' : 'font-ui'}`}
                >
                  {isTelugu ? action.ctaTe : action.ctaEn}
                </span>
              </>
            )

            return action.external ? (
              <a
                key={action.id}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {body}
              </a>
            ) : (
              <Link key={action.id} to={action.href} className={className}>
                {body}
              </Link>
            )
          })}
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
            <div>
              <h2
                className={`text-xl font-semibold text-[#18181B] ${
                  isTelugu ? 'font-telugu' : 'font-ui'
                }`}
              >
                {isTelugu ? 'గ్రామ పంచాయతీలు & వార్డులు' : 'Gram Panchayats & Wards'}
              </h2>
              <p className="mt-1 text-sm text-[#71717A]">
                {isTelugu
                  ? 'నమోదైన కుటుంబాల సంఖ్యతో స్థానిక జాబితా'
                  : 'Local list with registered household counts'}
              </p>
            </div>
            <input
              type="search"
              value={gpQuery}
              onChange={(e) => setGpQuery(e.target.value)}
              placeholder={isTelugu ? 'GP / వార్డు వెతకండి…' : 'Search GP / ward…'}
              className="w-full sm:w-64 rounded-full border border-[#EBE8E0] bg-white px-4 py-2 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]/30"
            />
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredGps.map((gp) => (
              <li
                key={gp.id}
                className="bg-white border border-[#EBE8E0] rounded-xl px-4 py-3 flex items-center justify-between gap-3 hover:bg-[#F4F2EB] transition-colors"
              >
                <span
                  className={`text-sm font-medium text-[#18181B] ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? gp.nameTe : gp.nameEn}
                </span>
                <span className="text-[11px] text-[#71717A] bg-[#F4F2EB] px-2.5 py-1 rounded-full font-mono metric-tnum shrink-0">
                  {gp.households}
                </span>
              </li>
            ))}
            {filteredGps.length === 0 && (
              <li className="col-span-full text-sm text-[#71717A] py-6 text-center">
                {isTelugu ? 'ఫలితాలు లేవు' : 'No matching panchayats'}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
