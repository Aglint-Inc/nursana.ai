'use client';

import { useParams } from 'next/navigation';

import { Feedback } from '@/interview/components/Feedback';
import { Resume } from '@/interview/components/Resume';
import { Transcript } from '@/interview/components/Transcript';
import { type PageProps } from '@/interview/types';
import { getInterviewCatchAllPath } from '@/interview/utils/getInterviewCatchAllPath';

export const CatchAllPage = () => {
  const params = useParams() as unknown as PageProps['params'];
  const path = getInterviewCatchAllPath(params.all[0]);
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
