import NextLink from 'next/link';
import type { PropsWithChildren } from 'react';

import { CampaignBadge } from '@/campaigns/components/CampaignBadge';
import type { Campaigns } from '@/campaigns/types';

type Campaign = Campaigns[number];

type CardProps = Campaign & {
  selected?: boolean;
  onClick?: () => void; 
};

export const Card = (props: CardProps) => {
  const { selected = true, onClick } = props;

  return (
    <Link {...props} selected={selected} onClick={onClick}>
      <CampaignBadge {...props} />
      <Title {...props} />
      <Description {...props} />
    </Link>
  );
};

const Link = (props: PropsWithChildren<Pick<Campaign, 'id'> & { selected: boolean; onClick?: () => void }>) => {
  const linkClasses = props.selected
    ? 'border-border bg-white'
    : 'bg-muted border-muted';

  return (
    <NextLink
      href={`/campaigns/${props.id}`}
      className={`flex flex-col items-start gap-2 p-3 text-sm leading-tight rounded-md border w-[284px] ${linkClasses}`}
      onClick={props.onClick}
    >
      {props.children}
    </NextLink>
  );
};

const Title = (props: Pick<Campaign, 'name'>) => {
  return <span className='capitalize font-medium'>{props.name}</span>;
};

const Description = (props: Pick<Campaign, 'description'>) => {
  return (
    <span className='line-clamp-2 w-[260px] text-muted-foreground text-xs'>
      {props.description}
    </span>
  );
};