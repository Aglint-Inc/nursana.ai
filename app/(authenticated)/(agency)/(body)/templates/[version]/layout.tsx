import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { SidebarInset } from '@/components/ui/sidebar';

import { Body } from './_common/components/Body';
import MatrixFilterProvider from './_common/context/matrixFilterProvider';

const Layout = async (props: PropsWithChildren) => {
  unstable_noStore();
  api.authenticated.agency.campaigns.read.prefetch();
  api.authenticated.agency.interviews.read.prefetch({});
  return (
    <SidebarInset>
      <Body>
        <MatrixFilterProvider>
          <HydrateClient>{props.children}</HydrateClient>
        </MatrixFilterProvider>
      </Body>
    </SidebarInset>
  );
};

export default Layout;
