import { api } from 'trpc/client';

export const useHospital = () =>
  api.authenticated.hospital.read.useSuspenseQuery(undefined, {
    staleTime: Infinity,
    queryFn: undefined,
  })[0];
