'use client';

import type { ColumnFiltersState } from '@tanstack/react-table';

import { DataTable } from '@/campaigns/components/DataTable';
import { COLUMNS } from '@/campaigns/constants/columns';
import { useCampaignsParams } from '@/campaigns/hooks/useCampaignsParams';
import { useInterviews } from '@/campaigns/hooks/useInterviews';
import { getFilterFields } from '@/campaigns/utils/getFilterFields';

import { ApplicantDetailProvider } from '../DataTable/applicantDetails/Context';

export const SuspenseTable = () => {
  const data = useInterviews();

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
    <>
      <ApplicantDetailProvider>
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
      </ApplicantDetailProvider>
    </>
  );
};
