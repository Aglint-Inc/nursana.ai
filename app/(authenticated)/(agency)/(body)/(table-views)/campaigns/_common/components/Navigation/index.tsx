'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { Content } from './Content';
import { NavigationProvider } from './Context';
import { Header } from './Header';

export const Navigation = () => {
  return (
    <Sidebar collapsible='none' className='h-screen'>
      <NavigationProvider>
        <Header />
        <Content />
      </NavigationProvider>
    </Sidebar>
  );
};
