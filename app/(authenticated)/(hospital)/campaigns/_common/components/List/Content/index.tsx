import { useCampaigns } from '@/campaigns/hooks/useCampaigns';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

import { useList } from '../Context';
import { Card } from './Card';

export const Content = () => {
  return (
    <SidebarContent>
      <SidebarGroup className='px-0'>
        <SidebarGroupContent>
          <List />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

const List = () => {
  const { search } = useList();
  const campaigns = useCampaigns();
  const filteredCampaigns = campaigns.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );
  if (filteredCampaigns.length === 0)
    return <div className='w-full p-4'>No Campaigns found</div>;
  return (
    <>
      {filteredCampaigns.map((campaign) => (
        <Card key={campaign.id} {...campaign} />
      ))}
    </>
  );
};
