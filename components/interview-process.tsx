'use client';

import { Loader, Mic, StopCircle, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useVideoRecording } from '@/hooks/useVideoRecording';
import { supabase } from '@/utils/supabase/client';

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
  const [showCaptions, setShowCaptions] = useState(true);
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

  const toggleCaptions = useCallback(() => {
    setShowCaptions((prev) => !prev);
  }, []);

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
    return <div>Error: {videoError || error}</div>;
  }

  return (
    <div>
      <div className='mb-4 min-h-[calc(100vh-180px)]'>
        {!isInterviewStarted ? (
          <>
            <div className='mt-10 flex flex-col items-center'>
              <div className='mx-auto mb-10 text-3xl font-light'>
                <span className='font-medium'>Nursana</span>
                <span className='font-light text-purple-500'>.ai</span>
              </div>
              <h1 className='mb-2 text-center text-4xl font-medium'>
                Let&apos;s Start Your AI Interview
              </h1>
              <p className='mb-10 max-w-xl text-center text-muted-foreground'>
                Your camera has been initialized. Once you&apos;re ready, click
                &apos;Start Interview&apos; to begin. Our AI system will guide
                you through the process.
              </p>
            </div>
          </>
        ) : null}

        <Card className='mx-auto mb-8 w-[600px] overflow-hidden'>
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
                  <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center space-x-2 rounded-full bg-gray-800 bg-opacity-75 px-4 py-2 text-white'>
                    <div className='font-mono text-red-500'>
                      {formatTime(timer)}
                    </div>
                    <Button
                      variant='ghost'
                      onClick={handleStopInterview}
                      aria-label='Stop interview'
                    >
                      <StopCircle className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      onClick={toggleCaptions}
                      aria-label='Toggle captions'
                    >
                      <Mic className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='absolute bottom-0 left-0 flex w-full items-center justify-center bg-red-500 bg-opacity-75 px-4 py-2 text-white'>
                    <Video className='mr-2 h-4 w-4 animate-pulse' />
                    <span>Recording</span>
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
          <Button
            className='mt-4 w-full'
            size='lg'
            onClick={handleStopInterview}
          >
            Stop Interview
          </Button>
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

        {showCaptions && (
          <div className='mt-4 max-h-96 overflow-y-auto rounded-lg p-4'>
            {conversationHistory.map((turn, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  turn.role === 'ai' ? 'text-blue-600' : 'text-green-600'
                }`}
              >
                <p className='font-semibold'>
                  {turn.role === 'ai' ? 'Nursana:' : 'You:'} refwerf
                </p>
                <p>{turn.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
