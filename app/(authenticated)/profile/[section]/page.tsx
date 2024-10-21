'use client';

import { useState } from 'react';

import EditProfileForm from '../_common/components/EditProfileForm';
import ViewProfileDetails from '../_common/components/ViewProfileDetails';
import ViewResume from '../_common/components/ViewResume';
import { PROFILE_SECTIONS } from '../_common/constant';

function ProfileSection({ params }: { params: { section: string } }) {
  const [edit,setEdit]=useState(false)
  return params.section == PROFILE_SECTIONS['basic-information'] ? (
    <>
   {edit? <EditProfileForm setEdit={setEdit}/>:<ViewProfileDetails setEdit={setEdit}/>}
    </>
  ) : (
    <ViewResume />
  );
}

export default ProfileSection;
