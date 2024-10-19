'use client';

import { useState } from 'react';

import { useUserData } from '@/authenicated/hooks/useUserData';
import Section from '@/components/section';

import EditProfileForm from './EditProfileForm';
import ViewResume from './ViewResume';

function UserProfile() {
  const userDetails = useUserData();
  const [_, setEdit] = useState(false);
  return (
    <Section>
      <div className='flex flex-col gap-10'>
        <EditProfileForm setEdit={setEdit} />

        {/* {edit ? (
          <EditProfileForm setEdit={setEdit} />
        ) : (
          <ViewProfileDetails setEdit={setEdit} />
        )} */}
        <ViewResume data={userDetails.resume?.structured_resume} />
      </div>
    </Section>
  );
}

export default UserProfile;
