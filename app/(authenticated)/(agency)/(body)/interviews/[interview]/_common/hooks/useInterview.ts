import { api } from 'trpc/client';

import { useCurrentInterview } from './useCurrentInterview';

export const useInterview = () => {
  const { interview } = useCurrentInterview();
  return api.authenticated.agency.interviews.interview.read.useSuspenseQuery(
    {
      id: interview,
    },
    { refetchOnMount: false },
  )[0];
};
