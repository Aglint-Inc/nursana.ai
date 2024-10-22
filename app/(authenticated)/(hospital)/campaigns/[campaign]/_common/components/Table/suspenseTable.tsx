'use client';

import type { ColumnFiltersState } from '@tanstack/react-table';

import { useCampaignInterviews } from '@/campaign/hooks/useCampaignInterviews';
import { DataTable } from '@/campaigns/components/DataTable';
import { COLUMNS } from '@/campaigns/constants/columns';
import { useCampaignsParams } from '@/campaigns/hooks/useCampaignsParams';
import { getFilterFields } from '@/campaigns/utils/getFilterFields';

export const SuspenseTable = () => {
  const data = useCampaignInterviews();

  const { search: _search, setSearch } = useCampaignsParams();

  const { page, rows, ...search } = _search;

  const defaultColumnFilters: ColumnFiltersState = Object.entries(search)
    .map(([key, value]) => ({
      id: key,
      value,
    }))
    .filter(({ value }) => value ?? undefined);

  const filterFields = getFilterFields(data);

  return (
    <DataTable
      columns={COLUMNS}
      data={data}
      defaultColumnFilters={defaultColumnFilters}
      filterFields={filterFields}
      paginationState={{
        pageIndex: page,
        pageSize: rows,
      }}
      setSearch={setSearch}
    />
  );
};
