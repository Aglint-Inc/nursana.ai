/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import { Pause, Play, Repeat } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { type InterviewData } from "src/types/types";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Footer from "./footer";
import NursanaLogo from "./nursana-logo";
import Section from "./section";

const InterviewProcess = dynamic(
  () => import("@/components/interview-process"),
  {
    ssr: false,
  }
);

interface InterviewInstructionsProps {
  interviewData: InterviewData;
  interviewId: string;
}

export default function InterviewInstructions({
  interviewData,
  interviewId,
}: InterviewInstructionsProps) {
  const [showCover, setShowCover] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showInterview, setShowInterview] = useState(false);

  console.log("interviewData", interviewData);

  const showVideo = () => {
    setShowCover(false);
  };

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

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime =
        (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(Number(e.target.value));
    }
  };

  const handleProceed = useCallback(() => {
    setShowInterview(true);
  }, []);

  if (showInterview) {
    return (
      <InterviewProcess
        interviewId={interviewId}
        interviewDuration={interviewData.candidate_estimated_time}
      />
    );
  }

  return (
    <Section>
      <div className="flex pt-6 flex-col items-center mb-20">
        <NursanaLogo/>
        <h1 className="text-3xl font-medium text-center mb-10">
          <span className="">Welcome to the AI Based interview for</span>
          <br />
          <span>{interviewData.name || interviewData.campaign_code}</span>
        </h1>

        <div className="relative rounded-lg overflow-hidden mb-4 max-w-3xl w-full">
          <AspectRatio ratio={16 / 9}>
            {showCover ? (
              <>
                <Image
                  src={interviewData.candidate_intro_video_cover_image_url}
                  alt="Video cover"
                  className="object-cover w-full h-full"
                  width={600}
                  height={338}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="default"
                    className="w-16 h-16 rounded-full bg-opacity-75 hover:bg-opacity-100 transition-all"
                    onClick={showVideo}
                  >
                    <Play className="h-8 w-8 text-navy-900" />
                    <span className="sr-only">Show video</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={interviewData.candidate_intro_video_url}
                  className="object-cover w-full h-full"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex items-center">
                  <Button
                    variant="ghost"
                    onClick={togglePlay}
                    className="text-white"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleReplay}
                    className="text-white"
                  >
                    <Repeat className="h-6 w-6" />
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="flex-grow mx-2"
                  />
                </div>
              </>
            )}
          </AspectRatio>
        </div>

        <div className="flex flex-col gap-4 max-w-3xl w-full">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-medium text-lg mb-1">
                Estimated Time: {interviewData.candidate_estimated_time}
              </h2>
              <p className="text-md text-muted-foreground">
                Please ensure you have sufficient time to complete it in one
                sitting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-medium text-lg mb-1">Overview</h2>
              <ul className="space-y-1">
                {interviewData.candidate_overview.map((item, index) => (
                  <li key={index} className="list-disc list-inside space-y-1 text-md text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="font-medium text-lg mb-1 flex items-center">
                Instructions
              </h2>
              <ul className="list-disc list-inside space-y-1 text-md text-muted-foreground">
                {interviewData.candidate_instructions.map(
                  (instruction, index) => (
                    <li key={index}>{instruction}</li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>

          <Button className="w-full mb-4" size={"lg"} onClick={handleProceed}>
            Proceed to Interview
          </Button>
        </div>
      </div>
      <Footer />
    </Section>
  );
}
