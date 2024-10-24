'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { ListProvider } from './Context';
import { Header } from './Header';
import { TemplateList } from './TemplateList';

export const List = () => {
  return (
    <Sidebar collapsible='none' className='hidden w-full flex-1 md:flex'>
      <ListProvider>
        <Header />
        <TemplateList />
      </ListProvider>
    </Sidebar>
  );
};
