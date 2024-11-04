import type { Read } from '@/table-views/api/read';

export type ColumnSchema = Read['output'][number];

export type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
