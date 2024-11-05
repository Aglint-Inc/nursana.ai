import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import MatrixFilter from './_common/components/filters';
import MatrixFilterProvider from './_common/context/matrixFilterProvider';

const Layout = async (props: PropsWithChildren) => {
  unstable_noStore();
  api.authenticated.agency.campaigns.read.prefetch();
  api.authenticated.agency.interviews.read.prefetch({});
  return (
    <MatrixFilterProvider>
      <div className='flex flex-col'>
        <MatrixFilter />
        <HydrateClient>{props.children}</HydrateClient>;
      </div>
    </MatrixFilterProvider>
  );
};

export default Layout;
