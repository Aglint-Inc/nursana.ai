'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { Header } from './Header';
import { TemplateList } from './TemplateList';

export const List = () => {
  return (
    <Sidebar collapsible='none' className='hidden w-full flex-1 md:flex'>
      <Header />
      <TemplateList />
    </Sidebar>
  );
};
