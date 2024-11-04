import { useQueryStates } from 'nuqs';

import { searchParamsParser } from '@/campaigns/constants/search-params';

export const useInterviewParams = () => {
  const [search, setSearch] = useQueryStates(searchParamsParser);
  return {
    search,
    setSearch,
  };
};
