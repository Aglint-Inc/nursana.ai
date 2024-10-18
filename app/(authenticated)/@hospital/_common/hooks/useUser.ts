import { api } from 'trpc/client';

export const useUser = () =>
  api.authenticated.hospital.user.useSuspenseQuery(undefined, {
    staleTime: Infinity,
    queryFn: undefined,
  })[0];
