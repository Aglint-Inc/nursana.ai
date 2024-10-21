// import Footer from '@/components/footer';
// import Navbar from '@/components/navbar';

import { SidebarProvider } from '@/components/ui/sidebar';

import { NurseSidebar } from './_common/components/nurse-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <NurseSidebar />
        <main className='w-full'>
          <div className='max-w-3xl mx-auto py-12'>
          {children}
          </div>
          
          </main>
      </SidebarProvider>
    </>
  );
}
