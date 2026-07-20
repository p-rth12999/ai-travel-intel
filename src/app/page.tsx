import LandingNav from '@/components/landing/LandingNav'
import Hero from '@/components/landing/Hero'
import FeatureCards from '@/components/landing/FeatureCards'
import Showcase from '@/components/landing/Showcase'
import SocialProof from '@/components/landing/SocialProof'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#DEEDFC]">
      <LandingNav />
      <Hero />
      <FeatureCards />
      <Showcase />
      <SocialProof />
      <CTASection />
      <Footer />
    </div>
  )
}