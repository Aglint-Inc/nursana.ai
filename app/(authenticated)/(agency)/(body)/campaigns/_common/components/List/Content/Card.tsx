import NextLink from 'next/link';
import type { PropsWithChildren } from 'react';

import { CampaignBadge } from '@/campaigns/components/CampaignBadge';
import type { Campaigns } from '@/campaigns/types';

type Campaign = Campaigns[number];

export const Card = (props: Campaign) => {
  return (
    <Link {...props}>
      <div className='flex w-full flex-row items-center justify-between'>
        <Title {...props} />
        <CampaignBadge {...props} />
      </div>
      <Description {...props} />
    </Link>
  );
};

const Link = (props: PropsWithChildren<Pick<Campaign, 'id'>>) => {
  return (
    <NextLink
      href={`/campaigns/${props.id}`}
      className='flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
    >
      {props.children}
    </NextLink>
  );
};

const Title = (props: Pick<Campaign, 'name'>) => {
  return <span className='capitalize'>{props.name}</span>;
};

const Description = (props: Pick<Campaign, 'description'>) => {
  return (
    <span className='line-clamp-2 w-[260px] whitespace-break-spaces text-xs'>
      {props.description}
    </span>
  );
};
