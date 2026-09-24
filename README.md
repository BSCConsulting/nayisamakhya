# Nayi (నయి)

Civic digital home for Telangana & Andhra Pradesh — editorial UI, mandal hubs, and mobile survey.

## Stack

- React + Vite
- Tailwind CSS v3
- React Router

## Run locally

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Phase scope

- **Phase 1:** Design tokens, global styles, floating frosted `Header`, open warm-canvas `Hero`
- **Phase 2:** `StrategicLoop` 5-column pipeline + editorial `Dashboard`
- **Phase 3:** Mandal hub `/suryapet/kodad` + 6-step mobile `SurveyWizard`

## Routes

| Path | View |
|------|------|
| `/` | Home (Hero, Strategic Loop, Dashboard) |
| `/suryapet/kodad` | Kodada Mandal Samakhya Hub |
| `/suryapet/kodad/survey` | 6-step enumeration wizard |

## Deploy on Vercel

1. Import **https://github.com/BSCConsulting/nayisamakhya** in [Vercel](https://vercel.com/new).
2. Framework preset: **Vite** (build `npm run build`, output `dist`).
3. Deploy. Root `vercel.json` rewrites all paths to `index.html` so deep links like `/suryapet/kodad/survey` work on refresh.

### Custom domain

**Project → Settings → Domains** → add your domain (e.g. `nayisamakhya.org`) → set DNS as Vercel shows. Paths stay the same (`yoursite.org/suryapet/kodad`).

### Updating district / mandal paths later

New hubs are app routes + data (not Vercel DNS). Add a route in `src/App.jsx` and a mandal data module; the SPA rewrite already covers any `/{district}/{mandal}` path.
