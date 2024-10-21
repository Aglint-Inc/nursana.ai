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
  });
  return (
    <React.Suspense fallback={<Skeleton />}>
      <DataTable
        columns={columns}
        data={data}
        filterFields={filterFields}
        defaultColumnFilters={Object.entries(search)
          .map(([key, value]) => ({
            id: key,
            value,
          }))
          .filter(({ value }) => value ?? undefined)}
      />
    </React.Suspense>
  );
};
