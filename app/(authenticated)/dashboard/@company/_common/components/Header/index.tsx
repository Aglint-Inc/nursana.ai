'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useHospital } from 'app/(authenticated)/_common/hooks/useHospital';
import Link from 'next/link';

import { useLogout } from '@/common/hooks/useLogout';
import { Button } from '@/components/ui/button';

export default function DashboardHeader() {
  const queryClient = useQueryClient();
  const { logout } = useLogout();

  const { hospital } = useHospital();

  return (
    <header className='dark:bg-blackshadow-sm fixed left-0 right-0 top-0 z-10 bg-white dark:bg-black'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3'>
        <Link href='/dashboard' className='text-xl font-bold'>
          {hospital.hospital_name}
        </Link>
        <nav>
          <Button variant='ghost' asChild>
            <Link href={'/dashboard/hospital/profile'}>Profile</Link>
          </Button>

          <Button
            variant='outline'
            onClick={() => {
              logout(queryClient);
            }}
          >
            Sign Out
          </Button>
        </nav>
      </div>
    </header>
  );
}
