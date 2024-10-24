'use client';

import Image from 'next/image';
import { useState } from 'react';

import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import Section from '@/components/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CompanySignIn from './_components/CompanySignIn';
import UserSignIn from './_components/UserSignIn';

export default function SignIn() {
  const [role, setRole] = useState<'nurse' | 'company'>('nurse');
  return (
    <Section>
      <div className='flex min-h-screen flex-col items-center justify-between pt-6'>
        <NursanaLogo />
        <div className='grid h-[500px] w-[800px] grid-cols-2 overflow-hidden rounded-lg border border-gray-200 bg-white'>
          <div className='flex flex-col items-center justify-center'>
            <div className='mb-6 text-xl font-medium'>Sign In to Nursana</div>
            <Tabs
              defaultValue='nurse'
              onValueChange={(value) => setRole(value as 'nurse' | 'company')}
              className='w-[300px]'
            >
              <TabsList className='mb-4 grid w-full grid-cols-2'>
                <TabsTrigger value='nurse'>Individual</TabsTrigger>
                <TabsTrigger value='company'>Company</TabsTrigger>
              </TabsList>
              <TabsContent value={role}>
                {role == 'nurse' ? <UserSignIn /> : <CompanySignIn />}
              </TabsContent>
            </Tabs>
          </div>
          <div className='h-[500px] bg-gray-100'>
            <Image
              alt='nursana'
              src={'/images/nurse-cover.jpg'}
              objectFit='cover'
              width={400}
              height={500}
            />
          </div>
        </div>

        <Footer />
      </div>
    </Section>
  );
}
