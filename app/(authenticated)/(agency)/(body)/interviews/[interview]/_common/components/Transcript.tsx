'use client';
/* eslint-disable jsx-a11y/media-has-caption */

import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Sparkles } from 'lucide-react';
import { forwardRef, type RefObject, Suspense, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { InterviewTranscriptUI } from '@/authenticated/components/InterviewTranscriptUI';
import { AudioPlayer } from '@/common/components/AudioPlayer';
import { Loader } from '@/common/components/Loader';
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
                <VideoAndAudio />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </ScrollArea>
    </div>
  );
};

const VideoAndAudio = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className='flex flex-col'>
      <div className='basis-11/12'>
        <ErrorBoundary fallback={<>Video Failed</>}>
          <Video ref={videoRef} />
        </ErrorBoundary>
      </div>
      <div className='basis-1/12'>
        <ErrorBoundary fallback={<>Audio Failed</>}>
          <Audio ref={videoRef} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

const Video = forwardRef(function Video(_props, ref) {
  const video_url = useInterviewInterviewVideo();
  return (
    <AspectRatio ratio={16 / 9}>
      <video
        ref={ref as RefObject<HTMLVideoElement>}
        src={video_url}
        className='flex h-full w-full object-cover'
      />
    </AspectRatio>
  );
});

const Audio = forwardRef(function Audio(_props, ref) {
  const audio_url = useInterviewInterviewAudio();
  return (
    <AudioPlayer
      videoRef={ref as RefObject<HTMLVideoElement>}
      audioUrl={audio_url}
    />
  );
});
