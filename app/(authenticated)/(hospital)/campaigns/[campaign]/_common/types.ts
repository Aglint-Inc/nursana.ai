import type { Interviews } from '@/campaign/api/interviews';

export type ColumnSchema = Interviews['output']['data'][number];

export type PageProps = {
  params: { campaign: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
