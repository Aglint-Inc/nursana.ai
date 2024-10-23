import { api } from 'trpc/client';

import { useCurrentCampaign } from './useCurrentCampaign';

export const useCampaign = () => {
  const { campaign } = useCurrentCampaign();
  return api.authenticated.hospital.campaigns.campaign.read.useSuspenseQuery({
    id: campaign,
  })[0];
};
