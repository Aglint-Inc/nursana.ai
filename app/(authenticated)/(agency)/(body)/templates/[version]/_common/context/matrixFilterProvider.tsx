'use client';
import { useParams } from 'next/navigation';
import { createContext, type ReactNode, useContext, useState } from 'react';

// import { useAgency } from '@/agency/hooks/useAgency';
import { useCampaigns } from '@/campaigns/hooks/useCampaigns';
// import { useInterviews } from '@/campaigns/hooks/useInterviews';

import { type MatrixFilter, type MatrixFilterContextInterface } from './types';
import { useInterviews } from '@/table-views/hooks/useInterviews';
const InitialMatrixFilterContext: MatrixFilterContextInterface = {
  filtersOptions: {
    campaign: [],
    interview: [],
    dateRange: [
      { id: 'today', label: 'Today' },
      { id: 'yesterday', label: 'Yesterday' },
      { id: 'thisWeek', label: 'This Week' },
      { id: 'thisMonth', label: 'This Month' },
      { id: 'thisQuarter', label: 'This Quarter' },
      { id: 'thisYear', label: 'This Year' },
      { id: 'yearToDate', label: 'Year to Date' },
      { id: 'custom', label: 'Custom Range' },
    ],
  },
  filters: {
    campaign: undefined,
    interview: undefined,
    dateRange: undefined,
  },
  handleSetFilter: (filter: {
    [key in keyof MatrixFilter]?: MatrixFilter[key];
  }) => {
    filter;
  },
};

const MatrixFilterContext = createContext(InitialMatrixFilterContext);

export default function MatrixFilterProvider({
  children,
}: {
  children: ReactNode;
}) {
  // const { id: agencyId } = useAgency();
  const campaigns = useCampaigns();
  const interviews = useInterviews();
  const templateVersion = useParams().version as string;
  const [filters, setFilters] = useState<MatrixFilter>({
    ...InitialMatrixFilterContext.filters,
    campaign: templateVersion,
  });
  const handleSetFilter: MatrixFilterContextInterface['handleSetFilter'] = (
    data,
  ) => {
    setFilters((pre) => ({ ...pre, ...data }));
  };
  return (
    <MatrixFilterContext.Provider
      value={{
        filtersOptions: {
          ...InitialMatrixFilterContext.filtersOptions,
          campaign: campaigns.map((campaign) => ({
            label: campaign.name,
            id: campaign.id,
          })),
          interview: interviews.map((interview) => ({
            label: interview.name,
            id: interview.id,
          })),
        },
        filters,
        handleSetFilter,
      }}
    >
      {children}
    </MatrixFilterContext.Provider>
  );
}

export function useMatrixFilters() {
  if (!useContext(MatrixFilterContext)) {
    throw new Error(
      'useMatrixFilters must be used within a MatrixFilterProvider',
    );
  }
  return useContext(MatrixFilterContext);
}
