import Link from 'next/link';

import { useAgency } from '../hooks/useAgency';

export const Brand = () => {
  const { agency_name } = useAgency();
  return (
    <Link href='/dashboard' className='text-xl font-bold'>
      {agency_name}
    </Link>
  );
};
