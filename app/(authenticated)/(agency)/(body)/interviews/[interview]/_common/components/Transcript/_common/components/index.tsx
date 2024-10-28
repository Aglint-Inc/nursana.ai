import { InterviewTranscriptUI } from '@/authenticated/components/InterviewTranscriptUI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';

interface Message {
  role: 'agent' | 'user';
  content: string;
}

function isMessageArray(arr: any): arr is Message[] {
  return (
    Array.isArray(arr) &&
    arr.every(
      (item) =>
        typeof item === 'object' &&
        'role' in item &&
        'content' in item &&
        (item.role === 'agent' || item.role === 'user') &&
        typeof item.content === 'string',
    )
  );
}

export const Transcript = () => {
  const { audio_url, video_url, transcript_json } = useInterviewAnalysis();
  const transcript: Message[] | null =
    transcript_json && isMessageArray(transcript_json) ? transcript_json : null;

  return (
    <div>
      <ScrollArea className='mx-auto h-[800px] max-w-5xl'>
        <InterviewTranscriptUI
          transcript={transcript}
          audioUrl={audio_url || ''}
          videoUrl={video_url || ''}
        />
      </ScrollArea>
    </div>
  );
};
