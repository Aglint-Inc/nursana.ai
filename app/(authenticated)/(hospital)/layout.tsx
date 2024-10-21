import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { Routes } from '@/hospital/types';

const Layout = (props: PropsWithChildren<Routes>) => {
  unstable_noStore();
  void api.authenticated.hospital.read.prefetch();
  void api.authenticated.hospital.user.prefetch();
  return (
    <HydrateClient>
      <SidebarProvider>
        <AppSidebar secondarySidebar={props.subNavigation} />
        {props.children}
      </SidebarProvider>
    </HydrateClient>
  );
};

export default Layout;
