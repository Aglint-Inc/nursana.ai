import { TvMinimalPlay } from 'lucide-react';
import { unstable_noStore } from 'next/cache';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { api, HydrateClient } from 'trpc/server';

import type { PageProps } from '@/campaign/types';
import { Loading } from '@/campaigns/components/Loading';
import { searchParamsCache } from '@/campaigns/constants/search-params';

import { SuspenseTable } from './suspenseTable';

export const Table = async (props: PageProps) => {
  unstable_noStore();

  const search = searchParamsCache.parse(props.searchParams);

  void api.authenticated.agency.campaigns.campaign.interviews.prefetch({
    id: props.params.campaign,
    interview_stage: search.interview_stage ?? undefined,
    updated_at: search.updated_at ?? undefined,
    terms_accepted: search.terms_accepted ?? undefined,
  });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<Error />}>
        <Suspense
          fallback={
            <>
              <Loading />
            </>
          }
        >
          <SuspenseTable />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

const Error = () => {
  return (
    <div className='mx-auto flex h-[40vh] w-full max-w-3xl flex-col items-center justify-center gap-3'>
      <TvMinimalPlay className='h-10 w-10 text-purple-600' strokeWidth={1} />
      <div className='flex flex-col items-center justify-center gap-1'>
        <div className='text-lg font-medium'> No Interviews found </div>
      </div>
    </div>
  );
};
