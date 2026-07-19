'use client'

import { motion } from 'framer-motion'

export default function Showcase() {
  return (
    <section id="showcase" className="relative mx-auto max-w-5xl px-6 py-20">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          animate={{ y: [0, -8, 0] }}
          className="w-full rounded-3xl border border-gray-200 bg-white/80 p-5 shadow-xl backdrop-blur sm:w-64"
          style={{ animationDuration: '5s' }}
        >
          <p className="text-xs font-medium text-gray-400">Trip Health</p>
          <p className="mt-1 text-3xl font-semibold text-green-600">92%</p>
          <p className="mt-1 text-xs text-gray-500">Excellent — everything on track.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          animate={{ y: [0, 8, 0] }}
          className="mt-6 w-full rounded-3xl border border-gray-200 bg-white/80 p-5 shadow-xl backdrop-blur sm:mt-16 sm:w-64"
        >
          <p className="text-xs font-medium text-gray-400">Travel Update</p>
          <p className="mt-2 text-sm text-gray-700">Light rain expected in Venice on July 21. Carry an umbrella.</p>
        </motion.div>
      </div>
    </section>
  )
}