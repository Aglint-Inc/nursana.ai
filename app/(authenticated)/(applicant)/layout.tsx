// import Footer from '@/components/footer';
// import Navbar from '@/components/navbar';

import { NurseSidebar } from '@/applicant/components/nurse-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <NurseSidebar />
        <main className='w-full'>
          <div className='mx-auto max-w-3xl py-12'>{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}
