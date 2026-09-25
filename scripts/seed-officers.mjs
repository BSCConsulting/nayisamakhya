#!/usr/bin/env node
/**
 * Seed mandal_officers for every mandal in Supabase.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-officers.mjs
 *
 * Env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (preferred) or NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Contact line for all seeded officers: +91 9032654111
 */

import { createClient } from "@supabase/supabase-js";

const HELPLINE = "919032654111";
const HELPLINE_DISPLAY = "+91 9032654111";

const ROLES = {
  smo: {
    role: "Mandal Social Media Officer",
    role_te: "మండల సోషల్ మీడియా అధికారి",
  },
  coordinator: {
    role: "Community Coordinator",
    role_te: "కమ్యూనిటీ సమన్వయకర్త",
  },
};

/** Named pilot officers for key corridors (district_slug/mandal_slug). */
const PILOT_OFFICERS = {
  "suryapet/kodad": {
    smo: {
      name_en: "R. Suresh Kumar",
      name_te: "ఆర్. సురేష్ కుమార్",
      email: "kodad.smo@nayisamakhya.org",
    },
    coordinator: {
      name_en: "Lakshmi Devi",
      name_te: "లక్ష్మి దేవి",
      email: "kodad.cc@nayisamakhya.org",
    },
  },
  "suryapet/suryapet": {
    smo: {
      name_en: "V. Srinivas",
      name_te: "వి. శ్రీనివాస్",
      email: "suryapet.smo@nayisamakhya.org",
    },
    coordinator: {
      name_en: "Padma Reddy",
      name_te: "పద్మా రెడ్డి",
      email: "suryapet.cc@nayisamakhya.org",
    },
  },
  "khammam/madhira": {
    smo: {
      name_en: "K. Venkatesh",
      name_te: "కె. వెంకటేష్",
      email: "madhira.smo@nayisamakhya.org",
    },
    coordinator: {
      name_en: "Anitha Rao",
      name_te: "అనితా రావు",
      email: "madhira.cc@nayisamakhya.org",
    },
  },
  "khammam/wyra": {
    smo: {
      name_en: "M. Rajesh",
      name_te: "ఎం. రాజేష్",
      email: "wyra.smo@nayisamakhya.org",
    },
    coordinator: {
      name_en: "Swarna Latha",
      name_te: "స్వర్ణ లత",
      email: "wyra.cc@nayisamakhya.org",
    },
  },
  "khammam/tallada": {
    smo: {
      name_en: "P. Sunitha",
      name_te: "పి. సునీత",
      email: "tallada.smo@nayisamakhya.org",
    },
    coordinator: {
      name_en: "Ravi Teja",
      name_te: "రవి తేజ",
      email: "tallada.cc@nayisamakhya.org",
    },
  },
  "karimnagar/huzurabad": {
    smo: {
      name_en: "G. Praveen",
      name_te: "జి. ప్రవీణ్",
      email: "huzurabad.smo@nayisamakhya.org",
    },
    coordinator: {
      name_en: "Kavitha Sharma",
      name_te: "కవిత శర్మ",
      email: "huzurabad.cc@nayisamakhya.org",
    },
  },
  "nalgonda/miryalaguda": {
    smo: {
      name_en: "S. Naresh",
      name_te: "ఎస్. నరేష్",
      email: "miryalaguda.smo@nayisamakhya.org",
    },
    coordinator: {
      name_en: "Bhavani Devi",
      name_te: "భవాని దేవి",
      email: "miryalaguda.cc@nayisamakhya.org",
    },
  },
  "adilabad/ichoda": {
    smo: {
      name_en: "B. Ravinder",
      name_te: "బి. రవీందర్",
      email: "ichoda.smo@nayisamakhya.org",
    },
    coordinator: {
      name_en: "Jyothi Bai",
      name_te: "జ్యోతి బాయి",
      email: "ichoda.cc@nayisamakhya.org",
    },
  },
};

function requireEnv(name) {
  const v = process.env[name]?.trim();
  return v || null;
}

function fallbackOfficer(mandalNameEn, mandalNameTe, kind) {
  const placeEn = mandalNameEn.replace(/\s+Mandal$/i, "").trim();
  const placeTe = (mandalNameTe || placeEn).replace(/\s*మండలం\s*$/u, "").trim();
  if (kind === "smo") {
    return {
      name_en: `${placeEn} Samakhya SMO Desk`,
      name_te: `${placeTe} సమాఖ్య SMO డెస్క్`,
      email: null,
    };
  }
  return {
    name_en: `${placeEn} Community Desk`,
    name_te: `${placeTe} కమ్యూనిటీ డెస్క్`,
    email: null,
  };
}

async function fetchAllMandals(supabase) {
  const pageSize = 1000;
  let from = 0;
  const all = [];

  for (;;) {
    const { data, error } = await supabase
      .from("mandals")
      .select("id, slug, name_en, name_te, districts!inner(slug)")
      .order("name_en", { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) throw error;
    if (!data?.length) break;
    all.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  return all.map((row) => {
    const district = Array.isArray(row.districts)
      ? row.districts[0]
      : row.districts;
    return {
      id: row.id,
      slug: row.slug,
      name_en: row.name_en,
      name_te: row.name_te,
      district_slug: district?.slug || "unknown",
    };
  });
}

function buildRows(mandals) {
  const rows = [];
  for (const m of mandals) {
    const key = `${m.district_slug}/${m.slug}`;
    const pilot = PILOT_OFFICERS[key];

    for (const kind of /** @type {const} */ (["smo", "coordinator"])) {
      const roleMeta = ROLES[kind];
      const person =
        pilot?.[kind] ||
        fallbackOfficer(m.name_en, m.name_te, kind);

      rows.push({
        mandal_id: m.id,
        name_en: person.name_en,
        name_te: person.name_te,
        role: roleMeta.role,
        role_te: roleMeta.role_te,
        phone: HELPLINE,
        email: person.email,
        status: "active",
        is_verified: true,
        photo_url: null,
      });
    }
  }
  return rows;
}

async function upsertInBatches(supabase, rows) {
  const batchSize = 200;
  let upserted = 0;
  for (let i = 0; i < rows.length; i += batchSize) {
    const chunk = rows.slice(i, i + batchSize);
    const { error } = await supabase.from("mandal_officers").upsert(chunk, {
      onConflict: "mandal_id,role",
      ignoreDuplicates: false,
    });
    if (error) throw error;
    upserted += chunk.length;
    console.log(`  upserted ${upserted}/${rows.length}`);
  }
  return upserted;
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key =
    requireEnv("SUPABASE_SERVICE_ROLE_KEY") ||
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or anon key).",
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log(`Helpline contact: ${HELPLINE_DISPLAY}`);
  console.log("Fetching mandals…");
  const mandals = await fetchAllMandals(supabase);
  console.log(`Found ${mandals.length} mandals`);

  if (!mandals.length) {
    console.error("No mandals found. Run phase 1 + phase 2 seeds first.");
    process.exit(1);
  }

  const rows = buildRows(mandals);
  console.log(
    `Seeding ${rows.length} officer rows (2 roles × ${mandals.length} mandals)…`,
  );
  const count = await upsertInBatches(supabase, rows);

  const pilotKeys = Object.keys(PILOT_OFFICERS);
  console.log(`Done. Upserted ${count} rows.`);
  console.log(`Pilot corridors: ${pilotKeys.join(", ")}`);
  console.log(`WhatsApp: https://wa.me/${HELPLINE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
