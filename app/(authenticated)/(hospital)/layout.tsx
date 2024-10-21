import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

const Layout = (props: PropsWithChildren) => {
  unstable_noStore();
  void api.authenticated.hospital.read.prefetch();
  void api.authenticated.hospital.user.prefetch();
  return (
    <HydrateClient>
      <div className='flex min-h-screen flex-col items-center justify-center px-4'>
        {props.children}
      </div>
    </HydrateClient>
  );
};

export default Layout;
