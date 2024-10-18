import type { PropsWithChildren } from 'react';
import { HydrateClient } from 'trpc/server';

const Layout = async (props: PropsWithChildren) => {
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
