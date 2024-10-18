'use client';

import { Logo } from '@/authenticated/components/Logo';
import { useRole } from '@/authenticated/hooks/useRole';
import { Brand } from '@/hospital/components/Brand';

const Page = () => {
  const role = useRole();
  return (
    <div className='mr-auto'>{role === 'applicant' ? <Logo /> : <Brand />}</div>
  );
};

export default Page;
