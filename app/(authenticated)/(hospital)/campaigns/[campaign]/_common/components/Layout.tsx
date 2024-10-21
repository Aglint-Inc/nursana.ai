import { SidebarTrigger } from '@/components/ui/sidebar';
import { Details } from './Details';
import { Title } from './Title';
import type { PropsWithChildren } from 'react';

export const Layout = (props: PropsWithChildren) => {
  return (
    <div className='flex flex-col p-4'>
      <div className='flex flex-row justify-between gap-2'>
        <div className='flex flex-col items-center gap-2'>
          <SidebarTrigger />
          <Title />
        </div>
        <Details />
      </div>
      {props.children}
    </div>
  );
};
