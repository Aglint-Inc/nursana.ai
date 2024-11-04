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
    <div>
      <ScrollArea className='mx-auto min-h-[800px]  overflow-auto'>
        <InterviewAnalysisUI analysis={analysis?.structured_analysis} />
      </ScrollArea>
    </div>
  );
};
