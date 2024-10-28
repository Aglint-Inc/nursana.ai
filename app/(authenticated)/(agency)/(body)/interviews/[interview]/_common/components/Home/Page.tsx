'use client';

import { useInterview } from '@/interview/hooks/useInterview';

export const Page = () => {
  const { id } = useInterview();
  return <div>Home for interview:{id}</div>;
};
