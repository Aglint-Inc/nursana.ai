import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { getRole } from '@/authenticated/utils/getRole';

const Layout = async (
  props: PropsWithChildren<{ params: { campaign: string } }>,
) => {
  unstable_noStore();
  const role = await getRole();
  if (role === 'user')
    void api.authenticated.hospital.campaigns.campaign.read.prefetch({
      id: props.params.campaign,
    });
  return (
    <HydrateClient>
      <div className='flex flex-grow flex-row gap-2'>{props.children}</div>
    </HydrateClient>
  );
};

export default Layout;
