import type { PropsWithChildren } from 'react';

import { Modal } from '@/agency/components/Modal';

const Layout = (props: PropsWithChildren) => {
  return <Modal>{props.children}</Modal>;
};

export default Layout;
