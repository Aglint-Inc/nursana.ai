'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { Content } from './Content';
import { NaivgationProvider } from './Context';
import { Header } from './Header';

export const Navigation = (props: Parameters<typeof NaivgationProvider>[0]) => {
  return (
    <NaivgationProvider {...props}>
      <Sidebar collapsible='none' className='hidden w-full flex-1 md:flex'>
        <Header />
        <Content />
      </Sidebar>
    </NaivgationProvider>
  );
};
