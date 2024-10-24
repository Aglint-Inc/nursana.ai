// import Footer from '@/components/footer';
// import Navbar from '@/components/navbar';

import { NurseSidebar } from '@/applicant/components/nurse-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import NPSForm from '@/dashboard/components/NPSForm';
import { unstable_noStore } from 'next/cache';
import { api } from 'trpc/server';

export default function Layout({ children }: { children: React.ReactNode }) {
  unstable_noStore();
  void api.interviewFeedback.getUserInterviewRating.prefetch();
  return (
    <>
      {/* // user interview rating */}
      <NPSForm />
      <SidebarProvider>
        <NurseSidebar />
        <main className='w-full'>
          <div className='mx-auto max-w-3xl py-12'>{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}
