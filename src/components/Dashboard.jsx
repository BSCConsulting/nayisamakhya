import {
  topMetrics,
  electricitySaturation,
  debtProfile,
  educationRetention,
  youthAspirations,
  dignityPanels,
} from '../data/mockData.js'

function SectionHeading({ lang, titleTe, titleEn, subtitleTe, subtitleEn }) {
  const isTelugu = lang === 'te'
  return (
    <div className="mb-6">
      <h2
        className={`text-2xl md:text-3xl font-semibold tracking-tight text-[#18181B] ${
          isTelugu ? 'font-telugu' : 'font-ui'
        }`}
      >
        {isTelugu ? titleTe : titleEn}
      </h2>
      {(subtitleTe || subtitleEn) && (
        <p
          className={`mt-2 text-sm text-[#71717A] ${
            isTelugu ? 'font-telugu' : 'font-ui'
          }`}
        >
          {isTelugu ? subtitleTe : subtitleEn}
        </p>
      )}
    </div>
  )
}

function MetricTile({ metric, lang }) {
  const isTelugu = lang === 'te'
  return (
    <article className="bg-white border border-[#EBE8E0] rounded-2xl p-6">
      <p className="text-4xl md:text-5xl font-light tracking-tight text-[#18181B] font-mono metric-tnum">
        {metric.value}
      </p>
      <p
        className={`text-sm font-medium text-[#18181B] mt-1 ${
          isTelugu ? 'font-telugu' : 'font-ui'
        }`}
      >
        {isTelugu ? metric.labelTe : metric.labelEn}
        {isTelugu && (
          <span className="text-[#71717A] font-normal"> · {metric.labelEn}</span>
        )}
      </p>
      <span className="text-[11px] text-[#71717A] bg-[#F4F2EB] px-2.5 py-1 rounded-full w-fit mt-3 block">
        {metric.chip}
      </span>
    </article>
  )
}

function CardShell({ title, lang, children }) {
  const isTelugu = lang === 'te'
  return (
    <article className="bg-white border border-[#EBE8E0] rounded-2xl p-6 h-full">
      <h3
        className={`text-base font-medium text-[#18181B] mb-4 ${
          isTelugu ? 'font-telugu' : 'font-ui'
        }`}
      >
        {title}
      </h3>
      {children}
    </article>
  )
}

function ElectricityCard({ lang }) {
  const isTelugu = lang === 'te'
  const d = electricitySaturation
  return (
    <CardShell lang={lang} title={isTelugu ? d.titleTe : d.titleEn}>
      <div
        className="h-2 w-full rounded-full overflow-hidden flex"
        role="img"
        aria-label={`${d.benefitedPct}% benefited, ${d.pendingPct}% pending`}
      >
        <div className="bg-[#18181B] h-full" style={{ width: `${d.benefitedPct}%` }} />
        <div className="bg-[#E4E4E7] h-full" style={{ width: `${d.pendingPct}%` }} />
      </div>

      <div
        className={`mt-3 flex flex-wrap justify-between gap-2 text-xs text-[#71717A] metric-tnum ${
          isTelugu ? 'font-telugu' : 'font-ui'
        }`}
      >
        <span>
          {d.benefitedCount} {isTelugu ? d.benefitedLabelTe : d.benefitedLabelEn} (
          {d.benefitedPct}%)
        </span>
        <span>
          {d.pendingCount} {isTelugu ? d.pendingLabelTe : d.pendingLabelEn} (
          {d.pendingPct}%)
        </span>
      </div>

      <button
        type="button"
        className={`mt-5 border border-[#EBE8E0] text-xs font-medium px-4 py-2 rounded-full hover:bg-[#F4F2EB] transition-colors text-[#18181B] ${
          isTelugu ? 'font-telugu' : 'font-ui'
        }`}
      >
        {isTelugu ? d.downloadLabelTe : d.downloadLabelEn}
      </button>
    </CardShell>
  )
}

function DebtCard({ lang }) {
  const isTelugu = lang === 'te'
  const d = debtProfile
  return (
    <CardShell lang={lang} title={isTelugu ? d.titleTe : d.titleEn}>
      <div
        className="h-2 w-full rounded-full overflow-hidden flex"
        role="img"
        aria-label="Debt segment distribution"
      >
        {d.segments.map((seg) => (
          <div
            key={seg.id}
            className="h-full"
            style={{ width: `${seg.pct}%`, backgroundColor: seg.color }}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {d.segments.map((seg) => (
          <li
            key={seg.id}
            className={`inline-flex items-center gap-1.5 text-[11px] text-[#71717A] bg-[#F4F2EB] px-2.5 py-1 rounded-full ${
              isTelugu ? 'font-telugu' : 'font-ui'
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: seg.color }}
              aria-hidden="true"
            />
            <span>
              {isTelugu ? seg.labelTe : seg.labelEn} {seg.pct}%
            </span>
          </li>
        ))}
      </ul>
    </CardShell>
  )
}

function RetentionCard({ lang }) {
  const isTelugu = lang === 'te'
  const d = educationRetention
  return (
    <CardShell lang={lang} title={isTelugu ? d.titleTe : d.titleEn}>
      <ul className="space-y-4">
        {d.steps.map((step) => (
          <li key={step.id}>
            <div
              className={`flex items-baseline justify-between gap-3 text-sm mb-1.5 ${
                isTelugu ? 'font-telugu' : 'font-ui'
              }`}
            >
              <span className="text-[#18181B] font-medium">
                {isTelugu ? step.labelTe : step.labelEn}
              </span>
              <span className="font-mono text-xs text-[#71717A] metric-tnum">
                {step.pct}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#F4F2EB] border border-[#EBE8E0] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#18181B]"
                style={{ width: `${step.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </CardShell>
  )
}

function YouthCard({ lang }) {
  const isTelugu = lang === 'te'
  const d = youthAspirations
  return (
    <CardShell lang={lang} title={isTelugu ? d.titleTe : d.titleEn}>
      <ul className="space-y-3.5">
        {d.items.map((item) => (
          <li key={item.id}>
            <div
              className={`flex items-baseline justify-between gap-3 text-sm mb-1.5 ${
                isTelugu ? 'font-telugu' : 'font-ui'
              }`}
            >
              <span className="text-[#18181B]">{isTelugu ? item.labelTe : item.labelEn}</span>
              <span className="font-mono text-xs text-[#71717A] metric-tnum">
                {item.pct}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#F4F2EB] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#C2410C]/80"
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </CardShell>
  )
}

function DignityPanel({ panel, lang }) {
  const isTelugu = lang === 'te'
  return (
    <article className="bg-white border border-[#EBE8E0] rounded-2xl p-6 h-full flex flex-col">
      <h3
        className={`text-base font-medium text-[#18181B] ${
          isTelugu ? 'font-telugu' : 'font-ui'
        }`}
      >
        {isTelugu ? panel.titleTe : panel.titleEn}
      </h3>
      <p
        className={`mt-3 text-sm text-[#71717A] leading-relaxed flex-1 ${
          isTelugu ? 'font-telugu' : 'font-ui'
        }`}
      >
        {isTelugu ? panel.bodyTe : panel.bodyEn}
      </p>
      {panel.sosHref && (
        <a
          href={panel.sosHref}
          className={`mt-4 inline-flex w-fit border border-[#EBE8E0] text-xs font-medium px-4 py-2 rounded-full hover:bg-[#F4F2EB] transition-colors text-[#18181B] ${
            isTelugu ? 'font-telugu' : 'font-ui'
          }`}
        >
          {isTelugu ? 'Incident SOS' : 'Incident SOS'}
        </a>
      )}
    </article>
  )
}

export default function Dashboard({ lang = 'te' }) {
  return (
    <section id="dashboard" className="px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          lang={lang}
          titleTe="కమ్యూనిటీ స్థితి డాష్‌బోర్డ్"
          titleEn="Community Status Dashboard"
          subtitleTe="జనాభా, సంక్షేమం, విద్య, గౌరవం — ఒక చూపులో"
          subtitleEn="Population, welfare, education & dignity at a glance"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {topMetrics.map((metric) => (
            <MetricTile key={metric.id} metric={metric} lang={lang} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ElectricityCard lang={lang} />
          <DebtCard lang={lang} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <RetentionCard lang={lang} />
          <YouthCard lang={lang} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dignityPanels.map((panel) => (
            <DignityPanel key={panel.id} panel={panel} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
