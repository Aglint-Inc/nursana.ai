'use client';

import {
  InterviewHomeUI,
  type UserLandingProps,
} from '@/authenticated/components/InterviewHomeUI';
import { useInterview } from '@/interview/hooks/useInterview';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';
import { useInterviewApplicant } from '@/interview/hooks/useInterviewApplicant';
import { useInterviewResume } from '@/interview/hooks/useInterviewResume';

export const Home = () => {
  const { first_name } = useInterviewApplicant();

  const { structured_analysis } = useInterviewAnalysis();

  const { resume_feedback } = useInterviewResume();

  const { id, interview_stage, updated_at } = useInterview();

  const interviewScore = structured_analysis?.overall_score || 0;

  const resumeScore = resume_feedback?.overallScore || 0;

  const interview: UserLandingProps['interview'] = {
    id,
    stage: interview_stage || '',
    updated_at: updated_at || '',
  };

  return (
    <div className='mx-auto max-w-3xl'>
      <InterviewHomeUI
        first_name={first_name}
        interviewScore={interviewScore}
        resumeScore={resumeScore}
        interview={interview}
      />
    </div>
  );
};
