import Link from 'next/link';

import { useAgency } from '../hooks/useAgency';

export const Brand = () => {
  const { name } = useAgency();
  return (
    <Link href='/dashboard' className='text-xl font-bold'>
      {name}
    </Link>
  );
};
