'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { Content } from './Content';
import { NaivgationProvider } from './Context';

export const Navigation = (props: Parameters<typeof NaivgationProvider>[0]) => {
  return (
    <Sidebar collapsible='none' className='h-screen'>
      <NaivgationProvider {...props}>
        <Content />
      </NaivgationProvider>
    </Sidebar>
  );
};
