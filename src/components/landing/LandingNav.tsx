import Link from 'next/link'

const LINKS = ['Home', 'Features', 'How it Works', 'Pricing', 'Testimonials']

export default function LandingNav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="text-lg font-semibold text-gray-900">Voya</span>
      <nav className="hidden gap-8 text-sm text-gray-600 md:flex">
        {LINKS.map((link) => (
          <span key={link} className="cursor-pointer hover:text-gray-900">{link}</span>
        ))}
      </nav>
      <Link
        href="/login"
        className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-medium text-gray-900 backdrop-blur hover:bg-white"
      >
        Sign In
      </Link>
    </header>
  )
}