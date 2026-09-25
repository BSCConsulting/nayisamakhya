-- Dedupe location aliases introduced by backend manual seeds.
-- Canonical slugs: rangareddy (not ranga-reddy), tallada, kalluru, chivemla.

-- 1) Move mandals off duplicate district ranga-reddy → rangareddy, then delete alias district
UPDATE mandals m
SET district_id = d_canon.id
FROM districts d_alias
JOIN districts d_canon ON d_canon.slug = 'rangareddy'
WHERE m.district_id = d_alias.id
  AND d_alias.slug = 'ranga-reddy';

DELETE FROM districts WHERE slug = 'ranga-reddy';

-- 2) Rename alternate mandal slugs to canonical (skip if target already exists)
UPDATE mandals m
SET slug = 'tallada'
WHERE slug = 'thallada'
  AND NOT EXISTS (
    SELECT 1 FROM mandals x
    WHERE x.district_id = m.district_id AND x.slug = 'tallada'
  );

DELETE FROM mandals m
WHERE slug = 'thallada'
  AND EXISTS (
    SELECT 1 FROM mandals x
    WHERE x.district_id = m.district_id AND x.slug = 'tallada' AND x.id <> m.id
  );

UPDATE mandals m
SET slug = 'kalluru'
WHERE slug = 'kallur'
  AND NOT EXISTS (
    SELECT 1 FROM mandals x
    WHERE x.district_id = m.district_id AND x.slug = 'kalluru'
  );

DELETE FROM mandals m
WHERE slug = 'kallur'
  AND EXISTS (
    SELECT 1 FROM mandals x
    WHERE x.district_id = m.district_id AND x.slug = 'kalluru' AND x.id <> m.id
  );

UPDATE mandals m
SET slug = 'chivemla'
WHERE slug = 'chivvemla'
  AND NOT EXISTS (
    SELECT 1 FROM mandals x
    WHERE x.district_id = m.district_id AND x.slug = 'chivemla'
  );

DELETE FROM mandals m
WHERE slug = 'chivvemla'
  AND EXISTS (
    SELECT 1 FROM mandals x
    WHERE x.district_id = m.district_id AND x.slug = 'chivemla' AND x.id <> m.id
  );

-- 3) Refresh district display names from canonical seed (optional safety)
UPDATE districts SET name_en = 'Rangareddy', name_te = 'రంగారెడ్డి' WHERE slug = 'rangareddy';
