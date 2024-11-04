import { api } from 'trpc/client';

export const useAddCampaign = () =>
  api.authenticated.agency.campaigns.add.useMutation();
