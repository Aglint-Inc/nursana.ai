'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format, isSameDay } from 'date-fns';

import type { ColumnSchema } from '@/campaign/types';
import { DataTableColumnHeader } from '@/components/fancy-data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';

import { tagsColor } from './constants';
import { isArrayOfDates } from './utils';

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const value = row.getValue('email');
      return <div className='max-w-[200px] truncate'>{`${value}`}</div>;
    },
  },
  {
    accessorKey: 'interview_stage',
    header: 'Interview Stage',
    cell: ({ row }) => {
      const value = row.getValue('interview_stage') as string | string[];
      if (Array.isArray(value)) {
        return (
          <div className='flex flex-wrap gap-1'>
            {value.map((v) => (
              <Badge key={v} className={tagsColor[v].badge}>
                {v}
              </Badge>
            ))}
          </div>
        );
      }
      return <Badge className={tagsColor[value].badge}>{value}</Badge>;
    },
    filterFn: (row, id, value) => {
      const array = row.getValue(id) as string[];
      if (typeof value === 'string') return array.includes(value);
      // up to the user to define either `.some` or `.every`
      if (Array.isArray(value)) return value.some((i) => array.includes(i));
      return false;
    },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const value = row.getValue('updated_at');
      return (
        <div className='text-xs text-muted-foreground' suppressHydrationWarning>
          {format(new Date(`${value}`), 'LLL dd, y HH:mm')}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      if (value instanceof Date && rowValue instanceof Date) {
        return isSameDay(value, rowValue);
      }
      if (Array.isArray(value)) {
        if (isArrayOfDates(value) && rowValue instanceof Date) {
          const sorted = value.sort((a, b) => a.getTime() - b.getTime());
          // TODO: check length
          return (
            sorted[0]?.getTime() <= rowValue.getTime() &&
            rowValue.getTime() <= sorted[1]?.getTime()
          );
        }
      }
      return false;
    },
  },
];
