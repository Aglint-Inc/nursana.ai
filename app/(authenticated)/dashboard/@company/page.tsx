import { unstable_noStore } from 'next/cache';
import { api } from 'trpc/server';

import HospitalHomePage from './_common/components';
import DashboardHeader from './_common/components/Header';

export default function Page() {
  unstable_noStore();
  void api.hospital.get_data.prefetch();
  return (
    <>
      <DashboardHeader />
      <main className='pt-16'>
        <HospitalHomePage />
      </main>
    </>
  );
}
