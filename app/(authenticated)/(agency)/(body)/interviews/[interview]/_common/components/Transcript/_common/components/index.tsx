import { InterviewTranscriptUI } from '@/authenticated/components/InterviewTranscriptUI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';

export const Transcript = () => {
  const { audio_url, video_url, transcript_json } = useInterviewAnalysis();
  return (
    <div>
      <ScrollArea className='mx-auto h-[800px] max-w-5xl'>
        <InterviewTranscriptUI
          isPending={true}
          transcript={transcript_json}
          audioUrl={audio_url || ''}
          videoUrl={video_url || ''}
        />
      </ScrollArea>
    </div>
  );
};
