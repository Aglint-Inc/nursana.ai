'use client';

import { usePathname } from 'next/navigation';

import { Page as ResumePage } from '@/interview/resume/components/Page';
import { Page as ReviewPage } from '@/interview/review/components/Page';
import { Page as TranscriptPage } from '@/interview/transcript/components/Page';

const Page = () => {
  const pathname = usePathname();
  if (new RegExp('resume$').test(pathname)) return <ResumePage />;
  if (new RegExp('review$').test(pathname)) return <ReviewPage />;
  if (new RegExp('transcript$').test(pathname)) return <TranscriptPage />;
  return null;
};

export default Page;
