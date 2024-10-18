import NursanaLogo from '@/components/nursana-logo';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/dashboard' className='flex items-center justify-center'>
      <NursanaLogo variant='md' />
    </Link>
  );
};
