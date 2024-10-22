import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Section from '../section';
import { Button } from '../ui/button';

function PoweredBy() {
  return (
    <Section>
      <div className="rounded-lg bg-[url('/images/gradientbg.jpg')] bg-cover bg-center p-6 md:p-8 py-12 md:py-20 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex h-full flex-col items-start justify-center gap-6 md:gap-8 px-0 md:px-8">
            <div className="flex items-center gap-2 text-base md:text-lg text-purple-700">
              <Sparkles strokeWidth={1.2} size={20} />
              Powered by Aglint AI
            </div>
            <h1 className="text-3xl md:text-5xl font-medium">
              Get an Unbiased and Professional Evaluation of Your Resume.
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Our AI-driven resume analysis delivers an objective assessment of
              your resume, providing tailored recommendations to enhance its
              effectiveness while eliminating bias. Trust Nursana.ai to empower
              your job search by showcasing your qualifications in a way that
              stands out to potential employers.
            </p>
            <Link href="/campaign/?campaign_code=SUMMER23NURSE">
              <Button size={'lg'}>Get Started</Button>
            </Link>
          </div>
          <div className="flex w-full items-center justify-center">
            <Image
              alt="powered by aglint ai"
              src={'/images/powered-by.png'}
              width={400}
              height={600}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default PoweredBy;