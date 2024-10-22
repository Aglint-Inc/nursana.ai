import * as React from 'react';

import { Skeleton } from './skeleton';
import { SuspenseTable } from './suspense-table';

type Props = {
  params: { campaign: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const Table = async (props: Props) => {
  // const search = searchParamsCache.parse(props.searchParams);
  // const data = await api.authenticated.hospital.campaigns.campaign.interviews({
  //   id: props.params.campaign,
  //   email: search.name ?? undefined,
  //   interview_stage: search.interview_stage ?? undefined,
  //   job_title: search.job_title ?? undefined,
  //   name: search.name ?? undefined,
  //   size: search.size ?? undefined,
  //   start: search.start ?? undefined,
  //   updated_at: search.updated_at ?? undefined,
  // });
  // const { size: _size, start: _start, ...defaultColumnFilters } = search;
  return (
    <React.Suspense fallback={<Skeleton />}>
      <SuspenseTable {...props} />
    </React.Suspense>
  );
};
