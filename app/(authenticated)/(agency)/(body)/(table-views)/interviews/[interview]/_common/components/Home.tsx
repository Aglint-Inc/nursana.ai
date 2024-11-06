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
      <div className='min-h-screen'>
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
  const { structured_analysis } = useInterviewAnalysis();
  if (!structured_analysis) throw new Error('Interview score unavailable');
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
  if (!resume_feedback) throw new Error('Resume feedback unavailable');
  return <InterviewHome.ResumeScore score={resume_feedback.overall_score} />;
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
