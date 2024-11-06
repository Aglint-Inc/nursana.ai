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
      <div className='relative z-20 flex flex-col gap-10 pt-16 md:items-center lg:gap-16 md:px-0'>
        <Link href={'/auth/sign-in'} className='lg:px-0 px-5'>
          {' '}
          <Image
            src={'/images/nursana-beta.svg'}
            width={200}
            height={60}
            alt='nursana.ai'
          />
        </Link>

        <div className='flex w-full flex-col gap-4 md:items-center lg:px-0 px-5'>
          <div className='flex flex-col gap-2 max-lg:gap-0.5  '>
          <h1 className='max-w-[1100px] text-3xl font-medium md:text-center lg:text-5xl'>
          Accelerate Your Nursing Career with

            <span className=' text-purple-700 md:hidden block'>
            AI-Powered Resume & Interview Feedback
            </span>
          </h1>
          <h1 className='max-w-[1000px] md:block hidden text-purple-700 text-3xl font-medium md:text-center lg:text-5xl'>
        
            AI-Powered Resume & Interview Feedback
           
          </h1>
          </div>
          <p className='lg:max-w-[650px] max-lg:max-w-[500px] text-md  md:text-center lg:text-lg'>
          Get hired faster with AI-driven job search and feedback, designed to match you with the perfect opportunity
          </p>
          <div className='mt-2 flex lg:gap-4 gap-2 md:items-center max-md:flex-col'>
            <Link href='/campaign/?campaign_code=NURSANA-AI' className='max-md:w-full'>
              <Button size='lg' className='rounded-full text-lg max-md:w-full'>
                Get Started
              </Button>
            </Link>
            <Link href='#how-it-works' className='max-md:w-full'>
              <Button
                size='lg'
                variant={'outline'}
                className='rounded-full text-lg max-md:w-full'
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
          className='hidden md:block md:w-[90%] lg:w-auto'
        />
        <Image
          src='/images/hero-bg-mobile.png'
          alt='nurses'
          width={1000}
          height={500}
          className='md:hidden'
        />
        <div className='flex lg:h-[120px] h-[40px] w-full items-end justify-end bg-gradient-to-b from-transparent to-white'>
          <div id='how-it-works' className='h-[0px]'></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
