'use client';

import { InterviewAnalysisUI } from '@/authenticated/components/InterviewAnalysisUI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';

export const Feedback = () => {
  const analysis = useInterviewAnalysis();
  return (
    <div>
      <ScrollArea className='mx-auto h-[800px] max-w-5xl'>
        <InterviewAnalysisUI
          summary={analysis?.structured_analysis?.overall_summary}
          analysis={analysis?.structured_analysis}
        />
      </ScrollArea>
    </div>
  );
};
