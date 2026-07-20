import { Link2, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="px-6 py-14 text-center text-gray-800">
      <p className="text-sm">© 2026 Vora.</p>
      <p className="mt-1 text-sm">Designed and developed by Parth.</p>
      <p className="mt-1 text-xs text-gray-600">Built with Next.js • Supabase • OpenRouter • TypeScript</p>
      <div className="mt-4 flex items-center justify-center gap-5">
        <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-900">
          <Link2 className="h-4 w-4" /> GitHub
        </a>
        <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-900">
          <Link2 className="h-4 w-4" /> LinkedIn
        </a>
        <a href="#" className="flex items-center gap-1.5 text-sm hover:text-gray-900">
          <Mail className="h-4 w-4" /> Email
        </a>
      </div>
    </footer>
  )
}