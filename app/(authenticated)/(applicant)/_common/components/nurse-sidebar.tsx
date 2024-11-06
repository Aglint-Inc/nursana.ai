'use client';
import { useQueryClient } from '@tanstack/react-query';
import {
  Briefcase,
  ChevronsUpDown,
  File,
  Home,
  LogOut,
  Sparkle,
  TvMinimalPlay,
  User,
  UserSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useLogout } from '@/authenticated/hooks/useLogout';
// import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  //   SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { useUserData } from '../hooks/useUserData';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
    badge: '',
    children: [],
  },
  {
    title: 'Jobs',
    url: '/jobs',
    icon: Briefcase,
    badge: 'Beta',
    children: [],
  },
  {
    title: 'Interview Feedback',
    url: '/interview-feedback',
    icon: UserSquare,
    badge: '',
    children: [],
  },
  {
    title: 'Resume Review',
    url: '/resume-review',
    icon: File,
    badge: '',
    children: [],
  },
  {
    title: 'Interview Transcript',
    url: '/interview-transcript',
    icon: TvMinimalPlay,
    badge: '',
    children: [],
  },
  {
    title: 'My Profile',
    url: '/profile',
    icon: User,
    badge: '',
    children: [
      {
        title: 'Basic Information',
        url: '/profile/basic-information',
      },
      {
        title: 'Resume',
        url: '/profile/resume',
      },
    ],
  },
];

export function NurseSidebar() {
  const params = usePathname();
  const { applicant_user } = useUserData();
  const queryClient = useQueryClient();
  const { logout } = useLogout();
  return (
    <Sidebar>
      <SidebarHeader className='p-4 lg:block hidden'>
        <NursanaLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={params === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className='h-[20px] bg-green-600 px-2 text-[11px] font-normal'>
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.children.map((child) => (
                      <SidebarMenuSubItem key={child.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={params === child.url}
                        >
                          <Link href={child.url}>{child.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {/* <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                className='flex w-full flex-row justify-start p-0'
                onClick={() => {
                  supabase.auth.signOut();
                  localStorage.clear();
                  window.location.reload();
                }}
                variant={'ghost'}
              >
                <LogOut className='ml-2 text-red-600' />
                <span className='text-red-600'>Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className='h-12 bg-muted transition-all duration-300 hover:bg-gray-200/65'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-sm bg-purple-600 text-white'>
                    {applicant_user?.user.first_name?.charAt(0)}
                    {applicant_user?.user.last_name?.charAt(0)}
                  </div>
                  <span className='line-clamp-1 font-medium'>
                    {applicant_user?.user.first_name}{' '}
                    {applicant_user?.user.last_name}
                  </span>
                  <ChevronsUpDown className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                className='w-[--radix-popper-anchor-width]'
              >
                <DropdownMenuItem>
                  <Link
                    href={'/profile/basic-information'}
                    className='block w-full'
                  >
                    <Button
                      className='flex h-[24px] w-full flex-row justify-start p-0 font-normal'
                      variant={'ghost'}
                    >
                      <User className='ml-2' />
                      <span className=''>My Profile</span>
                    </Button>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Button
                    className='flex h-[24px] w-full flex-row justify-start p-0 font-normal'
                    onClick={() => logout(queryClient)}
                    variant={'ghost'}
                  >
                    <LogOut className='ml-2 text-red-600' />
                    <span className='text-red-600'>Logout</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        <Separator />
        <footer className='flex w-full flex-col gap-2 p-3 text-xs text-muted-foreground'>
          <div className='flex gap-2'>
            <p>Powered by</p>
            <Link
              href={'https://aglint.ai'}
              className='flex items-center gap-1'
            >
              <Sparkle size={16} className='text-orange-500' />
              <p>Aglint AI</p>
            </Link>
          </div>
          <div>© 2024 All rights reserved.</div>
        </footer>
      </SidebarFooter>
    </Sidebar>
  );
}
