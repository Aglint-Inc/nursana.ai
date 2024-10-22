import { useDeferredValue } from 'react';
import { api } from 'trpc/client';

import { type Interviews } from '@/campaign/api/interviews';

import { useCampaignParams } from './useCampaignParams';
import { useCurrentCampaign } from './useCurrentCampaign';

export const useCampaignInterviews = (): Interviews['output'] => {
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
      updated_at: search.updated_at ?? undefined,
    },
  )[0];
};
