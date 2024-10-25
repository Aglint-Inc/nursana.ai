import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { AgencyEditProvider } from '@/agency/hooks/useAgencyEdit';
import type { PageProps } from '@/agency/types';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Layout = (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();
  void api.authenticated.agency.read.prefetch();
  void api.authenticated.agency.user.prefetch();
  void api.authenticated.agency.templates.read.prefetch();
  void api.authenticated.agency.read.prefetch();
  return (
    <HydrateClient>
      <AgencyEditProvider>
        <SidebarProvider
          style={
            {
              '--sidebar-width': '450px',
            } as React.CSSProperties
          }
        >
          <AppSidebar secondarySidebar={props.subNavigation} />
          {props.children}
        </SidebarProvider>
      </AgencyEditProvider>
    </HydrateClient>
  );
};

export default Layout;
