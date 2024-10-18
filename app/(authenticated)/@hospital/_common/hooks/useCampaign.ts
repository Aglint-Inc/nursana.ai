import { api } from 'trpc/client';

export const useCampaign = () =>
  api.authenticated.hospital.campaign.read.useSuspenseQuery()[0];
