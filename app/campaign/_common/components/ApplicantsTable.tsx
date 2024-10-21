'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { DataTable } from '@/components/fancy-data-table/data-table';
import { Badge } from '@/components/ui/badge';

type Applicant = any;

interface ExtendedApplicant extends Applicant {
  licenses: string[];
}

const columns: ColumnDef<ExtendedApplicant>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'jobTitle',
    header: 'Job Title',
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      const applicant = row.original;
      return `${applicant.city}, ${applicant.state} ${applicant.zip}`;
    },
  },
  {
    accessorKey: 'previousOrganization',
    header: 'Previous Organization',
  },
  {
    accessorKey: 'school',
    header: 'School',
  },
  {
    accessorKey: 'licenses',
    header: 'Licenses',
    cell: ({ row }) => {
      const licenses = row.getValue('licenses') as string[];
      return licenses.join(', ');
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
        // variant={
        //   status === 'new'
        //     ? 'default'
        //     : status === 'interviewed'
        //       ? 'secondary'
        //       : status === 'offered'
        //         ? 'success'
        //         : 'destructive'
        // }
        >
          {status}
        </Badge>
      );
    },
  },
];

const _filterFields = [
  {
    label: 'Status',
    value: 'status',
  },
  {
    label: 'Job Title',
    value: 'jobTitle',
  },
  {
    label: 'State',
    value: 'state',
  },
  {
    label: 'Licenses',
    value: 'licenses',
  },
];

interface ApplicantsTableProps {
  applicants: ExtendedApplicant[];
}

export function ApplicantsTable({ applicants }: ApplicantsTableProps) {
  const [columnFilters] = useState<{ id: string; value: any }[]>([]);

  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      return columnFilters.every((filter) => {
        if (filter.id === 'licenses') {
          return (filter.value as string)
            .toLowerCase()
            .split(',')
            .some((license) =>
              applicant.licenses.some((l) =>
                l.toLowerCase().includes(license.trim()),
              ),
            );
        }
        if (filter.id === 'jobTitle' || filter.id === 'state') {
          return applicant[filter.id]
            .toLowerCase()
            .includes((filter.value as string).toLowerCase());
        }
        if (filter.id === 'status') {
          return (
            applicant.status.toLowerCase() ===
            (filter.value as string).toLowerCase()
          );
        }
        return true;
      });
    });
  }, [applicants, columnFilters]);

  return (
    <div className='w-full'>
      <DataTable
        columns={columns}
        data={filteredApplicants}
        // filterFields={filterFields}
        defaultColumnFilters={columnFilters}
      />
    </div>
  );
}
