'use client';

import { useUserData } from '@/applicant/hooks/useUserData';
import {
  InterviewHomeUI,
  type UserLandingProps,
} from '@/authenticated/components/InterviewHomeUI';

function UserLanding() {
  const {
    applicant_user,
    resume,
    analysis,
    interview: interviewData,
  } = useUserData();

  const interviewScore =
    (analysis && analysis.structured_analysis?.overall_score) || 0;
  const resumeScore = resume?.resume_feedback?.overallScore || 0;

  const interview: UserLandingProps['interview'] = {
    id: interviewData?.id || '',
    stage: interviewData?.interview_stage || '',
    updated_at: interviewData?.updated_at || '',
  };

  return (
    <InterviewHomeUI
      interviewScore={interviewScore}
      resumeScore={resumeScore}
      first_name={applicant_user?.user.first_name}
      interview={interview}
    />
  );
}

export default UserLanding;
