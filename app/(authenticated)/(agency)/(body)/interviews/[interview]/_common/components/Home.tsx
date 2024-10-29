'use client';

import { InterviewHome } from '@/authenticated/components/InterviewHome';
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

  const interview: Parameters<(typeof InterviewHome)['InterviewInfo']>[0] = {
    id,
    stage: interview_stage || '',
    updated_at: updated_at || '',
  };

  return (
    <div className='mx-auto max-w-3xl'>
      <InterviewHome
        Title={<InterviewHome.Title first_name={first_name} />}
        Banner={<InterviewHome.Banner {...interview} />}
        InterviewScore={<InterviewHome.InterviewScore score={interviewScore} />}
        ResumeScore={<InterviewHome.ResumeScore score={resumeScore} />}
        ResumeInfo={<InterviewHome.ResumeInfo />}
        InterviewInfo={<InterviewHome.InterviewInfo {...interview} />}
      />
    </div>
  );
};
