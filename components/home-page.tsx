import React from 'react';

import Footer from './footer';
import CTA from './landing-sections/call-to-action';
import { Faqs } from './landing-sections/faqs';
import Hero from './landing-sections/hero';
import HowItWorks from './landing-sections/how-it-works';
import PoweredBy from './landing-sections/powerd-by';
import WhyUS from './landing-sections/why-us';



function HomePage() {
  return (
    <div className='w-full overflow-auto'>
      <Hero/>
      <div className='relative z-20 flex flex-col gap-12 rounded-[50px] bg-white pb-20 lg:pt-20 max-lg:12 max-lg:px-5 lg:container md:gap-20 lg:gap-40 lg:pb-40'>
        <HowItWorks/>
        <PoweredBy />
        <WhyUS />
        <Faqs/>
        <CTA />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
