// import { useDeferredValue } from 'react';
import { api } from 'trpc/client';

import type { Read } from '@/table-views/api/read';
import { useTableViewParams } from '@/table-views/hooks/useTableViewParams';

import { useCurrentCampaign } from './useCurrentCampaign';

export const useCampaignInterviews = (): Read['output'] => {
  const { campaign } = useCurrentCampaign();
  const { search: _search } = useTableViewParams();
  // const search = useDeferredValue(_search);
  return api.authenticated.agency.interviews.read.useSuspenseQuery(
    {
      campaign_id: campaign,
      // interview_stage: search.interview_stage ?? undefined,
      // updated_at: search.updated_at ?? undefined,
      // terms_accepted: search.terms_accepted ?? undefined,
    },
    { refetchOnMount: false },
  )[0];
};
