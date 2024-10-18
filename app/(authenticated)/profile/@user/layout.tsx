import { type PropsWithChildren } from 'react';
import { api } from 'trpc/server';

function Layout({ children }: { children: PropsWithChildren }) {
  void api.user.get_data.prefetch();

  return children;
}

export default Layout;
