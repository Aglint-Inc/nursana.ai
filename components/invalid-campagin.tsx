import React from 'react'
import LandingHero from './landing-sections.tsx/landing-hero'
import HowItWorks from './landing-sections.tsx/how-it-works'
import PoweredBy from './landing-sections.tsx/powerd-by'
import CTA from './landing-sections.tsx/call-to-action'
import WhyUS from './landing-sections.tsx/why-us'

function InvalidCampagin() {
  return (
    <div className='pt-14 pb-40 flex flex-col gap-40'>
    <LandingHero/>
    <HowItWorks/>
    <PoweredBy/>
    <WhyUS/>
    <CTA/>
    </div>
  )
}

export default InvalidCampagin