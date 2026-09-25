-- Phase 1: seed all 33 Telangana districts (idempotent by slug).
-- Mandals are intentionally NOT included here — that is phase 2.
-- Keep in sync with `src/lib/data/districts.ts`.

INSERT INTO districts (slug, name_en, name_te, zone)
VALUES
  ('adilabad', 'Adilabad', 'ఆదిలాబాద్ జిల్లా', 'telangana'),
  ('bhadradri-kothagudem', 'Bhadradri Kothagudem', 'భద్రాద్రి కొత్తగూడెం జిల్లా', 'telangana'),
  ('hanumakonda', 'Hanumakonda', 'హనుమకొండ జిల్లా', 'telangana'),
  ('hyderabad', 'Hyderabad', 'హైదరాబాద్ జిల్లా', 'telangana'),
  ('jagtial', 'Jagtial', 'జగిత్యాల జిల్లా', 'telangana'),
  ('jangaon', 'Jangaon', 'జనగాం జిల్లా', 'telangana'),
  ('jayashankar-bhupalpally', 'Jayashankar Bhupalpally', 'జయశంకర్ భూపాలపల్లి జిల్లా', 'telangana'),
  ('jogulamba-gadwal', 'Jogulamba Gadwal', 'జోగులాంబ గద్వాల్ జిల్లా', 'telangana'),
  ('kamareddy', 'Kamareddy', 'కామారెడ్డి జిల్లా', 'telangana'),
  ('karimnagar', 'Karimnagar', 'కరీంనగర్ జిల్లా', 'telangana'),
  ('khammam', 'Khammam', 'ఖమ్మం జిల్లా', 'telangana'),
  ('kumuram-bheem-asifabad', 'Kumuram Bheem Asifabad', 'కొమరం భీమ్ ఆసిఫాబాద్ జిల్లా', 'telangana'),
  ('mahabubabad', 'Mahabubabad', 'మహబూబాబాద్ జిల్లా', 'telangana'),
  ('mahabubnagar', 'Mahabubnagar', 'మహబూబ్‌నగర్ జిల్లా', 'telangana'),
  ('mancherial', 'Mancherial', 'మంచిర్యాల జిల్లా', 'telangana'),
  ('medak', 'Medak', 'మెదక్ జిల్లా', 'telangana'),
  ('medchal-malkajgiri', 'Medchal-Malkajgiri', 'మెడ్చల్-మల్కాజ్‌గిరి జిల్లా', 'telangana'),
  ('mulugu', 'Mulugu', 'ములుగు జిల్లా', 'telangana'),
  ('nagarkurnool', 'Nagarkurnool', 'నాగర్‌కర్నూల్ జిల్లా', 'telangana'),
  ('nalgonda', 'Nalgonda', 'నల్గొండ జిల్లా', 'telangana'),
  ('narayanpet', 'Narayanpet', 'నారాయణపేట జిల్లా', 'telangana'),
  ('nirmal', 'Nirmal', 'నిర్మల్ జిల్లా', 'telangana'),
  ('nizamabad', 'Nizamabad', 'నిజామాబాద్ జిల్లా', 'telangana'),
  ('peddapalli', 'Peddapalli', 'పెద్దపల్లి జిల్లా', 'telangana'),
  ('rajanna-sircilla', 'Rajanna Sircilla', 'రాజన్న సిరిసిల్ల జిల్లా', 'telangana'),
  ('rangareddy', 'Rangareddy', 'రంగారెడ్డి జిల్లా', 'telangana'),
  ('sangareddy', 'Sangareddy', 'సంగారెడ్డి జిల్లా', 'telangana'),
  ('siddipet', 'Siddipet', 'సిద్ధిపేట జిల్లా', 'telangana'),
  ('suryapet', 'Suryapet', 'సూర్యాపేట జిల్లా', 'telangana'),
  ('vikarabad', 'Vikarabad', 'వికారాబాద్ జిల్లా', 'telangana'),
  ('wanaparthy', 'Wanaparthy', 'వనపర్తి జిల్లా', 'telangana'),
  ('warangal', 'Warangal', 'వరంగల్ జిల్లా', 'telangana'),
  ('yadadri-bhuvanagiri', 'Yadadri Bhuvanagiri', 'యాదాద్రి భువనగిరి జిల్లా', 'telangana')
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_te = EXCLUDED.name_te,
  zone = EXCLUDED.zone;
