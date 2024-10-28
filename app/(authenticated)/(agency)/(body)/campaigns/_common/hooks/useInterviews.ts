import { useDeferredValue } from 'react';
import { api } from 'trpc/client';

import { type Interviews } from '@/campaign/api/interviews';

import { useCampaignsParams } from './useCampaignsParams';

export const useInterviews = (): Interviews['output'] => {
  const { search: _search } = useCampaignsParams();
  const search = useDeferredValue(_search);
  return api.authenticated.agency.campaigns.interviews.useSuspenseQuery({
    interview_stage: search.interview_stage ?? undefined,
    updated_at: search.updated_at ?? undefined,
    terms_accepted: search.terms_accepted ?? undefined,
  })[0];
};
