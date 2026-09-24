import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getMandal, surveyOptions } from '../data/mandalData.js'

const TOTAL_STEPS = 6

function emptyMember() {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `m-${Date.now()}-${Math.random().toString(16).slice(2)}`
  return { id, name: '', gender: 'M', age: '', role: 'head' }
}

function createInitialForm() {
  return {
    fullName: '',
    whatsapp: '',
    secondaryPhone: '',
    subCaste: '',
    gramPanchayat: '',
    boothLandmark: '',
    totalMembers: 1,
    totalVoters: 1,
    members: [emptyMember()],
    incomeSource: '',
    premiseType: '',
    powerStatus: '',
    uscNumber: '',
    engagementType: '',
    culturalId: '',
    pensionStatus: '',
    healthCard: '',
    loanSupport: '',
    youthGoals: [],
    mentorship: '',
    volunteerRole: '',
    grievance: '',
  }
}

function FieldLabel({ children, lang }) {
  return (
    <label
      className={`block text-sm font-medium text-[#18181B] mb-2 ${
        lang === 'te' ? 'font-telugu' : 'font-ui'
      }`}
    >
      {children}
    </label>
  )
}

function TextInput(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-[#EBE8E0] bg-white px-4 py-3 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]/30 ${
        props.className || ''
      }`}
    />
  )
}

function SelectInput({ lang, children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-[#EBE8E0] bg-white px-4 py-3 text-sm text-[#18181B] focus:outline-none focus:border-[#18181B]/30 ${
        lang === 'te' ? 'font-telugu' : 'font-ui'
      } ${props.className || ''}`}
    >
      {children}
    </select>
  )
}

function OptionTile({ active, onClick, children, lang }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm text-left transition-all ${
        active
          ? 'border-[#C2410C] bg-[#C2410C]/5 text-[#18181B] ring-1 ring-[#C2410C]/20'
          : 'border-[#EBE8E0] bg-white text-[#71717A] hover:bg-[#F4F2EB]'
      } ${lang === 'te' ? 'font-telugu' : 'font-ui'}`}
    >
      {children}
    </button>
  )
}

function PillChip({ active, onClick, children, lang }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? 'border-[#C2410C] bg-[#C2410C] text-white'
          : 'border-[#EBE8E0] bg-white text-[#71717A] hover:bg-[#F4F2EB]'
      } ${lang === 'te' ? 'font-telugu' : 'font-ui'}`}
    >
      {children}
    </button>
  )
}

function Counter({ label, value, onChange, lang, min = 0 }) {
  return (
    <div className="bg-[#FBFBF9] border border-[#EBE8E0] rounded-xl p-4">
      <p className={`text-sm text-[#71717A] mb-3 ${lang === 'te' ? 'font-telugu' : 'font-ui'}`}>
        {label}
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-9 h-9 rounded-full border border-[#EBE8E0] bg-white text-[#18181B] hover:bg-[#F4F2EB] text-lg leading-none"
        >
          −
        </button>
        <span className="font-mono text-2xl font-light metric-tnum text-[#18181B] min-w-[2ch] text-center">
          {value}
        </span>
        <button
          type="button"
          aria-label="Increase"
          onClick={() => onChange(value + 1)}
          className="w-9 h-9 rounded-full border border-[#EBE8E0] bg-white text-[#18181B] hover:bg-[#F4F2EB] text-lg leading-none"
        >
          +
        </button>
      </div>
    </div>
  )
}

function NavButtons({ lang, onBack, onNext, nextLabel, disableNext, showBack = true }) {
  const isTelugu = lang === 'te'
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className={`rounded-full border border-[#EBE8E0] px-5 py-2.5 text-sm font-medium text-[#18181B] hover:bg-[#F4F2EB] transition-colors ${
            isTelugu ? 'font-telugu' : 'font-ui'
          }`}
        >
          {isTelugu ? '← వెనుకకు' : '← Back'}
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        disabled={disableNext}
        onClick={onNext}
        className={`rounded-full bg-[#18181B] text-white hover:bg-[#27272A] disabled:opacity-40 disabled:pointer-events-none px-6 py-2.5 text-sm font-medium transition-all ${
          isTelugu ? 'font-telugu' : 'font-ui'
        }`}
      >
        {nextLabel}
      </button>
    </div>
  )
}

function incomeBranch(sourceId) {
  const src = surveyOptions.incomeSources.find((s) => s.id === sourceId)
  return src?.branch || 'skip'
}

function refPrefix(m) {
  const d = (m.districtSlug || 'xx').slice(0, 4).toUpperCase()
  const md = (m.mandalSlug || 'xx').slice(0, 2).toUpperCase()
  return `#${d}-${md}`
}

export default function SurveyWizard({ lang = 'te' }) {
  const { district, mandal } = useParams()
  const m = getMandal(district, mandal)
  const isTelugu = lang === 'te'
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(createInitialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [refId, setRefId] = useState('')
  const [gpFilter, setGpFilter] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step, submitted])

  const progressPct = (step / TOTAL_STEPS) * 100

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const syncMembers = (count) => {
    const safeCount = Math.max(1, count)
    setForm((prev) => {
      const next = [...prev.members]
      while (next.length < safeCount) next.push(emptyMember())
      while (next.length > safeCount) next.pop()
      return {
        ...prev,
        totalMembers: safeCount,
        totalVoters: Math.min(prev.totalVoters, safeCount),
        members: next,
      }
    })
  }

  const updateMember = (id, patch) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    }))
  }

  const addMember = () => {
    setForm((prev) => ({
      ...prev,
      totalMembers: prev.totalMembers + 1,
      members: [...prev.members, emptyMember()],
    }))
  }

  const toggleGoal = (id) => {
    setForm((prev) => {
      const has = prev.youthGoals.includes(id)
      return {
        ...prev,
        youthGoals: has
          ? prev.youthGoals.filter((g) => g !== id)
          : [...prev.youthGoals, id],
      }
    })
  }

  const filteredGps = useMemo(() => {
    const q = gpFilter.trim().toLowerCase()
    if (!q) return m.gramPanchayats
    return m.gramPanchayats.filter(
      (gp) =>
        gp.nameEn.toLowerCase().includes(q) ||
        gp.nameTe.includes(gpFilter.trim()) ||
        gp.id.includes(q),
    )
  }, [gpFilter, m.gramPanchayats])

  const goNext = () => {
    if (step === 4) {
      const branch = incomeBranch(form.incomeSource)
      if (branch === 'skip') {
        setStep(5)
        return
      }
    }
    setStep((s) => Math.min(TOTAL_STEPS, s + 1))
  }

  const goBack = () => setStep((s) => Math.max(1, s - 1))

  const canProceed = () => {
    if (step === 1) {
      return (
        form.fullName.trim().length > 1 &&
        /^\d{10}$/.test(form.whatsapp) &&
        Boolean(form.subCaste)
      )
    }
    if (step === 2) return Boolean(form.gramPanchayat)
    if (step === 3) {
      return (
        form.members.length >= 1 && form.members.every((row) => row.name.trim().length > 0)
      )
    }
    if (step === 4) {
      if (!form.incomeSource) return false
      const branch = incomeBranch(form.incomeSource)
      if (branch === 'salon') return Boolean(form.premiseType && form.powerStatus)
      if (branch === 'bajantri') return Boolean(form.engagementType && form.pensionStatus)
      return true
    }
    if (step === 5) return Boolean(form.healthCard && form.mentorship)
    if (step === 6) return Boolean(form.volunteerRole)
    return true
  }

  const handleSubmit = async () => {
    if (!canProceed()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    const seq = String(Math.floor(Math.random() * 9000) + 1000)
    setRefId(`${refPrefix(m)}-${seq}`)
    setSubmitting(false)
    setSubmitted(true)
  }

  const resetForNext = () => {
    setForm(createInitialForm())
    setStep(1)
    setSubmitted(false)
    setRefId('')
    setGpFilter('')
  }

  if (!m) return <Navigate to="/mandals" replace />

  if (submitted) {
    return (
      <section className="px-4 py-10 md:py-16">
        <div className="max-w-xl mx-auto bg-white border border-[#EBE8E0] rounded-3xl p-6 md:p-8 shadow-sm text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7 text-[#10B981]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1
            className={`text-2xl font-semibold text-[#18181B] ${
              isTelugu ? 'font-telugu' : 'font-ui'
            }`}
          >
            {isTelugu ? 'నమోదు పూర్తయింది' : 'Survey submitted'}
          </h1>
          <p className="mt-2 text-sm text-[#71717A]">
            {isTelugu ? 'మీ రిఫరెన్స్ ID' : 'Your reference ID'}
          </p>
          <p className="mt-1 font-mono text-xl tracking-tight text-[#18181B] metric-tnum">
            {refId}
          </p>

          <div className="mt-8 space-y-3 text-left">
            <a
              href={m.whatsappGroup}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center w-full rounded-full bg-[#18181B] text-white hover:bg-[#27272A] px-5 py-3 text-sm font-medium transition-all ${
                isTelugu ? 'font-telugu' : 'font-ui'
              }`}
            >
              {isTelugu
                ? `💬 ${m.mandalShortTe} మండల వాట్సాప్ గ్రూప్‌లో చేరండి`
                : `💬 Join ${m.mandalEn} mandal WhatsApp group`}
            </a>
            <a
              href={m.telegramChannel}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center w-full rounded-full border border-[#EBE8E0] bg-white text-[#18181B] hover:bg-[#F4F2EB] px-5 py-3 text-sm font-medium transition-all ${
                isTelugu ? 'font-telugu' : 'font-ui'
              }`}
            >
              {isTelugu
                ? '📢 రాష్ట్ర సమాఖ్య టెలిగ్రామ్ ఛానల్'
                : '📢 State Samakhya Telegram channel'}
            </a>
            <button
              type="button"
              onClick={resetForNext}
              className={`flex items-center justify-center w-full rounded-full border border-[#EBE8E0] bg-[#FBFBF9] text-[#18181B] hover:bg-[#F4F2EB] px-5 py-3 text-sm font-medium transition-all ${
                isTelugu ? 'font-telugu' : 'font-ui'
              }`}
            >
              {isTelugu
                ? '🔄 + తదుపరి షాపు / కుటుంబ సర్వే ప్రారంభించండి'
                : '🔄 + Start next shop / household survey'}
            </button>
          </div>

          <Link
            to={m.path}
            className="inline-block mt-6 text-xs text-[#71717A] hover:text-[#18181B]"
          >
            {isTelugu ? '← మండల కేంద్రానికి తిరిగి' : '← Back to mandal hub'}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-6 md:py-10 pb-16">
      <div className="max-w-xl mx-auto">
        <div className="sticky top-20 z-40 mb-4 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#EBE8E0] bg-[#FBFBF9]/90 backdrop-blur-md px-4 py-2 text-xs text-[#71717A]">
            <span>
              📍 {m.districtEn} &gt; {m.mandalEn} Mandal
            </span>
            <span className="font-mono metric-tnum text-[#18181B]">
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#EBE8E0] rounded-3xl shadow-sm overflow-hidden">
          <div className="h-[3px] w-full bg-[#EBE8E0]">
            <div
              className="h-full bg-[#18181B] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="p-6 md:p-8">
            {step === 1 && (
              <div className="space-y-5">
                <h2
                  className={`text-xl font-semibold text-[#18181B] ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? 'సంప్రదింపు & గుర్తింపు' : 'Contact & Identity'}
                </h2>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu ? 'పూర్తి పేరు' : 'Full Name'}
                  </FieldLabel>
                  <TextInput
                    value={form.fullName}
                    onChange={(e) => setField('fullName', e.target.value)}
                    placeholder={isTelugu ? 'పేరు రాయండి' : 'Enter full name'}
                  />
                </div>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu ? 'ప్రాథమిక WhatsApp నంబర్' : 'Primary WhatsApp Number'}
                  </FieldLabel>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-xl border border-[#EBE8E0] bg-[#F4F2EB] px-3 text-sm font-mono text-[#71717A]">
                      +91
                    </span>
                    <TextInput
                      inputMode="numeric"
                      maxLength={10}
                      value={form.whatsapp}
                      onChange={(e) =>
                        setField('whatsapp', e.target.value.replace(/\D/g, '').slice(0, 10))
                      }
                      placeholder="9876543210"
                      className="font-mono metric-tnum"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu
                      ? 'ద్వితీయ సంప్రదింపు (ఐచ్ఛికం)'
                      : 'Secondary Contact (Optional)'}
                  </FieldLabel>
                  <TextInput
                    inputMode="numeric"
                    maxLength={10}
                    value={form.secondaryPhone}
                    onChange={(e) =>
                      setField(
                        'secondaryPhone',
                        e.target.value.replace(/\D/g, '').slice(0, 10),
                      )
                    }
                    placeholder={isTelugu ? 'ఐచ్ఛికం' : 'Optional'}
                    className="font-mono metric-tnum"
                  />
                </div>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu ? 'ఉపజాతి / విభాగం' : 'Sub-Caste Wing'}
                  </FieldLabel>
                  <div className="grid grid-cols-1 gap-2">
                    {surveyOptions.subCastes.map((opt) => (
                      <OptionTile
                        key={opt.id}
                        lang={lang}
                        active={form.subCaste === opt.id}
                        onClick={() => setField('subCaste', opt.id)}
                      >
                        {isTelugu ? opt.labelTe : opt.labelEn}
                      </OptionTile>
                    ))}
                  </div>
                </div>
                <NavButtons
                  lang={lang}
                  showBack={false}
                  onBack={goBack}
                  onNext={goNext}
                  disableNext={!canProceed()}
                  nextLabel={isTelugu ? 'తదుపరి →' : 'Next →'}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2
                  className={`text-xl font-semibold text-[#18181B] ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? 'పౌర & స్థానం' : 'Civic & Location'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#EBE8E0] bg-[#F4F2EB] px-3 py-1 text-xs text-[#18181B]">
                    {isTelugu
                      ? `జిల్లా: ${m.districtTe.replace(' జిల్లా', '')}`
                      : `District: ${m.districtEn}`}
                  </span>
                  <span className="rounded-full border border-[#EBE8E0] bg-[#F4F2EB] px-3 py-1 text-xs text-[#18181B]">
                    {isTelugu
                      ? `మండలం: ${m.mandalShortTe}`
                      : `Mandal: ${m.mandalEn}`}
                  </span>
                </div>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu ? 'గ్రామ పంచాయతీ / వార్డు' : 'Gram Panchayat / Ward'}
                  </FieldLabel>
                  <TextInput
                    value={gpFilter}
                    onChange={(e) => setGpFilter(e.target.value)}
                    placeholder={isTelugu ? 'వెతకండి…' : 'Search…'}
                    className="mb-2"
                  />
                  <SelectInput
                    lang={lang}
                    value={form.gramPanchayat}
                    onChange={(e) => setField('gramPanchayat', e.target.value)}
                  >
                    <option value="">
                      {isTelugu ? 'ఎంచుకోండి' : 'Select'}
                    </option>
                    {filteredGps.map((gp) => (
                      <option key={gp.id} value={gp.id}>
                        {isTelugu ? gp.nameTe : gp.nameEn}
                      </option>
                    ))}
                  </SelectInput>
                </div>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu ? 'పోలింగ్ బూత్ / ల్యాండ్‌మార్క్' : 'Polling Booth / Landmark'}
                  </FieldLabel>
                  <TextInput
                    value={form.boothLandmark}
                    onChange={(e) => setField('boothLandmark', e.target.value)}
                    placeholder={
                      isTelugu ? 'ఓటింగ్ కేంద్రం / పాఠశాల పేరు' : 'Polling station / school name'
                    }
                  />
                  <p className="mt-1.5 text-[11px] text-[#71717A] font-telugu">
                    ఓటింగ్ కేంద్రం / పాఠశాల పేరు
                  </p>
                </div>
                <NavButtons
                  lang={lang}
                  onBack={goBack}
                  onNext={goNext}
                  disableNext={!canProceed()}
                  nextLabel={isTelugu ? 'తదుపరి →' : 'Next →'}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2
                  className={`text-xl font-semibold text-[#18181B] ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? 'కుటుంబ సభ్యులు & ఓటర్లు' : 'Household Headcount & Roster'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Counter
                    lang={lang}
                    min={1}
                    label={isTelugu ? 'మొత్తం సభ్యులు' : 'Total Members'}
                    value={form.totalMembers}
                    onChange={syncMembers}
                  />
                  <Counter
                    lang={lang}
                    min={0}
                    label={isTelugu ? 'మొత్తం ఓటర్లు' : 'Total Voters'}
                    value={form.totalVoters}
                    onChange={(v) =>
                      setField('totalVoters', Math.min(v, form.totalMembers))
                    }
                  />
                </div>

                <ul className="space-y-4">
                  {form.members.map((row, idx) => (
                    <li
                      key={row.id}
                      className="border border-[#EBE8E0] rounded-2xl p-4 space-y-3"
                    >
                      <p className="text-[10px] tracking-widest text-[#A1A1AA] font-mono">
                        {String(idx + 1).padStart(2, '0')}
                      </p>
                      <TextInput
                        value={row.name}
                        onChange={(e) => updateMember(row.id, { name: e.target.value })}
                        placeholder={isTelugu ? 'పేరు' : 'Name'}
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {surveyOptions.genders.map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => updateMember(row.id, { gender: g.id })}
                            className={`rounded-full px-3 py-1 text-xs font-mono border transition-colors ${
                              row.gender === g.id
                                ? 'bg-[#18181B] text-white border-[#18181B]'
                                : 'bg-white text-[#71717A] border-[#EBE8E0] hover:bg-[#F4F2EB]'
                            }`}
                          >
                            {g.label}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <TextInput
                          inputMode="numeric"
                          value={row.age}
                          onChange={(e) =>
                            updateMember(row.id, {
                              age: e.target.value.replace(/\D/g, '').slice(0, 3),
                            })
                          }
                          placeholder={isTelugu ? 'వయస్సు' : 'Age'}
                          className="font-mono metric-tnum"
                        />
                        <SelectInput
                          lang={lang}
                          value={row.role}
                          onChange={(e) => updateMember(row.id, { role: e.target.value })}
                        >
                          {surveyOptions.roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {isTelugu ? role.labelTe : role.labelEn}
                            </option>
                          ))}
                        </SelectInput>
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={addMember}
                  className={`w-full rounded-full border border-dashed border-[#EBE8E0] py-2.5 text-sm text-[#18181B] hover:bg-[#F4F2EB] transition-colors ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? '+ కుటుంబ సభ్యుడిని చేర్చండి' : '+ Add household member'}
                </button>

                <NavButtons
                  lang={lang}
                  onBack={goBack}
                  onNext={goNext}
                  disableNext={!canProceed()}
                  nextLabel={isTelugu ? 'తదుపరి →' : 'Next →'}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2
                  className={`text-xl font-semibold text-[#18181B] ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? 'జీవనోపాధి' : 'Livelihood Gatekeeper'}
                </h2>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu ? 'ప్రాథమిక ఆదాయ మూలం' : 'Primary Income Source'}
                  </FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {surveyOptions.incomeSources.map((opt) => (
                      <OptionTile
                        key={opt.id}
                        lang={lang}
                        active={form.incomeSource === opt.id}
                        onClick={() => setField('incomeSource', opt.id)}
                      >
                        {isTelugu ? opt.labelTe : opt.labelEn}
                      </OptionTile>
                    ))}
                  </div>
                </div>

                {incomeBranch(form.incomeSource) === 'salon' && (
                  <div className="space-y-4 border-t border-[#EBE8E0] pt-4">
                    <p className="text-xs tracking-wide text-[#C2410C] font-medium">
                      {isTelugu ? 'శాఖ 4A — సెలూన్' : 'Branch 4A — Salon'}
                    </p>
                    <div>
                      <FieldLabel lang={lang}>
                        {isTelugu ? 'ప్రాంగణ యాజమాన్యం' : 'Premise ownership'}
                      </FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {surveyOptions.premiseTypes.map((opt) => (
                          <PillChip
                            key={opt.id}
                            lang={lang}
                            active={form.premiseType === opt.id}
                            onClick={() => setField('premiseType', opt.id)}
                          >
                            {isTelugu ? opt.labelTe : opt.labelEn}
                          </PillChip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel lang={lang}>
                        {isTelugu
                          ? '250 యూనిట్ల ఉచిత విద్యుత్ స్థితి'
                          : '250 Units Free Electricity Status'}
                      </FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {surveyOptions.powerStatus.map((opt) => (
                          <PillChip
                            key={opt.id}
                            lang={lang}
                            active={form.powerStatus === opt.id}
                            onClick={() => setField('powerStatus', opt.id)}
                          >
                            {isTelugu ? opt.labelTe : opt.labelEn}
                          </PillChip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel lang={lang}>
                        {isTelugu
                          ? 'సర్వీస్ కనెక్షన్ / USC (ఐచ్ఛికం)'
                          : 'Service Connection / USC (Optional)'}
                      </FieldLabel>
                      <TextInput
                        value={form.uscNumber}
                        onChange={(e) => setField('uscNumber', e.target.value)}
                        placeholder="USC / SC No."
                        className="font-mono"
                      />
                    </div>
                  </div>
                )}

                {incomeBranch(form.incomeSource) === 'bajantri' && (
                  <div className="space-y-4 border-t border-[#EBE8E0] pt-4">
                    <p className="text-xs tracking-wide text-[#C2410C] font-medium">
                      {isTelugu ? 'శాఖ 4B — భజంత్రి' : 'Branch 4B — Bajantri'}
                    </p>
                    <div>
                      <FieldLabel lang={lang}>
                        {isTelugu ? 'నిమగ్నత రకం' : 'Engagement type'}
                      </FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {surveyOptions.engagementTypes.map((opt) => (
                          <PillChip
                            key={opt.id}
                            lang={lang}
                            active={form.engagementType === opt.id}
                            onClick={() => setField('engagementType', opt.id)}
                          >
                            {isTelugu ? opt.labelTe : opt.labelEn}
                          </PillChip>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel lang={lang}>
                        {isTelugu ? 'సాంస్కృతిక శాఖ ID' : 'Cultural Dept ID'}
                      </FieldLabel>
                      <TextInput
                        value={form.culturalId}
                        onChange={(e) => setField('culturalId', e.target.value)}
                        placeholder="ID"
                        className="font-mono"
                      />
                    </div>
                    <div>
                      <FieldLabel lang={lang}>
                        {isTelugu ? 'పెన్షన్ స్థితి' : 'Pension status'}
                      </FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {surveyOptions.pensionStatus.map((opt) => (
                          <PillChip
                            key={opt.id}
                            lang={lang}
                            active={form.pensionStatus === opt.id}
                            onClick={() => setField('pensionStatus', opt.id)}
                          >
                            {isTelugu ? opt.labelTe : opt.labelEn}
                          </PillChip>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {incomeBranch(form.incomeSource) === 'skip' && form.incomeSource && (
                  <p className="text-sm text-[#71717A] border border-[#EBE8E0] rounded-xl px-4 py-3 bg-[#FBFBF9]">
                    {isTelugu
                      ? 'అదనపు వివరాలు అవసరం లేదు — తదుపరి దశకు వెళ్లండి.'
                      : 'No branch fields needed — continue to Step 5.'}
                  </p>
                )}

                <NavButtons
                  lang={lang}
                  onBack={goBack}
                  onNext={goNext}
                  disableNext={!canProceed()}
                  nextLabel={isTelugu ? 'తదుపరి →' : 'Next →'}
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5">
                <h2
                  className={`text-xl font-semibold text-[#18181B] ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? 'సంక్షేమం & ఆకాంక్షలు' : 'Welfare & Next-Gen Aspirations'}
                </h2>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu ? 'ఆరోగ్యశ్రీ / హెల్త్ కార్డ్' : 'Aarogyasri / Health card'}
                  </FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {surveyOptions.healthCard.map((opt) => (
                      <PillChip
                        key={opt.id}
                        lang={lang}
                        active={form.healthCard === opt.id}
                        onClick={() => setField('healthCard', opt.id)}
                      >
                        {isTelugu ? opt.labelTe : opt.labelEn}
                      </PillChip>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu
                      ? 'BC కార్పొరేషన్ / PM విశ్వకర్మ'
                      : 'BC Corporation / PM Vishwakarma'}
                  </FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {surveyOptions.loanSupport.map((opt) => (
                      <PillChip
                        key={opt.id}
                        lang={lang}
                        active={form.loanSupport === opt.id}
                        onClick={() => setField('loanSupport', opt.id)}
                      >
                        {isTelugu ? opt.labelTe : opt.labelEn}
                      </PillChip>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu ? 'యువత కెరీర్ లక్ష్యాలు' : 'Youth Career Goals'}
                  </FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {surveyOptions.youthGoals.map((opt) => (
                      <PillChip
                        key={opt.id}
                        lang={lang}
                        active={form.youthGoals.includes(opt.id)}
                        onClick={() => toggleGoal(opt.id)}
                      >
                        {isTelugu ? opt.labelTe : opt.labelEn}
                      </PillChip>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu ? 'మెంటార్‌షిప్ అవసరమా?' : 'Mentorship needed?'}
                  </FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    <PillChip
                      lang={lang}
                      active={form.mentorship === 'yes'}
                      onClick={() => setField('mentorship', 'yes')}
                    >
                      {isTelugu ? 'అవును' : 'Yes'}
                    </PillChip>
                    <PillChip
                      lang={lang}
                      active={form.mentorship === 'no'}
                      onClick={() => setField('mentorship', 'no')}
                    >
                      {isTelugu ? 'అవసరం లేదు' : 'Not needed'}
                    </PillChip>
                  </div>
                </div>
                <NavButtons
                  lang={lang}
                  onBack={goBack}
                  onNext={goNext}
                  disableNext={!canProceed()}
                  nextLabel={isTelugu ? 'తదుపరి →' : 'Next →'}
                />
              </div>
            )}

            {step === 6 && (
              <div className="space-y-5">
                <h2
                  className={`text-xl font-semibold text-[#18181B] ${
                    isTelugu ? 'font-telugu' : 'font-ui'
                  }`}
                >
                  {isTelugu ? 'క్యాడర్ & సమర్పణ' : 'Cadre Activation & Submission'}
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {surveyOptions.volunteerRoles.map((opt) => (
                    <OptionTile
                      key={opt.id}
                      lang={lang}
                      active={form.volunteerRole === opt.id}
                      onClick={() => setField('volunteerRole', opt.id)}
                    >
                      {isTelugu ? opt.labelTe : opt.labelEn}
                    </OptionTile>
                  ))}
                </div>
                <div>
                  <FieldLabel lang={lang}>
                    {isTelugu
                      ? 'అత్యవసర స్థానిక గ్రీవెన్స్ (ఐచ్ఛికం)'
                      : 'Urgent local grievance (optional)'}
                  </FieldLabel>
                  <textarea
                    value={form.grievance}
                    onChange={(e) => setField('grievance', e.target.value)}
                    rows={3}
                    className={`w-full rounded-xl border border-[#EBE8E0] bg-white px-4 py-3 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B]/30 resize-y ${
                      isTelugu ? 'font-telugu' : 'font-ui'
                    }`}
                    placeholder={
                      isTelugu ? 'సంక్షిప్తంగా రాయండి…' : 'Brief note…'
                    }
                  />
                </div>

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    className={`rounded-full border border-[#EBE8E0] px-5 py-2.5 text-sm font-medium text-[#18181B] hover:bg-[#F4F2EB] transition-colors ${
                      isTelugu ? 'font-telugu' : 'font-ui'
                    }`}
                  >
                    {isTelugu ? '← వెనుకకు' : '← Back'}
                  </button>
                  <button
                    type="button"
                    disabled={!canProceed() || submitting}
                    onClick={handleSubmit}
                    className={`rounded-full bg-[#18181B] text-white hover:bg-[#27272A] disabled:opacity-40 disabled:pointer-events-none px-7 py-3 text-sm font-medium transition-all ${
                      isTelugu ? 'font-telugu' : 'font-ui'
                    }`}
                  >
                    {submitting
                      ? isTelugu
                        ? 'సమర్పిస్తోంది…'
                        : 'Submitting…'
                      : isTelugu
                        ? 'నమోదు పూర్తి చేయండి / Submit Survey'
                        : 'Complete registration / Submit Survey'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
