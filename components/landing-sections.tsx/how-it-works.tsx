'use client';

import { Sparkles, UploadCloud, UserCheck } from 'lucide-react';
import React from 'react';

import Section from '../section';
import StepperCard from '../stepperCard';

function HowItWorks() {
  return (
    <Section>
      <div className='flex flex-col gap-10 md:gap-20'>
        <div className='flex max-w-screen-xl flex-col gap-2 text-left md:items-center md:px-0 md:text-center'>
          <h1 className='text-3xl font-medium md:text-5xl'>
            Nursana connects you with top-tier opportunities, opening doors you
            didn’t even know existed.
          </h1>
        </div>
        <div>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-28'>
            <StepperCard
              heading='Upload Your Resume'
              description=' Add your resume, choose your ideal job title, and get
                interview-ready. This helps us match you with the right
                opportunities!'
              icon={UploadCloud}
              color='blue'
            />

            <StepperCard
              heading='Take A Brief Interview'
              description=' Spend 10 minutes in a quick interview based on your job title and resume, which will be used to assess your suitability for the job.'
              icon={Sparkles}
              color='orange'
            />

            <StepperCard
              heading='Sit Back and Relax!!'
              description=' Set your preferences and watch as the AI instantly matches you with ideal job opportunities tailored just for you!'
              icon={UserCheck}
              color='green'
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default HowItWorks;
