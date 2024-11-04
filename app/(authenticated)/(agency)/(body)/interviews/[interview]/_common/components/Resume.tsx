import { ErrorBoundary } from 'react-error-boundary';

import { ResumeFeedbackUI } from '@/authenticated/components/ResumeFeedbackUI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInterviewResume } from '@/interview/hooks/useInterviewResume';

import { useInterviewResumeUrl } from '../hooks/useInterviewResumeUrl';

export const Resume = () => {
  return (
    <ErrorBoundary fallback={<ResumeFeedbackUI.ErrorFallback />}>
      <Content />
    </ErrorBoundary>
  );
};

const Content = () => {
  const resume = useInterviewResume();
  const resumeUrl = useInterviewResumeUrl();
  return (
    <ScrollArea className='mx-auto max-w-5xl'>
      <ResumeFeedbackUI resume={resume} resumeUrl={resumeUrl} />
    </ScrollArea>
  );
};
