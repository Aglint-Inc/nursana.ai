import { DataTableSkeleton } from '@/components/fancy-data-table/data-table-skeleton';
import { Skeleton as DefaultSkeleton } from '@/components/ui/skeleton';

export function Skeleton() {
  return (
    <div className='flex h-full w-full flex-col gap-3 sm:flex-row'>
      <div className='w-full p-1 sm:min-w-52 sm:max-w-52 sm:self-start md:min-w-64 md:max-w-64'>
        <div className='-m-1 h-full p-1'>
          <div className='flex flex-col gap-4'>
            <div className='flex h-11 w-full items-center'>
              <DefaultSkeleton className='h-6 w-12' />
            </div>
            <div className='grid gap-2'>
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
              <DefaultSkeleton className='h-7 w-full' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex max-w-full flex-1 flex-col gap-4 p-1'>
        <DefaultSkeleton className='h-11 w-full border border-border' />
        <div className='flex h-9 items-center justify-between'>
          <DefaultSkeleton className='h-full w-full max-w-36' />
          <DefaultSkeleton className='h-full w-full max-w-20' />
        </div>
        <div className='rounded-md border'>
          <DataTableSkeleton />
        </div>
      </div>
    </div>
  );
}
