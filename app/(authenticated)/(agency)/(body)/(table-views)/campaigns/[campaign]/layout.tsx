import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import type { PageProps } from '@/campaign/types';

const Layout = async (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();
  void api.authenticated.agency.campaigns.campaign.read.prefetch({
    id: props.params.campaign,
  });
  void api.authenticated.agency.interviews.read.prefetch({
    campaign_id: props.params.campaign,
  });
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
