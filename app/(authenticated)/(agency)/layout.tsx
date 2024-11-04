import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { AppSidebar } from '@/agency/components/AppSidebar';
import { AgencyEditProvider } from '@/agency/hooks/useAgencyEdit';
import type { PageProps } from '@/agency/types';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const Layout = (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();
  void api.authenticated.agency.user.prefetch();
  return (
    <HydrateClient>
      <AgencyEditProvider>
        <SidebarProvider
          style={
            {
              '--sidebar-width': '350px',
            } as React.CSSProperties
          }
        >
          <AppSidebar secondarySidebar={props.navigation} />
          <SidebarInset className='h-[100vh] overflow-y-scroll'>
            {props.children}
          </SidebarInset>
        </SidebarProvider>
      </AgencyEditProvider>
    </HydrateClient>
  );
};

export default Layout;
