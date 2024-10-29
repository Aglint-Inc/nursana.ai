'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { InterviewHome } from '@/authenticated/components/InterviewHome';
import { useInterview } from '@/interview/hooks/useInterview';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';
import { useInterviewApplicant } from '@/interview/hooks/useInterviewApplicant';
import { useInterviewResume } from '@/interview/hooks/useInterviewResume';

export const Home = () => {
  return (
    <div className='mx-auto max-w-3xl'>
      <InterviewHome
        Title={<Title />}
        Banner={<Banner />}
        InterviewScore={
          <ErrorBoundary fallback={<InterviewScoreFallback />}>
            <InterviewScore />
          </ErrorBoundary>
        }
        ResumeScore={
          <ErrorBoundary fallback={<ResumeScoreFallback />}>
            <ResumeScore />
          </ErrorBoundary>
        }
        ResumeInfo={<ResumeInfo />}
        InterviewInfo={<InterviewInfo />}
      />
    </div>
  );
};

const Title = () => {
  const applicant = useInterviewApplicant();
  return <InterviewHome.Title {...applicant} />;
};

const Banner = () => {
  const interview = useInterview();
  return <InterviewHome.Banner {...interview} />;
};

const InterviewScore = () => {
  const { structured_analysis } = useInterviewAnalysis();
  return (
    <InterviewHome.InterviewScore score={structured_analysis.overall_score} />
  );
};

const InterviewScoreFallback = () => {
  return (
    <InterviewHome.InterviewScore.Fallback message='Interview score unavailable' />
  );
};

const ResumeScore = () => {
  const { resume_feedback } = useInterviewResume();
  return <InterviewHome.ResumeScore score={resume_feedback.overallScore} />;
};

const ResumeScoreFallback = () => {
  return (
    <InterviewHome.ResumeScore.Fallback message='Resume score unavailable' />
  );
};

const ResumeInfo = () => {
  return <InterviewHome.ResumeInfo />;
};

const InterviewInfo = () => {
  const interview = useInterview();
  return <InterviewHome.InterviewInfo {...interview} />;
};
