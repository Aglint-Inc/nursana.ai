import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

const Layout = async (
  props: PropsWithChildren<{ params: { campaign: string } }>,
) => {
  unstable_noStore();
  void api.authenticated.agency.campaigns.campaign.read.prefetch({
    id: props.params.campaign,
  });
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
