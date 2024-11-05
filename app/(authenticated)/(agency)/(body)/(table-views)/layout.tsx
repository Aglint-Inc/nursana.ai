import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { HydrateClient } from 'trpc/server';

import type { PageProps } from '@/table-views/types';

const Layout = async (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();
  return (
    <HydrateClient>
      {props.children}
      <div className='hidden'>{props.interviewDrawer}</div>
    </HydrateClient>
  );
};

export default Layout;
