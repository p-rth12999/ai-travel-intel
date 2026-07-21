import Link from 'next/link'
import Logo from '@/components/shared/Logo'

export default function LandingNav() {
  return (
    <header className="relative z-20 bg-[#0B1832]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/">
          <Logo height={36} />
        </Link>
        <nav className="hidden gap-8 text-sm text-blue-100/80 md:flex">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/#features" className="hover:text-white">Features</Link>
          <Link href="/pricing" className="hover:text-white">Pricing</Link>
          <span className="cursor-default text-blue-100/40">Testimonials</span>
        </nav>
        <Link href="/login" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0B1832] hover:bg-blue-50">
          Sign In
        </Link>
      </div>
    </header>
  )
}