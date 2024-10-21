import { User } from 'lucide-react';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';
import { api, HydrateClient } from 'trpc/server';

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
import { capitalizeFirstLetter } from '@/utils/utils';

import { PROFILE_SECTIONS } from '../_common/constant';

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { section: string };
}) {
  unstable_noStore();
  void api.user.get_data.prefetch();
  return (
    <HydrateClient>
      <div className='container flex max-w-screen-xl'>
        <SidebarProvider className='items-start'>
          <Sidebar collapsible='none' className='hidden md:flex'>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {Object.values(PROFILE_SECTIONS).map((section) => (
                      <SidebarMenuItem key={section}>
                        <SidebarMenuButton
                          asChild
                          isActive={params.section == section}
                        >
                          <Link href={`/profile/${section}`}>
                            <User />
                            <span>
                              {capitalizeFirstLetter(
                                section.split('-').join(' '),
                              )}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
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
                      <BreadcrumbLink href='/profile'>Profile</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='hidden md:block' />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {capitalizeFirstLetter(
                          params.section.split('-').join(' '),
                        )}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className='flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0'>
              {children}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </HydrateClient>
  );
}

export default Layout;
