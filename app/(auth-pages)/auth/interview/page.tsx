'use client';

import { Link2Off } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Loader } from '@/app/components/Loader';
import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    asyncFunction();
  }, [router]);

  const asyncFunction = async () => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const interview_id = searchParams.get('id');

    if (error) {
      setError(error);
      return;
    }

    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
      router.push(`/interview/${interview_id}/start-interview`);
    }
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      {error ? (
        <div className='flex h-screen w-full flex-col items-center justify-between gap-4 py-8 text-center'>
          <NursanaLogo />
          <div className='flex w-full flex-col items-center justify-between gap-4 text-center'>
            <Link2Off size={50} strokeWidth={1.3} className='text-purple-600' />

            <div className='flex flex-col items-center justify-center gap-1'>
              <div className='text-lg font-medium'>
                The invite link has expired
              </div>
              <div className='text-sm text-muted-foreground'>
                Please sign in to your account to start the interview.
              </div>
              <Link href={'/auth/sign-in'} className='mt-4'>
                <Button size={'sm'}>Sign In</Button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Page;
