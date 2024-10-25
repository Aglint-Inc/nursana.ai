import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
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

export default Loading;
