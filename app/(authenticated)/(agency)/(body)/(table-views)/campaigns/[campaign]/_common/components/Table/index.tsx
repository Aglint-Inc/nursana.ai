import { unstable_noStore } from 'next/cache';
import { api, HydrateClient } from 'trpc/server';

import type { PageProps } from '@/campaign/types';

// import { searchParamsCache } from '@/table-views/constants/search-params';
import { SuspenseTable } from './suspenseTable';

export const Table = async (props: PageProps) => {
  unstable_noStore();

  // const search = searchParamsCache.parse(props.searchParams);

  void api.authenticated.agency.interviews.read.prefetch({
    campaign_id: props.params.campaign,
    // interview_stage: search.interview_stage ?? undefined,
    // updated_at: search.updated_at ?? undefined,
    // terms_accepted: search.terms_accepted ?? undefined,
  });

  return (
    <HydrateClient>
      <SuspenseTable />
    </HydrateClient>
  );
};
