'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Section from '../section';
import { Button } from '../ui/button';

function LandingHero() {
  return (
    <Section>
      <div className='flex flex-col justify-center gap-8 md:items-center md:text-center'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h1 className='max-w-4xl text-3xl font-medium leading-tight md:text-5xl'>
            Fast-Track Your Nursing Career with AI-Powered Interviews.
          </h1>
          <p className='max-w-xl text-base text-muted-foreground md:text-lg'>
            Get hired faster with AI-driven resume feedback and interviews
            designed to match you with the perfect job.
          </p>
        </div>
        <div
          className='rounded-md'
          style={{
            boxShadow: '0 0px 50px rgba(138, 43, 226, 0.3)',
          }}
        >
          <Image
            src={'/images/hero-image.png'}
            width={600}
            height={400}
            alt='Nursana.ai'
            className='h-auto w-full'
          />
        </div>
        <Link href='/campaign/?campaign_code=NURSANA-AI'>
          <Button size='lg' className='text-lg'>
            Get Started
          </Button>
        </Link>
      </div>
    </Section>
  );
}

export default LandingHero;
