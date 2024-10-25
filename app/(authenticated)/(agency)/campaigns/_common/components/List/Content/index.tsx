import { Tag } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import EmptyState from '@/agency/components/EmptyState';
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

  // State to store the currently selected campaign's id
  const params = useParams();
  const campagin_id = params.campaign as string;

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
      {/*eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
      <Link
        href={`/campaigns`}
        className={`flex w-[284px] flex-col items-start gap-2 rounded-md border p-3 text-sm leading-tight ${
          !campagin_id ? 'border-border bg-white' : 'border-muted bg-muted'
        }`}
      >
        All Campaigns
      </Link>
      {filteredCampaigns.map((campaign) => (
        <Card
          key={campaign.id}
          {...campaign}
          selected={campaign.id === campagin_id}
        />
      ))}
    </div>
  );
};
