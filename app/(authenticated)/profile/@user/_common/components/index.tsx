'use client';

import { File, User } from 'lucide-react';
import { useState } from 'react';

import { useUserData } from '@/authenticated/hooks/useUserData';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';

import EditProfileForm from './EditProfileForm';
import ViewResume from './ViewResume';

function UserProfile() {
  const userDetails = useUserData();
  const [_, setEdit] = useState(false);
  return (
    <div className='container flex max-w-screen-xl'>
      <SidebarProvider className='items-start'>
        <Sidebar collapsible='none' className='hidden md:flex'>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={true}>
                      <a href='/profile/basic-information'>
                        <User />
                        <span>Basic Information</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={true}>
                      <a href='/profile/resume'>
                        <File />
                        <span>Resume</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className='flex flex-1 flex-col overflow-hidden'>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>Profile</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Basic Information</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0'>
            <EditProfileForm setEdit={setEdit} />
            <ViewResume data={userDetails.resume?.structured_resume} />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default UserProfile;
