'use client';

import { useState } from 'react';

import { useUserData } from '@/authenicated/hooks/useUserData';
import Section from '@/components/section';

import EditProfileForm from './EditProfileForm';
import ViewProfileDetails from './ViewProfileDetails';
import ViewResume from './ViewResume';

function UserProfile() {
  const userDetails = useUserData();
  const [edit, setEdit] = useState(false);
  console.log(edit);
  return (
    <Section>
      <div className='flex flex-col gap-10'>
        {edit ? (
          <EditProfileForm setEdit={setEdit} />
        ) : (
          <ViewProfileDetails setEdit={setEdit} />
        )}
        <ViewResume data={userDetails.resume?.structured_resume} />
      </div>
    </Section>
  );
}

export default UserProfile;
