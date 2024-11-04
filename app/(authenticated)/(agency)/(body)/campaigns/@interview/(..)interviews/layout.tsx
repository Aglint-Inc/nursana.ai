import { type PropsWithChildren, Suspense } from 'react';

import { Drawer } from '@/agency/components/Drawer';
import { NavigationLoading } from '@/agency/components/NavigationLoading';
import { SidebarInset } from '@/components/ui/sidebar';
import { Navigation } from '@/interview/components/Navigation';

const Layout = (props: PropsWithChildren) => {
  return (
    <Drawer>
      <div className='flex h-full w-full flex-row rounded-full'>
        <div className='flex basis-1/6'>
          <Suspense fallback={<NavigationLoading />}>
            <Navigation intercepted />
          </Suspense>
        </div>
        <SidebarInset className='flex min-h-0 basis-1 overflow-auto'>
          {props.children}
        </SidebarInset>
      </div>
    </Drawer>
  );
};

export default Layout;
