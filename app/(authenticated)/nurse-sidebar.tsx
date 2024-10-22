import { File, Home, MessageSquare, Sparkle, User, UserSquare } from 'lucide-react';
import Link from 'next/link';

// import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
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

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Interview Feedback',
    url: '/dashboard',
    icon: UserSquare,
  },
  {
    title: 'Resume Review',
    url: '/dashboard',
    icon: File,
  },
  {
    title: 'Interview Transcript',
    url: '/dashboard',
    icon: MessageSquare,
  },
];

export function NurseSidebar() {
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
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton><User/><span>My Profile</span> </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href={'/profile/basic-information'}>Basic Information</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href={'/profile/resume'}>My Resume</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        
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
