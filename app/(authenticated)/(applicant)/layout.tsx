// import Footer from '@/components/footer';
// import Navbar from '@/components/navbar';

import { unstable_noStore } from 'next/cache';
import { api } from 'trpc/server';

import { NurseSidebar } from '@/applicant/components/nurse-sidebar';
import NursanaLogo from '@/components/nursana-logo';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import NPSForm from '@/dashboard/components/NPSForm';

export default function Layout({ children }: { children: React.ReactNode }) {
  unstable_noStore();
  void api.interviewFeedback.getUserInterviewRating.prefetch();
  return (
    <>
      {/* // user interview rating */}
      <NPSForm />
      <SidebarProvider>
        <NurseSidebar />
        <main className='w-full overflow-auto'>
          <div className='px-5 py-4 flex items-center gap-2 lg:hidden border-b border-b-gray-200'><SidebarTrigger className='static bg-gray-200 rounded-sm w-[32px] h-[32px]'/><NursanaLogo width={120}/></div>
          
          <div className='mx-auto max-w-3xl lg:py-12 max-lg:px-5 '>{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}
