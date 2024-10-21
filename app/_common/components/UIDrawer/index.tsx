import { X as CloseIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from '@/components/ui/sheet';

function UIDrawer({
  children,
  open,
  onClose,
  slotBottom,
  title,
  size = 'half',
  calendar,
}: {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  slotBottom?: React.ReactNode;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'full' | 'half';
  calendar?: React.ReactNode; // New prop for adjustable height
}) {
  // Determine width based on size variant
  const widthClass = {
    sm: 'min-w-[500px]',
    md: 'min-w-[700px]',
    lg: 'min-w-[900px]',
    full: 'min-w-[calc(100vw-100px)]',
    half: 'min-w-[calc(50vw)]',
  }[size];

  return (
    <Sheet open={open} onOpenChange={() => onClose()}>
      <SheetContent side='right' className={`p-0 ${widthClass}`}>
        <div className='flex w-full flex-row'>
          {calendar}
          <div className='w-full'>
            <Button
              onClick={onClose}
              className='absolute right-2 top-2 h-8 w-8 p-2 text-gray-600 hover:text-gray-800'
              variant='ghost'
            >
              <CloseIcon size={16} />
            </Button>
            <SheetHeader className='border-b border-gray-200 p-3'>
              <div className='flex flex-row'>
                <div className='text-sm'>{title}</div>
              </div>
            </SheetHeader>
            <ScrollArea className='h-[calc(100vh-98px)]'>{children}</ScrollArea>
            {slotBottom && (
              <SheetFooter className='w-full border-t border-gray-200 p-2'>
                <div className='flex flex-row items-center justify-center gap-4'>
                  {slotBottom}
                </div>
              </SheetFooter>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default UIDrawer;
