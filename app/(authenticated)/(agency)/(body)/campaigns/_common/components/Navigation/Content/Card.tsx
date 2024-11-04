import NextLink from 'next/link';
import type { PropsWithChildren } from 'react';

import { CampaignBadge } from '@/campaigns/components/CampaignBadge';
import type { Campaigns } from '@/campaigns/types';

type Campaign = Campaigns[number];

type CardProps = Campaign & {
  selected?: boolean;
};

export const Card = (props: CardProps) => {
  const { selected = true } = props;

  return (
    <Link {...props} selected={selected}>
      <CampaignBadge {...props} />
      <Title {...props} />
      <Description {...props} />
    </Link>
  );
};

const Link = (
  props: PropsWithChildren<Pick<Campaign, 'id'> & { selected: boolean }>,
) => {
  const linkClasses = props.selected
    ? 'border-border bg-white'
    : 'bg-muted border-muted';

  return (
    <NextLink
      href={`/campaigns/${props.id}`}
      className={`flex w-[284px] flex-col items-start gap-2 rounded-md border p-3 text-sm leading-tight ${linkClasses}`}
    >
      {props.children}
    </NextLink>
  );
};

const Title = (props: Pick<Campaign, 'name'>) => {
  return <span className='font-medium capitalize'>{props.name}</span>;
};

const Description = (props: Pick<Campaign, 'description'>) => {
  return (
    <span className='line-clamp-2 w-[260px] text-xs text-muted-foreground'>
      {props.description}
    </span>
  );
};
