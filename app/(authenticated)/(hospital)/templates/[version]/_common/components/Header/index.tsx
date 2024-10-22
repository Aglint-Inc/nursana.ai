import { SidebarTrigger } from '@/components/ui/sidebar';

import { Details } from './Details';
import { Title } from './Title';

export const Header = () => {
  return (
    <div className='flex w-full flex-row items-center justify-between'>
      <Left />
      <Right />
    </div>
  );
};

const Left = () => {
  return (
    <section className='flex flex-row items-center gap-2'>
      <SidebarTrigger />
      <Title />
    </section>
  );
};

const Right = () => {
  return (
    <section className='flex flex-row items-center gap-2'>
      <Details />
    </section>
  );
};
