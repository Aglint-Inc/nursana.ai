import { useDeferredValue } from 'react';
import { api } from 'trpc/client';

import { type Interviews } from '@/campaign/api/interviews';
import { useTableViewParams } from '@/table-views/hooks/useTableViewParams';

import { useCurrentCampaign } from './useCurrentCampaign';

export const useCampaignInterviews = (): Interviews['output'] => {
  const { campaign } = useCurrentCampaign();
  const { search: _search } = useTableViewParams();
  const search = useDeferredValue(_search);
  return api.authenticated.agency.campaigns.campaign.interviews.useSuspenseQuery(
    {
      id: campaign,
      interview_stage: search.interview_stage ?? undefined,
      updated_at: search.updated_at ?? undefined,
      terms_accepted: search.terms_accepted ?? undefined,
    },
  )[0];
};
