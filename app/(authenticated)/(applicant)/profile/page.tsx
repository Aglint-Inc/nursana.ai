'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function UserProfilePage({ params }: { params: { section: string } }) {
  const router = useRouter();
  useEffect(() => {
    if (!params.section) {
      router.push('/profile/basic-information');
    }
  }, [params]);
  return null;
}

export default UserProfilePage;
