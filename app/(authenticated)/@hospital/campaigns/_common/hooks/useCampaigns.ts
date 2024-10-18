import { api } from 'trpc/client';

export const useCampaigns = () =>
  api.authenticated.hospital.campaigns.read.useSuspenseQuery()[0];
