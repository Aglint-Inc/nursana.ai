'use client';

import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { Sheet, SheetContent } from '@/components/ui/sheet';

export const Drawer = (props: PropsWithChildren) => {
  const router = useRouter();
  return (
    <Sheet open={true} onOpenChange={() => router.back()}>
      <SheetContent side='right' className={`min-w-[1200px] p-0`}>
        {props.children}
      </SheetContent>
    </Sheet>
  );
};
