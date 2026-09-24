# Nayi Samakhya | ప్రజా సమాఖ్య

Grassroots civic-tech PWA for Telangana & Andhra Pradesh — Next.js App Router, mobile-first.

## Stack

- Next.js (App Router) + React 19
- Tailwind CSS v4
- Lucide icons
- Zustand (language + active mandal, persisted)
- Plus Jakarta Sans + Noto Sans Telugu (`next/font`)

## Run locally

```bash
npm install
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Routes

| Path | View |
|------|------|
| `/` | Home (hero, SOS ribbon, metrics, distribution, strategic wheel) |
| `/mandals` | Mandal directory |
| `/suryapet/kodad` | Kodada hub |
| `/khammam/madhira` | Madhira hub |
| `/khammam/wyra` | Wyra hub |
| `/khammam/tallada` | Tallada hub |
| `/{district}/{mandal}/survey` | Survey entry (per mandal) |

## Deploy (Vercel)

Connected to [BSCConsulting/nayisamakhya](https://github.com/BSCConsulting/nayisamakhya) (`main`).

`vercel.json` forces **Next.js** (overrides any leftover Vite/`dist` project settings from the previous SPA). Custom domain: `nayisamakhya.org`.

If a deploy still fails looking for `dist`, open the Vercel project → Settings → General → clear **Output Directory** and set Framework Preset to **Next.js**, then Redeploy.
