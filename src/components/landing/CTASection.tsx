import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="mx-auto my-16 max-w-5xl px-6">
      <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-14 text-center text-white">
        <h2 className="text-2xl font-semibold sm:text-3xl">Ready for your next journey?</h2>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50"
        >
          Start Planning
        </Link>
      </div>
    </section>
  )
}