'use client';

import { type ResumeDetailsType } from 'app/(authenticated)/(applicant)/profile/_common/types';
import {
  useUpdateInterviews,
  useUpdateInterviewsAnalysis,
} from 'app/interview/_common/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { type InterviewData } from 'src/types/types';

import { Button } from '@/components/ui/button';
import { useVideoRecording } from '@/hooks/useVideoRecording';
import { supabase } from '@/utils/supabase/client';

import AllowCameraPermission from './allow-camera-permission';
import Footer from './footer';
import InterviewConversations from './interview-conversations';
import InterviewRecording from './interview-recording';
import MultiStepLoader from './multi-step.loader';
import NursanaLogo from './nursana-logo';

interface InterviewProps {
  interviewId: string;
  interviewData: InterviewData;
  resumeData: ResumeDetailsType;
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
  } = useVideoRecording();
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
        updateInterview({
          id: interviewId,
          interview_stage: 'interview_completed',
        }),
        updateInterviewAnalysis({
          interview_id: interviewId ?? '',
          video_url: videoUrl ?? '',
          transcript_json: conversationHistory,
        }),
      ]);

      if (updateInterviewResult.error) throw updateInterviewResult.error;
      if (updateAnalysisResult.error) throw updateAnalysisResult.error;

      console.log('Video upload and database updates completed successfully');
      router.push(`/dashboard`);
    } catch (error) {
      console.error('Error processing and uploading interview:', error);
      setError(
        `An error occurred while processing the interview: ${
          (error as Error).message
        }`,
      );
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

  const param = useParams();
  useEffect(() => {
    if (param.stage === 'summary') {
      setIsProcessing(false);
    }
  }, [param.stage]);

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
          resumeData: `${JSON.stringify(resumeData)}`,
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
    setIsInterviewStarted(false);
    await processAndUploadInterview();
  }, [stopRecording, processAndUploadInterview]);

  // const toggleCaptions = useCallback(() => {
  //   setShowCaptions((prev) => !prev);
  // }, []);

  if (videoError || error) {
    return <AllowCameraPermission />;
  }

  return (
    <div>
      <div className='flex h-[calc(100vh-72px)] flex-col items-center'>
        {!isInterviewStarted && !isProcessing ? (
          <>
            <div className='mt-6 flex flex-col items-center'>
              <NursanaLogo />
              <h1 className='mb-2 mt-6 text-center text-3xl font-medium'>
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
          <div className='mb-4 mt-6'>
            <NursanaLogo />
          </div>
        )}
        {!isProcessing && (
          <InterviewRecording
            handleStopInterview={handleStopInterview}
            isInterviewStarted={isInterviewStarted}
            interviewDuration={interviewData.ai_interview_duration}
            videoRef={videoRef}
          />
        )}

        {isProcessing ? (
          <div className='mt-4 flex h-[50vh] w-[700px] flex-col items-center justify-center rounded-lg p-4 text-center text-gray-500'>
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
