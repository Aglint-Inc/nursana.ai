'use client';

import { RealtimeClient } from '@openai/realtime-api-beta';
import { type ResumeDetailsType } from 'app/(authenticated)/(applicant)/profile/_common/types';
import {
  useUpdateInterviews,
  useUpdateInterviewsAnalysis,
} from 'app/interview/_common/hooks';
import { Loader } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type RetellWebClient } from 'retell-client-js-sdk';
import { type InterviewData } from 'src/types/types';

import { WavRecorder } from '@/audio/wav_recorder';
import { WavStreamPlayer } from '@/audio/wav_stream_player';
import { Button } from '@/components/ui/button';
import { useVideoRecording } from '@/hooks/useVideoRecording';
import { getInstructions } from '@/utils/audio/instructions';
import { supabase } from '@/utils/supabase/client';


import Footer from './footer';
import InterviewConversations from './interview-conversations';
import InterviewRecording from './interview-recording';
import NursanaLogo from './nursana-logo';
import Retry from './Retry';


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
  const wavRecorderRef = useRef<WavRecorder>(
    new WavRecorder({ sampleRate: 24000 }),
  );
  const wavStreamPlayerRef = useRef<WavStreamPlayer>(
    new WavStreamPlayer({ sampleRate: 24000 }),
  );
  const WS_URL = process.env.NEXT_PUBLIC_OPENAI_WS_URL;
  const client = new RealtimeClient({
    url: WS_URL,
  });

  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  // const [showCaptions, setShowCaptions] = useState(true);
  const [showCaptions] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationTurn[]
  >([]);

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

      router.push(`/interview/${interviewId}/summary`);
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
    generateFilePath,
    videoBlobRef,
    conversationHistory,
  ]);
  const param = useParams();
  useEffect(() => {
    if (param.stage === 'summary') {
      setIsProcessing(false);
    }
  }, [param.stage]);

  const handleStartInterview = useCallback(async () => {
    setError(null);
    setIsInitializingClient(true);
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    try {
      await startRecording();
      setIsInterviewStarted(true);
      setConversationHistory([]);

      // Connect to microphone
      await wavRecorder.begin('');

      // Connect to audio output
      await wavStreamPlayer.connect();

      // Connect to realtime API
      await client.connect();
      // get first response
      client.createResponse();

      // set turn detection to server_vad

      if (client.getTurnDetectionType() === 'server_vad') {
        //@ts-ignore
        await wavRecorder.record((data) => client.appendInputAudio(data.mono));
      }
    } catch (err) {
      console.error('Error starting interview:', err);
      setError(`Failed to start interview: ${(err as Error).message}`);
    } finally {
      setIsInitializingClient(false);
    }
  }, [interviewId, startRecording]);

  const handleStopInterview = useCallback(async () => {
    client.disconnect();

    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.end();

    const wavStreamPlayer = wavStreamPlayerRef.current;
    await wavStreamPlayer.interrupt();

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

  /**
   * Core RealtimeClient and audio capture setup
   * Set all of our instructions, tools, events and more
   */
  useEffect(() => {
    // Get refs
    const wavStreamPlayer = wavStreamPlayerRef.current;

    client.updateSession({
      // Set instructions
      instructions: getInstructions({
        aiWelcomeMessage: interviewData.version.ai_welcome_message ?? '',
        aiEndingMessage: interviewData.version.ai_ending_message ?? '',
        aiQuestions: interviewData.version.ai_questions ?? '',
        aiInstructions: interviewData.version.ai_instructions ?? '',
        resume: `${JSON.stringify(resumeData)}`,
      }),
      input_audio_transcription: { model: 'whisper-1' },
      voice: 'alloy',
      turn_detection: {
        type: 'server_vad',
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 1000,
      },
    });

    client.on('error', () => {
      setError('Failed to start conversation');
    });
    client.on('conversation.interrupted', async () => {
      const trackSampleOffset = await wavStreamPlayer.interrupt();
      if (trackSampleOffset?.trackId) {
        const { trackId, offset } = trackSampleOffset;
        await client.cancelResponse(trackId, offset);
      }
    });

    client.on('conversation.updated', async (data: any) => {
      const { item, delta } = data;
      const items = client.conversation.getItems();
      const conversationItems = items.map((item) => {
        return {
          content:
            item.formatted.transcript?.trim() || item.formatted.text?.trim(),
          role: item.role === 'assistant' ? 'ai' : 'human',
        } as ConversationTurn;
      });
      if (delta?.audio) {
        wavStreamPlayer.add16BitPCM(delta.audio, item.id);
      }
      if (item.status === 'completed' && item.formatted.audio?.length) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000,
        );
        item.formatted.file = wavFile;
      }
      setConversationHistory(conversationItems);
    });

    // client.on('conversation.item.appended', ({ item }: any) => {
    //   const conversationItem = {
    //     content: item.formatted.transcript?.trim(),
    //     text: item.formatted.text?.trim(),
    //     role: item.role === 'assistant' ? 'ai' : 'human',
    //   } as ConversationTurn;
    //   setConversationHistory((prev) => [...prev, conversationItem]);
    // });

    return () => {
      // cleanup; resets to defaults
      client.reset();
    };
  }, []);

  if (videoError || error) {
    return <Retry />;
  }
  return (
    <div>
      <div className='flex h-[calc(100vh-72px)] flex-col items-center'>
        {!isInterviewStarted && !isProcessing ? (
          <>
            <div className='mt-6 flex flex-col items-center'>
              <NursanaLogo />
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
          <div className='mt-6'>
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
            <Loader className='mx-auto mb-2 h-6 w-6 animate-spin' />
            <p className=''>Processing and uploading interview data...</p>
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
