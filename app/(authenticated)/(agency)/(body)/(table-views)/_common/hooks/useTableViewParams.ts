import { useQueryStates } from 'nuqs';

import { searchParamsParser } from '@/table-views/constants/search-params';

export const useTableViewParams = () => {
  const [search, setSearch] = useQueryStates(searchParamsParser);
  return {
    search,
    setSearch,
  };
};
