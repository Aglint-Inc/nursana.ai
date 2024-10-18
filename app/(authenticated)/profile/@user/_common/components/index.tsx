'use client';

import { useUserData } from '@/authenicated/hooks/useUserData';
import Section from '@/components/section';

import EditProfileForm from './EditProfileForm';

function UserProfile() {
  const userDetails = useUserData();
  console.log({ userDetails });
  return (
    <Section>
      <div className='flex'>
        <EditProfileForm />
      </div>
    </Section>
  );
}

export default UserProfile;
