import InterviewInstructions from 'app/interview/_common/components/InterviewIntructions';
import InterviewSummary from 'app/interview/_common/components/InterviewSummary';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';
import { api } from 'trpc/server';

const normalizeStage = (stage: string) => {
  switch (stage) {
    case 'not_started':
      return 'start-interview';
    case 'resume_submitted':
    case 'interview_inprogress':
      return 'start-interview';
    case 'interview_completed':
      return 'summary';
    default:
      return 'start-interview'; // Default to get-started if unknown stage
  }
};

export default async function InterviewPage({
  params,
}: {
  params: { id: string; stage: string };
}) {
  const interview = await api.interview.getInterviewDetails({
    interview_id: params.id,
  });

  if (!interview) return notFound();
  const normalizedStage = normalizeStage(interview.interview_stage);
  let redirectStage = normalizedStage;

  // Check and adjust the stage based on interview progress
  if (
    params.stage === 'summary' &&
    interview.interview_stage !== 'interview_completed'
  ) {
    redirectStage = 'start-interview';
  } else if (
    params.stage === 'start-interview' &&
    interview.interview_stage === 'not_started'
  )
    if (params.stage !== redirectStage) {
      // Redirect if the requested stage doesn't match the allowed stage
      return redirect(`/interview/${params.id}/${redirectStage}`);
    }

  const renderComponent = () => {
    switch (redirectStage) {
      case 'start-interview':
        return (
          <Suspense fallback={<></>}>
            <InterviewInstructions
              key={params.id}
              interviewId={params.id}
              interviewData={interview}
            />
          </Suspense>
        );
      case 'summary':
        return (
          <Suspense fallback={<div>Loading Summary...</div>}>
            <InterviewSummary
              key={params.id}
              interviewId={params.id}
              interviewData={interview}
            />
          </Suspense>
        );
      default:
        notFound();
    }
  };

  return <div key={`${params.id}-${redirectStage}`}>{renderComponent()}</div>;
}
