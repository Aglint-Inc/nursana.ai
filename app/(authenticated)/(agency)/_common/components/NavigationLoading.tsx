import { Skeleton } from '@/components/ui/skeleton';

export const NavigationLoading = () => {
  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <Skeleton className='h-20 w-full' />
      <div className='flex w-full flex-col gap-2'>
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
      </div>
    </div>
  );
};
