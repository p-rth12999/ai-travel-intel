import LandingNav from '@/components/landing/LandingNav'
import PricingSection from '@/components/pricing/PricingSection'
import Footer from '@/components/landing/Footer'

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#DEEDFC]">
      <div className="pointer-events-none absolute inset-0 z-0 flex justify-center select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/world-map-tall.png"
          alt="World Map Background"
          className="h-full w-full max-w-7xl object-cover object-top opacity-90 sm:object-fill"
        />
      </div>
      <div className="relative z-10">
        <LandingNav />
        <PricingSection />
        <Footer />
      </div>
    </div>
  )
}