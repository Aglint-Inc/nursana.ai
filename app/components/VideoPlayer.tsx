"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoPlayerProps {
  videoUrl: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AspectRatio ratio={16 / 9}>
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        onEnded={() => setIsPlaying(false)}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="text-muted-foreground hover:text-foreground"
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
      </div>
    </AspectRatio>
  );
}
