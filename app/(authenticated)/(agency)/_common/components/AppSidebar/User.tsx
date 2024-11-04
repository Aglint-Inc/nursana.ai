/* eslint-disable jsx-a11y/anchor-is-valid */
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { LogOut, SquarePen } from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { EditAgencyDialog } from '@/agency/components/EditDialog';
import { useAgencyEdit } from '@/agency/hooks/useAgencyEdit';
import { useUser } from '@/agency/hooks/useUser';
import { useLogout } from '@/authenticated/hooks/useLogout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { type DBTable } from '@/server/db/types';
import { capitalize } from '@/utils/utils';

export const User = () => {
  const { isMobile } = useSidebar();
  const { setIsOpen } = useAgencyEdit();
  const queryClient = useQueryClient();
  const { logout } = useLogout();
  return (
    <ErrorBoundary fallback={<></>}>
      <Suspense fallback={<Skeleton className='h-8 w-8' />}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0'
            >
              <UserIcon />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <UserInfo />
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <div className='flex w-full cursor-pointer items-center gap-2'>
                <SquarePen size={'14'} />
                Edit
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logout(queryClient)}>
              <div className='flex w-full cursor-pointer items-center gap-2'>
                <LogOut size={'14'} />
                Log out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <EditAgencyDialog />
      </Suspense>
    </ErrorBoundary>
  );
};

const UserInfo = () => {
  const user = useUser();
  return (
    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
      <UserIcon />
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-semibold'>
          {user.first_name + ' ' + user.last_name}
        </span>
        <span className='truncate text-xs'>{user.email}</span>
      </div>
    </div>
  );
};

const UserIcon = () => {
  const user = useUser();
  return (
    <Avatar className='h-8 w-8 rounded-lg'>
      <AvatarFallback className='rounded-lg'>
        {getUserInitials(user)}
      </AvatarFallback>
    </Avatar>
  );
};

const getUserInitials = (user: DBTable<'user'>) => {
  return capitalize(
    `${user.first_name[0]} ${(user.last_name ?? '')[0]}`,
  ).trim();
};
