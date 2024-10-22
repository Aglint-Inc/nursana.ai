import { api } from 'trpc/client';

import type { Edit } from '@/campaign/api/edit';

import { useCampaignParams } from './useCurrentCampaign';

export const useCampaignEdit = () => {
  const { campaign } = useCampaignParams();
  const mutation =
    api.authenticated.hospital.campaigns.campaign.edit.useMutation();
  const mutate = (
    input: Omit<Edit['input'], 'id'>,
    mutationOptions?: Parameters<(typeof mutation)['mutate']>[1],
  ) => mutation.mutate({ id: campaign, ...input }, mutationOptions);
  return { ...mutation, mutate };
};
