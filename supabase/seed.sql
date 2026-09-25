-- Seed Kodada + sample hubs (idempotent by slug)

INSERT INTO districts (slug, name_en, name_te, zone)
VALUES
  ('suryapet', 'Suryapet', 'సూర్యాపేట జిల్లా', 'telangana'),
  ('khammam', 'Khammam', 'ఖమ్మం జిల్లా', 'telangana')
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_te = EXCLUDED.name_te;

WITH d AS (SELECT id, slug FROM districts WHERE slug IN ('suryapet', 'khammam'))
INSERT INTO mandals (
  district_id, slug, name_en, name_te,
  total_households, salons_count, artistes_count, free_power_pct, survey_completion_pct,
  portal_headline_te, portal_headline_en, portal_sub_te, portal_sub_en,
  whatsapp_group, cartel_whatsapp
)
SELECT
  d.id,
  v.slug,
  v.name_en,
  v.name_te,
  v.hh,
  v.salons,
  v.artistes,
  v.power,
  v.survey,
  v.headline_te,
  v.headline_en,
  v.sub_te,
  v.sub_en,
  v.wa_group,
  v.cartel
FROM d
JOIN (
  VALUES
    (
      'suryapet', 'kodad', 'Kodada', 'కోదాడ మండలం',
      648, 42, 14, 78, 62,
      'కోదాడ మండల నాయీ - భజంత్రి సమాఖ్య అధికారిక వేదిక',
      'Official Kodada Mandal Nayi–Bajantri Samakhya Portal',
      'మండల స్థాయి సంక్షేమం, సెలూన్ వ్యాపార బలోపేతం, సాంప్రదాయ కళాకారుల రక్షణ మరియు సమగ్ర కుటుంబ సేవలు.',
      'Mandal welfare, salon enterprise support, traditional artiste protection, and comprehensive family services.',
      'https://chat.whatsapp.com/invite/kodada-nayi-demo',
      'https://chat.whatsapp.com/invite/kodada-salon-cartel'
    ),
    (
      'khammam', 'madhira', 'Madhira', 'మధిర మండలం',
      572, 36, 11, 71, 58,
      'మధిర మండల నాయీ - భజంత్రి సమాఖ్య అధికారిక వేదిక',
      'Official Madhira Mandal Nayi–Bajantri Samakhya Portal',
      'మండల స్థాయి సంక్షేమం, సెలూన్ వ్యాపార బలోపేతం, సాంప్రదాయ కళాకారుల రక్షణ మరియు సమగ్ర కుటుంబ సేవలు.',
      'Mandal welfare, salon enterprise support, traditional artiste protection, and comprehensive family services.',
      'https://chat.whatsapp.com/invite/madhira-nayi-demo',
      'https://chat.whatsapp.com/invite/madhira-salon-cartel'
    )
) AS v(
  district_slug, slug, name_en, name_te, hh, salons, artistes, power, survey,
  headline_te, headline_en, sub_te, sub_en, wa_group, cartel
) ON d.slug = v.district_slug
ON CONFLICT (district_id, slug) DO UPDATE SET
  total_households = EXCLUDED.total_households,
  salons_count = EXCLUDED.salons_count,
  artistes_count = EXCLUDED.artistes_count,
  free_power_pct = EXCLUDED.free_power_pct,
  survey_completion_pct = EXCLUDED.survey_completion_pct,
  portal_headline_te = EXCLUDED.portal_headline_te,
  portal_headline_en = EXCLUDED.portal_headline_en,
  portal_sub_te = EXCLUDED.portal_sub_te,
  portal_sub_en = EXCLUDED.portal_sub_en,
  whatsapp_group = EXCLUDED.whatsapp_group,
  cartel_whatsapp = EXCLUDED.cartel_whatsapp;

-- Officer for Kodada
INSERT INTO officers (
  mandal_id, name_en, name_te, role_title_en, role_title_te,
  phone_number, whatsapp_link, photo_url, jurisdiction_en, jurisdiction_te, is_active
)
SELECT m.id,
  'R. Suresh Kumar', 'ఆర్. సురేష్ కుమార్',
  'Mandal Social Media & Coordination Officer',
  'మండల సోషల్ మీడియా & సమన్వయ అధికారి',
  '919876543210',
  'https://wa.me/919876543210',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  'Kodada town + 16 Gram Panchayats',
  'కోదాడ పట్టణం + 16 గ్రామ పంచాయతీలు',
  true
FROM mandals m
JOIN districts d ON d.id = m.district_id
WHERE d.slug = 'suryapet' AND m.slug = 'kodad'
  AND NOT EXISTS (
    SELECT 1 FROM officers o WHERE o.mandal_id = m.id AND o.phone_number = '919876543210'
  );

-- Sample GPs for Kodada
INSERT INTO gram_panchayats (mandal_id, name_en, name_te, households_count, survey_pct)
SELECT m.id, g.name_en, g.name_te, g.hh, g.pct
FROM mandals m
JOIN districts d ON d.id = m.district_id
CROSS JOIN (
  VALUES
    ('Komarabanda', 'కొమరబండ', 312, 85),
    ('Gudibanda', 'గుడిబండ', 268, 64),
    ('Thummalapenta', 'తుమ్మలపెంట', 194, 58),
    ('Kapugallu', 'కాపుగల్లు', 220, 70),
    ('Dorakunta', 'దొరకుంట', 176, 61),
    ('Reddikunta', 'రెడ్డికుంట', 158, 55)
) AS g(name_en, name_te, hh, pct)
WHERE d.slug = 'suryapet' AND m.slug = 'kodad'
  AND NOT EXISTS (
    SELECT 1 FROM gram_panchayats gp
    WHERE gp.mandal_id = m.id AND gp.name_en = g.name_en
  );

-- Sample published update
INSERT INTO local_updates (
  mandal_id, district_slug, mandal_slug, category,
  caption_te, caption_en, image_urls, is_published, published_at
)
SELECT m.id, 'suryapet', 'kodad', 'event',
  'కోదాడ సేవా శిబిరం & సంక్షేమ సమావేశం',
  'Kodada service camp & welfare meet',
  ARRAY['https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800'],
  true,
  now()
FROM mandals m
JOIN districts d ON d.id = m.district_id
WHERE d.slug = 'suryapet' AND m.slug = 'kodad'
  AND NOT EXISTS (
    SELECT 1 FROM local_updates u
    WHERE u.district_slug = 'suryapet' AND u.mandal_slug = 'kodad'
  );
