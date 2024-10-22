import { useCampaigns } from '@/campaigns/hooks/useCampaigns';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

import { Card } from './Card';

export const Content = () => {
  const campaigns = useCampaigns();
  return (
    <SidebarContent>
      <SidebarGroup className='px-0'>
        <SidebarGroupContent>
          {campaigns.map((campaign) => (
            <Card key={campaign.id} {...campaign} />
          ))}
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
