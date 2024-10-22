'use client';
import { StopCircle } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import UIDialog from '@/common/components/UIDialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

import { Button } from './ui/button';
import { Separator } from './ui/separator';

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
  const [timer, setTimer] = useState(interviewDuration * 60);
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
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            handleStopInterview();
          }
          return newTimer;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInterviewStarted, interviewDuration, handleStopInterview]);
  const [showStopInterviewModal, setShowStopInterviewModal] = useState(false);
  return (
    <>
      <UIDialog
        open={showStopInterviewModal}
        title='Stop Interview'
        onClose={() => setShowStopInterviewModal(false)}
        slotButtons={
          <div className='flex gap-2'>
            <Button
              onClick={() => {
                handleStopInterview();
                stopCamera();
              }}
              variant='secondary'
            >
              Stop
            </Button>
            <Button
              variant={'default'}
              onClick={() => {
                setShowStopInterviewModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        }
      >
        <div>
          <p>Are you sure you want to stop the interview?</p>
          <div className='mt-4 flex justify-end'></div>
        </div>
      </UIDialog>
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
                  {/* <div className='flex h-[36px] items-center justify-center rounded-md px-4 text-sm text-red-600'>
                    <StopCircle
                      onClick={() => {
                        setShowStopInterviewModal(true);
                      }}
                      className='mr-2 h-6 w-6'
                      strokeWidth={1.2}
                    />
                    <div className='h-6 w-[1px] bg-gray-300' />

                    <span className='ml-2'>
                      {formatTime(timer)}/{formatTime(interviewDuration * 60)}
                    </span>
                  </div> */}
                  <div className='flex gap-3 rounded-full bg-black p-2'>
                    <div
                      role='button'
                      tabIndex={0}
                      className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 p-0 text-white duration-200 hover:bg-red-500 hover:text-white'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setShowStopInterviewModal(true);
                        }
                      }}
                    >
                      <StopCircle size={24} strokeWidth={1.5} />
                    </div>
                    <Separator
                      orientation='vertical'
                      className='rounded-full bg-gray-700'
                    />
                    <div className='flex h-full items-center'>
                      <span className='mr-2 select-none text-white'>
                        {formatTime(timer)}/{formatTime(interviewDuration * 60)}
                      </span>
                    </div>
                  </div>
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
