'use client';

import { useInterview } from '@/interview/hooks/useInterview';

export const Page = () => {
  const { id } = useInterview();
  return <div>Transcript for interview:{id}</div>;
};
