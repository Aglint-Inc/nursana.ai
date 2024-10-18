import { unstable_noStore } from 'next/cache';
import { type PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import { Header } from '@/authenticated/components/Header';
import { Navigation } from '@/authenticated/components/Navigation';
import { type Routes } from '@/authenticated/types';
import { getRole } from '@/authenticated/utils/getRole';

export default async function Layout(props: PropsWithChildren<Routes>) {
  unstable_noStore();
  void api.authenticated.role.prefetch();
  const role = await getRole();
  return (
    <HydrateClient>
      <div className='flex min-h-[calc(100vh-156px)] w-full flex-col gap-20'>
        <Header>
          <Navigation>
            <>{props.brand}</>
            <>{props.navigation}</>
          </Navigation>
        </Header>
        <main className='px-16'>
          {role === 'applicant' ? props.applicant : props.hospital}
        </main>
      </div>
    </HydrateClient>
  );
}
