import Link from 'next/link';

import { useHospital } from '../hooks/useHospital';

export const Brand = () => {
  const { hospital_name } = useHospital();
  return (
    <Link href='/dashboard' className='text-xl font-bold'>
      {hospital_name}
    </Link>
  );
};
