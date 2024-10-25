'use client';

import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { DataTableFilterControls } from '@/components/fancy-data-table/data-table-filter-controls';
import { DataTablePagination } from '@/components/fancy-data-table/data-table-pagination';
import { DataTableToolbar } from '@/components/fancy-data-table/data-table-toolbar';
import type { DataTableFilterField } from '@/components/fancy-data-table/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/utils/cn';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultColumnFilters?: ColumnFiltersState;
  // TODO: add sortingColumnFilters
  filterFields?: DataTableFilterField<TData>[];
  paginationState?: PaginationState;
  setSearch?: SetValues<any>;
}

import type { SetValues } from 'nuqs';

export function DataTable<TData, TValue>({
  columns,
  data,
  defaultColumnFilters = [],
  filterFields = [],
  paginationState = {
    pageIndex: 0,
    pageSize: 20,
  },
  setSearch = (() => {}) as any as SetValues<any>,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] =
    React.useState(defaultColumnFilters);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] =
    React.useState<PaginationState>(paginationState);
  const [columnVisibility, setColumnVisibility] =
    useLocalStorage<VisibilityState>('data-table-visibility', {});
  const [controlsOpen, setControlsOpen] = useLocalStorage(
    'data-table-controls',
    true,
  );

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, sorting, columnVisibility, pagination },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: (table, columnId: string) => () => {
      const map = getFacetedUniqueValues<(typeof data)[number]>()(
        table,
        columnId,
      )();
      if (['interview_stage'].includes(columnId)) {
        const rowValues = table
          .getGlobalFacetedRowModel()
          .flatRows.map((row) => row.getValue(columnId) as string[]);
        for (const values of rowValues) {
          for (const value of values) {
            const prevValue = map.get(value) || 0;
            map.set(value, prevValue + 1);
          }
        }
      }
      return map;
    },
  });

  React.useEffect(() => {
    const columnFiltersWithNullable = filterFields.map((field) => {
      const filterValue = columnFilters.find(
        (filter) => filter.id === field.value,
      );
      if (!filterValue) return { id: field.value, value: null };
      return { id: field.value, value: filterValue.value };
    });

    const search = columnFiltersWithNullable.reduce(
      (prev, curr) => {
        prev[curr.id as string] = curr.value;
        return prev;
      },
      {} as Record<string, unknown>,
    );

    setSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters]);

  return (
    <div className='flex h-full w-full flex-col gap-3 sm:flex-row'>
      <div
        className={cn(
          'w-full p-1 sm:min-w-52 sm:max-w-52 sm:self-start md:min-w-64 md:max-w-64',
          !controlsOpen && 'hidden',
        )}
      >
        <div className='-m-1 h-full p-1'>
          <DataTableFilterControls
            table={table}
            columns={columns}
            filterFields={filterFields}
          />
        </div>
      </div>
      <div className='flex max-w-full flex-1 flex-col gap-4 overflow-hidden p-1'>
        {/* <DataTableFilterCommand
          table={table}
          schema={schema}
          filterFields={filterFields}
        /> */}

        <DataTableToolbar
          table={table}
          controlsOpen={controlsOpen}
          setControlsOpen={setControlsOpen}
        />
        <div className='rounded-md border'>
          <Table>
            <TableHeader className='bg-muted/50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
