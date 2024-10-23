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
      <div className='relative z-20 pt-16 flex flex-col items-center gap-16'>
        <Image
          src={'/images/nursana-beta.svg'}
          width={200}
          height={60}
          alt='nursana.ai'
        />
        <div className='w-full flex flex-col gap-4 items-center'>
        <h1 className='max-w-[1000px] text-4xl md:text-center font-medium md:text-6xl'>
                Fast-Track Your Nursing Career with
                <span className='ml-2.5 text-purple-700'>💪 AI-Powered Interviews.</span>
              </h1>
              <p className=' text-xl text-muted-foreground md:text-lg max-w-[600px] md:text-center'>
                Get hired quicker with AI-driven resume feedback and interviews
                designed to match you with the perfect job.
              </p>
              <div className='flex items-center gap-4 mt-2'>
              <Link href='/campaign/?campaign_code=SUMMER23NURSE'>
                <Button size='lg' className='text-lg rounded-full'>
                  Get Started
                </Button>
              </Link>
              <Link href='#how-it-works'>
                <Button size='lg' variant={'outline'} className='text-lg rounded-full'>
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
         <div className='h-[120px] bg-gradient-to-b from-transparent to-white w-full flex items-end justify-end'>
         <div id='how-it-works' className='h-[0px]'></div>
         </div>
         
      </div>
    </div>
  );
}

export default Hero;
