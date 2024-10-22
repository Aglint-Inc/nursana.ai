import { unstable_noStore } from 'next/cache';
import { api, HydrateClient } from 'trpc/server';

import type { PageProps } from '@/campaign/types';

import { DataTable } from './data-table';
import { parseSearchParams } from './utils';

export const Table = async (props: PageProps) => {
  unstable_noStore();

  const search = parseSearchParams(props);

  void api.authenticated.hospital.campaigns.campaign.interviews.prefetch({
    id: props.params.campaign,
    interview_stage: search.interview_stage ?? undefined,
    updated_at: search.updated_at ?? undefined,
    terms_accepted: search.terms_accepted ?? undefined,
  });

  return (
    <HydrateClient>
      <DataTable />
    </HydrateClient>
  );
};
