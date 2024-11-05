import { api } from 'trpc/client';

import { useCurrentInterview } from './useCurrentInterview';

export const useInterviewInterviewVideo = () => {
  const { interview } = useCurrentInterview();
  return api.authenticated.agency.interviews.interview.video.useSuspenseQuery(
    {
      id: interview,
    },
    {
      staleTime: process.env.NEXT_PUBLIC_PUBLIC_URL_EXP,
      gcTime: process.env.NEXT_PUBLIC_PUBLIC_URL_EXP,
    },
  )[0];
};
