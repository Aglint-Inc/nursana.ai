import NextLink from 'next/link';
import type { PropsWithChildren } from 'react';

import { useCurrentInterview } from '@/interview/hooks/useCurrentInterview';

import { useList } from '../Context';

type Props = {
  path: 'home' | 'resume' | 'review' | 'transcript';
};

export const Card = (props: Props) => {
  return (
    <Link {...props}>
      <Title {...props} />
    </Link>
  );
};

const Link = (props: PropsWithChildren<Props>) => {
  const { interview } = useCurrentInterview();
  const { intercepted } = useList();
  return (
    <NextLink
      replace={intercepted}
      href={`/interviews/${interview}${props.path === 'home' ? '' : `/${props.path}`}`}
      className='flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
    >
      {props.children}
    </NextLink>
  );
};

const Title = (props: Props) => {
  return <span className='capitalize'>{props.path}</span>;
};
