import { CircleAlert, Sparkle, TvMinimalPlay, User } from 'lucide-react';
import React, { type ReactNode } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import NotAvailable from '@/dashboard/components/NotAvailable';

interface Message {
  role: 'agent' | 'user';
  content: string;
}

const ErrorFallback = () => {
  return (
    <NotAvailable
      heading='Data temporarily unavailable'
      description='Please check back in a little while for updated information.'
      Icon={TvMinimalPlay}
    />
  );
};

const VideoPlayerFallback = () => {
  return (
    <AspectRatio ratio={16 / 9}>
      <div className='flex h-full w-full items-center justify-center rounded-lg bg-black text-white'>
        <div className='flex flex-col items-center gap-4'>
          <CircleAlert />
          <p>Video Failed</p>
        </div>
      </div>
    </AspectRatio>
  );
};

const VideoPlayerComponent = ({
  videoPlayerComponent,
}: {
  videoPlayerComponent: React.ReactNode;
}) => {
  return (
    <Card className='overflow-hidden border-none bg-secondary shadow-none'>
      <CardContent className='p-0'>{videoPlayerComponent}</CardContent>
    </Card>
  );
};
VideoPlayerComponent.Fallback = VideoPlayerFallback;

const Title = ({ title }: { title: string }) => {
  return <>{title}</>;
};

const InterviewTranscriptFallback = () => {
  return (
    <div className='h-full w-full rounded-lg bg-gray-100 p-4 py-8 text-center text-gray-600'>
      <h3>Transcript not available</h3>
    </div>
  );
};

const Transcript = ({ transcript }: { transcript: Message[] }) => {
  return transcript.map((message, index) => (
    <div key={index} className='flex justify-start'>
      <div className='flex flex-col gap-2'>
        <div>
          {message.role === 'agent' ? (
            <div className='grid grid-cols-[max-content_1fr] items-center gap-2'>
              <div className='flex h-6 w-6 items-center justify-center rounded-sm bg-purple-100'>
                <Sparkle
                  size={16}
                  strokeWidth={1.2}
                  className='text-purple-500'
                />
              </div>
              <div className='text-md text-purple-600'>Nursana</div>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <div className='flex h-6 w-6 items-center justify-center rounded-sm bg-secondary'>
                <User size={16} strokeWidth={1.2} />
              </div>
              <div className='text-md'>You</div>
            </div>
          )}
        </div>
        <Card className='border-none shadow-none'>
          <CardContent className='p-0'>
            <p
              className={`text-md whitespace-pre-wrap ${
                message.role === 'agent' ? 'text-muted-foreground' : ''
              }`}
            >
              {message.content}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ));
};
Transcript.Fallback = InterviewTranscriptFallback;

export const InterviewTranscript = (props: Props) => {
  return (
    <div className='min-h-[calc(100vh-164px)] max-w-4xl mx-auto py-10'>
      <div className='mb-6 text-xl font-medium'>{props.Title}</div>
      <div className='flex flex-col gap-12'>
        {props.videoPlayerComponent}
        <div className='flex flex-col gap-6 mb-40'>{props.Transcript}</div>
      </div>
    </div>
  );
};

InterviewTranscript.Title = Title;
InterviewTranscript.ErrorFallback = ErrorFallback;
InterviewTranscript.videoPlayerComponent = VideoPlayerComponent;
InterviewTranscript.Transcript = Transcript;

export type Props = {
  Title?: ReactNode;
  videoPlayerComponent?: ReactNode;
  Transcript?: ReactNode;
};
