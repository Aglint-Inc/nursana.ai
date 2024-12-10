'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

function EmployerHero() {
  const router = useRouter();
  return (
    <div className='relative min-h-screen'>
      <div className='relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between pt-6 lg:pt-8'>
          <Link href={'/'}>
            <Image
              src={'/images/nursana-beta.svg'}
              width={200}
              height={60}
              alt='nursana.ai'
            />
          </Link>

          <div className='flex items-center gap-3'>
            <span className='text-sm text-muted-foreground'>
              Are you a nurse?
            </span>
            <Tabs
              defaultValue='employer'
              onValueChange={(value) => value === 'nurse' && router.push('/')}
            >
              <TabsList className='grid w-[200px] grid-cols-2'>
                <TabsTrigger value='employer'>Employer</TabsTrigger>
                <TabsTrigger value='nurse'>Nurse</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      <div className='relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex min-h-[calc(100vh-160px)] flex-col lg:flex-row lg:items-center'>
          {/* Left Column - increased width */}
          <div className='flex flex-[1.5] flex-col gap-8 lg:pr-12'>
            <div className='flex flex-col gap-6'>
              <div>
                <h1 className='text-4xl font-medium uppercase leading-tight lg:text-2xl'>
                  The World&apos;s First
                </h1>
                <h2 className='mt-2 text-4xl font-medium leading-tight text-purple-700 lg:text-6xl'>
                  <div className='text-purple-700'>AI Recruiter</div>
                  <div className='mt-2 text-black'>
                    For Healthcare Organizations{' '}
                  </div>
                </h2>
              </div>
              <p className='text-lg text-muted-foreground lg:text-xl'>
                End-to-end autonomous recruiting that gets smarter over time.{' '}
                <br />
                Transform your healthcare staffing with AI-powered precision.
              </p>
              <div className='flex flex-col gap-4 sm:flex-row'>
                <Button size='lg' className='rounded-full text-lg' asChild>
                  <Link href='#schedule-demo'>Schedule a Demo</Link>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='rounded-full text-lg'
                  asChild
                >
                  <a href='mailto:raj@aglinthq.com'>Contact Sales</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - decreased width */}
          <div className='flex-1 pt-12 lg:pt-16'>
            <div className='relative'>
              <div className='absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-200/50 blur-3xl' />
              <div className='relative'>
                <div className='relative mx-auto w-[90%] overflow-hidden rounded-[32px] bg-white pt-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm'>
                  {/* ID Card Hole */}
                  <div className='absolute left-1/2 top-6 z-10 h-4 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black/20 bg-[#F8EFFF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.1)]' />
                  {/* ID Card Content */}
                  <div className='relative aspect-[3/4]'>
                    <Image
                      src='/images/nursana-ai.png'
                      alt='AI Recruiter'
                      fill
                      className='object-cover'
                      priority
                    />
                    {/* ID Card Details - Vertical orientation */}
                    <div className='absolute right-4 top-4'>
                      <div className='flex origin-top-left translate-x-[100%] rotate-90 flex-col space-y-2'>
                        <div className='text-xs text-gray-500'>
                          ID: NS-2024-AI
                        </div>
                      </div>
                    </div>
                    <div className='absolute bottom-0 left-0 right-0 bg-purple-600 p-4 text-center text-white'>
                      <h3 className='text-xl font-medium uppercase'>
                        Monica Dillon
                      </h3>
                      <p className='text-md mt-1 opacity-90'>
                        Chief Nursing Officer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 h-full bg-gradient-to-r from-pink-50/80 via-white/50 to-pink-50/80' />
    </div>
  );
}

export default EmployerHero;
