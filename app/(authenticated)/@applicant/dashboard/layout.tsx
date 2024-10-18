import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

const Layout = async (props: PropsWithChildren) => {
  void api.authenticated.applicant.read.prefetch();
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
