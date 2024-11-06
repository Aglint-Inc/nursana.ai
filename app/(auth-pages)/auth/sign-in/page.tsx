'use client';

import Image from 'next/image';
import { useState } from 'react';

import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CompanySignIn from './_components/CompanySignIn';
import UserSignIn from './_components/UserSignIn';

export default function SignIn() {
  const [role, setRole] = useState<'nurse' | 'company'>('nurse');
  return (
      <div className='flex min-h-screen flex-col items-center md:justify-between pt-6 w-full max-md:h-screen' >
        <div className='max-md:w-full px-5'><NursanaLogo /></div>
        
        <div className='h-full grid w-full max-w-[750px] grid-cols-1 md:grid-cols-2 md:h-[500px] overflow-hidden rounded-lg md:border md:border-gray-200 bg-white max-md:px-5 max-md:pt-12'>
          <div className='flex flex-col md:items-center md:justify-center'>
            <div className='mb-6 text-xl font-medium'>Sign In to Nursana</div>
            <Tabs
              defaultValue='nurse'
              onValueChange={(value) => setRole(value as 'nurse' | 'company')}
              className='md:w-[90%] md:max-w-[300px]'
            >
              <TabsList className='mb-4 grid w-full grid-cols-2'>
                <TabsTrigger value='nurse'>Individual</TabsTrigger>
                <TabsTrigger value='company'>Company</TabsTrigger>
              </TabsList>
              <TabsContent value={role}>
                {role === 'nurse' ? <UserSignIn /> : <CompanySignIn />}
              </TabsContent>
            </Tabs>
          </div>
          {/* Image hidden on mobile */}
          <div className='hidden md:block h-[500px] bg-gray-100'>
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
  );
}