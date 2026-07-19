'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import WorldMapBackground from '@/components/landing/WorldMapBackground'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-8">
      <WorldMapBackground />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-medium text-blue-700 backdrop-blur"
        >
          AI Travel Intelligence Platform
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
        >
          Travel smarter.<br />Travel prepared.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-4 max-w-lg text-base text-gray-500"
        >
          Your AI companion that plans, monitors, adapts, and protects every journey.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link href="/login" className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
            Plan Your Trip <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#showcase" className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-6 py-3 text-sm font-medium text-gray-900 backdrop-blur hover:bg-white">
            <Play className="h-4 w-4" /> Watch Demo
          </a>
        </motion.div>
      </div>
    </section>
  )
}