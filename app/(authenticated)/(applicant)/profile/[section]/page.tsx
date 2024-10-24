'use client';

import EditProfileForm from '../_common/components/EditProfileForm';
import ViewResume from '../_common/components/ViewResume';
import { PROFILE_SECTIONS } from '../_common/constant';

function ProfileSection({ params }: { params: { section: string } }) {
  return params.section == PROFILE_SECTIONS['basic-information'] ? (
    <>
      <EditProfileForm />
    </>
  ) : (
    <ViewResume />
  );
}

export default ProfileSection;
