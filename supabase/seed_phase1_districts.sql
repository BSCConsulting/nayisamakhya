-- Phase 1: seed all 33 Telangana districts (idempotent by slug).
-- Synced from live backend naming. Mandals are phase 2.
-- Keep in sync with `src/lib/data/districts.ts`.

INSERT INTO districts (slug, name_en, name_te, zone)
VALUES
  ('adilabad', 'Adilabad', 'ఆదిలాబాద్', 'telangana'),
  ('bhadradri-kothagudem', 'Bhadradri Kothagudem', 'భద్రాద్రి కొత్తగూడెం', 'telangana'),
  ('hanumakonda', 'Hanumakonda', 'హనుమకొండ', 'telangana'),
  ('hyderabad', 'Hyderabad', 'హైదరాబాద్', 'telangana'),
  ('jagtial', 'Jagtial', 'జగిత్యాల', 'telangana'),
  ('jangaon', 'Jangaon', 'జనగాం', 'telangana'),
  ('jayashankar-bhupalpally', 'Jayashankar Bhupalpally', 'జయశంకర్ భూపాలపల్లి', 'telangana'),
  ('jogulamba-gadwal', 'Jogulamba Gadwal', 'జోగులాంబ గద్వాల', 'telangana'),
  ('kamareddy', 'Kamareddy', 'కామారెడ్డి', 'telangana'),
  ('karimnagar', 'Karimnagar', 'కరీంనగర్', 'telangana'),
  ('khammam', 'Khammam', 'ఖమ్మం', 'telangana'),
  ('kumuram-bheem-asifabad', 'Kumuram Bheem Asifabad', 'కుమురం భీమ్ ఆసిఫాబాద్', 'telangana'),
  ('mahabubabad', 'Mahabubabad', 'మహబూబాబాద్', 'telangana'),
  ('mahabubnagar', 'Mahabubnagar', 'మహబూబ్‌నగర్', 'telangana'),
  ('mancherial', 'Mancherial', 'మంచిర్యాల', 'telangana'),
  ('medak', 'Medak', 'మెదక్', 'telangana'),
  ('medchal-malkajgiri', 'Medchal-Malkajgiri', 'మేడ్చల్-మల్కాజిగిరి', 'telangana'),
  ('mulugu', 'Mulugu', 'ములుగు', 'telangana'),
  ('nagarkurnool', 'Nagarkurnool', 'నాగర్‌కర్నూల్', 'telangana'),
  ('nalgonda', 'Nalgonda', 'నల్గొండ', 'telangana'),
  ('narayanpet', 'Narayanpet', 'నారాయణపేట', 'telangana'),
  ('nirmal', 'Nirmal', 'నిర్మల్', 'telangana'),
  ('nizamabad', 'Nizamabad', 'నిజామాబాద్', 'telangana'),
  ('peddapalli', 'Peddapalli', 'పెద్దపల్లి', 'telangana'),
  ('rajanna-sircilla', 'Rajanna Sircilla', 'రాజన్న సిరిసిల్ల', 'telangana'),
  ('rangareddy', 'Rangareddy', 'రంగారెడ్డి జిల్లా', 'telangana'),
  ('sangareddy', 'Sangareddy', 'సంగారెడ్డి', 'telangana'),
  ('siddipet', 'Siddipet', 'సిద్దిపేట', 'telangana'),
  ('suryapet', 'Suryapet', 'సూర్యాపేట', 'telangana'),
  ('vikarabad', 'Vikarabad', 'వికారాబాద్', 'telangana'),
  ('wanaparthy', 'Wanaparthy', 'వనపర్తి', 'telangana'),
  ('warangal', 'Warangal', 'వరంగల్', 'telangana'),
  ('yadadri-bhuvanagiri', 'Yadadri Bhuvanagiri', 'యాదాద్రి భువనగిరి', 'telangana')
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_te = EXCLUDED.name_te,
  zone = EXCLUDED.zone;
