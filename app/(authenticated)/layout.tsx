import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className='flex min-h-[calc(100vh-156px)] w-full flex-col gap-20'>
        {children}
      </div>
      <Footer />
    </>
  );
}
