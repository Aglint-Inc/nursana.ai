import { api } from 'trpc/client';

export const useAgency = () =>
  api.authenticated.agency.read.useSuspenseQuery()[0];
