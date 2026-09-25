-- Nayi Samakhya civic schema (Supabase / Postgres)
-- Run in Supabase SQL editor or via migration tooling.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DISTRICTS
CREATE TABLE IF NOT EXISTS districts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR UNIQUE NOT NULL,
  name_en VARCHAR NOT NULL,
  name_te VARCHAR NOT NULL,
  zone VARCHAR DEFAULT 'state_general',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. MANDALS
CREATE TABLE IF NOT EXISTS mandals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
  slug VARCHAR NOT NULL,
  name_en VARCHAR NOT NULL,
  name_te VARCHAR NOT NULL,
  total_households INTEGER DEFAULT 0,
  salons_count INTEGER DEFAULT 0,
  artistes_count INTEGER DEFAULT 0,
  free_power_pct INTEGER DEFAULT 0,
  survey_completion_pct INTEGER DEFAULT 0,
  portal_headline_te TEXT,
  portal_headline_en TEXT,
  portal_sub_te TEXT,
  portal_sub_en TEXT,
  whatsapp_group VARCHAR,
  cartel_whatsapp VARCHAR,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(district_id, slug)
);

-- 3. OFFICERS
CREATE TABLE IF NOT EXISTS officers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mandal_id UUID REFERENCES mandals(id) ON DELETE CASCADE,
  name_en VARCHAR NOT NULL,
  name_te VARCHAR NOT NULL,
  role_title_en VARCHAR NOT NULL,
  role_title_te VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  whatsapp_link VARCHAR,
  photo_url VARCHAR,
  jurisdiction_en VARCHAR,
  jurisdiction_te VARCHAR,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. GRAM PANCHAYATS & WARDS
CREATE TABLE IF NOT EXISTS gram_panchayats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mandal_id UUID REFERENCES mandals(id) ON DELETE CASCADE,
  name_en VARCHAR NOT NULL,
  name_te VARCHAR NOT NULL,
  households_count INTEGER DEFAULT 0,
  survey_pct INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. LOCAL UPDATES (moderation desk ingestion)
CREATE TABLE IF NOT EXISTS local_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mandal_id UUID REFERENCES mandals(id) ON DELETE CASCADE,
  district_slug VARCHAR NOT NULL,
  mandal_slug VARCHAR NOT NULL,
  category VARCHAR DEFAULT 'event',
  caption_te TEXT,
  caption_en TEXT,
  image_urls TEXT[] NOT NULL,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandals ENABLE ROW LEVEL SECURITY;
ALTER TABLE officers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gram_panchayats ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_updates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read-only access" ON districts;
DROP POLICY IF EXISTS "Allow public read-only access" ON mandals;
DROP POLICY IF EXISTS "Allow public read-only access" ON officers;
DROP POLICY IF EXISTS "Allow public read-only access" ON gram_panchayats;
DROP POLICY IF EXISTS "Allow public read-only published updates" ON local_updates;

CREATE POLICY "Allow public read-only access" ON districts FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON mandals FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON officers FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access" ON gram_panchayats FOR SELECT USING (true);
CREATE POLICY "Allow public read-only published updates" ON local_updates
  FOR SELECT USING (is_published = true);

CREATE INDEX IF NOT EXISTS idx_districts_slug ON districts(slug);
CREATE INDEX IF NOT EXISTS idx_mandals_slug ON mandals(slug);
CREATE INDEX IF NOT EXISTS idx_mandals_district ON mandals(district_id);
CREATE INDEX IF NOT EXISTS idx_local_updates_routing
  ON local_updates(district_slug, mandal_slug, is_published);
