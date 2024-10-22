'use client';
import {
  File,
  Home,
  LogOut,
  MessageSquare,
  Sparkle,
  UserSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import { Button } from '@/components/ui/button';
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
import { supabase } from '@/utils/supabase/client';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
    children: [],
  },
  {
    title: 'Interview Feedback',
    url: '/interview-feedback',
    icon: UserSquare,
    children: [],
  },
  {
    title: 'Resume Review',
    url: '/resume-review',
    icon: File,
    children: [],
  },
  {
    title: 'Interview Transcript',
    url: '/interview-transcript',
    icon: MessageSquare,
    children: [],
  },
  {
    title: 'My Profile',
    url: '/profile',
    icon: UserSquare,
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
  return (
    <Sidebar>
      <SidebarHeader className='p-4'>
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
          <SidebarMenuItem>
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
          <div>© 2024 Aglint Inc. All rights reserved.</div>
        </footer>
      </SidebarFooter>
    </Sidebar>
  );
}
