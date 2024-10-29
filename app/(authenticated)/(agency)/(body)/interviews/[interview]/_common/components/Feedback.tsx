'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { InterviewAnalysisUI } from '@/authenticated/components/InterviewAnalysisUI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';

export const Feedback = () => {
  return (
    <ErrorBoundary fallback={<>Interview analysis unavailable</>}>
      <Content />
    </ErrorBoundary>
  );
};

const Content = () => {
  const analysis = useInterviewAnalysis();
  return (
    <div>
      <ScrollArea className='mx-auto h-[800px] max-w-5xl'>
        <InterviewAnalysisUI analysis={analysis?.structured_analysis} />
      </ScrollArea>
    </div>
  );
};
