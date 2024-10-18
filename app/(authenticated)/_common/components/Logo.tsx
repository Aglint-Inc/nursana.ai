import Link from 'next/link';

import NursanaLogo from '@/components/nursana-logo';

export const Logo = () => {
  return (
    <Link href='/dashboard' className='flex items-center justify-center'>
      <NursanaLogo variant='md' />
    </Link>
  );
};
