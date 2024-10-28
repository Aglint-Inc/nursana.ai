'use client';

import { usePathname } from 'next/navigation';

import { Page as FeedbackPage } from '@/interview/components/Feedback/Page';
import { Page as ResumePage } from '@/interview/components/Resume/Page';
import { Page as TranscriptPage } from '@/interview/components/Transcript/Page';
import { getInterviewCatchAllPath } from '@/interview/utils/getInterviewCatchAllPath';

export const CatchAllPage = () => {
  const pathname = usePathname();
  const path = getInterviewCatchAllPath(pathname);
  switch (path) {
    case 'resume':
      return <ResumePage />;
    case 'feedback':
      return <FeedbackPage />;
    case 'transcript':
      return <TranscriptPage />;
    default:
      return null;
  }
};
