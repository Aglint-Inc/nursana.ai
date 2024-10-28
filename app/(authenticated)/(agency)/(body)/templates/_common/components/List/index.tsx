'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { ListProvider } from './Context';
import { Header } from './Header';
import { AddTemplateDialog } from './Header/addTempate/AddTemplateDialog';
import { ActionProvider } from './Header/addTempate/Context';
import { TemplateList } from './TemplateList';

export const List = () => {
  return (
    <Sidebar collapsible='none' className='hidden w-full flex-1 md:flex'>
      <ListProvider>
        <ActionProvider>
          <Header />
          <AddTemplateDialog />
        </ActionProvider>
        <TemplateList />
      </ListProvider>
    </Sidebar>
  );
};
