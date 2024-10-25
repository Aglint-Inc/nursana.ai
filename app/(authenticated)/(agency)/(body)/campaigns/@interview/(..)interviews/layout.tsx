import type { PropsWithChildren } from 'react';

import { Drawer } from '@/agency/components/Drawer';
import { SidebarInset } from '@/components/ui/sidebar';
import { List } from '@/interview/components/List';

const Layout = (props: PropsWithChildren) => {
  return (
    <Drawer>
      <div className='flex h-full w-full flex-row px-2 pb-4'>
        <div className='flex basis-1/6'>
          <List intercepted />
        </div>
        <SidebarInset className='flex min-h-0 basis-1'>
          {props.children}
        </SidebarInset>
      </div>
    </Drawer>
  );
};

export default Layout;
