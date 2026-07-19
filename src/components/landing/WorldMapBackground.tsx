'use client'

import { motion } from 'framer-motion'

const PINS = [
  { x: 180, y: 140 }, { x: 420, y: 90 }, { x: 650, y: 160 },
  { x: 850, y: 110 }, { x: 300, y: 220 }, { x: 720, y: 240 },
]

const PATHS = [
  'M180,140 Q400,60 650,160',
  'M420,90 Q550,200 720,240',
  'M300,220 Q500,280 850,110',
]

export default function WorldMapBackground() {
  return (
    <svg viewBox="0 0 1000 350" className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="dot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
      </defs>

      {Array.from({ length: 220 }).map((_, i) => (
        <circle
          key={i}
          cx={(i % 22) * 46 + 10}
          cy={Math.floor(i / 22) * 24 + 10}
          r="1.4"
          fill="#94a3b8"
          opacity="0.35"
        />
      ))}

      {PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: i * 0.4, ease: 'easeInOut' }}
        />
      ))}

      {PINS.map((pin, i) => (
        <motion.g key={i} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 + 0.5, duration: 0.6 }}>
          <circle cx={pin.x} cy={pin.y} r="14" fill="url(#dot)" />
          <circle cx={pin.x} cy={pin.y} r="3" fill="#2563eb" />
        </motion.g>
      ))}
    </svg>
  )
}