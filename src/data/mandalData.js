/** Localized Kodada mandal hub + survey options */

export const kodadaMandal = {
  stateTe: 'తెలంగాణ',
  stateEn: 'Telangana',
  districtSlug: 'suryapet',
  districtTe: 'సూర్యాపేట జిల్లా',
  districtEn: 'Suryapet',
  mandalSlug: 'kodad',
  mandalTe: 'కోదాడ మండలం',
  mandalEn: 'Kodada',
  hubTitleTe: 'కోదాడ మండల సమాఖ్య కేంద్రం',
  hubTitleEn: 'Kodada Mandal Samakhya Hub',
  summary: {
    salons: 42,
    bajantri: 14,
    freePowerPct: 78,
  },
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
  telegramChannel: 'https://t.me/nayi_samakhya_demo',
  cartelWhatsapp: 'https://chat.whatsapp.com/invite/kodada-salon-cartel',
  actions: [
    {
      id: 'cartel',
      titleTe: 'కోదాడ సెలూన్ హోల్‌సేల్ కొనుగోలు గ్రూప్',
      titleEn: 'Kodada Salon Wholesale Buyer Cartel',
      descTe:
        'కత్తెరలు, క్లిప్పర్లు, క్రీములు — డిస్ట్రిబ్యూటర్ రేట్లకు సమూహ కొనుగోలు.',
      descEn:
        'Aggregate bulk orders for scissors, clippers, and creams at wholesale distributor rates.',
      ctaTe: 'కార్టెల్ వాట్సాప్ గ్రూప్‌లో చేరండి →',
      ctaEn: 'Join cartel WhatsApp group →',
      href: 'https://chat.whatsapp.com/invite/kodada-salon-cartel',
      external: true,
    },
    {
      id: 'power',
      titleTe: '250 యూనిట్ల ఉచిత విద్యుత్ సహాయ కేంద్రం',
      titleEn: 'Free Power Grievance & DISCOM Desk',
      descTe:
        'కోదాడ సబ్-స్టేషన్ / MRO కార్యాలయంలో పెండింగ్ దరఖాస్తులు క్లియర్ చేయడానికి స్థానిక సహాయం.',
      descEn:
        'Local assistance to clear pending applications at the Kodada Sub-Station / MRO office.',
      ctaTe: 'వినతి పత్రం / గ్రీవెన్స్ ఫైల్ చేయండి →',
      ctaEn: 'File petition / grievance →',
      href: '/suryapet/kodad/survey',
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
      href: '/suryapet/kodad/survey',
      external: false,
      featured: true,
    },
  ],
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
