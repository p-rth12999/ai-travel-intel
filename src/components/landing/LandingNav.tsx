import Link from 'next/link'
import Logo from '@/components/shared/Logo'

const LINKS = ['Home', 'Features', 'How it Works', 'Pricing', 'Testimonials']

export default function LandingNav() {
  return (
    <header className="relative z-20 bg-[#0B1832]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo height={36} />
        <nav className="hidden gap-8 text-sm text-blue-100/80 md:flex">
          {LINKS.map((link) => (
            <span key={link} className="cursor-pointer hover:text-white">{link}</span>
          ))}
        </nav>
        <Link href="/login" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0B1832] hover:bg-blue-50">
          Sign In
        </Link>
      </div>
    </header>
  )
}