# Nayi Samakhya | నాయీ సమాఖ్య

Authoritative civic portal for Telangana & Andhra Pradesh — Next.js App Router, editorial linen + terracotta design system.

## Stack

- Next.js (App Router) + React 19
- Tailwind CSS v4
- Framer Motion (hero crossfade)
- Lucide icons + Radix Accordion
- Zustand (language, mandal, accessibility)

## Run locally

```bash
npm install
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Design system

- Canvas `#FBFBF9` · Surface white · Hairline `#EBE8E0`
- Ink `#18181B` · Muted `#71717A` · Brand terracotta `#C2410C`

## Key routes

| Path | View |
|------|------|
| `/` | Civic homepage (hero, actions, FAQ, gallery, press) |
| `/verticals/[slug]` | Welfare, Education, Livelihood, Bajantri, … |
| `/mandals` | Mandal directory |
| `/{district}/{mandal}` | Mandal civic portal (Supabase when configured, else static) |
| `/{district}/{mandal}/survey` | Family survey wizard |
| `/policies/*` · `/sitemap` | Legal pages |

## Supabase (optional)

Mandal hubs read from Postgres when env is set; otherwise they use `src/lib/data/mandals.ts`.

1. Create a Supabase project and copy URL + anon key into `.env.local` (see `.env.example`).
2. Run `supabase/migrations/001_civic_schema.sql` in the SQL editor.
3. Optionally run `supabase/seed.sql` for Kodada / Madhira sample rows.
4. Publish `local_updates` rows (`is_published = true`) for the photo feed.

```bash
cp .env.example .env.local
# edit NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev -- --port 43123
```

RLS: public `SELECT` on districts, mandals, officers, gram_panchayats; published-only on `local_updates`.

## Deploy

GitHub `BSCConsulting/nayisamakhya` → Vercel (Next.js). Domain: `nayisamakhya.org`.
