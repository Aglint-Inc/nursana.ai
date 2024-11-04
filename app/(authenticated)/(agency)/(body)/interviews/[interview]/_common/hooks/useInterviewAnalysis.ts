import { api } from 'trpc/client';

import { useCurrentInterview } from './useCurrentInterview';

export const useInterviewAnalysis = () => {
  const { interview } = useCurrentInterview();
  return api.authenticated.agency.interviews.interview.analysis.useSuspenseQuery(
    {
      id: interview,
    },
    {
      refetchOnMount: false,
    },
  )[0];
};
