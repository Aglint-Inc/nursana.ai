import Link from 'next/link';
import React from 'react';

import { Button } from '../ui/button';

function PurpleHero() {
  return (
    <div className='relative w-screen '>
      <div className='relative h-full w-full '>
        <div className='absolute z-10 h-full w-full'>
          <img
            className='h-full w-full object-cover'
            src='/images/bg-with-image.png'
            alt='Background'
            loading='eager'
          />
        </div>

        <div className='max-w-[1280px] mx-auto md:px-0 px-5'>
        <div className='relative z-40 grid min-h-[94vh] grid-cols-1 md:grid-cols-2 w-full'>
          <div className='flex h-full flex-col items-start justify-center gap-4 md:gap-6 md:pt-0 pt-12'>
            <h1 className='max-w-[700px] text-4xl font-thin text-white md:text-7xl'>
              Fast-Track Your Nursing Career with{' '}
              <span className='font-extrabold'>AI-Powered Interviews.</span>
            </h1>
            <p className='max-w-[550px] text-base text-muted md:text-lg'>
              Get hired quicker with AI-driven resume feedback and interviews
              designed to match you with the perfect job.
            </p>
            <Link href='/campaign/?campaign_code=SUMMER23NURSE'>
              <Button size='lg' className='text-lg'>
                Get Started
              </Button>
            </Link>
          </div>
          <div className='flex md:h-full flex-col md:items-center justify-end'>
            <img
              className='w-full max-w-[700px] object-contain'
              src='/images/hero-image2.png'
              alt='Background'
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default PurpleHero;
