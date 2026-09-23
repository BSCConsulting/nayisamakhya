# Nayi (నయి)

Civic digital home for Telangana & Andhra Pradesh — Phase 1 UI foundation (tokens, Header, Hero).

## Stack

- React + Vite
- Tailwind CSS v3

## Run locally

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Phase scope

- **Phase 1:** Design tokens, global styles, floating frosted `Header`, open warm-canvas `Hero`
- **Phase 2:** `StrategicLoop` 5-column pipeline + editorial `Dashboard` (metrics, welfare, education, dignity) powered by `src/data/mockData.js`
- **Phase 3:** Mandal hub `/suryapet/kodad` + 6-step mobile `SurveyWizard` at `/suryapet/kodad/survey`

## Routes

| Path | View |
|------|------|
| `/` | Home (Hero, Strategic Loop, Dashboard) |
| `/suryapet/kodad` | Kodada Mandal Samakhya Hub |
| `/suryapet/kodad/survey` | 6-step enumeration wizard |
