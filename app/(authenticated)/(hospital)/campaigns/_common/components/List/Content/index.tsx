import { Tag } from 'lucide-react';
import { useState } from 'react';

import { useCampaigns } from '@/campaigns/hooks/useCampaigns';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import EmptyState from '@/hospital/components/EmptyState';

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

  // State to store the currently selected campaign's id
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null,
  );

  // Filter campaigns based on the search query
  const filteredCampaigns = campaigns.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  if (filteredCampaigns.length === 0)
    return (
      <EmptyState Icon={Tag} heading='No campagins found' description='' />
    );

  return (
    <div className='flex flex-col gap-2'>
      {filteredCampaigns.map((campaign) => (
        <Card
          key={campaign.id}
          {...campaign}
          selected={campaign.id === selectedCampaignId}
          onClick={() => setSelectedCampaignId(campaign.id)}
        />
      ))}
    </div>
  );
};
