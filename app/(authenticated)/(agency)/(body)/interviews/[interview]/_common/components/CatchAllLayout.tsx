import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { HydrateClient } from 'trpc/server';

import type { PageProps } from '@/interview/types';
import { getInterviewCatchAllPath } from '@/interview/utils/getInterviewCatchAllPath';

export const CatchAllLayout = (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();
  const path = getInterviewCatchAllPath(props.pathname);
  switch (path) {
    case 'resume':
      break;
    case 'feedback':
      break;
    case 'transcript':
      break;
  }
  return <HydrateClient>{props.children}</HydrateClient>;
};
