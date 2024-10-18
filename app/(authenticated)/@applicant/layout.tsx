import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { getRole } from '@/authenticated/utils/getRole';

const Layout = async (props: PropsWithChildren) => {
  unstable_noStore();
  const role = await getRole();
  if (role === 'applicant') void api.authenticated.applicant.read.prefetch();
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
