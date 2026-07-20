const BRANDS = ['Google', 'Tripadvisor', 'Booking.com', 'Lonely Planet', 'Skyscanner']

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 text-center">
      <p className="mb-6 text-xs font-medium uppercase tracking-wide text-gray-600">
  Trusted by modern travelers worldwide
</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {BRANDS.map((brand) => (
          <span key={brand} className="text-sm font-medium text-gray-600">{brand}</span>
        ))}
      </div>
    </section>
  )
}