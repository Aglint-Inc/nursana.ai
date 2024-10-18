import { type PropsWithChildren } from 'react';
import { HydrateClient } from 'trpc/server';

import { type Routes } from '@/authenticated/types';
import { getRole } from '@/authenticated/utils/getRole';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default async function Layout(props: PropsWithChildren<Routes>) {
  const role = await getRole();
  return (
    <HydrateClient>
      <Navbar />
      <div className='flex min-h-[calc(100vh-156px)] w-full flex-col gap-20'>
        {role === 'applicant' ? props.applicant : props.hospital}
      </div>
      <Footer />
    </HydrateClient>
  );
}
