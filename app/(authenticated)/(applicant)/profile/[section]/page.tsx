'use client';

import EditProfessionalInformation from '../_common/components/EditProfessionalInformation';
import EditProfileForm from '../_common/components/EditProfileForm';
import ViewResume from '../_common/components/ViewResume';
import { PROFILE_SECTIONS } from '../_common/constant';

function ProfileSection({ params }: { params: { section: string } }) {
  if (params.section === PROFILE_SECTIONS['basic-information']) {
    return <EditProfileForm />;
  } else if (params.section === PROFILE_SECTIONS['resume']) {
    return <ViewResume />;
  } else if (params.section === PROFILE_SECTIONS['professional-information']) {
    return <EditProfessionalInformation />;
  }
  return <>404</>;
}

export default ProfileSection;
