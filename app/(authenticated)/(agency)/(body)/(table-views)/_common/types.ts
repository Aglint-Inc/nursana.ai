import type { ReactNode } from 'react';

import type { Read } from '@/table-views/api/read';

export type ColumnSchema = Read['output'][number];

export type PageProps = {
  interviewDrawer: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
};
