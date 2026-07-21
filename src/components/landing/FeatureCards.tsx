'use client'

import { motion } from 'framer-motion'
import {
  Sparkles, HeartPulse, Radio, Wand2, HardDriveDownload,
  ClipboardList, Globe2, MessageCircle, ShieldAlert,
} from 'lucide-react'

const FEATURES = [
  { icon: Sparkles, title: 'AI Trip Planning', desc: 'Personalized itineraries tailored to your style.' },
  { icon: HeartPulse, title: 'Trip Health Score', desc: 'Know how healthy your trip is, in real time.' },
  { icon: Radio, title: 'Real-Time Weather & Alerts', desc: 'Live forecasts and updates as your trip nears.' },
  { icon: Wand2, title: 'Adaptive Itinerary', desc: 'Mark things done — the AI reshapes the rest.' },
  { icon: HardDriveDownload, title: 'Offline Access', desc: 'Your full trip, downloadable, no internet needed.' },
  { icon: ClipboardList, title: 'Smart Packing Checklist', desc: 'Auto-built from weather and activities.' },
  { icon: Globe2, title: 'Local Wisdom & Regulations', desc: 'Customs, etiquette, and rules per destination.' },
  { icon: MessageCircle, title: 'AI Trip Chat', desc: 'Ask it to change any part of your plan, instantly.' },
  { icon: ShieldAlert, title: 'Emergency & Medical Info', desc: 'Embassy, hospital, and safety info per trip.' },
]

export default function FeatureCards() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/50 bg-white/35 p-6 shadow-lg backdrop-blur-xl transition-shadow hover:shadow-xl"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <f.icon className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}