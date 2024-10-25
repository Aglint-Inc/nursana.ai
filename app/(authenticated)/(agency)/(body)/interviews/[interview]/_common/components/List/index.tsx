'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { Content } from './Content';
import { ListProvider } from './Context';
import { Header } from './Header';

export const List = (props: Parameters<typeof ListProvider>[0]) => {
  return (
    <ListProvider {...props}>
      <Sidebar collapsible='none' className='hidden w-full flex-1 md:flex'>
        <Header />
        <Content />
      </Sidebar>
    </ListProvider>
  );
};
