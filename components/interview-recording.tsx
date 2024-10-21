'use client';
import { StopCircle } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

import { Button } from './ui/button';

function InterviewRecording({
  handleStopInterview,
  isInterviewStarted,
  interviewDuration,
  videoRef,
}: {
  handleStopInterview: () => void;
  isInterviewStarted: boolean;
  interviewDuration: number;
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  const [timer, setTimer] = useState(0);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [videoRef]);
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInterviewStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          if (newTimer >= interviewDuration * 60) {
            handleStopInterview();
          }
          return newTimer;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInterviewStarted, interviewDuration, handleStopInterview]);

  return (
    <>
      <Card className='mx-auto mb-4 w-[700px] overflow-hidden'>
        <CardContent className='relative min-w-full p-0'>
          <AspectRatio ratio={16 / 9}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className='h-full w-full object-cover'
            />
            {isInterviewStarted && (
              <>
                <div className='absolute bottom-0 left-0 flex w-full justify-center gap-2 bg-gradient-to-t from-[#00000050] to-transparent py-4'>
                  <div className='flex h-[36px] items-center justify-center rounded-md bg-white px-4 text-sm text-red-600'>
                    <StopCircle className='mr-2 h-4 w-4' strokeWidth={1.2} />
                    <span>Recording</span>
                    <span className='ml-2 w-[36px]'>{formatTime(timer)}</span>
                  </div>
                  <Button
                    variant='destructive'
                    onClick={() => {
                      handleStopInterview();
                      stopCamera();
                    }}
                    aria-label='Stop interview'
                  >
                    Stop Interview
                  </Button>
                </div>
              </>
            )}
          </AspectRatio>
        </CardContent>
      </Card>
    </>
  );
}

export default InterviewRecording;
