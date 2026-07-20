'use client'

import { motion } from 'framer-motion'
import { Sparkles, HeartPulse, Radio, Wand2, HardDriveDownload, Brain } from 'lucide-react'

const FEATURES = [
  { icon: Sparkles, title: 'AI Trip Planning', desc: 'Personalized itineraries tailored to your style.' },
  { icon: HeartPulse, title: 'Trip Health Score', desc: 'Know how healthy your trip is, in real time.' },
  { icon: Radio, title: 'Real-Time Updates', desc: 'Live weather, alerts & travel insights.' },
  { icon: Wand2, title: 'Adaptive Recommendations', desc: 'Your plan adapts as things change.' },
  { icon: HardDriveDownload, title: 'Offline Support', desc: 'Access your trip anytime, anywhere.' },
  { icon: Brain, title: 'Travel Intelligence', desc: 'Reasoning, not just recommendations.' },
]

export default function FeatureCards() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
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