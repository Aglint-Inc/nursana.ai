'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { InterviewHome } from '@/authenticated/components/InterviewHome';
import { useInterview } from '@/interview/hooks/useInterview';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';
import { useInterviewApplicant } from '@/interview/hooks/useInterviewApplicant';
import { useInterviewResume } from '@/interview/hooks/useInterviewResume';

export const Home = () => {
  return (
    <ErrorBoundary fallback={<InterviewHome.ErrorFallback />}>
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
    </ErrorBoundary>
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
  // throw new Error('a');
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
  // throw new Error('a');
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
  // throw new Error('a');
  const interview = useInterview();
  return <InterviewHome.InterviewInfo {...interview} />;
};
