#  AI Travel Intelligence Platform

An AI-powered travel planning platform that helps users create smarter trips through personalized itineraries, destination insights, travel recommendations, packing checklists, and AI-generated travel guidance.

---

## ✨ Features

- AI-powered trip planning
- Personalized itinerary generation
- Budget-aware travel recommendations
- Restaurant recommendations based on dietary preferences
- Smart packing checklist
- Weather-aware travel suggestions
- Local safety tips and travel etiquette
- Hidden gems and less crowded destinations
- Printable travel plan
- Responsive web application

---

## Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend
- Supabase
- PostgreSQL

### AI
- OpenAI API *(planned)*

### Authentication
- Supabase Auth

---

## Project Structure

```
src/
├── app/
├── components/
├── hooks/
├── lib/
├── types/
└── middleware.ts
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/ai-travel-intel.git
cd ai-travel-intel
```

### Install dependencies

```bash
npm install
```

### Create an environment file

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
```

### Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Development Status

Current progress:

- Project setup
- Supabase integration
- Trip creation form
- Database connectivity
- Dashboard
- AI itinerary generation
- Personalized recommendations
- Printable travel plans

---

## Vision

Most travel apps focus on booking.

This platform focuses on **planning**.

Instead of simply suggesting destinations, it acts as an AI travel companion by helping users:

- decide where to go
- determine whether a destination is worth visiting
- optimize their schedule
- discover hidden attractions
- prepare before the journey
- travel smarter and safer

---
