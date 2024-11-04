import { type PropsWithChildren, Suspense } from 'react';

import { Drawer } from '@/agency/components/Drawer';
import { NavigationLoading } from '@/agency/components/NavigationLoading';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Navigation } from '@/interview/components/Navigation';

const Layout = (props: PropsWithChildren) => {
  return (
    <Drawer>
      <SidebarProvider>
        <div className='flex basis-1/6'>
          <Suspense fallback={<NavigationLoading />}>
            <Navigation intercepted />
          </Suspense>
        </div>
        <SidebarInset className='flex min-h-0 basis-1'>
          {props.children}
        </SidebarInset>
      </SidebarProvider>
    </Drawer>
  );
};

export default Layout;
