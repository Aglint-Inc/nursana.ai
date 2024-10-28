'use client';

import { createContext, type PropsWithChildren } from 'react';
import { api } from 'trpc/client';

import { useCurrentCampaign } from '@/campaign/hooks/useCurrentCampaign';

const useCampaignContext = () => {
  const { campaign } = useCurrentCampaign();
  return api.authenticated.agency.campaigns.campaign.read.useSuspenseQuery({
    id: campaign,
  })[0];
};

export const CampaignContext = createContext<
  ReturnType<typeof useCampaignContext> | undefined
>(undefined);

export const CampaignProvider = (props: PropsWithChildren) => {
  const value = useCampaignContext();
  return (
    <CampaignContext.Provider value={value}>
      {props.children}
    </CampaignContext.Provider>
  );
};
