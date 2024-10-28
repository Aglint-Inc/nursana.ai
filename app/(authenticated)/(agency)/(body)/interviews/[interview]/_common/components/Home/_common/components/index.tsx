import {
  InterviewHomeUI,
  UserLandingProps,
} from '@/authenticated/components/InterviewHomeUI';
import { useInterview } from '@/interview/hooks/useInterview';

export const Home = () => {
  const {
    applicant,
    interview_analysis,
    resume,
    interview: interviewData,
  } = useInterview();

  const first_name = applicant.first_name;

  const interviewScore =
    (interview_analysis &&
      interview_analysis.structured_analysis?.overall_score) ||
    0;
  const resumeScore = resume?.resume_feedback?.overallScore || 0;

  const interview: UserLandingProps['interview'] = {
    id: interviewData?.id || '',
    stage: interviewData?.interview_stage || '',
    updated_at: interviewData?.updated_at || '',
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
