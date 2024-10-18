import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { getRole } from '@/authenticated/utils/getRole';

const Layout = async (props: PropsWithChildren) => {
  const role = await getRole();
  if (role === 'user') void api.authenticated.hospital.read.prefetch();
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
