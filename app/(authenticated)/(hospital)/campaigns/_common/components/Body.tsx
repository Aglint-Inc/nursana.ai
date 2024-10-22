'use client';
import type { PropsWithChildren } from 'react';

import { SidebarTrigger } from '@/components/ui/sidebar';

export const Body = (props: PropsWithChildren) => {
  return (
    <div className='flex w-full flex-col gap-2 p-4'>
      <Header />
      {props.children}
    </div>
  );
};

const Header = () => {
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
      <></>
    </section>
  );
};

const Title = () => {
  return (
    <h1 className='flex flex-row items-center gap-2 text-xl font-bold'>
      All Campaigns
    </h1>
  );
};
