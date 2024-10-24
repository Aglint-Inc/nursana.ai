import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '../ui/button';

function Hero() {
  return (
    <div className='relative'>
      <div className='absolute z-10 h-full w-full'>
        <Image
          src='/images/hom-bg.png'
          alt='Background Image'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='relative z-20 flex flex-col gap-10 px-5 pt-16 md:items-center md:gap-16 md:px-0'>
        <Link href={'/auth/sign-in'}>
          {' '}
          <Image
            src={'/images/nursana-beta.svg'}
            width={200}
            height={60}
            alt='nursana.ai'
          />
        </Link>

        <div className='flex w-full flex-col gap-4 md:items-center'>
          <h1 className='max-w-[1000px] text-4xl font-medium md:text-center md:text-6xl'>
            Fast-Track Your Nursing Career with
            <span className='ml-2.5 text-purple-700'>
              💪 AI-Powered Interviews.
            </span>
          </h1>
          <p className='max-w-[600px] text-xl text-muted-foreground md:text-center md:text-lg'>
            Get hired faster with AI-driven resume feedback and interviews
            designed to match you with the perfect job.
          </p>
          <div className='mt-2 flex gap-4 md:items-center'>
            <Link href='/campaign/?campaign_code=SUMMER23NURSE'>
              <Button size='lg' className='rounded-full text-lg'>
                Get Started
              </Button>
            </Link>
            <Link href='#how-it-works'>
              <Button
                size='lg'
                variant={'outline'}
                className='rounded-full text-lg'
              >
                How it works 🤔
              </Button>
            </Link>
          </div>
        </div>
        <Image
          src='/images/nurses.png'
          alt='nurses'
          width={1000}
          height={500}
          className='hidden md:block'
        />
        <Image
          src='/images/hero-bg-mobile.png'
          alt='nurses'
          width={1000}
          height={500}
          className='md:hidden'
        />
        <div className='flex h-[120px] w-full items-end justify-end bg-gradient-to-b from-transparent to-white'>
          <div id='how-it-works' className='h-[0px]'></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
