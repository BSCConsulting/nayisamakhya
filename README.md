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
| `/{district}/{mandal}` | Mandal hub |

## Deploy

GitHub `BSCConsulting/nayisamakhya` → Vercel (Next.js). Domain: `nayisamakhya.org`.
