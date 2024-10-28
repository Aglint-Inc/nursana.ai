import { api } from 'trpc/client';

import { useCurrentInterview } from './useCurrentInterview';

export const useHome = () => {
  const { interview } = useCurrentInterview();
  return api.authenticated.agency.interviews.interview.home.useSuspenseQuery({
    id: interview,
  })[0];
};
