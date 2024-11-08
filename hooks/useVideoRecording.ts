import { useCallback, useRef, useState } from 'react';

export function useVideoRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoBlobRef = useRef<Blob | null>(null);
  const [fileMeta, setFleMeta] = useState<
    | { mime: 'video/webm'; formate: 'webm' }
    | { mime: 'video/mp4'; formate: 'mp4' }
  >({
    mime: 'video/webm',
    formate: 'webm',
  });

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
  const getRecorderOptions = useCallback(() => {
    let meta: typeof fileMeta = {
      mime: 'video/webm',
      formate: 'webm',
    };
    const options: MediaRecorderOptions = {
      audioBitsPerSecond: 96000,
      videoBitsPerSecond: 750000,
    };
    if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
      options.mimeType = 'video/webm; codecs=vp9';
    } else if (MediaRecorder.isTypeSupported('video/webm')) {
      options.mimeType = 'video/webm';
    } else if (MediaRecorder.isTypeSupported('video/mp4')) {
      meta = { mime: 'video/mp4', formate: 'mp4' };
      options.mimeType = 'video/mp4';
    } else {
      console.error('No suitable mimetype found for this device');
    }
    return { options, meta };
  }, []);

  const startRecording = useCallback(async () => {
    if (!videoRef.current?.srcObject) {
      setError('Camera not initialized');
      return;
    }
    const { options, meta } = getRecorderOptions();

    setFleMeta(meta);
    try {
      const stream = videoRef.current.srcObject as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoBlobRef.current = new Blob([event.data], { type: meta.mime });
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
    fileMeta,
    videoBlobRef,
  };
}
