'use client';

import { useHospital } from '@/hospital/hooks/useHospital';

const Page = () => {
  const hospital = useHospital();
  return <>{hospital.hospital_name}</>;
};
export default Page;
