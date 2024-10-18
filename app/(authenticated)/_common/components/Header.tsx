'use client';

import type { PropsWithChildren } from 'react';

import { SignOut } from './SignOut';

export const Header = (props: PropsWithChildren) => {
  return (
    <header className='dark:bg-blackshadow-sm mt-8 flex flex-row items-center bg-white px-16 dark:bg-black'>
      {props.children}
      <SignOut />
    </header>
  );
};
