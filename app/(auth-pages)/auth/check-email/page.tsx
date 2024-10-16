'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function CheckEmail() {
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <h1 className='mb-4 text-2xl font-bold'>Check Your Email</h1>
      <p className='mb-6 text-center'>
        {`We've sent a interview link to your email address. Please check your inbox
        and click on the link to start your interview.`}
      </p>
      <p className='mb-8 text-sm text-muted-foreground'>
        {`If you don't see the email, check your spam folder.`}
      </p>
      <Button onClick={() => router.push('/')}>Back to Home Page</Button>
    </div>
  );
}
