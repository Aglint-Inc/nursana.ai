'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { Content } from './Content';
import { ListProvider } from './Context';
import { Header } from './Header';

export const List = () => {
  return (
    <ListProvider>
      <Sidebar collapsible='none' className='hidden w-full flex-1 md:flex'>
        <Header />
        <Content />
      </Sidebar>
    </ListProvider>
  );
};
