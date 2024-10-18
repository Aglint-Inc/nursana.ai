'use client';

import { useApplicant } from '@/applicant/hooks/useApplicant';

const Page = () => {
  const applicant = useApplicant();
  return <>{applicant.first_name}</>;
};
export default Page;
