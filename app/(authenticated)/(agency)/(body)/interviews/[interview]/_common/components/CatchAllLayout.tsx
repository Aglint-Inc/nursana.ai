import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import type { PageProps } from '@/interview/types';
import { getInterviewCatchAllPath } from '@/interview/utils/getInterviewCatchAllPath';

export const CatchAllLayout = (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();
  const path = getInterviewCatchAllPath(props.pathname);
  switch (path) {
    case 'resume':
      void api.authenticated.agency.interviews.interview.read.prefetch({
        id: props.params.interview,
      });
      break;
    case 'review':
      void api.authenticated.agency.interviews.interview.read.prefetch({
        id: props.params.interview,
      });
      break;
    case 'transcript':
      void api.authenticated.agency.interviews.interview.read.prefetch({
        id: props.params.interview,
      });
      break;
  }
  return <HydrateClient>{props.children}</HydrateClient>;
};
