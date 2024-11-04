import { unstable_noStore } from 'next/cache';
import { Suspense } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { Loading } from '@/table-views/components/Loading';
// import { searchParamsCache } from '@/table-views/constants/search-params';
import type { PageProps } from '@/table-views/types';

import { SuspenseTable } from './suspenseTable';

export const Table = async (_props: PageProps) => {
  unstable_noStore();

  // const search = searchParamsCache.parse(props.searchParams);

  void api.authenticated.agency.interviews.read.prefetch({
    // interview_stage: search.interview_stage ?? undefined,
    // updated_at: search.updated_at ?? undefined,
    // terms_accepted: search.terms_accepted ?? undefined,
  });

  return (
    <HydrateClient>
      <Suspense fallback={<Loading />}>
        <SuspenseTable />
      </Suspense>
    </HydrateClient>
  );
};
