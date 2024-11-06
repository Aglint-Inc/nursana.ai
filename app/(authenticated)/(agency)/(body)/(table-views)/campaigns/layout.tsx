import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

const Layout = async (props: PropsWithChildren) => {
  unstable_noStore();
  void api.authenticated.agency.campaigns.read.prefetch();
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
