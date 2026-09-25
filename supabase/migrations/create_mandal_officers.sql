-- Nodal Officers Roster (Mandal SMOs & Community Coordinators)
-- Run in Supabase SQL editor after districts + mandals are seeded.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS mandal_officers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mandal_id UUID NOT NULL REFERENCES mandals(id) ON DELETE CASCADE,
  name_en TEXT NOT NULL,
  name_te TEXT NOT NULL,
  role TEXT NOT NULL,
  role_te TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  is_verified BOOLEAN NOT NULL DEFAULT true,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT mandal_officers_mandal_role_unique UNIQUE (mandal_id, role)
);

CREATE INDEX IF NOT EXISTS idx_mandal_officers_mandal_id
  ON mandal_officers (mandal_id);

CREATE INDEX IF NOT EXISTS idx_mandal_officers_role
  ON mandal_officers (role);

CREATE INDEX IF NOT EXISTS idx_mandal_officers_status
  ON mandal_officers (status);

ALTER TABLE mandal_officers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read-only access" ON mandal_officers;
CREATE POLICY "Allow public read-only access"
  ON mandal_officers
  FOR SELECT
  USING (true);

COMMENT ON TABLE mandal_officers IS
  'Verified nodal roster: Mandal Social Media Officers and Community Coordinators';
