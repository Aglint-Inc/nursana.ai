'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { InterviewAnalysisUI } from '@/authenticated/components/InterviewAnalysisUI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';

export const Feedback = () => {
  return (
    <ErrorBoundary fallback={<InterviewAnalysisUI.ErrorFallback />}>
      <Content />
    </ErrorBoundary>
  );
};

const Content = () => {
  const analysis = useInterviewAnalysis();
  return (
    <ScrollArea className='max-h-[100vh] min-h-[800px]'>
      <InterviewAnalysisUI analysis={analysis?.structured_analysis} />
    </ScrollArea>
  );
};
