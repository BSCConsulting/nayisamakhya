-- Method 3 Live Moderation Desk
-- Telegram field survey / photo intake → survey_submissions + survey-photos bucket
-- Run after districts, mandals, gram_panchayats exist.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS survey_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_chat_id TEXT NOT NULL,
  telegram_message_id TEXT,
  sender_name TEXT,
  phone TEXT,
  district_id UUID REFERENCES districts(id) ON DELETE SET NULL,
  mandal_id UUID REFERENCES mandals(id) ON DELETE SET NULL,
  gp_id UUID REFERENCES gram_panchayats(id) ON DELETE SET NULL,
  raw_caption TEXT,
  extracted_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  photo_url TEXT,
  photo_file_unique_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  moderator_notes TEXT,
  moderated_by TEXT,
  moderated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_survey_submissions_photo_unique
  ON survey_submissions (photo_file_unique_id)
  WHERE photo_file_unique_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_survey_submissions_status_created
  ON survey_submissions (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_survey_submissions_mandal
  ON survey_submissions (mandal_id);

CREATE INDEX IF NOT EXISTS idx_survey_submissions_telegram_chat
  ON survey_submissions (telegram_chat_id);

ALTER TABLE survey_submissions ENABLE ROW LEVEL SECURITY;

-- Public cannot read raw intake; service role / desk uses elevated key.
DROP POLICY IF EXISTS "Deny public read survey_submissions" ON survey_submissions;
DROP POLICY IF EXISTS "Deny public write survey_submissions" ON survey_submissions;

CREATE POLICY "Deny public read survey_submissions"
  ON survey_submissions FOR SELECT
  USING (false);

CREATE POLICY "Deny public write survey_submissions"
  ON survey_submissions FOR INSERT
  WITH CHECK (false);

-- Public storage bucket for approved / pending survey photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'survey-photos',
  'survey-photos',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public read survey-photos" ON storage.objects;
DROP POLICY IF EXISTS "Service upload survey-photos" ON storage.objects;

CREATE POLICY "Public read survey-photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'survey-photos');

-- Authenticated / service uploads (service role bypasses RLS; keep for completeness)
CREATE POLICY "Service upload survey-photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'survey-photos');

COMMENT ON TABLE survey_submissions IS
  'Method 3 Telegram moderation desk — field photo / survey intake awaiting review';
