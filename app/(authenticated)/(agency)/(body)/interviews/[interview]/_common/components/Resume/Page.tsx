'use client';

import { useInterview } from '@/interview/hooks/useInterview';

export const Page = () => {
  const { id } = useInterview();
  return <div>Resume for interview:{id}</div>;
};
