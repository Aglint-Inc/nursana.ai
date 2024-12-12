/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import './interview-instructions.css';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { type InterviewData } from 'src/types/types';

import { Loader } from '@/app/components/Loader';
import { useUserDataQuery } from '@/applicant/hooks/useUserData';

import { useTrackOpened } from '../../hooks/useTrackOpened';
import Instructions from './InterviewProcess/instructions';
import StageResumeUpload from './ResumeUpload';

const mode = 'retell' as 'openAI' | 'retell';
const InterviewProcess = dynamic(
  () =>
    mode === 'openAI'
      ? import('./InterviewProcess/OpenaiInterviewProcess')
      : import('./InterviewProcess/RetellInterviewProcess'),
  {
    ssr: false,
  },
);

export interface InterviewInstructionsProps {
  interviewData: InterviewData;
  interviewId: string;
}

export default function InterviewInstructions({
  interviewData,
  interviewId,
}: InterviewInstructionsProps) {
  const [showInterview, setShowInterview] = useState(false);
  useTrackOpened({ interviewId });

  const { data, refetch, isLoading } = useUserDataQuery();

  useEffect(() => {
    if (data?.resume?.file_url) {
      const interval = setInterval(() => {
        if (data?.resume?.structured_resume || data?.resume?.error_status) {
          clearInterval(interval);
        } else {
          refetch();
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className='flex h-screen flex-col items-center justify-center gap-8'>
        <Loader />
      </div>
    );
  }

  if (!data?.resume) {
    return <StageResumeUpload />;
  }

  if (!data?.resume?.error_status && !data?.resume?.structured_resume) {
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center'>
        <div className='flex flex-col'>
          <Loader />
          <p className='mt-4 text-lg'>
            Please wait while we load your resume data
          </p>
        </div>
      </div>
    );
  }

  if (showInterview)
    return (
      <InterviewProcess
        interviewId={interviewId}
        interviewData={interviewData}
        resumeData={data?.resume?.structured_resume}
      />
    );

  return (
    <Instructions
      onProceed={() => {
        setShowInterview(true);
      }}
    />
  );
}
