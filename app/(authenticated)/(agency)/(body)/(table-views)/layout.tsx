import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import type { PageProps } from '@/table-views/types';

const Layout = async (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();
  void api.authenticated.agency.interviews.read.prefetch({});
  return (
    <HydrateClient>
      {props.children}
      <div className='hidden'>{props.interviewDrawer}</div>
    </HydrateClient>
  );
};

export default Layout;
