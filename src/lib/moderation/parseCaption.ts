export type SubmissionStatus = "pending" | "approved" | "rejected" | "flagged";

export type SurveySubmission = {
  id: string;
  telegram_chat_id: string;
  telegram_message_id: string | null;
  sender_name: string | null;
  phone: string | null;
  district_id: string | null;
  mandal_id: string | null;
  gp_id: string | null;
  raw_caption: string | null;
  extracted_data: Record<string, unknown>;
  photo_url: string | null;
  photo_file_unique_id: string | null;
  status: SubmissionStatus;
  moderator_notes: string | null;
  moderated_by: string | null;
  moderated_at: string | null;
  created_at: string;
  districts?: { id: string; slug: string; name_en: string; name_te: string } | null;
  mandals?: { id: string; slug: string; name_en: string; name_te: string } | null;
  gram_panchayats?: { id: string; name_en: string; name_te: string } | null;
};

type LocationHit = {
  district_id?: string;
  mandal_id?: string;
  gp_id?: string;
  district_slug?: string;
  mandal_slug?: string;
  confidence: "high" | "low" | "none";
  matched: string[];
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Lightweight caption auto-tagger against loaded location rows.
 * Marks confidence low/none when location is ambiguous so desk can triage.
 */
export function parseCaptionLocations(
  caption: string | null | undefined,
  districts: Array<{ id: string; slug: string; name_en: string; name_te: string }>,
  mandals: Array<{
    id: string;
    district_id: string;
    slug: string;
    name_en: string;
    name_te: string;
  }>,
  gps: Array<{
    id: string;
    mandal_id: string;
    name_en: string;
    name_te: string;
  }> = [],
): LocationHit {
  const text = normalize(caption || "");
  const matched: string[] = [];
  if (!text) {
    return { confidence: "none", matched };
  }

  let district_id: string | undefined;
  let district_slug: string | undefined;
  for (const d of districts) {
    const keys = [d.slug, d.name_en, d.name_te, d.name_en.replace(/ district$/i, "")]
      .map(normalize)
      .filter(Boolean);
    if (keys.some((k) => k.length >= 3 && text.includes(k))) {
      district_id = d.id;
      district_slug = d.slug;
      matched.push(d.name_en);
      break;
    }
  }

  let mandal_id: string | undefined;
  let mandal_slug: string | undefined;
  const mandalPool = district_id
    ? mandals.filter((m) => m.district_id === district_id)
    : mandals;
  for (const m of mandalPool) {
    const keys = [m.slug, m.name_en, m.name_te, m.name_en.replace(/ mandal$/i, "")]
      .map(normalize)
      .filter(Boolean);
    if (keys.some((k) => k.length >= 3 && text.includes(k))) {
      mandal_id = m.id;
      mandal_slug = m.slug;
      matched.push(m.name_en);
      if (!district_id) district_id = m.district_id;
      break;
    }
  }

  let gp_id: string | undefined;
  if (mandal_id) {
    for (const gp of gps.filter((g) => g.mandal_id === mandal_id)) {
      const keys = [gp.name_en, gp.name_te].map(normalize).filter(Boolean);
      if (keys.some((k) => k.length >= 3 && text.includes(k))) {
        gp_id = gp.id;
        matched.push(gp.name_en);
        break;
      }
    }
  }

  const confidence =
    mandal_id || district_id ? (gp_id || mandal_id ? "high" : "low") : "none";

  return {
    district_id,
    mandal_id,
    gp_id,
    district_slug,
    mandal_slug,
    confidence,
    matched,
  };
}
