import { useCallback, useRef, useState } from 'react';

export function useVideoRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoBlobRef = useRef<Blob | null>(null);

  const initializeCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, frameRate: 24 },
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraReady(true);
    } catch (err) {
      setError(`Failed to initialize camera: ${(err as Error).message}`);
    }
  }, []);

  const startRecording = useCallback(async () => {
    if (!videoRef.current?.srcObject) {
      setError('Camera not initialized');
      return;
    }

    try {
      const stream = videoRef.current.srcObject as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9',
        videoBitsPerSecond: 1000000,
      });
      mediaRecorderRef.current.start();
      setIsRecording(true);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoBlobRef.current = new Blob([event.data], { type: 'video/webm' });
        }
      };
    } catch (err) {
      setError(`Failed to start recording: ${(err as Error).message}`);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  return {
    isRecording,
    isCameraReady,
    startRecording,
    stopRecording,
    initializeCamera,
    videoRef,
    error,
    videoBlobRef,
  };
}
