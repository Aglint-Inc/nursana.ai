import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

const Layout = (props: PropsWithChildren) => {
  void api.authenticated.hospital.read.prefetch();
  void api.authenticated.hospital.user.prefetch();
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
