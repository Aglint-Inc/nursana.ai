import React from "react";

import Footer from "./footer";
import CTA from "./landing-sections.tsx/call-to-action";
import HowItWorks from "./landing-sections.tsx/how-it-works";
import LandingHero from "./landing-sections.tsx/landing-hero";
import PoweredBy from "./landing-sections.tsx/powerd-by";
import WhyUS from "./landing-sections.tsx/why-us";
import Navbar from "./navbar";

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="pt-14 md:pb-40 pb-20 flex flex-col md:gap-40 gap-20">
        <LandingHero />
        <HowItWorks />
        <PoweredBy />
        <WhyUS />
        <CTA />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
