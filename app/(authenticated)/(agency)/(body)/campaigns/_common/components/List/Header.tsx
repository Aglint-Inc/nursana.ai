import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarHeader, SidebarInput } from '@/components/ui/sidebar';

import { useList } from './Context';

export const Header = () => {
  return (
    <SidebarHeader className='w-full gap-3.5 border-b p-4'>
      <div className='flex items-center justify-between'>
        <Title />
        {/* <Actions /> */}
      </div>
      <Search />
    </SidebarHeader>
  );
};

const Title = () => (
  <div className='text-base font-medium text-foreground'>Campaigns</div>
);

const _Actions = () => {
  return (
    <Button variant='outline' size='icon'>
      <Plus />
    </Button>
  );
};

const Search = () => {
  const { search, setSearch } = useList();
  return (
    <SidebarInput
      placeholder='Type to search...'
      type='text'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};