import type { PropsWithChildren } from 'react';

import { Drawer } from '@/agency/components/Drawer';
import { List } from '@/interview/components/List';

const Layout = (props: PropsWithChildren) => {
  return (
    <Drawer>
      <div className='flex w-full flex-row'>
        <div className='flex basis-1/6'>
          <List />
        </div>
        <div className='flex basis-1'>{props.children}</div>
      </div>
    </Drawer>
  );
};

export default Layout;
