import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';
import MatrixFilterProvider from './_common/context/matrixFilterProvider';
import MatrixFilter from './_common/components/filters';

const Layout = async (props: PropsWithChildren) => {
  unstable_noStore();
  api.authenticated.agency.campaigns.read.prefetch();
  api.authenticated.agency.campaigns.interviews.prefetch({
    interview_stage: undefined,
    updated_at: undefined,
    terms_accepted: undefined,
  });
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
