import { Skeleton as DefaultSkeleton } from '@/components/ui/skeleton';

import { Skeleton } from '@/campaigns/components/DataTable/skeleton';

export const Loading = () => {
  return (
    <div className='flex w-full flex-col gap-2 p-4'>
      <DefaultSkeleton className='h-12 w-full' />
      <Skeleton />
    </div>
  );
};
