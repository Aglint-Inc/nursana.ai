import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { SidebarProvider } from '@/components/ui/sidebar';
import type { Routes } from '@/hospital/types';

const Layout = (props: PropsWithChildren<Routes>) => {
  unstable_noStore();
  void api.authenticated.hospital.read.prefetch();
  void api.authenticated.hospital.user.prefetch();
  return (
    <HydrateClient>
      <SidebarProvider
        style={
          {
            '--sidebar-width': '350px',
          } as React.CSSProperties
        }
      >
        {props.subNavigation}
        {props.children}
      </SidebarProvider>
    </HydrateClient>
  );
};

export default Layout;
