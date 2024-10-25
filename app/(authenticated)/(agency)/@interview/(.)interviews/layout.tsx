import type { PropsWithChildren } from 'react';

import { Drawer } from '@/agency/components/Drawer';

const Layout = (props: PropsWithChildren) => {
  return <Drawer>{props.children}</Drawer>;
};

export default Layout;
