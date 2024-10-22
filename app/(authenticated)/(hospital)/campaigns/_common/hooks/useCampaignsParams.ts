import { useQueryStates } from 'nuqs';

import { searchParamsParser } from '@/campaigns/constants/search-params';

export const useCampaignsParams = () => {
  const [search, setSearch] = useQueryStates(searchParamsParser);
  return {
    search,
    setSearch,
  };
};
