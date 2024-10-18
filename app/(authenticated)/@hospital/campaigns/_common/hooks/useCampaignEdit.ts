import { api } from 'trpc/client';

import { type Edit } from '@/campaigns/api/campaign/edit';

import { useCampaignParams } from './useCurrentCampaign';

export const useCampaignEdit = () => {
  const { campaign } = useCampaignParams();
  const mutation =
    api.authenticated.hospital.campaigns.campaign.edit.useMutation();
  const mutate = (input: Omit<Edit['input'], 'id'>) =>
    mutation.mutate({ id: campaign, ...input });
  return { ...mutation, mutate };
};
