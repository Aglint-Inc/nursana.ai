/* eslint-disable jsx-a11y/anchor-is-valid */
'use client';

import { Command, File, Tags, Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { type ReactNode } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { User } from './User';

const PATHS = [
  {
    title: 'Campaigns',
    url: '/campaigns',
    icon: <Tags />,
  },
  {
    title: 'Interviews',
    url: '/interviews',
    icon: <Users />,
  },
  {
    title: 'Templates',
    url: '/templates',
    icon: <File />,
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  secondarySidebar?: ReactNode;
}

export function AppSidebar({ secondarySidebar = null }: AppSidebarProps) {
  const pathname = usePathname();
  const currentPath =
    PATHS.find(({ url }) => pathname.startsWith(url)) ?? PATHS[0];

  const { push } = useRouter();

  return (
    <>
      <Sidebar
        collapsible='none'
        className='h-screen !w-[calc(var(--sidebar-width-icon)_+_1px)]'
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size='lg' asChild className='md:h-8 md:p-0'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Command className='size-4' />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className='px-1.5 md:px-0'>
              <SidebarMenu>
                {PATHS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => push(item.url)}
                      isActive={currentPath.title === item.title}
                      className='px-2.5 md:px-2'
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <User />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      {secondarySidebar}
    </>
  );
}
