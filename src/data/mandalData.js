/** Multi-mandal registry: /{district}/{mandal} hubs + shared survey options */

const sharedTelegram = 'https://t.me/nayi_samakhya_demo'

function buildMandal(cfg) {
  const path = `/${cfg.districtSlug}/${cfg.mandalSlug}`
  const surveyPath = `${path}/survey`
  return {
    ...cfg,
    path,
    surveyPath,
    telegramChannel: sharedTelegram,
    actions: [
      {
        id: 'cartel',
        titleTe: `${cfg.mandalShortTe} సెలూన్ హోల్‌సేల్ కొనుగోలు గ్రూప్`,
        titleEn: `${cfg.mandalEn} Salon Wholesale Buyer Cartel`,
        descTe:
          'కత్తెరలు, క్లిప్పర్లు, క్రీములు — డిస్ట్రిబ్యూటర్ రేట్లకు సమూహ కొనుగోలు.',
        descEn:
          'Aggregate bulk orders for scissors, clippers, and creams at wholesale distributor rates.',
        ctaTe: 'కార్టెల్ వాట్సాప్ గ్రూప్‌లో చేరండి →',
        ctaEn: 'Join cartel WhatsApp group →',
        href: cfg.cartelWhatsapp,
        external: true,
      },
      {
        id: 'power',
        titleTe: '250 యూనిట్ల ఉచిత విద్యుత్ సహాయ కేంద్రం',
        titleEn: 'Free Power Grievance & DISCOM Desk',
        descTe: `${cfg.mandalShortTe} సబ్-స్టేషన్ / MRO కార్యాలయంలో పెండింగ్ దరఖాస్తులు క్లియర్ చేయడానికి స్థానిక సహాయం.`,
        descEn: `Local assistance to clear pending applications at the ${cfg.mandalEn} Sub-Station / MRO office.`,
        ctaTe: 'వినతి పత్రం / గ్రీవెన్స్ ఫైల్ చేయండి →',
        ctaEn: 'File petition / grievance →',
        href: surveyPath,
        external: false,
      },
      {
        id: 'census',
        titleTe: 'మండల సమగ్ర సర్వే నమోదు',
        titleEn: 'Local Census Enumeration',
        descTe: 'కుటుంబం, సెలూన్, భజంత్రి — 6 దశల మొబైల్ సర్వే ప్రారంభించండి.',
        descEn: 'Start the 6-step mobile survey for households, salons, and artistes.',
        ctaTe: 'సర్వే ప్రారంభించండి →',
        ctaEn: 'Start survey →',
        href: surveyPath,
        external: false,
        featured: true,
      },
    ],
  }
}

export const kodadaMandal = buildMandal({
  stateTe: 'తెలంగాణ',
  stateEn: 'Telangana',
  districtSlug: 'suryapet',
  districtTe: 'సూర్యాపేట జిల్లా',
  districtEn: 'Suryapet',
  mandalSlug: 'kodad',
  mandalShortTe: 'కోదాడ',
  mandalTe: 'కోదాడ మండలం',
  mandalEn: 'Kodada',
  hubTitleTe: 'కోదాడ మండల సమాఖ్య కేంద్రం',
  hubTitleEn: 'Kodada Mandal Samakhya Hub',
  summary: { salons: 42, bajantri: 14, freePowerPct: 78 },
  officer: {
    nameTe: 'ఆర్. సురేష్ కుమార్',
    nameEn: 'R. Suresh Kumar',
    titleTe: 'మండల సోషల్ మీడియా ఆఫీసర్',
    titleEn: 'Mandal Social Media Officer',
    phone: '919876543210',
    statusTe: 'ఆన్‌లైన్ / క్రియాశీలం',
    statusEn: 'Online / Active',
    initials: 'సు',
  },
  whatsappGroup: 'https://chat.whatsapp.com/invite/kodada-nayi-demo',
  cartelWhatsapp: 'https://chat.whatsapp.com/invite/kodada-salon-cartel',
  gramPanchayats: [
    { id: 'komarabanda', nameTe: 'కొమరబండ', nameEn: 'Komarabanda', households: 312 },
    { id: 'gudibanda', nameTe: 'గుడిబండ', nameEn: 'Gudibanda', households: 268 },
    { id: 'thummalapenta', nameTe: 'తుమ్మలపెంట', nameEn: 'Thummalapenta', households: 241 },
    { id: 'ananthagiri', nameTe: 'అనంతగిరి', nameEn: 'Ananthagiri', households: 198 },
    { id: 'reddigudem', nameTe: 'రెడ్డిగూడెం', nameEn: 'Reddigudem', households: 176 },
    { id: 'mothkur', nameTe: 'మోత్కూర్', nameEn: 'Mothkur', households: 154 },
    { id: 'kodad-town', nameTe: 'కోదాడ పట్టణం', nameEn: 'Kodad Town', households: 520 },
    { id: 'duddeda', nameTe: 'దుద్దేడ', nameEn: 'Duddeda', households: 143 },
  ],
})

export const madhiraMandal = buildMandal({
  stateTe: 'తెలంగాణ',
  stateEn: 'Telangana',
  districtSlug: 'khammam',
  districtTe: 'ఖమ్మం జిల్లా',
  districtEn: 'Khammam',
  mandalSlug: 'madhira',
  mandalShortTe: 'మధిర',
  mandalTe: 'మధిర మండలం',
  mandalEn: 'Madhira',
  hubTitleTe: 'మధిర మండల సమాఖ్య కేంద్రం',
  hubTitleEn: 'Madhira Mandal Samakhya Hub',
  summary: { salons: 36, bajantri: 11, freePowerPct: 71 },
  officer: {
    nameTe: 'కె. వెంకటేష్',
    nameEn: 'K. Venkatesh',
    titleTe: 'మండల సోషల్ మీడియా ఆఫీసర్',
    titleEn: 'Mandal Social Media Officer',
    phone: '919876543211',
    statusTe: 'ఆన్‌లైన్ / క్రియాశీలం',
    statusEn: 'Online / Active',
    initials: 'వె',
  },
  whatsappGroup: 'https://chat.whatsapp.com/invite/madhira-nayi-demo',
  cartelWhatsapp: 'https://chat.whatsapp.com/invite/madhira-salon-cartel',
  gramPanchayats: [
    { id: 'madhira-town', nameTe: 'మధిర పట్టణం', nameEn: 'Madhira Town', households: 480 },
    { id: 'dendukuru', nameTe: 'దెందుకూరు', nameEn: 'Dendukuru', households: 265 },
    { id: 'yerrupalem', nameTe: 'ఎర్రుపాలెం', nameEn: 'Yerrupalem', households: 238 },
    { id: 'chidukur', nameTe: 'చిడుకూరు', nameEn: 'Chidukur', households: 192 },
    { id: 'banigandlapadu', nameTe: 'బనిగండ్లపాడు', nameEn: 'Banigandlapadu', households: 174 },
    { id: 'siripuram', nameTe: 'సిరిపురం', nameEn: 'Siripuram', households: 156 },
    { id: 'ammapalem', nameTe: 'అమ్మపాలెం', nameEn: 'Ammapalem', households: 141 },
    { id: 'nagireddigudem', nameTe: 'నాగిరెడ్డిగూడెం', nameEn: 'Nagireddigudem', households: 128 },
  ],
})

export const wyraMandal = buildMandal({
  stateTe: 'తెలంగాణ',
  stateEn: 'Telangana',
  districtSlug: 'khammam',
  districtTe: 'ఖమ్మం జిల్లా',
  districtEn: 'Khammam',
  mandalSlug: 'wyra',
  mandalShortTe: 'వైరా',
  mandalTe: 'వైరా మండలం',
  mandalEn: 'Wyra',
  hubTitleTe: 'వైరా మండల సమాఖ్య కేంద్రం',
  hubTitleEn: 'Wyra Mandal Samakhya Hub',
  summary: { salons: 28, bajantri: 9, freePowerPct: 69 },
  officer: {
    nameTe: 'ఎం. రాజేష్',
    nameEn: 'M. Rajesh',
    titleTe: 'మండల సోషల్ మీడియా ఆఫీసర్',
    titleEn: 'Mandal Social Media Officer',
    phone: '919876543212',
    statusTe: 'ఆన్‌లైన్ / క్రియాశీలం',
    statusEn: 'Online / Active',
    initials: 'రా',
  },
  whatsappGroup: 'https://chat.whatsapp.com/invite/wyra-nayi-demo',
  cartelWhatsapp: 'https://chat.whatsapp.com/invite/wyra-salon-cartel',
  gramPanchayats: [
    { id: 'wyra-town', nameTe: 'వైరా పట్టణం', nameEn: 'Wyra Town', households: 410 },
    { id: 'singareni', nameTe: 'సింగరేణి', nameEn: 'Singareni', households: 255 },
    { id: 'gollapudi', nameTe: 'గొల్లపూడి', nameEn: 'Gollapudi', households: 198 },
    { id: 'konijerla', nameTe: 'కొనిజెర్ల', nameEn: 'Konijerla', households: 186 },
    { id: 'lakshmipuram', nameTe: 'లక్ష్మీపురం', nameEn: 'Lakshmipuram', households: 162 },
    { id: 'peddagopathi', nameTe: 'పెద్దగోపతి', nameEn: 'Peddagopathi', households: 149 },
    { id: 'chinnagopathi', nameTe: 'చిన్నగోపతి', nameEn: 'Chinnagopathi', households: 133 },
    { id: 'gattumalla', nameTe: 'గట్టుమల్ల', nameEn: 'Gattumalla', households: 121 },
  ],
})

export const talladaMandal = buildMandal({
  stateTe: 'తెలంగాణ',
  stateEn: 'Telangana',
  districtSlug: 'khammam',
  districtTe: 'ఖమ్మం జిల్లా',
  districtEn: 'Khammam',
  mandalSlug: 'tallada',
  mandalShortTe: 'తల్లాడ',
  mandalTe: 'తల్లాడ మండలం',
  mandalEn: 'Tallada',
  hubTitleTe: 'తల్లాడ మండల సమాఖ్య కేంద్రం',
  hubTitleEn: 'Tallada Mandal Samakhya Hub',
  summary: { salons: 31, bajantri: 10, freePowerPct: 74 },
  officer: {
    nameTe: 'పి. సునీత',
    nameEn: 'P. Sunitha',
    titleTe: 'మండల సోషల్ మీడియా ఆఫీసర్',
    titleEn: 'Mandal Social Media Officer',
    phone: '919876543213',
    statusTe: 'ఆన్‌లైన్ / క్రియాశీలం',
    statusEn: 'Online / Active',
    initials: 'సు',
  },
  whatsappGroup: 'https://chat.whatsapp.com/invite/tallada-nayi-demo',
  cartelWhatsapp: 'https://chat.whatsapp.com/invite/tallada-salon-cartel',
  gramPanchayats: [
    { id: 'tallada-town', nameTe: 'తల్లాడ పట్టణం', nameEn: 'Tallada Town', households: 395 },
    { id: 'pinapaka', nameTe: 'పినపాక', nameEn: 'Pinapaka', households: 248 },
    { id: 'tekulapalli', nameTe: 'తెకులపల్లి', nameEn: 'Tekulapalli', households: 221 },
    { id: 'chandrugonda', nameTe: 'చంద్రుగొండ', nameEn: 'Chandrugonda', households: 187 },
    { id: 'mulkalapalli', nameTe: 'ముల్కలపల్లి', nameEn: 'Mulkalapalli', households: 169 },
    { id: 'ashwaraopeta', nameTe: 'అశ్వారావుపేట', nameEn: 'Ashwaraopeta', households: 158 },
    { id: 'dammapeta', nameTe: 'దమ్మపేట', nameEn: 'Dammapeta', households: 144 },
    { id: 'yellandu-road', nameTe: 'ఎల్లండు రోడ్', nameEn: 'Yellandu Road', households: 132 },
  ],
})

/** Keyed by `${districtSlug}/${mandalSlug}` */
export const mandalsByKey = {
  'suryapet/kodad': kodadaMandal,
  'khammam/madhira': madhiraMandal,
  'khammam/wyra': wyraMandal,
  'khammam/tallada': talladaMandal,
}

export function getMandal(districtSlug, mandalSlug) {
  if (!districtSlug || !mandalSlug) return null
  return mandalsByKey[`${districtSlug}/${mandalSlug}`] || null
}

export function listMandals() {
  return Object.values(mandalsByKey)
}

export const surveyOptions = {
  subCastes: [
    { id: 'nayi', labelTe: 'నయి / మంగలి', labelEn: 'Nayi / Mangali' },
    { id: 'bajantri', labelTe: 'భజంత్రి సంగీతకారుడు', labelEn: 'Bajantri Musician' },
    { id: 'allied', labelTe: 'అనుబంధ కళాకారుడు', labelEn: 'Allied Artisan' },
  ],
  genders: [
    { id: 'M', label: 'M' },
    { id: 'F', label: 'F' },
    { id: 'O', label: 'O' },
  ],
  roles: [
    { id: 'head', labelTe: 'కుటుంబ పెద్ద', labelEn: 'Household Head' },
    { id: 'spouse', labelTe: 'జీవిత భాగస్వామి', labelEn: 'Spouse' },
    { id: 'child', labelTe: 'పిల్లవాడు / విద్యార్థి', labelEn: 'Child / Student' },
    { id: 'elder', labelTe: 'వృద్ధుడు', labelEn: 'Elder' },
    { id: 'other', labelTe: 'ఇతరం', labelEn: 'Other' },
  ],
  incomeSources: [
    { id: 'salon-owner', labelTe: 'సెలూన్ యజమాని', labelEn: 'Salon Owner', branch: 'salon' },
    { id: 'salon-worker', labelTe: 'సెలూన్ కార్మికుడు', labelEn: 'Salon Worker', branch: 'salon' },
    { id: 'bajantri', labelTe: 'భజంత్రి సంగీతకారుడు', labelEn: 'Bajantri Musician', branch: 'bajantri' },
    { id: 'student', labelTe: 'విద్యార్థి', labelEn: 'Student', branch: 'skip' },
    { id: 'private', labelTe: 'ప్రైవేట్ ఉద్యోగం', labelEn: 'Private Job', branch: 'skip' },
    { id: 'unemployed', labelTe: 'నిరుద్యోగి', labelEn: 'Unemployed', branch: 'skip' },
    { id: 'agriculture', labelTe: 'వ్యవసాయం', labelEn: 'Agriculture', branch: 'skip' },
  ],
  premiseTypes: [
    { id: 'rented', labelTe: 'అద్దె', labelEn: 'Rented' },
    { id: 'owned', labelTe: 'స్వంతం', labelEn: 'Owned' },
    { id: 'kiosk', labelTe: 'కియోస్క్', labelEn: 'Kiosk' },
  ],
  powerStatus: [
    { id: 'active', labelTe: 'క్రియాశీలం', labelEn: 'Active' },
    { id: 'pending', labelTe: 'పెండింగ్', labelEn: 'Pending' },
    { id: 'none', labelTe: 'దరఖాస్తు చేయలేదు', labelEn: 'Not Applied' },
    { id: 'meter', labelTe: 'మీటర్ సమస్య', labelEn: 'Meter Issue' },
  ],
  engagementTypes: [
    { id: 'temple', labelTe: 'దేవాలయ ఒప్పందం', labelEn: 'Temple Contract' },
    { id: 'weddings', labelTe: 'పెళ్లిళ్లు', labelEn: 'Weddings' },
    { id: 'seasonal', labelTe: 'కాలానుగుణ ఒత్తిడి', labelEn: 'Seasonal strain' },
  ],
  pensionStatus: [
    { id: 'active', labelTe: 'క్రియాశీలం', labelEn: 'Active' },
    { id: 'applied', labelTe: 'దరఖాస్తు చేశారు', labelEn: 'Applied' },
    { id: 'none', labelTe: 'లేదు', labelEn: 'None' },
  ],
  healthCard: [
    { id: 'active', labelTe: 'క్రియాశీలం', labelEn: 'Active' },
    { id: 'pending', labelTe: 'పెండింగ్', labelEn: 'Pending' },
    { id: 'none', labelTe: 'లేదు', labelEn: 'None' },
  ],
  loanSupport: [
    { id: 'bc', labelTe: 'BC కార్పొరేషన్', labelEn: 'BC Corporation' },
    { id: 'vishwakarma', labelTe: 'PM విశ్వకర్మ', labelEn: 'PM Vishwakarma' },
    { id: 'both', labelTe: 'రెండూ', labelEn: 'Both' },
    { id: 'none', labelTe: 'లేదు', labelEn: 'None' },
  ],
  youthGoals: [
    { id: 'govt', labelTe: 'ప్రభుత్వ / పోలీస్ పరీక్షలు', labelEn: 'Govt/Police Exams' },
    { id: 'salon-academy', labelTe: 'ఆధునిక సెలూన్ అకాడమీ', labelEn: 'Modern Salon Academy' },
    { id: 'it', labelTe: 'ఐటి / సాఫ్ట్‌వేర్', labelEn: 'IT/Software' },
    { id: 'hostel', labelTe: 'కాలేజీ హాస్టల్', labelEn: 'College Hostel' },
    { id: 'startup', labelTe: 'కొత్త వ్యాపారం / స్టార్టప్', labelEn: 'New Business/Startup' },
  ],
  volunteerRoles: [
    {
      id: 'smo',
      labelTe: '🌟 మండల సోషల్ మీడియా ఆఫీసర్‌గా బాధ్యత తీసుకుంటాను',
      labelEn: '🌟 I will serve as Mandal Social Media Officer',
    },
    {
      id: 'gp',
      labelTe: '🤝 గ్రామ పంచాయతీ సమన్వయకర్తగా పనిచేస్తాను',
      labelEn: '🤝 I will work as Gram Panchayat coordinator',
    },
    {
      id: 'member',
      labelTe: '📱 సాధారణ సభ్యునిగా సమాచారం కోరుకుంటున్నాను',
      labelEn: '📱 I want updates as a general member',
    },
  ],
}
