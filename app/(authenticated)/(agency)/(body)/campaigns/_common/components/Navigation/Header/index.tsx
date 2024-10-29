import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarHeader, SidebarInput } from '@/components/ui/sidebar';

import { useNavigation } from '../Context';
import { AddCampaignSlider } from './AddCampaign/AddCompaignSlider';
import { ActionProvider, useAction } from './AddCampaign/Context';

export const Header = () => {
  return (
    <SidebarHeader className='w-full gap-3.5 border-b p-4'>
      <div className='flex items-center justify-between'>
        <Title />
        <ActionProvider>
          <Actions />
          <AddCampaignSlider />
        </ActionProvider>
      </div>
      <Search />
    </SidebarHeader>
  );
};

const Title = () => (
  <div className='text-base font-medium text-foreground'>Campaigns</div>
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
  const { search, setSearch } = useNavigation();
  return (
    <SidebarInput
      placeholder='Type to search...'
      type='text'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
