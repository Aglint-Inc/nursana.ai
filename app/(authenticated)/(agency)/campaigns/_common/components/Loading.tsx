import { Skeleton } from '@/campaigns/components/DataTable/skeleton';
import { SidebarInset } from '@/components/ui/sidebar';
import { Skeleton as DefaultSkeleton } from '@/components/ui/skeleton';

export const Loading = () => {
  return (
    <SidebarInset>
      <div className='flex w-full flex-col gap-2 p-4'>
        <DefaultSkeleton className='h-12 w-full' />
        <Skeleton />
      </div>
    </SidebarInset>
  );
};
