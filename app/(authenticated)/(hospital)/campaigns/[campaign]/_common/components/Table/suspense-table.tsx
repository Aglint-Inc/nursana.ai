'use client';

import { useCampaignInterviews } from '@/campaign/hooks/useCampaignInterviews';
import { useCampaignParams } from '@/campaign/hooks/useCampaignParams';

import { columns } from './columns';
import { filterFields } from './constants';
import { DataTable } from './data-table';

export const SuspenseTable = () => {
  const data = useCampaignInterviews();
  const {
    search: { size: _size, start: _start, ...defaultColumnFilters },
  } = useCampaignParams();
  return (
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
  );
};
