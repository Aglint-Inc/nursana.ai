'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { Content } from './Content';
import { NavigationProvider } from './Context';
import { Header } from './Header';

export const Navigation = () => {
  return (
    <NavigationProvider>
      <Sidebar collapsible='none' className='hidden w-full flex-1 md:flex'>
        <Header />
        <Content />
      </Sidebar>
    </NavigationProvider>
  );
};
