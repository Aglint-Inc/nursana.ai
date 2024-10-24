import { api } from 'trpc/client';

export const useCampaigns = () =>
  api.authenticated.agency.campaigns.read.useSuspenseQuery()[0];
