import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { HydrateClient } from 'trpc/server';

const Layout = (props: PropsWithChildren) => {
  unstable_noStore();
  // void api.authenticated.role.prefetch();
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
