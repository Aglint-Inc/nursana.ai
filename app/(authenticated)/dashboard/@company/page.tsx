import HospitalHomePage from './_common/components';
import DashboardHeader from './_common/components/Header';

export default function Page() {
  return (
    <>
      <DashboardHeader />
      <main className='pt-16'>
        <HospitalHomePage />
      </main>
    </>
  );
}
