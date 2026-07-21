'use client'

import { Check } from 'lucide-react'

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    badge: 'Currently active',
    description: 'Everything you need to plan a trip with AI.',
    features: ['Up to 3 active trips', 'AI-generated itineraries', 'Packing checklist & overview', 'Basic dashboard'],
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    badge: 'Feature not available yet',
    description: 'For frequent travelers who want it all live.',
    features: ['Unlimited trips', 'Live weather & trip health refresh', 'Offline export', 'AI chat trip editing'],
    highlight: true,
  },
  {
    name: 'Team',
    price: 'Custom',
    period: '',
    badge: 'Coming soon',
    description: 'For organizations planning trips at scale.',
    features: ['Shared team dashboard', 'Business travel calendar', 'Multi-traveler trip management', 'Admin controls'],
  },
]

export default function PricingSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Simple, honest pricing</h1>
        <p className="mt-2 text-gray-500">Voya is free during beta. Here&apos;s what pricing may look like later.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl border p-6 shadow-lg backdrop-blur-xl ${
              tier.highlight ? 'border-blue-300 bg-white/60' : 'border-white/50 bg-white/35'
            }`}
          >
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              {tier.badge}
            </span>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{tier.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{tier.description}</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {tier.price}<span className="text-base font-normal text-gray-500">{tier.period}</span>
            </p>
            <ul className="mt-5 space-y-2">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /> {f}
                </li>
              ))}
            </ul>
            <button
              disabled={tier.name !== 'Free'}
              className={`mt-6 w-full rounded-full py-2.5 text-sm font-medium transition ${
                tier.name === 'Free' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'cursor-not-allowed bg-gray-200 text-gray-500'
              }`}
            >
              {tier.name === 'Free' ? 'Get started' : 'Notify me'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}