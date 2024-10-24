import { Dashboard } from './_common/components/content/statics';
import { Header } from './_common/components/Header';

const Page = () => {
  return (
    <div className='container flex w-full flex-col justify-center'>
      <Header />
      <Dashboard />
    </div>
  );
};

export default Page;
