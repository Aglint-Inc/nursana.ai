import { api } from 'trpc/client';
import { useCampaignParams } from './useCurrentCampaign';

export const useCampaign = () => {
  const { campaign } = useCampaignParams();
  return api.authenticated.hospital.campaigns.campaign.read.useSuspenseQuery({
    id: campaign,
  })[0];
};
