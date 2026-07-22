# ✈️ Voya — AI Travel Intelligence Platform

Voya turns "where should I go?" into a complete, living trip plan — and keeps it accurate as your trip date approaches.

**🔗 Live demo:** [voya-travel-intelligence.vercel.app](https://voya-travel-intelligence.vercel.app/)

---

## 🔑 Judge / Demo Access

```
Username: admin
Email:    klkrnprth@gmail.com
Password: admin@1234
```

> Feel free to create your own account instead — signup takes 15 seconds and every feature below is available immediately, no seed data required.

---

## 🧭 5-Minute Tour

Everything is reachable from the sidebar. Here's what to check out, in order:

| Where | What to look for |
|---|---|
| **Landing page** | Scroll down for the feature grid, then check `/pricing` for tier structure (Free tier is fully live; Pro/Team are marked "coming soon" — no fake payment flow) |
| **Explore Trips** | The flagship feature. Grant location access (or search any city) and Voya generates real trip ideas near you on the fly — bucketed into Day Trips, Weekends, Week-long, and Extended, with an "Include international options" toggle. Nothing here is hardcoded; every card is generated live and cached for reuse |
| **New Trip** (`+ New Trip`) | Fill in a route — try multiple cities across 2+ countries to see the multi-leg journey handling. Toggle "Let AI figure out the best order" to compare manual vs. AI-optimized sequencing |
| **Trip Workspace** | Open any trip to see the full AI-generated plan: a **Journey card** (visual route, real distances, AI-reasoned travel times, hidden gems per leg), a sticky day-by-day timeline, packing lists, restaurant picks, safety info, and more — all in one structured Zod schema from a single AI call |
| **AI Chat** (bottom-right of any trip) | Ask it to change anything — "swap the restaurants for something vegetarian" — and watch it edit the actual plan, not just reply in text |
| **Dashboard** | Real stats (countries/places computed from live geocoding, not string-guessing), trip health scores, filters, search |
| **Calendar** | See all your trips laid out on an actual calendar |
| **Offline Export / Print** | Any trip can be downloaded as a self-contained offline file or printed as a clean PDF-ready view |

---

## ✨ Core Features

- **AI-generated full itineraries** — one structured call produces overview, day-by-day timeline, packing list, restaurant picks, local customs, safety/medical info, currency & language help (international trips only), and more
- **Dynamic Journey card** — real route visualization with country flags, live-computed distances (Haversine), AI-reasoned travel times, and per-leg hidden gem suggestions
- **AI-optimized trip sequencing** — opt-in toggle lets the AI reorder a multi-city route for practical travel logistics instead of blindly following input order
- **Live Trip Intelligence** — weather and trip-health scores refresh automatically as a trip's date approaches, with a changelog of what updated and why
- **Context-aware AI chat** — edits any part of a trip plan directly through conversation, validated against the same schema as the rest of the app
- **Dynamic Explore** — zero hardcoded destination data; every suggestion is generated live from your actual location and cached for future searches near the same area
- **Adaptive regeneration** — check off completed activities/packing items and regenerate the rest of the plan around what's already done
- **Full auth flow** — signup/login, forgot-password with email recovery, editable profile with avatar upload
- **Offline-first export & print** — a fully self-contained HTML export plus a clean print/PDF view

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Supabase (Postgres, Auth, Row-Level Security, Storage)
- **AI:** OpenRouter (`gpt-4o-mini`) with Zod-validated structured outputs — every AI response is schema-checked before it touches the database
- **Geo:** Open-Meteo geocoding (free, keyless) for location resolution and distance calculation
- **Deployment:** Vercel, auto-deployed from GitHub on every push

---

## 🏗️ A Few Architectural Notes

- **Self-healing AI content** — if the AI schema grows (new fields added), any previously cached trip is auto-detected as stale and silently regenerated on next load, instead of crashing.
- **One AI call, whole trip** — rather than many small API calls per section, the entire trip plan (10+ sections) is generated in a single structured completion, keeping cost and latency predictable.
- **Geocode once, reuse everywhere** — destinations are resolved to real coordinates/country data at creation time and reused for dashboard stats, distance calculations, and route visualization, rather than re-parsed from text on every read.

---

## 🚧 Known Limitations (honest, not hidden)

- Travel time/route feasibility is AI-reasoned from general knowledge, not live routing or flight-availability data — flagged as an estimate in the UI, not presented as fact
- Explore's AI-generated suggestions are clearly badged as such (no fabricated "curated" credibility)
- Pro/Team pricing tiers are UI-only — no payment processing is wired up
- Cancelled/completed trip states have no undo yet

---

## 💻 Running Locally

```bash
git clone <this-repo>
cd ai-travel-intel
npm install
# add your own .env.local with Supabase + OpenRouter keys
npm run dev
```

---

Built solo, end-to-end — auth, database schema, AI integration, and UI — as a hands-on learning project turned hackathon submission.