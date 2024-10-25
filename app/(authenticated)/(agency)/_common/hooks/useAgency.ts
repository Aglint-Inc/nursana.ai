import { api } from 'trpc/client';

export const useAgency = () =>
  api.authenticated.agency.read.useSuspenseQuery(undefined, {
    staleTime: Infinity,
    queryFn: undefined,
  })[0];
