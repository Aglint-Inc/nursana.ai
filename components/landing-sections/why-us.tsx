import Image from 'next/image';
import React from 'react';

import { Button } from '../ui/button';

function WhyUS() {
  return (
      <div className='flex flex-col gap-8 md:gap-10'>
        <div className='grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10'>
          <div className='flex flex-col items-start gap-4'>
            <h1 className='text-3xl font-medium lg:text-5xl'>Why Nursana?</h1>
            <p className='text-base text-muted-foreground md:text-lg'>
              Our AI-driven resume analysis delivers an objective assessment of
              your resume, providing tailored recommendations to enhance its
              effectiveness while eliminating bias. Trust Nursana.ai to empower
              your job search by showcasing your qualifications in a way that
              stands out to potential employers.
            </p>
            <Button size='lg'>Get Started</Button>
          </div>

          <div className='flex w-full items-center justify-center lg:justify-end'>
            <Image
              alt='Nurse Interview'
              src={'/images/interview.png'}
              width={440}
              height={600}
              className='h-auto max-w-full max-lg:w-full'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 lg:gap-10 lg:grid-cols-3'>
          <div className='flex flex-col gap-4 rounded-lg bg-muted p-6 md:p-8'>
            <div className='text-lg font-medium md:text-xl'>
              AI-Driven Interviews for Perfect Job Matches
            </div>
            <div className='text-base text-muted-foreground md:text-lg'>
              Nurses can take AI interviews that assess their skills and
              preferences. Based on the analysis, you&apos;ll receive job
              matches that align with your qualifications and career goals,
              ensuring you find the right fit in no time.
            </div>
          </div>

          <div className='flex flex-col gap-4 rounded-lg bg-muted p-6 md:p-8'>
            <div className='text-lg font-medium md:text-xl'>
              AI-Powered Resume Review
            </div>
            <div className='text-base text-muted-foreground md:text-lg'>
              Receive comprehensive feedback on your resume with our advanced AI
              technology. Our tools analyze your resume and provide personalized
              recommendations to enhance your chances of landing interviews with
              top employers.
            </div>
          </div>

          <div className='flex flex-col gap-4 rounded-lg bg-muted p-6 md:p-8'>
            <div className='text-lg font-medium md:text-xl'>
              Seamless Process for Quick Matches
            </div>
            <div className='text-base text-muted-foreground md:text-lg'>
              The process is simple: take an AI interview, and let Nursana.ai do
              the rest. Our platform efficiently connects you with job
              opportunities that meet your criteria, making your job search
              smooth and hassle-free.
            </div>
          </div>
        </div>
      </div>
  );
}

export default WhyUS;
