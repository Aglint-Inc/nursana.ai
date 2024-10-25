import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { Body } from './_common/components/Body';
import { SidebarInset } from '@/components/ui/sidebar';
import MatrixFilterProvider from '@/reports/context/matrixFilterProvider';
import MatrixFilter from '@/reports/components/filters';

const Layout = async (props: PropsWithChildren) => {
  unstable_noStore();
  api.authenticated.agency.campaigns.read.prefetch();
  api.authenticated.agency.campaigns.interviews.prefetch({
    interview_stage: undefined,
    updated_at: undefined,
    terms_accepted: undefined,
  });
  return (
    <SidebarInset>
      <Body>
        <MatrixFilterProvider>
          <HydrateClient>{props.children}</HydrateClient>;
        </MatrixFilterProvider>
      </Body>
    </SidebarInset>
  );
};

export default Layout;
