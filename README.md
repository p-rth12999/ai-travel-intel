# VOYA

> An AI Travel Intelligence Platform that plans, monitors, and adapts your journey.

VOYA is more than an itinerary generator. It combines AI reasoning, structured travel planning, and real-time intelligence to help travelers before and during their trips.

Built for the Innovation Hacks Global AI Hackathon 2026.

---

## Features

### Intelligent Trip Planning

- Multi-destination itinerary generation
- Timeline-based travel plans
- Packing checklist
- Restaurant recommendations
- Hidden gems
- Local etiquette & regulations
- Medical and emergency information
- Currency information
- Offline language phrases

### AI Workspace

- 15+ AI-generated travel intelligence cards
- Structured AI outputs
- Context-aware AI chat
- Live card editing through AI
- Regenerate entire plans or specific sections

### Travel Intelligence

- Trip Health Score
- Weather-aware recommendations
- Crowd intelligence
- Worth-It Analysis
- Smart travel checklist
- Domestic & international trip support

### Trip Lifecycle

- Planning
- Upcoming
- Completed
- Cancelled

Additional capabilities include:

- Trip duplication
- Offline download
- PDF export
- Trip rating & feedback

---

## Roadmap

Planned features include:

- Live weather updates
- Real-time travel advisories
- Dynamic Trip Health monitoring
- Transport disruption detection
- Smart commute recommendations
- Hotel availability insights
- Per-card AI regeneration
- Push notifications
- Mobile application

---

## Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend

- Supabase
- PostgreSQL
- Row Level Security (RLS)

### AI

- OpenRouter
- Structured Outputs
- Tool Calling
- AI-powered travel reasoning

---

## Screenshots

Screenshots and demo GIFs will be added soon.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/p-rth12999/voya.git
```

Move into the project:

```bash
cd voya
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY
```

Run the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
├── components/
├── hooks/
├── lib/
│   ├── openai/
│   ├── supabase/
│   └── validations/
├── types/
```

---

## Vision

Traditional trip planners stop after generating an itinerary.

VOYA continues helping throughout the journey by reasoning about travel conditions, adapting recommendations, and providing contextual intelligence. The goal is to become an AI travel companion rather than simply another itinerary generator.

---

## Author

**Parth Kulkarni**

Designed & Engineered by Parth

- GitHub: https://github.com/p-rth12999
- LinkedIn: https://www.linkedin.com/in/parth-kulkarni-18148332b/
