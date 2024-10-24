import { api } from 'trpc/client';

export const useRole = () =>
  api.authenticated.role.useSuspenseQuery(undefined, {
    staleTime: Infinity,
    queryFn: undefined,
  })[0];
