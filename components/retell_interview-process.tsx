'use client';

import {
  useUpdateInterviews,
  useUpdateInterviewsAnalysis,
} from 'app/interview/_common/hooks';
import { useCreateWelCall } from 'app/interview/_common/hooks/useCreateWebCall';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { type InterviewData } from 'src/types/types';

import { Button } from '@/components/ui/button';
import { useVideoRecording } from '@/hooks/useVideoRecording';
import type { DBTable } from '@/server/db/types';
import { supabase } from '@/utils/supabase/client';

import Footer from './footer';
import InterviewConversations from './interview-conversations';
import InterviewRecording from './interview-recording';
import MultiStepLoader from './multi-step.loader';
import NursanaLogo from './nursana-logo';
import Retry from './Retry';

interface InterviewProps {
  interviewId: string;
  interviewData: InterviewData;
  resumeData: DBTable<'resume'>['structured_resume'] | undefined;
}

interface ConversationTurn {
  role: 'ai' | 'human';
  content: string;
}

export default function Interview({
  interviewId,
  interviewData,
  resumeData,
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
    fileMeta,
  } = useVideoRecording();
  const posthog = usePostHog();
  const { updateInterview } = useUpdateInterviews();
  const { updateInterviewAnalysis } = useUpdateInterviewsAnalysis();

  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
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

  useEffect(() => {
    initializeCamera();
  }, [initializeCamera]);

  const generateFilePath = useCallback(() => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `interviews/${timestamp}_${randomString}.${fileMeta.formate}`;
  }, [fileMeta.formate]);

  const processAndUploadInterview = useCallback(async () => {
    if (!callData?.analysisId) {
      setError('Analysis ID is not available. Please try again.');
      return;
    }

    try {
      setIsProcessing(true);

      // Wait for the video blob to be created
      await new Promise<void>((resolve) => {
        const checkBlob = () => {
          if (videoBlobRef.current) {
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
          contentType: fileMeta.mime,
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('videos').getPublicUrl(filePath);

      if (!data) throw new Error('Failed to get public URL');

      const videoUrl = data.publicUrl;

      const [updateInterviewResult, updateAnalysisResult] = await Promise.all([
        updateInterview({
          id: interviewId,
          interview_stage: 'interview_completed',
        }),
        updateInterviewAnalysis({
          interview_id: interviewId ?? '',
          video_url: videoUrl ?? '',
        }),
      ]);

      if (updateInterviewResult.error) throw updateInterviewResult.error;
      if (updateAnalysisResult.error) throw updateAnalysisResult.error;

      router.push(`/dashboard`);
    } catch (error) {
      setError(
        `An error occurred while processing the interview: ${
          (error as Error).message
        }`,
      );
      setIsProcessing(false);
    } finally {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  }, [
    supabase,
    router,
    interviewId,
    callData?.analysisId,
    generateFilePath,
    videoBlobRef,
    fileMeta.formate,
  ]);

  const param = useParams();
  useEffect(() => {
    if (param.stage === 'summary') {
      setIsProcessing(false);
    }
  }, [param.stage]);

  const setupRetellEventListeners = useCallback(
    (retellWebClient: RetellWebClient) => {
      // retellWebClient.on('call_started', () => console.error('Call started'));
      retellWebClient.on('call_ended', () => {
        setIsInterviewStarted(false);
      });
      // retellWebClient.on('agent_start_talking', () =>
      //   console.error('Agent started talking'),
      // );
      // retellWebClient.on('agent_stop_talking', () =>
      //   console.error('Agent stopped talking'),
      // );
      retellWebClient.on('update', (update) => {
        if (update.transcript && Array.isArray(update.transcript)) {
          const newHistory: ConversationTurn[] = update.transcript.map(
            (turn: { role: string; content: string }) => ({
              role: turn.role === 'agent' ? 'ai' : 'human',
              content: turn.content,
            }),
          );

          setConversationHistory(newHistory);
        }
      });
      retellWebClient.on('error', (error) => {
        setError(`An error occurred: ${error}`);
        retellWebClient.stopCall();
      });
    },
    [],
  );
  const { createWebCall } = useCreateWelCall();
  const handleStartInterview = useCallback(async () => {
    posthog.capture('interview-start-clicked', {
      interview_start_timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    setError(null);
    setIsInitializingClient(true);

    try {
      const response = await createWebCall({
        interview_id: interviewId,
        resumeData: `${JSON.stringify(resumeData)}`,
      });

      if (!response) {
        throw new Error('Failed to create web call');
      }

      setCallData(response);

      const retellWebClient = new RetellWebClient();
      retellWebClientRef.current = retellWebClient;
      setupRetellEventListeners(retellWebClient);

      await retellWebClient.startCall({
        accessToken: response.accessToken,
        sampleRate: 24000,
      });

      await startRecording();
      setIsInterviewStarted(true);
      setConversationHistory([]);
    } catch (err) {
      setError(`Failed to start interview: ${(err as Error).message}`);
    } finally {
      setIsInitializingClient(false);
    }
  }, [interviewId, startRecording, setupRetellEventListeners]);

  const handleStopInterview = useCallback(async () => {
    posthog.capture('interview-stop-clicked', {
      interview_stop_timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    if (retellWebClientRef.current) {
      retellWebClientRef.current.stopCall();
    }
    stopRecording();
    setIsInterviewStarted(false);
    await processAndUploadInterview();
    posthog.capture('interview-uploaded', {
      interview_uploaded_timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
  }, [stopRecording, processAndUploadInterview]);

  // const toggleCaptions = useCallback(() => {
  //   setShowCaptions((prev) => !prev);
  // }, []);

  if (videoError || error) {
    return <Retry />;
  }

  return (
    <div>
      <div className='flex h-[calc(100vh-72px)] flex-col max-md:px-5 md:items-center'>
        {!isInterviewStarted && !isProcessing ? (
          <>
            <div className='mt-6 flex flex-col md:items-center'>
              <div className='max-md:w-full'>
                <NursanaLogo />
              </div>
              <h1 className='mb-2 mt-6 text-xl font-medium md:text-center md:text-3xl'>
                Let&apos;s Start Your AI Interview
              </h1>
              <p className='mb-6 max-w-xl text-muted-foreground md:text-center'>
                Your camera has been initialized. Once you&apos;re ready, click
                &apos;Start Interview&apos; to begin. Our AI system will guide
                you through the process.
              </p>
            </div>
          </>
        ) : (
          <div className='mb-4 mt-6'>
            <NursanaLogo />
          </div>
        )}
        {!isProcessing && (
          <InterviewRecording
            handleStopInterview={handleStopInterview}
            isInterviewStarted={isInterviewStarted}
            interviewDuration={interviewData.version.ai_interview_duration}
            videoRef={videoRef}
          />
        )}

        {isProcessing ? (
          <div className='mt-4 flex h-[50vh] w-full flex-col items-center justify-center rounded-lg p-4 text-center text-gray-500 md:w-[700px]'>
            <MultiStepLoader />
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

        <InterviewConversations
          conversationHistory={conversationHistory}
          isInterviewStarted={isInterviewStarted}
          isProcessing={isProcessing}
          showCaptions={showCaptions}
        />
      </div>
      <Footer />
    </div>
  );
}
