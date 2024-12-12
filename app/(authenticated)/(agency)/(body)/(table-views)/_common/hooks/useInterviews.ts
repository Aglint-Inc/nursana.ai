// import { useDeferredValue } from 'react';
import { api } from 'trpc/client';

import type { Read } from '@/table-views/api/read';

import { useTableViewParams } from './useTableViewParams';

export const useInterviews = (): Read['output'] => {
  const { search: _search } = useTableViewParams();
  // const search = useDeferredValue(_search);
  return api.authenticated.agency.interviews.read.useSuspenseQuery(
    {},
    { refetchOnMount: false },
  )[0];
};
