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
    <div className='flex flex-col rounded-lg border border-border overflow-hidden'>
      <AspectRatio ratio={4 / 5} className='aspect-ratio'>
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
     
      <div className='md:px-4 md:pt-4 pt-2'>
      <AudioPlayer videoRef={videoRef} audioUrl={audioUrl} />
      </div>
    </div>
  );
}
