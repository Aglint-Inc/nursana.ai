'use client';

import { Sparkles, TvMinimalPlay } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { VideoPlayer } from '@/app/components/VideoPlayer';
import { useUserData, useUserDataQuery } from '@/applicant/hooks/useUserData';
import { InterviewTranscriptUI } from '@/authenticated/components/InterviewTranscriptUI';
import { Button } from '@/components/ui/button';
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
  const { refetch } = useUserDataQuery();
  const [ignoreRefetching, setIgnoreRefetching] = useState<boolean>(false);
  const interview = userData?.interview;
  const transcriptData = userData?.analysis?.transcript_json;
  const transcript: Message[] | null =
    transcriptData && isMessageArray(transcriptData) ? transcriptData : null;

  const videoBucketName = 'videos';
  // get file name
  const fileName =
    userData.analysis?.video_url?.split(`${videoBucketName}/`).pop() ?? '';
  // get file url
  const { data: videoUrl } = useBucket(videoBucketName, fileName);

  const audioBucketName = 'audio';
  // get file name
  const audioFileName =
    userData.analysis?.audio_url?.split(`${audioBucketName}/`).pop() ?? '';
  // get file url
  const { data: audioUrl } = useBucket(audioBucketName, audioFileName);

  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData) {
        clearInterval(interval);
        setIgnoreRefetching(true);
      } else {
        refetch();
      }
    }, 5000);
    setTimeout(() => {
      clearInterval(interval);
      setIgnoreRefetching(true);
    }, 30000);
    return () => clearInterval(interval);
  }, [transcriptData]);

  if (interview.interview_stage !== 'interview_completed') {
    return (
      <NotAvailable
        heading='Your interview hasn’t been completed yet.'
        description='Please complete your interview to access your analysis.'
        Icon={TvMinimalPlay}
        actionBtn={
          <Button>
            <Link href={`/interview/${interview.id}/start-interview`}>
              Start Interview
            </Link>
          </Button>
        }
      />
    );
  }

  if (!transcriptData && !ignoreRefetching) {
    return (
      <NotAvailable
        heading='We are fetching your transcript'
        description='Please wait a moment, or check back in a little while for updated information.'
        Icon={Sparkles}
        loading={true}
      />
    );
  }

  return (
    <InterviewTranscriptUI
      transcript={transcript}
      // audioUrl={audioUrl || ''}

      // videoUrl={videoUrl || ''}
      videoPlayerComponent={
        <VideoPlayer audioUrl={audioUrl || ''} videoUrl={videoUrl || ''} />
      }
    />
  );
}
