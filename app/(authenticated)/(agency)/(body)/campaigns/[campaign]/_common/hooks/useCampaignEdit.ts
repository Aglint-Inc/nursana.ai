import { api } from 'trpc/client';

import type { Edit } from '@/campaign/api/edit';

import { useCurrentCampaign } from './useCurrentCampaign';

export const useCampaignEdit = () => {
  const { campaign } = useCurrentCampaign();
  const mutation =
    api.authenticated.agency.campaigns.campaign.edit.useMutation();
  const mutate = (
    input: Omit<Edit['input'], 'id'>,
    mutationOptions?: Parameters<(typeof mutation)['mutate']>[1],
  ) => mutation.mutate({ id: campaign, ...input }, mutationOptions);
  return { ...mutation, mutate };
};
