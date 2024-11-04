'use client';

import type { ColumnFiltersState } from '@tanstack/react-table';

import { useCampaignInterviews } from '@/campaign/hooks/useCampaignInterviews';
import { DataTable } from '@/table-views/components/DataTable';
import { COLUMNS } from '@/table-views/constants/columns';
import { useTableViewParams } from '@/table-views/hooks/useTableViewParams';
import { getFilterFields } from '@/table-views/utils/getFilterFields';

export const SuspenseTable = () => {
  const data = useCampaignInterviews();

  const { search: _search, setSearch } = useTableViewParams();

  const { page, rows, ...search } = _search;

  const defaultColumnFilters: ColumnFiltersState = Object.entries(search)
    .map(([key, value]) => ({
      id: key,
      value,
    }))
    .filter(({ value }) => value ?? undefined);

  const filterFields = getFilterFields();

  return (
    <>
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
    </>
  );
};
