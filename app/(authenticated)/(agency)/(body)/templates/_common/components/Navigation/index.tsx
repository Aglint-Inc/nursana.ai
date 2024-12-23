'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { NavigationProvider } from './Context';
import { Header } from './Header';
import { AddTemplateDialog } from './Header/addTempate/AddTemplateDialog';
import { ActionProvider } from './Header/addTempate/Context';
import { TemplateList } from './TemplateList';

export const Navigation = () => {
  return (
    <Sidebar collapsible='none' className='h-screen'>
      <NavigationProvider>
        <ActionProvider>
          <Header />
          <AddTemplateDialog />
        </ActionProvider>
        <TemplateList />
      </NavigationProvider>
    </Sidebar>
  );
};
