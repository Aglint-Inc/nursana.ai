'use client';

import type { PropsWithChildren } from 'react';

import { SignOut } from './SignOut';

export const Header = (props: PropsWithChildren) => {
  return (
    <header className='dark:bg-blackshadow-sm flex flex-row items-center bg-white px-4 py-2 dark:bg-black'>
      {props.children}
      <SignOut />
    </header>
  );
};
