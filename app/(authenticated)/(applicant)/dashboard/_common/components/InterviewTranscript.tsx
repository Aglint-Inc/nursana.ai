'use client';

import { useUserData } from '@/applicant/hooks/useUserData';
import { InterviewTranscriptUI } from '@/authenticated/components/InterviewTranscriptUI';
import { VideoPlayer } from '@/common/components/VideoPlayer';
import { useBucket } from '@/hooks/use-bucket';

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
  const transcript: Message[] | null =
    transcriptData && isMessageArray(transcriptData) ? transcriptData : null;

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

  return (
    <InterviewTranscriptUI
      transcript={transcript}
      // audioUrl={audioUrl || ''}

      // videoUrl={videoUrl || ''}
      videoPlayerComponent={
        <>
          {isPending ? (
            <>Loading</>
          ) : (
            <VideoPlayer audioUrl={audioUrl || ''} videoUrl={videoUrl || ''} />
          )}
        </>
      }
    />
  );
}
