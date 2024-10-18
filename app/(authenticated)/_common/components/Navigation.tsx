import type { PropsWithChildren } from 'react';

export const Navigation = (props: PropsWithChildren) => {
  return (
    <nav className='mr-auto flex flex-grow flex-row items-center justify-between px-4'>
      {props.children}
    </nav>
  );
};
