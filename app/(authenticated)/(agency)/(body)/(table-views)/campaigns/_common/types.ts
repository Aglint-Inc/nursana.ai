import type { ReactNode } from 'react';

import type { Read } from '@/campaigns/api/read';

export type Campaigns = Read['output'];

export type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
  interview: ReactNode;
};
