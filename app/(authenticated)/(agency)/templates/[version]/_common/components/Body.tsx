'use client';
import type { PropsWithChildren } from 'react';

import { Header } from './Header';

export const Body = (props: PropsWithChildren) => {
  return (
    <div className='flex w-full flex-col p-4'>
      <Header />
      {props.children}
    </div>
  );
};
