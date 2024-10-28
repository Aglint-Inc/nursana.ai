// import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

import { Sparkles } from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { InterviewTranscriptUI } from '@/authenticated/components/InterviewTranscriptUI';
import { Loader } from '@/common/components/Loader';
import { VideoPlayer } from '@/common/components/VideoPlayer';
import { ScrollArea } from '@/components/ui/scroll-area';
import NotAvailable from '@/dashboard/components/NotAvailable';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';
import { useInterviewInterviewAudio } from '@/interview/hooks/useInterviewAudio';
import { useInterviewInterviewVideo } from '@/interview/hooks/useInterviewVideo';

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
  const { transcript_json } = useInterviewAnalysis();
  const transcript: Message[] | null =
    transcript_json && isMessageArray(transcript_json) ? transcript_json : null;

  return (
    <div>
      <ScrollArea className='mx-auto h-[800px] max-w-5xl'>
        <InterviewTranscriptUI
          transcript={transcript}
          videoPlayerComponent={
            <ErrorBoundary
              fallback={
                <>
                  <NotAvailable
                    heading='Video is not available'
                    description='Please check back in a little while for updated information.'
                    Icon={Sparkles}
                  />
                </>
              }
            >
              <Suspense
                fallback={
                  <div className='h-[516px]'>
                    <Loader />
                  </div>
                }
              >
                <Video />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </ScrollArea>
    </div>
  );
};

const Video = () => {
  const video_url = useInterviewInterviewVideo();
  const audio_url = useInterviewInterviewAudio();
  return <VideoPlayer videoUrl={video_url || ''} audioUrl={audio_url || ''} />;
};
