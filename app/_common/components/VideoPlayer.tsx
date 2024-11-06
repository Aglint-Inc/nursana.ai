/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import { useEffect, useRef, useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

import { AudioPlayer } from './AudioPlayer';

interface VideoPlayerProps {
  videoUrl: string;
  audioUrl: string;
}

export function VideoPlayer({ videoUrl, audioUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [aspectRatio, setAspectRatio] = useState(16 / 9); // Default aspect ratio

  useEffect(() => {
    const handleMetadata = () => {
      if (videoRef.current) {
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        if (videoWidth && videoHeight) {
          setAspectRatio(videoWidth / videoHeight);
        }
      }
    };

    // Attach event listener to video element
    const videoElement = videoRef.current;
    videoElement?.addEventListener('loadedmetadata', handleMetadata);

    // Cleanup event listener on component unmount
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleMetadata);
      }
    };
  }, []);

  return (
    <div className='flex flex-col overflow-hidden rounded-lg border border-border'>
      <AspectRatio ratio={aspectRatio} className='aspect-ratio'>
        <video
          ref={videoRef}
          src={videoUrl}
          className='h-full w-full object-cover'
          style={{
            transform: 'scaleX(-1)',
          }}
          muted
        />
      </AspectRatio>

      <div className='pt-2 md:px-4 md:pt-4'>
        <AudioPlayer videoRef={videoRef} audioUrl={audioUrl} />
      </div>
    </div>
  );
}
