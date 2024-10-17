
import NursanaLogo from '@/components/nursana-logo';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Footer } from 'react-day-picker';


export default function NotFound(): JSX.Element {
  return (
    <Section>
        <NursanaLogo/>
    <div className=" flex flex-col items-center justify-center text-center px-4">
      <div className='text-6xl font-medium mb-4'>404</div>
      <h1 className="text-xl font-medium text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"

      >
       <Button>Go back to home</Button>
      </Link>
    </div>
    <Footer/>
    </Section>
  );
}