import * as React from 'react';
import { api } from 'trpc/server';

import { columns } from './columns';
import { filterFields } from './constants';
import { DataTable } from './data-table';
import { searchParamsCache } from './search-params';
import { Skeleton } from './skeleton';

type Props = {
  params: { campaign: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const Table = async (props: Props) => {
  const search = searchParamsCache.parse(props.searchParams);
  const data = await api.authenticated.hospital.campaigns.campaign.interviews({
    id: props.params.campaign,
    email: search.name ?? undefined,
    interview_stage: search.interview_stage ?? undefined,
    job_title: search.job_title ?? undefined,
    name: search.name ?? undefined,
    size: search.size ?? undefined,
    start: search.start ?? undefined,
    updated_at: search.updated_at ?? undefined,
  });
  const { size: _size, start: _start, ...defaultColumnFilters } = search;
  return (
    <React.Suspense fallback={<Skeleton />}>
      <DataTable
        columns={columns}
        data={data}
        filterFields={filterFields}
        defaultColumnFilters={Object.entries(defaultColumnFilters)
          .map(([key, value]) => ({
            id: key,
            value,
          }))
          .filter(({ value }) => value ?? undefined)}
      />
    </React.Suspense>
  );
};
