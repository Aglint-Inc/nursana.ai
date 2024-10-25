import type { Interviews } from '@/campaigns/api/interviews';
import type { Read } from '@/campaigns/api/read';

export type Campaigns = Read['output'];

export type ColumnSchema = Interviews['output'][number];

export type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
