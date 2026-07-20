import { Link2, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-transparent to-black/50 px-6 py-14 text-center text-white backdrop-blur-sm">
      <p className="text-sm">© 2026 Vora.</p>
      <p className="mt-1 text-sm">Designed and developed by Parth Kulkarni.</p>
      <p className="mt-1 text-xs text-blue-100/50">Built with Next.js • Supabase • OpenRouter • TypeScript</p>
      <div className="mt-4 flex items-center justify-center gap-5">
        <a href="https://github.com/p-rth12999" className="flex items-center gap-1.5 text-sm hover:text-white">
          <Link2 className="h-4 w-4" /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/parth-kulkarni-18148332b/" className="flex items-center gap-1.5 text-sm hover:text-white">
          <Link2 className="h-4 w-4" /> LinkedIn
        </a>
        <a href="mailto:pyk12999@gmail.com" className="flex items-center gap-1.5 text-sm hover:text-white">
          <Mail className="h-4 w-4" /> Email
        </a>
      </div>
    </footer>
  )
}