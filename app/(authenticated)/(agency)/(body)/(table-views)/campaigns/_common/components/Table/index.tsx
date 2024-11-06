'use client';

import type { PageProps } from '@/campaigns/types';

import { SuspenseTable } from './suspenseTable';

export const Table = async (_props: PageProps) => {
  return <SuspenseTable />;
};
