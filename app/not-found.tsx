import Link from 'next/link';

import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import { Button } from '@/components/ui/button';

export default function NotFound(): JSX.Element {
  return (
      <div className='h-[100vh] flex flex-col items-center md:justify-between pt-10'>
        <div className='max-md:w-full max-md:px-5'> <NursanaLogo/></div>
      <div className='flex flex-col md:items-center md:justify-center px-4 md:text-center max-md:h-full max-md:pt-16'>
        <div className='mb-4 text-6xl font-medium'>4<span className='text-purple-500'>0</span>4</div>
        <h1 className='mb-2 text-xl font-medium text-gray-800'>
          Page Not Found
        </h1>
        <p className='mb-6 text-gray-600'>
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href='/'>
          <Button>Go back to home</Button>
        </Link>
      </div>
      <Footer />
      </div>
  );
}
