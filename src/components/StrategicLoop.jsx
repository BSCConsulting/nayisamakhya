import { strategicLoopSteps } from '../data/mockData.js'

const iconPaths = {
  collect: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  ),
  analyze: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  ),
  plan: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  ),
  act: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  ),
  review: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  ),
}

function StepIcon({ name }) {
  return (
    <svg
      className="w-5 h-5 text-[#18181B] mb-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

export default function StrategicLoop({ lang = 'te' }) {
  const isTelugu = lang === 'te'
  const title = isTelugu ? 'వ్యూహాత్మక చక్రం' : 'Strategic Loop'
  const subtitle = isTelugu
    ? 'సమాచారం నుంచి చర్య వరకు — ఐదు దశల నిరంతర ప్రవాహం'
    : 'From insight to action — a five-stage continuous pipeline'

  return (
    <section id="services" className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2
            className={`text-2xl md:text-3xl font-semibold tracking-tight text-[#18181B] ${
              isTelugu ? 'font-telugu' : 'font-ui'
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-2 text-sm text-[#71717A] ${
              isTelugu ? 'font-telugu' : 'font-ui'
            }`}
          >
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {strategicLoopSteps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col">
              <article className="bg-white border border-[#EBE8E0] hover:border-[#18181B]/20 transition-all rounded-xl p-4 h-full">
                <p className="text-[10px] tracking-widest text-[#A1A1AA] font-mono mb-2">
                  {step.id}
                </p>
                <StepIcon name={step.icon} />
                <h3
                  className={`text-sm font-medium text-[#18181B] leading-snug ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? step.titleTe : step.titleEn}
                </h3>
                <p
                  className={`mt-1.5 text-xs text-[#71717A] leading-relaxed ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? step.descTe : step.descEn}
                </p>
              </article>

              {index < strategicLoopSteps.length - 1 && (
                <span
                  className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#A1A1AA] text-xs pointer-events-none"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[#71717A] font-telugu tracking-wide">
          ✦ నిరంతర అభివృద్ధి చక్రం — పరస్పర బలోపేతం
        </p>
      </div>
    </section>
  )
}
