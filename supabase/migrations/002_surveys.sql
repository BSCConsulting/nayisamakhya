-- Survey submissions table (run in Supabase SQL editor after 001_civic_schema.sql)

CREATE TABLE IF NOT EXISTS surveys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_id VARCHAR UNIQUE NOT NULL,
  district_slug VARCHAR NOT NULL,
  mandal_slug VARCHAR NOT NULL,
  gram_panchayat VARCHAR,
  head_name VARCHAR NOT NULL,
  whatsapp VARCHAR NOT NULL,
  community_wing VARCHAR,
  occupation VARCHAR,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_surveys_routing
  ON surveys(district_slug, mandal_slug, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_surveys_reference
  ON surveys(reference_id);

ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert surveys" ON surveys;
DROP POLICY IF EXISTS "Deny public read surveys" ON surveys;

-- Field enumerators submit via anon key; responses stay private (no public SELECT).
CREATE POLICY "Allow public insert surveys"
  ON surveys FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Deny public read surveys"
  ON surveys FOR SELECT
  USING (false);
