import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { getRole } from '@/authenticated/utils/getRole';

const Layout = async (props: PropsWithChildren) => {
  unstable_noStore();
  const role = await getRole();
  if (role === 'user') {
    void api.authenticated.hospital.read.prefetch();
    void api.authenticated.hospital.user.prefetch();
  }
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
