import type { Read } from '@/campaigns/api/read';
import { Interviews } from '@/campaign/api/interviews';

export type Campaigns = Read['output'];

export type ColumnSchema = Interviews['output'][number];

export type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
