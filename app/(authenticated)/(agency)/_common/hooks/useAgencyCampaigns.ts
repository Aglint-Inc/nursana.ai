import { api } from 'trpc/client';

export const useAgencyCampaigns = () =>
  api.authenticated.agency.campaigns.read.useSuspenseQuery(undefined, {
    staleTime: Infinity,
    queryFn: undefined,
  })[0];
