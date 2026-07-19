import LandingNav from '@/components/landing/LandingNav'
import Hero from '@/components/landing/Hero'
import FeatureCards from '@/components/landing/FeatureCards'
import Showcase from '@/components/landing/Showcase'
import SocialProof from '@/components/landing/SocialProof'
import CTASection from '@/components/landing/CTASection'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNav />
      <Hero />
      <FeatureCards />
      <Showcase />
      <SocialProof />
      <CTASection />
    </div>
  )
}