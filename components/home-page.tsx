import React from 'react';

import Footer from './footer';
import CTA from './landing-sections.tsx/call-to-action';
import Hero from './landing-sections.tsx/hero';
import HowItWorks from './landing-sections.tsx/how-it-works';
import PoweredBy from './landing-sections.tsx/powerd-by';
import WhyUS from './landing-sections.tsx/why-us';


function HomePage() {
  return (
    <div className='w-full'>
     {/* <nav className='flex h-16 w-full items-center justify-center px-5 md:px-0 '>
        <div className='flex w-full items-center justify-between max-w-[1280px]'>
          <div className='flex items-center gap-5 font-semibold'>
            <Link href='/' className='flex items-center justify-center'>
              <NursanaLogo variant='md' />
            </Link>
          </div>
          <Button asChild variant={'default'}>
        <Link href='/campaign/?campaign_code=SUMMER23NURSE'>Get Started</Link>
      </Button>
        </div>
      </nav> */}
      <Hero/>
      {/* <PurpleHero /> */}
      <div className='relative z-20 flex flex-col gap-20 rounded-[50px] bg-white pb-20 pt-20 md:container md:gap-40 md:pb-40'>
        {/* <LandingHero /> */}

        <HowItWorks/>
        <PoweredBy />
        <WhyUS />
        <CTA />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
