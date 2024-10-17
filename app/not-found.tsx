import Link from 'next/link';

import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';

export default function NotFound(): JSX.Element {
  return (
    <Section>
      <NursanaLogo />
      <div className='flex flex-col items-center justify-center px-4 text-center'>
        <div className='mb-4 text-6xl font-medium'>404</div>
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
    </Section>
  );
}
