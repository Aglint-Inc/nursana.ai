'use client';

import { Navigation as ApplicantNavigation } from '@/applicant/component/Navigation';
import { useRole } from '@/authenticated/hooks/useRole';
import { Navigation as HospitalNavigation } from '@/hospital/components/Navigation';

const Page = () => {
  const role = useRole();
  if (role === 'applicant') return <ApplicantNavigation />;
  return <HospitalNavigation />;
};

export default Page;
