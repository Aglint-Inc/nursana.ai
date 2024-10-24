'use client';
import { Sparkle, TvMinimalPlay, User } from 'lucide-react';

import { useUserData } from '@/applicant/hooks/useUserData';
import { Loader } from '@/common/components/Loader';
import { VideoPlayer } from '@/common/components/VideoPlayer';
import { Card, CardContent } from '@/components/ui/card';
import { useBucket } from '@/hooks/use-bucket';

import NotAvailable from './NotAvailable';

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
  const userData = useUserData();
  const transcriptData = userData?.analysis?.transcript_json;
  console.log(userData);
  const transcript: Message[] | undefined =
    transcriptData && isMessageArray(transcriptData)
      ? transcriptData
      : undefined;

  const videoBucketName = 'videos';
  // get file name
  const fileName =
    userData.analysis?.video_url?.split(`${videoBucketName}/`).pop() ?? '';
  // get file url
  const { data: videoUrl, isPending } = useBucket(videoBucketName, fileName);
  const audioBucketName = 'audio';
  // get file name
  const audioFileName =
    userData.analysis?.audio_url?.split(`${audioBucketName}/`).pop() ?? '';
  // get file url
  const { data: audioUrl } = useBucket(audioBucketName, audioFileName);

  // if (true) {
  if (!transcript || transcript.length === 0) {
    return (
      <NotAvailable
        heading='Data temporarily unavailable'
        description='Please check back in a little while for updated information.'
        Icon={TvMinimalPlay}
      />
    );
  }
  return (
    <div className='min-h-[calc(100vh-164px)]'>
      <div className='mb-6 text-xl font-medium'>Interview & Transcript</div>
      <div className='flex flex-col gap-12'>
        <Card className='overflow-hidden border-none bg-secondary shadow-none'>
          <CardContent className='p-0'>
            {isPending ? (
              <>
                <div className='h-[516px]'>
                  <Loader />
                </div>
              </>
            ) : (
              <VideoPlayer
                // videoUrl={userData.analysis?.video_url ?? ''}
                videoUrl={videoUrl || ''}
                audioUrl={audioUrl || userData.analysis?.audio_url || ''}
              />
            )}
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
}
