import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarHeader, SidebarInput } from '@/components/ui/sidebar';

export const Header = () => {
  return (
    <SidebarHeader className='w-full gap-3.5 border-b p-4'>
      <div className='flex items-center justify-between'>
        <Title />
        <Actions />
      </div>
      <Search />
    </SidebarHeader>
  );
};

const Title = () => (
  <div className='text-base font-medium text-foreground'>Campaigns</div>
);

const Actions = () => {
  return (
    <Button variant='outline' size='icon'>
      <Plus />
    </Button>
  );
};

const Search = () => {
  return <SidebarInput placeholder='Type to search...' />;
};
