import { unstable_noStore } from 'next/cache';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { CampaignSidebar } from './../_common/components/campaign-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  unstable_noStore();
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '350px',
        } as React.CSSProperties
      }
    >
      <AppSidebar secondarySidebar={<CampaignSidebar />} />
      <SidebarInset>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
