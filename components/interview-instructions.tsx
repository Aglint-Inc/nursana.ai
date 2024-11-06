/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import './interview-instructions.css';

import parse from 'html-react-parser';
import { Pause, Play, Repeat } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type InterviewData } from 'src/types/types';

import { Loader } from '@/app/components/Loader';
import { useUserDataQuery } from '@/applicant/hooks/useUserData';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import Footer from './footer';
import NursanaLogo from './nursana-logo';

const mode = 'retell' as 'openAI' | 'retell';
const InterviewProcess = dynamic(
  () =>
    mode === 'openAI'
      ? import('@/components/openai_interview_process')
      : import('@/components/retell_interview-process'),
  {
    ssr: false,
  },
);

interface InterviewInstructionsProps {
  interviewData: InterviewData;
  interviewId: string;
}

export default function InterviewInstructions({
  interviewData,
  interviewId,
}: InterviewInstructionsProps) {
  const [showCover, setShowCover] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showInterview, setShowInterview] = useState(false);
  const [ignoreResume, setIgnoreResume] = useState(false);

  const showVideo = () => {
    setShowCover(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime =
        (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(Number(e.target.value));
    }
  };

  const handleProceed = useCallback(() => {
    setShowInterview(true);
  }, []);
  const { refetch, data } = useUserDataQuery();
  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.resume?.structured_resume || data?.resume?.error_status) {
        clearInterval(interval);
      } else {
        refetch();
      }
    }, 5000);
    setTimeout(() => {
      clearInterval(interval);
      setIgnoreResume(true);
    }, 10000);
    return () => clearInterval(interval);
  }, [data]);
  if (
    !ignoreResume &&
    !data?.resume?.error_status &&
    !data?.resume?.structured_resume
  ) {
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
  if (showInterview) {
    return (
      <InterviewProcess
        interviewId={interviewId}
        interviewData={interviewData}
        resumeData={data?.resume?.structured_resume}
      />
    );
  }

  return (
  <div className='w-screen'>
      <div className='mb-20 flex flex-col items-center pt-6 w-full pb-10'>
        <div className='max-md:w-full max-md:px-5'><NursanaLogo /></div>
        <div className='px-5'>
        <h1 className='md:mb-10 mb-6 mt-6 md:text-center md:text-3xl text-2xl font-medium'>
          <span className=''>Welcome to the AI Based interview for</span>
          <br />
          <span>{interviewData.name}</span>
        </h1>
        {interviewData.candidate_intro_video_cover_image_url && (
          <div className='relative mb-4 w-full max-w-3xl overflow-hidden rounded-lg'>
            <AspectRatio ratio={16 / 9}>
              {showCover ? (
                <>
                  <Image
                    src={
                      interviewData.candidate_intro_video_cover_image_url ?? '/'
                    }
                    alt='Video cover'
                    className='h-full w-full object-cover'
                    width={600}
                    height={338}
                  />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <Button
                      variant='default'
                      className='h-16 w-16 rounded-full bg-opacity-75 transition-all hover:bg-opacity-100'
                      onClick={showVideo}
                    >
                      <Play className='text-navy-900 h-8 w-8' />
                      <span className='sr-only'>Show video</span>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={interviewData.version.candidate_intro_video_url ?? '/'}
                    className='h-full w-full object-cover'
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                  />
                  <div className='absolute bottom-0 left-0 right-0 flex items-center bg-black bg-opacity-50 p-2'>
                    <Button
                      variant='ghost'
                      onClick={togglePlay}
                      className='text-white'
                    >
                      {isPlaying ? (
                        <Pause className='h-6 w-6' />
                      ) : (
                        <Play className='h-6 w-6' />
                      )}
                    </Button>
                    <Button
                      variant='ghost'
                      onClick={handleReplay}
                      className='text-white'
                    >
                      <Repeat className='h-6 w-6' />
                    </Button>
                    <input
                      type='range'
                      min='0'
                      max='100'
                      value={progress}
                      onChange={handleSeek}
                      className='mx-2 flex-grow'
                    />
                  </div>
                </>
              )}
            </AspectRatio>
          </div>
        )}
</div>
        <div className='flex w-full max-w-3xl flex-col gap-4 px-5'>
          <Card>
            <CardContent className='p-4'>
              <h2 className='mb-1 text-lg font-medium'>
                Estimated Time: {interviewData.version.ai_interview_duration}{' '}
                minutes
              </h2>
              <p className='text-md text-muted-foreground'>
                Please ensure you have sufficient time to complete it in one
                sitting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <h2 className='mb-1 text-lg font-medium'>Overview</h2>
              <div
                className='space-y-1'
                dangerouslySetInnerHTML={{
                  __html: interviewData.version.candidate_overview ?? '',
                }}
              ></div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <h2 className='mb-1 flex items-center text-lg font-medium'>
                Instructions
              </h2>
              <div className='text-md html richtext list-inside list-disc space-y-1 text-muted-foreground'>
                {parse(interviewData.version.candidate_instructions ?? '')}
              </div>
            </CardContent>
          </Card>

          <Button className='mb-4 w-full' size={'lg'} onClick={handleProceed}>
            Proceed to Interview
          </Button>
        </div>
      </div>
      <Footer />
      </div>
  );
}
