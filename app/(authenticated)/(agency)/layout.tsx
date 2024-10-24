import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import type { Routes } from '@/agency/types';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

import { HospitalEditProvider } from './_common/hooks/useHospitalEdit';

const Layout = (props: PropsWithChildren<Routes>) => {
  unstable_noStore();
  void api.authenticated.hospital.read.prefetch();
  void api.authenticated.hospital.user.prefetch();
  void api.authenticated.hospital.templates.read.prefetch();
  void api.authenticated.hospital.read.prefetch();
  return (
    <HydrateClient>
      <HospitalEditProvider>
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
      </HospitalEditProvider>
    </HydrateClient>
  );
};

export default Layout;
