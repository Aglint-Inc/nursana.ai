'use client';

import { usePathname } from 'next/navigation';

import { Page as ResumePage } from '@/interview/components/Resume/Page';
import { Page as ReviewPage } from '@/interview/components/Review/Page';
import { Page as TranscriptPage } from '@/interview/components/Transcript/Page';
import { getInterviewCatchAllPath } from '@/interview/utils/getInterviewCatchAllPath';

export const CatchAllPage = () => {
  const pathname = usePathname();
  const path = getInterviewCatchAllPath(pathname);
  switch (path) {
    case 'resume':
      return <ResumePage />;
    case 'review':
      return <ReviewPage />;
    case 'transcript':
      return <TranscriptPage />;
    default:
      return null;
  }
};
