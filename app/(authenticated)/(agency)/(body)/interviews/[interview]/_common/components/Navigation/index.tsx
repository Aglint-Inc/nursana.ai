'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { Content } from './Content';
import { NaivgationProvider } from './Context';
import { Header } from './Header';

export const Navigation = (props: Parameters<typeof NaivgationProvider>[0]) => {
  return (
    <Sidebar collapsible='none' className='h-screen'>
      <NaivgationProvider {...props}>
        <Header />
        <Content />
      </NaivgationProvider>
    </Sidebar>
  );
};
