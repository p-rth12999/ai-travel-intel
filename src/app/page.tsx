import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LandingNav from '@/components/landing/LandingNav'
import Hero from '@/components/landing/Hero'
import FeatureCards from '@/components/landing/FeatureCards'
import Showcase from '@/components/landing/Showcase'
import SocialProof from '@/components/landing/SocialProof'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#DEEDFC]">
      <div className="pointer-events-none absolute inset-0 z-0 flex justify-center select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/world-map-tall.png"
          alt="World Map Background"
          className="h-full w-full max-w-7xl object-cover object-top opacity-90"
        />
      </div>
      <div className="relative z-10">
        <LandingNav />
        <Hero />
        <FeatureCards />
        <Showcase />
        <SocialProof />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}