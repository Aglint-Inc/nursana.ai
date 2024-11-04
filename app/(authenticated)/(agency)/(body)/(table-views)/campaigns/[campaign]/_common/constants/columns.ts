import { COLUMNS as ALL_COLUMNS } from '@/table-views/constants/columns';

export const COLUMNS = ALL_COLUMNS.filter(
  //@ts-expect-error
  ({ accessorKey }) => accessorKey !== 'campaign_code',
);
