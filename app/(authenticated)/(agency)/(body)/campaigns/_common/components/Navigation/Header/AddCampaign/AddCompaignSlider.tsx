import { Suspense } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

import { AddForm } from './AddForm';
import { useAction } from './Context';

export const AddCampaignSlider = () => {
  const { isOpen, setIsOpen } = useAction();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className='min-w-[700px]'>
        <SheetHeader>
          <SheetTitle>Add Campaign</SheetTitle>
          <SheetDescription>
            <Suspense
              fallback={
                <div className='flex flex-col gap-4'>
                  <Skeleton className='h-[50px] w-full'> </Skeleton>
                  <Skeleton className='h-[50px] w-full'> </Skeleton>
                  <Skeleton className='h-[50px] w-full'> </Skeleton>
                  <Skeleton className='h-[50px] w-full'> </Skeleton>
                </div>
              }
            >
              <AddForm />
            </Suspense>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
