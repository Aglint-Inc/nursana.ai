/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import { useRef } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

import { AudioPlayer } from './AudioPlayer';

interface VideoPlayerProps {
  videoUrl: string;
  audioUrl: string;
}

export function VideoPlayer({ videoUrl, audioUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <AspectRatio ratio={16 / 9}>
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
      <AudioPlayer videoRef={videoRef} audioUrl={audioUrl} />
    </>
  );
}
