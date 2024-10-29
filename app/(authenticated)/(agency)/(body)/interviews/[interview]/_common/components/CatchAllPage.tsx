'use client';

import { usePathname } from 'next/navigation';

import { Feedback } from '@/interview/components/Feedback';
import { Resume } from '@/interview/components/Resume';
import { Transcript } from '@/interview/components/Transcript';
import { getInterviewCatchAllPath } from '@/interview/utils/getInterviewCatchAllPath';

export const CatchAllPage = () => {
  const pathname = usePathname();
  const path = getInterviewCatchAllPath(pathname);
  switch (path) {
    case 'resume':
      return <Resume />;
    case 'feedback':
      return <Feedback />;
    case 'transcript':
      return <Transcript />;
    default:
      return null;
  }
};
