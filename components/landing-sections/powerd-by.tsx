import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Section from '../section';
import { Button } from '../ui/button';

function PoweredBy() {
  return (
    <Section>
      <div className="rounded-lg bg-[url('/images/gradientbg.jpg')] bg-cover bg-center p-6 py-12 text-black md:p-8 md:py-20">
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
          <div className='flex h-full flex-col items-start justify-center gap-6 px-0 lg:gap-8 lg:px-8'>
            <div className='flex items-center gap-2 text-base text-purple-700 md:text-lg'>
              <Sparkles strokeWidth={1.2} size={20} />
              Powered by AI
            </div>
            <h1 className='text-3xl font-medium lg:text-5xl'>
              Get an Unbiased and Professional Evaluation of Your Resume.
            </h1>
            <p className='text-base text-gray-600 md:text-lg'>
              Our AI-driven resume analysis delivers an objective assessment of
              your resume, offering tailored recommendations to enhance its
              effectiveness while eliminating bias. Elevate your job search by
              showcasing your skills and qualifications in a way that makes you
              stand out to potential employers.
            </p>
            <Link href='/campaign/?campaign_code=NURSANA-AI'>
              <Button size={'lg'}>Get Started</Button>
            </Link>
          </div>
          <div className='flex w-full items-center justify-center'>
            <Image
              alt='powered by ai'
              src={'/images/powered-by.png'}
              width={400}
              height={600}
              className='h-auto max-w-full'
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default PoweredBy;
