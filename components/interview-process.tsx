'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Loader, Sparkle, StopCircle, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import type { Database } from 'src/supabase-types/database.types';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useVideoRecording } from '@/hooks/useVideoRecording';

import AllowCameraPermission from './allow-camera-permission';
import Footer from './footer';

interface InterviewProps {
  interviewId: string;
  interviewDuration: number;
}

interface ConversationTurn {
  role: 'ai' | 'human';
  content: string;
}

export default function Interview({
  interviewId,
  interviewDuration,
}: InterviewProps) {
  const {
    isRecording,
    isCameraReady,
    startRecording,
    stopRecording,
    initializeCamera,
    videoRef,
    error: videoError,
    videoBlobRef,
  } = useVideoRecording();

  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  // const [showCaptions, setShowCaptions] = useState(true);
  const [showCaptions] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationTurn[]
  >([]);
  const [callData, setCallData] = useState<{
    accessToken: string;
    callId: string;
    analysisId: string;
  } | null>(null);

  const [isInitializingClient, setIsInitializingClient] = useState(false);
  const retellWebClientRef = useRef<RetellWebClient | null>(null);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    initializeCamera();
  }, [initializeCamera]);

  const generateFilePath = useCallback(() => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `interviews/${timestamp}_${randomString}.webm`;
  }, []);

  const processAndUploadInterview = useCallback(async () => {
    if (!callData?.analysisId) {
      console.error('Analysis ID is not available');
      setError('Analysis ID is not available. Please try again.');
      return;
    }

    try {
      setIsProcessing(true);

      // Wait for the video blob to be created
      await new Promise<void>((resolve) => {
        const checkBlob = () => {
          if (videoBlobRef.current) {
            console.log('Video blob created:', videoBlobRef.current);
            resolve();
          } else {
            setTimeout(checkBlob, 100);
          }
        };
        checkBlob();
      });

      if (!videoBlobRef.current) {
        throw new Error('Failed to create video blob');
      }

      const filePath = generateFilePath();

      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, videoBlobRef.current, {
          contentType: 'video/webm',
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('videos').getPublicUrl(filePath);

      if (!data) throw new Error('Failed to get public URL');

      const videoUrl = data.publicUrl;

      const [updateInterviewResult, updateAnalysisResult] = await Promise.all([
        supabase
          .from('interviews')
          .update({
            interview_stage: 'interview_completed',
          })
          .eq('id', interviewId),
        supabase
          .from('interview_analysis')
          .update({
            video_url: videoUrl,
          })
          .eq('interview_id', interviewId),
      ]);

      if (updateInterviewResult.error) throw updateInterviewResult.error;
      if (updateAnalysisResult.error) throw updateAnalysisResult.error;

      console.log('Video upload and database updates completed successfully');
      router.push(`/interview/${interviewId}/summary`);
    } catch (error) {
      console.error('Error processing and uploading interview:', error);
      setError(
        `An error occurred while processing the interview: ${
          (error as Error).message
        }`,
      );
    } finally {
      setIsProcessing(false);
    }
  }, [
    supabase,
    router,
    interviewId,
    callData?.analysisId,
    generateFilePath,
    videoBlobRef,
  ]);

  const setupRetellEventListeners = useCallback(
    (retellWebClient: RetellWebClient) => {
      retellWebClient.on('call_started', () => console.log('Call started'));
      retellWebClient.on('call_ended', () => {
        console.log('Call ended');
        setIsInterviewStarted(false);
      });
      retellWebClient.on('agent_start_talking', () =>
        console.log('Agent started talking'),
      );
      retellWebClient.on('agent_stop_talking', () =>
        console.log('Agent stopped talking'),
      );
      retellWebClient.on('update', (update) => {
        console.log('Received update:', JSON.stringify(update, null, 2));

        if (update.transcript && Array.isArray(update.transcript)) {
          const newHistory: ConversationTurn[] = update.transcript.map(
            (turn: { role: string; content: string }) => ({
              role: turn.role === 'agent' ? 'ai' : 'human',
              content: turn.content,
            }),
          );

          setConversationHistory(newHistory);
          console.log(
            'Updated conversation history:',
            JSON.stringify(newHistory, null, 2),
          );
        }
      });
      retellWebClient.on('error', (error) => {
        console.error('An error occurred:', error);
        setError(`An error occurred: ${error}`);
        retellWebClient.stopCall();
      });
    },
    [],
  );
  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [videoRef]);
  const handleStartInterview = useCallback(async () => {
    setError(null);
    setIsInitializingClient(true);

    try {
      const response = await fetch('/api/create-web-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interviewId: interviewId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create web call');
      }

      const data = await response.json();
      setCallData(data);

      const retellWebClient = new RetellWebClient();
      retellWebClientRef.current = retellWebClient;
      setupRetellEventListeners(retellWebClient);

      await retellWebClient.startCall({
        accessToken: data.accessToken,
        sampleRate: 24000,
      });

      await startRecording();
      setIsInterviewStarted(true);
      setTimer(0);
      setConversationHistory([]);
    } catch (err) {
      console.error('Error starting interview:', err);
      setError(`Failed to start interview: ${(err as Error).message}`);
    } finally {
      setIsInitializingClient(false);
    }
  }, [interviewId, startRecording, setupRetellEventListeners]);

  const handleStopInterview = useCallback(async () => {
    if (retellWebClientRef.current) {
      retellWebClientRef.current.stopCall();
    }
    stopRecording();
    stopCamera();
    setIsInterviewStarted(false);
    await processAndUploadInterview();
  }, [stopRecording, processAndUploadInterview, stopCamera]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInterviewStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          if (newTimer >= interviewDuration) {
            handleStopInterview();
          }
          return newTimer;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInterviewStarted, interviewDuration, handleStopInterview]);

  // const toggleCaptions = useCallback(() => {
  //   setShowCaptions((prev) => !prev);
  // }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  if (videoError || error) {
    return <AllowCameraPermission />;
  }

  return (
    <div>
      <div className='flex h-[calc(100vh-72px)] flex-col items-center'>
        {!isInterviewStarted ? (
          <>
            <div className='mt-6 flex flex-col items-center'>
              <div className='mx-auto mb-10 text-xl font-light'>
                <span className='font-medium'>Nursana</span>
                <span className='font-light text-purple-500'>.ai</span>
              </div>
              <h1 className='mb-2 text-center text-3xl font-medium'>
                Let&apos;s Start Your AI Interview
              </h1>
              <p className='mb-6 max-w-xl text-center text-muted-foreground'>
                Your camera has been initialized. Once you&apos;re ready, click
                &apos;Start Interview&apos; to begin. Our AI system will guide
                you through the process.
              </p>
            </div>
          </>
        ) : (
          <div className='mx-auto mb-4 mt-6 text-xl font-light'>
            <span className='font-medium'>Nursana</span>
            <span className='font-light text-purple-500'>.ai</span>
          </div>
        )}

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
                      onClick={handleStopInterview}
                      aria-label='Stop interview'
                    >
                      Stop Interview
                    </Button>
                    {/* <Button
                      variant='default'
                      onClick={toggleCaptions}
                      aria-label='Toggle captions'
                    >
                      <Mic className='h-4 w-4' />
                    </Button> */}
                  </div>
                </>
              )}
            </AspectRatio>
          </CardContent>
        </Card>

        {isProcessing ? (
          <div className='mt-4 rounded-lg bg-gray-100 p-4 text-center'>
            <Loader className='mx-auto mb-2 h-8 w-8 animate-spin' />
            <p>Processing and uploading interview data...</p>
          </div>
        ) : isInterviewStarted ? (
          <></>
        ) : (
          <Button
            className='w-full'
            size='lg'
            onClick={handleStartInterview}
            disabled={
              !isCameraReady || isInitializingClient || isRecording || !!error
            }
          >
            {isInitializingClient ? 'Initializing...' : 'Start Interview'}
          </Button>
        )}

        {showCaptions && isInterviewStarted && (
          <div className='text-md relative mt-4 flex h-[26vh] w-[700px] flex-col justify-end gap-4 overflow-hidden rounded-lg bg-gray-50 p-6'>
            {conversationHistory.map((turn, index) => (
              <div
                key={index}
                className={`pb-2 ${
                  turn.role === 'ai' ? 'text-black' : 'text-black'
                }`}
              >
                <p className='font-semibold'>
                  {turn.role === 'ai' ? (
                    <>
                      <div className='mb-1 grid grid-cols-[max-content_1fr] items-center gap-2'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-sm bg-gray-200 text-muted-foreground'>
                          <Sparkle className='' size={16} strokeWidth={1.2} />
                        </div>
                        <div className='text-sm font-normal'>
                          AI Interviewer
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='mb-1 flex items-center gap-2'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-sm bg-gray-200 font-medium text-muted-foreground'>
                          <User
                            className='text-muted-foreground'
                            size={16}
                            strokeWidth={1.2}
                          />
                        </div>
                        <div className='text-sm font-normal'>You</div>
                      </div>
                    </>
                  )}
                </p>
                <p>{turn.content}</p>
              </div>
            ))}
            <div className='absolute left-0 top-0 z-10 h-[90%] w-full bg-gradient-to-b from-gray-50 to-transparent'></div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
