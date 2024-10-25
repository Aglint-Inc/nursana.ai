import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import type { PageProps } from '@/interview/types';

export const Layout = async (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();
  void api.authenticated.agency.interviews.interview.read.prefetch({
    id: props.params.interview,
  });
  return <HydrateClient>{props.children}</HydrateClient>;
};
