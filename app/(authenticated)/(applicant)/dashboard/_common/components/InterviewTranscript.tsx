'use client';
import { TvMinimalPlay } from 'lucide-react';

import { useUserData } from '@/applicant/hooks/useUserData';
import { InterviewTranscriptUI } from '@/authenticated/components/InterviewTranscriptUI';
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
    <InterviewTranscriptUI
      isPending={isPending}
      transcript={transcript}
      userData={userData}
      audioUrl={audioUrl || ''}
      videoUrl={videoUrl || ''}
    />
  );
}
