import { Link } from 'react-router-dom'
import { listMandals } from '../data/mandalData.js'

export default function MandalDirectory({ lang = 'te' }) {
  const isTelugu = lang === 'te'
  const mandals = listMandals()

  return (
    <section className="px-4 pb-20 pt-6">
      <div className="max-w-6xl mx-auto">
        <span className="inline-flex items-center rounded-full border border-[#EBE8E0] bg-white px-4 py-1.5 text-xs font-medium text-[#71717A] font-telugu tracking-wide">
          {isTelugu
            ? 'తెలంగాణ • మండల సమాఖ్య డైరెక్టరీ'
            : 'Telangana • Mandal Samakhya Directory'}
        </span>
        <h1
          className={`mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-[#18181B] ${
            isTelugu ? 'font-telugu' : 'font-ui'
          }`}
        >
          {isTelugu ? 'మండల కేంద్రాలు' : 'Mandal hubs'}
        </h1>
        <p
          className={`mt-2 max-w-2xl text-sm text-[#71717A] ${
            isTelugu ? 'font-telugu' : 'font-ui'
          }`}
        >
          {isTelugu
            ? 'ప్రతి మండలానికి స్థానిక అధికారి, సేవా కార్డులు, GP జాబితా మరియు సర్వే.'
            : 'Each mandal has a local officer, service cards, GP list, and survey.'}
        </p>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mandals.map((m) => (
            <li key={m.path}>
              <Link
                to={m.path}
                className="block h-full bg-white border border-[#EBE8E0] rounded-2xl p-6 hover:bg-[#F4F2EB] hover:border-[#18181B]/20 transition-all"
              >
                <p className="text-[10px] tracking-widest text-[#A1A1AA] font-mono uppercase">
                  /{m.districtSlug}/{m.mandalSlug}
                </p>
                <h2
                  className={`mt-2 text-lg font-semibold text-[#18181B] ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? m.hubTitleTe : m.hubTitleEn}
                </h2>
                <p className="mt-1 text-sm text-[#71717A]">
                  {isTelugu ? m.districtTe : m.districtEn}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-[#71717A]">
                  <span className="bg-[#F4F2EB] px-2.5 py-1 rounded-full font-mono metric-tnum">
                    {m.summary.salons} {isTelugu ? 'సెలూన్లు' : 'salons'}
                  </span>
                  <span className="bg-[#F4F2EB] px-2.5 py-1 rounded-full font-mono metric-tnum">
                    {m.summary.bajantri} {isTelugu ? 'భజంత్రి' : 'bajantri'}
                  </span>
                  <span className="bg-[#F4F2EB] px-2.5 py-1 rounded-full font-mono metric-tnum">
                    {m.summary.freePowerPct}% {isTelugu ? 'విద్యుత్' : 'power'}
                  </span>
                </div>
                <span
                  className={`mt-5 inline-flex text-sm font-medium text-[#C2410C] ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? 'కేంద్రం తెరవండి →' : 'Open hub →'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
