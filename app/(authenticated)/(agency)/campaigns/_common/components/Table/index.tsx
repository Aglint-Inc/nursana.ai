import { unstable_noStore } from 'next/cache';
import { api, HydrateClient } from 'trpc/server';

import { searchParamsCache } from '@/campaigns/constants/search-params';
import type { PageProps } from '@/campaigns/types';

import { SuspenseTable } from './suspenseTable';

export const Table = async (props: PageProps) => {
  unstable_noStore();

  const search = searchParamsCache.parse(props.searchParams);

  void api.authenticated.agency.campaigns.interviews.prefetch({
    interview_stage: search.interview_stage ?? undefined,
    updated_at: search.updated_at ?? undefined,
    terms_accepted: search.terms_accepted ?? undefined,
  });

  return (
    <HydrateClient>
      <SuspenseTable />
    </HydrateClient>
  );
};