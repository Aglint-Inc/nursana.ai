import { unstable_noStore } from 'next/cache';
import { api, HydrateClient } from 'trpc/server';

function Layout({ children }: { children: React.ReactNode }) {
  unstable_noStore();
  void api.user.get_data.prefetch();
  return <HydrateClient>{children}</HydrateClient>;
}

export default Layout;
