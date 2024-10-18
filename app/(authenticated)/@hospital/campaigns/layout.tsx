import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { getRole } from '@/authenticated/utils/getRole';
import type { Routes } from '@/campaigns/types';

const Layout = async (props: PropsWithChildren<Routes>) => {
  unstable_noStore();
  const role = await getRole();
  if (role === 'user')
    void api.authenticated.hospital.campaigns.read.prefetch();
  return (
    <HydrateClient>
      <div className='flex flex-grow flex-row gap-2'>
        {props.list}
        {props.view}
      </div>
    </HydrateClient>
  );
};

export default Layout;
