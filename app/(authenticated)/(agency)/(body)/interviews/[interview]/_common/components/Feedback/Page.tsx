'use client';

import { useInterview } from '@/interview/hooks/useInterview';

export const Page = () => {
  const { id } = useInterview();
  return <div>Feedback for interview:{id}</div>;
};
