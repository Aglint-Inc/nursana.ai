import { api } from 'trpc/client';

import { useCurrentInterview } from './useCurrentInterview';

export const useInterviewApplicant = () => {
  const { interview } = useCurrentInterview();
  return api.authenticated.agency.interviews.interview.applicant.useSuspenseQuery(
    {
      id: interview,
    },
    {
      refetchOnMount: false,
    },
  )[0];
};
