import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarHeader, SidebarInput } from '@/components/ui/sidebar';
import { useList } from '@/templates/components/List/Context';

import { AddTemplateDialog } from './addTempate/AddTemplateDialog';
import { ActionProvider, useAction } from './addTempate/Context';

export const Header = () => {
  return (
    <SidebarHeader className='w-full gap-3.5 border-b p-4'>
      <div className='flex items-center justify-between'>
        <Title />
        <ActionProvider>
          <Actions />
          <AddTemplateDialog />
        </ActionProvider>
      </div>
      <Search />
    </SidebarHeader>
  );
};

const Title = () => (
  <div className='text-base font-medium text-foreground'>Templates</div>
);

const Actions = () => {
  const { setIsOpen } = useAction();
  return (
    <Button variant='outline' size='icon' onClick={() => setIsOpen(true)}>
      <Plus />
    </Button>
  );
};

const Search = () => {
  const { search, setSearch } = useList();
  return (
    <SidebarInput
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder='Type to search...'
    />
  );
};
