'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { Content } from './Content';
import { Header } from './Header';

export const List = () => {
  return (
    <Sidebar collapsible='none' className='hidden w-full flex-1 md:flex'>
      <Header />
      <Content />
    </Sidebar>
  );
};
