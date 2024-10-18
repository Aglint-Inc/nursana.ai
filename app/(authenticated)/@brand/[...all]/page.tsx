'use client';

import { Logo } from '@/authenticated/components/Logo';
import { useRole } from '@/authenticated/hooks/useRole';
import { Brand } from '@/hospital/components/Brand';

const Page = () => {
  const role = useRole();
  if (role === 'applicant') return <Logo />;
  return <Brand />;
};

export default Page;
