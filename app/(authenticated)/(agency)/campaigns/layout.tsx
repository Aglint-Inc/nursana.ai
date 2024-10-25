import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { type PageProps } from '@/campaign/types';

const Layout = async (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();
  void api.authenticated.agency.campaigns.read.prefetch();
  return (
    <HydrateClient>
      {props.children}
      <div className='w-0'>{props.interview}</div>
    </HydrateClient>
  );
};

export default Layout;
