import { Sparkle, User } from 'lucide-react';
import React from 'react';

import { useNurseData } from '@/common/hooks/useNurseData';
import { Card, CardContent } from '@/components/ui/card';

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

export function InterviewTranscript() {
  const { nurseData } = useNurseData();
  const transcriptData = nurseData?.analysis?.transcript_json;

  const transcript: Message[] | undefined =
    transcriptData && isMessageArray(transcriptData)
      ? transcriptData
      : undefined;

  if (!transcript || transcript.length === 0) {
    return <div>No transcript available.</div>;
  }

  return (
    <Card>
      <CardContent className='p-4'>
        <div className='flex flex-col gap-6'>
          {transcript.map((message, index) => (
            <div key={index} className='flex justify-start'>
              <div className='flex flex-col gap-2'>
                <div>
                  {message.role === 'agent' ? (
                    <div className='grid grid-cols-[max-content_1fr] items-center gap-2'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-sm bg-secondary'>
                        <Sparkle size={16} strokeWidth={1.2} />
                      </div>
                      <div className='text-md'>AI Interviewer</div>
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
      </CardContent>
    </Card>
  );
}
