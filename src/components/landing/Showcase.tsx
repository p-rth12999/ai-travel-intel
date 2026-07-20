'use client'

import { motion } from 'framer-motion'
import { HeartPulse, MapPinned, MessageCircle } from 'lucide-react'

const PANELS = [
  { icon: HeartPulse, title: 'Trip Health', desc: 'A live score that reflects how smoothly your trip is likely to go — weather, crowds, and disruptions, explained in plain language.' },
  { icon: MapPinned, title: 'Adaptive Itinerary', desc: 'Your day-by-day plan reorganizes itself around real conditions, so a change in weather never means starting over.' },
  { icon: MessageCircle, title: 'Context-Aware AI Chat', desc: 'Ask questions or request changes — your assistant already knows your destinations, dates, and preferences.' },
]

export default function Showcase() {
  return (
    <section id="showcase" className="relative px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Built for how travel actually happens</h2>
          <p className="mt-2 text-sm text-gray-700">Not just a plan — a companion that keeps up with you.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PANELS.map((panel, i) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="rounded-3xl border border-white/50 bg-white/35 p-6 shadow-lg backdrop-blur-xl"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/60">
                <panel.icon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{panel.title}</h3>
              <p className="mt-1.5 text-sm text-gray-700">{panel.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}