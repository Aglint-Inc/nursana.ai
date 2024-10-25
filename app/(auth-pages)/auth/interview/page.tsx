'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { Loader } from '@/common/components/Loader';
import { supabase } from '@/utils/supabase/client';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    asyncFunction();
  }, [router]);

  const asyncFunction = async () => {
    const code = searchParams.get('code');
    const interview_id = searchParams.get('id');

    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
      router.push(`/interview/${interview_id}/start-interview`);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Loader />
    </div>
  );
}

export default Page;
