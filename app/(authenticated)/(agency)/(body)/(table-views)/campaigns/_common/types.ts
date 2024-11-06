import type { Read } from '@/campaigns/api/read';
import type { PageProps as TableViewsPageProps } from '@/table-views/types';

export type Campaigns = Read['output'];

export type PageProps = TableViewsPageProps;
