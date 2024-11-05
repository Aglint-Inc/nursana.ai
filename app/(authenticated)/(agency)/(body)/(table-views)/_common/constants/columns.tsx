'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format, isSameDay } from 'date-fns';

import { DataTableColumnHeader } from '@/components/fancy-data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { TAGS_COLOR } from '@/table-views/constants/tagsColor';
import type { ColumnSchema } from '@/table-views/types';

import { removeUnderscore } from '../utils/removeUnderscore';

export const COLUMNS: ColumnDef<ColumnSchema>[] = [
  // {
  //   accessorKey: 'id',
  //   header: 'ID',
  //   cell: ({ row }) => {
  //     const value = row.getValue('id');
  //     return <div className='max-w-[200px] truncate'>{`${value}`}</div>;
  //   },
  // },
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
    accessorKey: 'campaign_code',

    header: 'Campaign code',
    cell: ({ row }) => {
      const value = row.getValue('campaign_code') as string;
      return <div className='max-w-[200px] truncate'>{`${value}`}</div>;
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
    accessorKey: 'interview_stage',
    header: 'Interview Stage',
    cell: ({ row }) => {
      const value = row.getValue('interview_stage') as string | string[];
      if (Array.isArray(value)) {
        return (
          <div className='flex flex-wrap gap-1'>
            {value.map((v) => (
              <Badge key={v} className={TAGS_COLOR[v].badge}>
                {removeUnderscore(v)}
              </Badge>
            ))}
          </div>
        );
      }
      return (
        <Badge
          className={`${TAGS_COLOR[value].badge} rounded-sm border-none font-normal`}
        >
          {removeUnderscore(value)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      const array = row.getValue(id) as string[];
      if (typeof value === 'string') return array.includes(value);
      // up to the user to define either `.some` or `.every`
      if (Array.isArray(value)) return value.some((i) => array.includes(i));
      return false;
    },
  },
  // {
  //   accessorKey: 'terms_accepted',
  //   header: 'Terms accepted',
  //   cell: ({ row }) => {
  //     const value = row.getValue('terms_accepted');
  //     if (value) return <Check className='h-4 w-4' />;
  //     return <Minus className='h-4 w-4 text-muted-foreground/50' />;
  //   },
  //   filterFn: (row, id, value) => {
  //     const rowValue = row.getValue(id);
  //     if (typeof value === 'string') return value === String(rowValue);
  //     if (typeof value === 'boolean') return value === rowValue;
  //     if (Array.isArray(value)) return value.includes(rowValue);
  //     return false;
  //   },
  // },
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

function isArrayOfDates(arr: any): arr is Date[] {
  if (!Array.isArray(arr)) return false;
  return arr.every((item) => item instanceof Date);
}
