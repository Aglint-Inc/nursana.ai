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
    <ScrollArea className='max-h-[100vh]'>
      <ResumeFeedbackUI resume={resume} resumeUrl={resumeUrl} />
    </ScrollArea>
  );
};
