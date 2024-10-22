import { api } from 'trpc/client';

import { useCampaignParams } from './useCampaignParams';
import { useCurrentCampaign } from './useCurrentCampaign';
import { useDeferredValue } from 'react';

export const useCampaignInterviews = () => {
  const { campaign } = useCurrentCampaign();
  const { search: _search } = useCampaignParams();
  const search = useDeferredValue(_search);
  return api.authenticated.hospital.campaigns.campaign.interviews.useSuspenseQuery(
    {
      id: campaign,
      email: search.name ?? undefined,
      interview_stage: search.interview_stage ?? undefined,
      job_title: search.job_title ?? undefined,
      name: search.name ?? undefined,
      size: search.size ?? undefined,
      start: search.start ?? undefined,
      updated_at: search.updated_at ?? undefined,
    },
  )[0];
};
