import NextLink from 'next/link';
import type { PropsWithChildren } from 'react';

import { type PATHS } from '@/interview/constants/paths';
import { useCurrentInterview } from '@/interview/hooks/useCurrentInterview';

import { useNavigation } from '../Context';

type Props = {
  path: (typeof PATHS)[number];
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
  const { intercepted } = useNavigation();

  return (
    <NextLink
      replace={intercepted}
      href={`/interviews/${interview}${props.path === 'overview' ? '' : `/${props.path}`}`}
      className='flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
    >
      {props.children}
    </NextLink>
  );
};

const Title = (props: Props) => {
  return <span className='capitalize'>{props.path}</span>;
};
