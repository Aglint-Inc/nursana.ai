import { useQueryStates } from 'nuqs';

import { searchParamsParser } from '../components/Table/search-params';

export const useCampaignParams = () => {
  const [search, setSearch] = useQueryStates(searchParamsParser);
  return {
    search,
    setSearch,
  };
};
