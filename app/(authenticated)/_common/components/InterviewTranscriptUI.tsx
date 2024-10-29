import { Sparkle, TvMinimalPlay, User } from 'lucide-react';
import React from 'react';

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

export const InterviewTranscriptUI = ({
  videoPlayerComponent,
  transcript,
}: {
  videoPlayerComponent: React.ReactNode;
  transcript: Message[] | null;
}) => {
  if (!transcript || transcript.length === 0) {
    return <ErrorFallback />;
  }

  return (
    <div className='min-h-[calc(100vh-164px)]'>
      <div className='mb-6 text-xl font-medium'>Interview & Transcript</div>
      <div className='flex flex-col gap-12'>
        <Card className='overflow-hidden border-none bg-secondary shadow-none'>
          <CardContent className='p-0'>{videoPlayerComponent}</CardContent>
        </Card>

        <div className='flex flex-col gap-6'>
          {transcript.map((message, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

InterviewTranscriptUI.ErrorFallback = ErrorFallback;
