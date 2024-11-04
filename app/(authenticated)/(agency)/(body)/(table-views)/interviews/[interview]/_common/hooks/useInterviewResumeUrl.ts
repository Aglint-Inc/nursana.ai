import { api } from 'trpc/client';

import { useCurrentInterview } from './useCurrentInterview';

export const useInterviewResumeUrl = () => {
  const { interview } = useCurrentInterview();
  return api.authenticated.agency.interviews.interview.resumeUrl.useSuspenseQuery(
    {
      id: interview,
    },
    {
      staleTime: process.env.NEXT_PUBLIC_PUBLIC_URL_EXP,
      gcTime: process.env.NEXT_PUBLIC_PUBLIC_URL_EXP,
    },
  )[0];
};
