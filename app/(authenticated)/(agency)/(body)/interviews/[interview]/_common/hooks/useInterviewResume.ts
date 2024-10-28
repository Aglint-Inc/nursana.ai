import { api } from 'trpc/client';

import { useCurrentInterview } from './useCurrentInterview';

export const useInterviewResume = () => {
  const { interview } = useCurrentInterview();
  return api.authenticated.agency.interviews.interview.resume.useSuspenseQuery(
    {
      id: interview,
    },
    { refetchOnMount: false },
  )[0];
};
