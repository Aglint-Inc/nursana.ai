'use client';

import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { Drawer as UIDrawer, DrawerContent } from '@/components/ui/drawer';

export const Drawer = (props: PropsWithChildren) => {
  const router = useRouter();
  return (
    <UIDrawer open onClose={() => router.back()}>
      <DrawerContent className='h-[80%]'>{props.children}</DrawerContent>
    </UIDrawer>
  );
};
