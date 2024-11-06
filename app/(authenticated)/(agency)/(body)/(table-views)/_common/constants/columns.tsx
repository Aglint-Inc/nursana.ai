'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { DataTableColumnHeader } from '@/components/fancy-data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { TAGS_COLOR } from '@/table-views/constants/tagsColor';
import type { ColumnSchema } from '@/table-views/types';

import { removeUnderscore } from '../utils/removeUnderscore';

export const COLUMNS: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const value = row.getValue('email') as ColumnSchema['email'];
      return <div className='max-w-[200px] truncate'>{`${value}`}</div>;
    },
  },
  {
    accessorKey: 'template',
    header: 'Template',
    cell: ({ row }) => {
      const value = row.getValue('template') as ColumnSchema['template'];
      return <div className='max-w-[200px] truncate'>{`${value.name}`}</div>;
    },
    filterFn: (row, id, value: ColumnSchema['template']['id'][]) => {
      const template = row.getValue(id) as ColumnSchema['template'];
      return value.some((value) => template.id === value);
    },
  },
  {
    accessorKey: 'campaign_code',
    header: 'Campaign code',
    cell: ({ row }) => {
      const value = row.getValue(
        'campaign_code',
      ) as ColumnSchema['campaign_code'];
      return <div className='max-w-[200px] truncate'>{`${value}`}</div>;
    },
    filterFn: (row, id, value: ColumnSchema['campaign_code'][]) => {
      const campaign_code = row.getValue(id) as ColumnSchema['campaign_code'];
      return value.some((value) => campaign_code === value);
    },
  },
  {
    accessorKey: 'interview_stage',
    header: 'Interview Stage',
    cell: ({ row }) => {
      const value = row.getValue(
        'interview_stage',
      ) as ColumnSchema['interview_stage'];
      return (
        <Badge
          className={`${TAGS_COLOR[value].badge} rounded-sm border-none font-normal`}
        >
          {removeUnderscore(value)}
        </Badge>
      );
    },
    filterFn: (row, id, value: ColumnSchema['interview_stage'][]) => {
      const interview_stage = row.getValue(
        id,
      ) as ColumnSchema['interview_stage'];
      return value.some((value) => interview_stage === value);
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
  },
];

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
// {
//   accessorKey: 'id',
//   header: 'ID',
//   cell: ({ row }) => {
//     const value = row.getValue('id');
//     return <div className='max-w-[200px] truncate'>{`${value}`}</div>;
//   },
// },

//   {
//     accessorKey: 'updated_at',
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title='Date' />
//     ),
//     cell: ({ row }) => {
//       const value = row.getValue('updated_at');
//       return (
//         <div className='text-xs text-muted-foreground' suppressHydrationWarning>
//           {format(new Date(`${value}`), 'LLL dd, y HH:mm')}
//         </div>
//       );
//     },
//     filterFn: (row, id, value) => {
//       const rowValue = row.getValue(id);
//       if (value instanceof Date && rowValue instanceof Date) {
//         return isSameDay(value, rowValue);
//       }
//       if (Array.isArray(value)) {
//         if (isArrayOfDates(value) && rowValue instanceof Date) {
//           const sorted = value.sort((a, b) => a.getTime() - b.getTime());
//           // TODO: check length
//           return (
//             sorted[0]?.getTime() <= rowValue.getTime() &&
//             rowValue.getTime() <= sorted[1]?.getTime()
//           );
//         }
//       }
//       return false;
//     },
//   }
// function isArrayOfDates(arr: any): arr is Date[] {
//   if (!Array.isArray(arr)) return false;
//   return arr.every((item) => item instanceof Date);
// }
