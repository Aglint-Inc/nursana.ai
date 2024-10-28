import { ResumeFeedbackUI } from '@/authenticated/components/ResumeFeedbackUI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInterviewResume } from '@/interview/hooks/useInterviewResume';

export const ResumePage = () => {
  const resume = useInterviewResume();
  return (
    <div>
      <ScrollArea className='mx-auto h-[800px] max-w-5xl'>
        <ResumeFeedbackUI resume={resume} />
      </ScrollArea>
    </div>
  );
};
