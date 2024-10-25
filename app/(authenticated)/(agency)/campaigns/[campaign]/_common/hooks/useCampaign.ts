import { useContext } from 'react';

import { CampaignContext } from '@/campaign/context/campaign.context';

export const useCampaign = () => {
  const value = useContext(CampaignContext);
  if (!value) throw new Error('CampaignContext not found as a provider');
  return value;
};
